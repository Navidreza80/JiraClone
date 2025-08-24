"use client";

import { TabsContent } from "@/components/ui/tabs";
import { TaskEvent } from "@/types/indes";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Task } from "../../../../../../prisma/src/generated/prisma";
import CalendarToolbar from "./CalendarToolbar";
import "./index.css";
import TaskCard from "./TaskCard";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function TaskCalendar({ tasks }: { tasks: Task[] }) {
  const [value, setValue] = useState(
    tasks.length > 0 ? new Date(tasks[0].dueDate) : new Date()
  );

  const events: TaskEvent[] = tasks.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.title,
    status: task.status,
    priority: task.priority,
    projectId: task.projectId,
    id: task.id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") setValue(subMonths(value, 1));
    else if (action === "NEXT") setValue(addMonths(value, 1));
    else if (action === "TODAY") setValue(new Date());
  };

  return (
    <TabsContent value="calendar">
      <div className="h-[80vh] overflow-x-auto">
        <Calendar
          localizer={localizer}
          date={value}
          events={events}
          views={["month", "week", "day"]}
          defaultView="month"
          popup
          toolbar
          className="h-full min-w-[700px]"
          formats={{
            weekdayFormat: (date, culture, localizer) =>
              localizer?.format(date, "EEE", culture) ?? "",
          }}
          components={{
            eventWrapper: ({ event }: { event: TaskEvent }) => (
              <TaskCard
                title={event.title}
                status={event.status}
                priority={event.priority}
              />
            ),
            toolbar: () => (
              <CalendarToolbar date={value} onNavigate={handleNavigate} />
            ),
          }}
        />
      </div>
    </TabsContent>
  );
}
