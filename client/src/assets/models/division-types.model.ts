export type DivisionType = "DAILY" | "BOOKS" | "CUSTOMIZED" | "MONTHLY";

export const divisionTypeToPath = new Map<DivisionType, string>()
  .set("DAILY", "system.divisionTypeDescriptions.daily")
  .set("BOOKS", "system.divisionTypeDescriptions.books")
  .set("MONTHLY", "system.divisionTypeDescriptions.monthly")
  .set("CUSTOMIZED", "system.divisionTypeDescriptions.customized.label");
