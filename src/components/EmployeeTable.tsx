import { Employee, ATTENDANCE_STATUSES } from "@/data/employees";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  employees: Employee[];
  onStatusChange: (id: number, status: string) => void;
}

export default function EmployeeTable({ employees, onStatusChange }: Props) {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const departments = [...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.includes(search);
    const matchDept = filterDept === "all" || e.department === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="p-4 border-b border-border flex flex-wrap gap-3 items-center">
        <h3 className="text-lg font-semibold text-card-foreground ml-auto">הזנת נוכחות יומית</h3>
        <Input
          placeholder="חיפוש עובד..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48"
        />
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">כל האגפים</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-[500px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">שם העובד</TableHead>
              <TableHead className="text-right">אגף</TableHead>
              <TableHead className="text-right">מאפיין</TableHead>
              <TableHead className="text-right">סטטוס נוכחות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((emp, idx) => (
              <TableRow key={emp.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{emp.department}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{emp.characteristic}</TableCell>
                <TableCell>
                  <Select
                    value={emp.attendanceStatus}
                    onValueChange={(val) => onStatusChange(emp.id, val)}
                  >
                    <SelectTrigger className="w-40 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ATTENDANCE_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
