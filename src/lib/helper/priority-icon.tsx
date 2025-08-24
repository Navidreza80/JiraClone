import LowPriority from "@/components/svg/LowPriority";
import { Priority } from "../../../prisma/src/generated/prisma";
import MediumPriority from "@/components/svg/MediumPriority";
import HighPriority from "@/components/svg/HighPriority";

export const GetPriorityIcon = (priority: Priority) =>
  priority == "LOW" ? (
    <LowPriority />
  ) : priority == "MEDIUM" ? (
    <MediumPriority />
  ) : (
    <HighPriority />
  );
