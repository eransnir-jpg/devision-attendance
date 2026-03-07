import * as XLSX from "xlsx";
import { Employee } from "@/data/employees";

export function exportToExcel(employees: Employee[], dateStr: string) {
  const data = employees.map((e, i) => ({
    "#": i + 1,
    "שם העובד": e.name,
    "אגף": e.department,
    "מאפיין": e.characteristic,
    "סטטוס נוכחות": e.attendanceStatus,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "דוח נוכחות");

  // Set RTL
  ws["!cols"] = [
    { wch: 5 },
    { wch: 25 },
    { wch: 30 },
    { wch: 30 },
    { wch: 18 },
  ];

  XLSX.writeFile(wb, `דוח_נוכחות_${dateStr}.xlsx`);
}
