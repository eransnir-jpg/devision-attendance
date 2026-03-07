import { useState, useMemo } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { FileDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendancePieChart from "@/components/AttendancePieChart";
import EmployeeTable from "@/components/EmployeeTable";
import { getInitialEmployees, STATUS_COLORS, CHAR_COLORS, Employee } from "@/data/employees";
import { exportToExcel } from "@/lib/exportExcel";

function countBy(employees: Employee[], key: keyof Employee, colorMap: Record<string, string>) {
  const counts: Record<string, number> = {};
  employees.forEach((e) => {
    const val = e[key] as string;
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    color: colorMap[name] || "hsl(220, 10%, 70%)",
  }));
}

export default function Index() {
  const [employees, setEmployees] = useState<Employee[]>(getInitialEmployees);

  const today = format(new Date(), "EEEE, d בMMMM yyyy", { locale: he });
  const todayFile = format(new Date(), "yyyy-MM-dd");

  const statusData = useMemo(() => countBy(employees, "attendanceStatus", STATUS_COLORS), [employees]);
  const charData = useMemo(() => countBy(employees, "characteristic", CHAR_COLORS), [employees]);

  const handleStatusChange = (id: number, status: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, attendanceStatus: status } : e))
    );
  };

  return (
    <div className="min-h-screen bg-background font-heebo" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">דוח נוכחות יומי</h1>
              <p className="text-sm text-muted-foreground">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {employees.length} עובדים
            </span>
            <Button
              onClick={() => exportToExcel(employees, todayFile)}
              className="gap-2"
            >
              <FileDown className="w-4 h-4" />
              ייצוא לאקסל
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttendancePieChart title="סטטוס נוכחות" data={statusData} />
          <AttendancePieChart title="מאפיין עובד" data={charData} />
        </div>

        {/* Employee Table */}
        <EmployeeTable employees={employees} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}
