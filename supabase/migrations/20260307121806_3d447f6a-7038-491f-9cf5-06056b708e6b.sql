
-- Create attendance_records table to store daily attendance
CREATE TABLE public.attendance_records (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'עובד בבית',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, attendance_date)
);

-- Enable RLS
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Allow all access (no auth required for this app)
CREATE POLICY "Allow all read" ON public.attendance_records FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON public.attendance_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.attendance_records FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON public.attendance_records FOR DELETE USING (true);

-- Create index for fast lookups by date
CREATE INDEX idx_attendance_date ON public.attendance_records(attendance_date);
