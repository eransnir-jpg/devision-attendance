import { useState, useMemo, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { FileDown, Users, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendancePieChart from "@/components/AttendancePieChart";
import SummaryCards from "@/components/SummaryCards";
import EmployeeTable from "@/components/EmployeeTable";
import { getInitialEmployees, STATUS_COLORS, CHAR_COLORS, DEFAULT_STATUS, Employee } from "@/data/employees";
import { exportToExcel } from "@/lib/exportExcel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

type FilterType = { kind: "status"; value: string } | { kind: "char"; value: string } | { kind: "card"; value: string } | null;

export default function Index() {
  const [employees, setEmployees] = useState<Employee[]>(getInitialEmployees);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const today = format(new Date(), "EEEE, d בMMMM yyyy", { locale: he });
  const todayFile = format(new Date(), "yyyy-MM-dd");
  const todayDate = format(new Date(), "yyyy-MM-dd");

  // Load saved attendance from DB on mount
  useEffect(() => {
    async function loadAttendance() {
      const { data, error } = await supabase
        .from("attendance_records")
        .select("employee_id, status")
        .eq("attendance_date", todayDate);

      if (error) {
        console.error("Error loading attendance:", error);
        return;
      }

      if (data && data.length > 0) {
        const statusMap = new Map(data.map((r) => [r.employee_id, r.status]));
        setEmployees((prev) =>
          prev.map((e) => ({
            ...e,
            attendanceStatus: statusMap.get(e.id) || e.attendanceStatus,
          }))
        );
      }
    }
    loadAttendance();
  }, [todayDate]);

  const statusData = useMemo(() => countBy(employees, "attendanceStatus", STATUS_COLORS), [employees]);
  const charData = useMemo(() => countBy(employees, "characteristic", CHAR_COLORS), [employees]);

  const presentCount = useMemo(
    () => employees.filter((e) => e.attendanceStatus === "מגיע לעבודה").length,
    [employees]
  );

  const handleStatusChange = (id: number, status: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, attendanceStatus: status } : e))
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const records = employees.map((e) => ({
        employee_id: e.id,
        attendance_date: todayDate,
        status: e.attendanceStatus,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("attendance_records")
        .upsert(records, { onConflict: "employee_id,attendance_date" });

      if (error) throw error;

      setHasChanges(false);
      toast.success("הנתונים נשמרו בהצלחה!");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("שגיאה בשמירה, נסה שוב");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setEmployees((prev) =>
      prev.map((e) => ({ ...e, attendanceStatus: DEFAULT_STATUS }))
    );
    setHasChanges(true);
    toast.info("הנתונים אופסו לברירת מחדל. לחץ 'שמור' לעדכון.");
  };

  const toggleFilter = useCallback((kind: FilterType["kind"], value: string) => {
    setActiveFilter((prev) =>
      prev && prev.kind === kind && prev.value === value ? null : { kind, value } as FilterType
    );
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!activeFilter) return employees;
    switch (activeFilter.kind) {
      case "status":
        return employees.filter((e) => e.attendanceStatus === activeFilter.value);
      case "char":
        return employees.filter((e) => e.characteristic === activeFilter.value);
      case "card":
        if (activeFilter.value === "present") return employees.filter((e) => e.attendanceStatus === "מגיע לעבודה");
        return employees;
      default:
        return employees;
    }
  }, [employees, activeFilter]);

  return (
    <div className="min-h-screen bg-background font-heebo" dir="rtl">
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
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              איפוס
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "שומר..." : "שמור"}
            </Button>
            <Button variant="outline" onClick={() => exportToExcel(employees, todayFile)} className="gap-2">
              <FileDown className="w-4 h-4" />
              ייצוא לאקסל
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6">
          <AttendancePieChart
            title="סטטוס נוכחות"
            data={statusData}
            activeSlice={activeFilter?.kind === "status" ? activeFilter.value : null}
            onSliceClick={(name) => toggleFilter("status", name)}
          />
          <AttendancePieChart
            title="מאפיין עובד"
            data={charData}
            activeSlice={activeFilter?.kind === "char" ? activeFilter.value : null}
            onSliceClick={(name) => toggleFilter("char", name)}
          />
          <SummaryCards
            total={employees.length}
            present={presentCount}
            activeCard={activeFilter?.kind === "card" ? activeFilter.value : null}
            onCardClick={(card) => toggleFilter("card", card)}
          />
        </div>

        {activeFilter && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              מסנן: {activeFilter.kind === "card" ? (activeFilter.value === "present" ? "נוכחים" : "כל העובדים") : activeFilter.value}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setActiveFilter(null)}>
              ✕ נקה סינון
            </Button>
          </div>
        )}

        <EmployeeTable employees={filteredEmployees} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}
