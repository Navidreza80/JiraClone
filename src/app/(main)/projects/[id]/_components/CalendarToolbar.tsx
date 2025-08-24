import { Button } from "@/components/ui/button";

export default function CalendarToolbar({
  date,
  onNavigate,
}: {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <h2 className="font-semibold">
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>
      <div className="flex gap-2">
        <Button className="bg-button hover:bg-button-hover rounded cursor-pointer" onClick={() => onNavigate("TODAY")}>Today</Button>
        <Button className="bg-button hover:bg-button-hover rounded cursor-pointer" onClick={() => onNavigate("PREV")}>Prev</Button>
        <Button className="bg-button hover:bg-button-hover rounded cursor-pointer" onClick={() => onNavigate("NEXT")}>Next</Button>
      </div>
    </div>
  );
}
