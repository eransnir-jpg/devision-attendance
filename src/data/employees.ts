export interface Employee {
  id: number;
  name: string;
  department: string;
  characteristic: string;
  attendanceStatus: string;
}

export const ATTENDANCE_STATUSES = [
  "מגיע לעבודה",
  "עובד בבית",
  "מחלה",
  "חופש בארץ",
  "חופש בחו\"ל",
  "מילואים",
  "חל\"ד/חל\"ת",
  "אחר",
] as const;

export const CHARACTERISTICS = [
  "מנהלי אגפים",
  "מנהלות אגפים - ילדים מתחת 14",
  "בני/בנות זוג מגוייסים",
  "אמהות חד הוריות",
  "קיבוצי - ילדים מתחת לגיל 14",
  "פנייה אישית",
  "הסכם קיבוצי ללא מגבלה",
  "מילואים",
  "אחר/חל\"ד-חל\"ת",
] as const;

const employeesRaw: { name: string; department: string; characteristic: string }[] = [
  { name: "חגית חזן", department: "אגף התקשרויות ומכרזים", characteristic: "אמהות חד הוריות" },
  { name: "סטלה פקר", department: "אגף התקשרויות ומכרזים", characteristic: "מנהלות אגפים - ילדים מתחת 14" },
  { name: "קרין בן ממן", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "רבקה אבני", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "שרון קירמאיר", department: "אגף התקשרויות ומכרזים", characteristic: "בני/בנות זוג מגוייסים" },
  { name: "עינב אברבנאל", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "ענת סלע", department: "אגף התקשרויות ומכרזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "ענת הנדל לב", department: "אגף התקשרויות ומכרזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "נעה שלזינגר", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "חגית שמאי", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "מיטל ג'רבי", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "טל ברגר טל", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "שירן צדוק-סלבקין", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "רינת אמזלג", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "עומרי בנימין", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "שרה חגבי רוז'בסקי", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "מעין מרים בינמן", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "מאיה בן דור", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "דקלה ספיר", department: "אגף התקשרויות ומכרזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "עומר קלפון קורן", department: "אגף התקשרויות ומכרזים", characteristic: "אחר/חל\"ד-חל\"ת" },
  { name: "לירון שניאור שהר", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אסף קליין", department: "אגף התקשרויות ומכרזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "סיון גיל ניצן", department: "אגף התקשרויות ומכרזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "רונן אנגלנדר", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "מירב עינב", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "שושנה אמסלם", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "אודליה לוי", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "אריאל רוזנברג", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אריאלה שריד", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "תמרה קריכלי", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "הדס אשכנזי", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "בת-חן אור כהן", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "אמיר כהנא", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "אורן נוטי", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "שלומית גולדנברג", department: "אגף חוזים", characteristic: "מנהלי אגפים" },
  { name: "אלרן פאבל אפרצב", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "קרן דביר", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "רחלי לוי", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "סמיון צירלוב", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "עדי יונית אדמוני", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אלדד לויה", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "קורל תהל בלום", department: "אגף חוזים", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "ליאת לאה כהן רוטמן", department: "אגף חוזים", characteristic: "אמהות חד הוריות" },
  { name: "מורן פינקלשטיין", department: "אגף חוזים", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "דורית פרי", department: "יחידת תכנון", characteristic: "אחר/חל\"ד-חל\"ת" },
  { name: "אדם אשורוב", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אולגה ישראלוב", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אבי איסקוב", department: "יחידת תכנון", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "שרון משה", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "נעמה מגיד מרלנדר", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "ליאנה גדייב", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "אבישי שכטר", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "נטלי ארצי", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "מיכאל חיים צלח", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "איליה פרנקין", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "נטליה קוגל", department: "יחידת תכנון", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "מורן אלמה", department: "יחידת תכנון", characteristic: "קיבוצי - ילדים מתחת לגיל 14" },
  { name: "מיה קדם רוזן", department: "מטה חטיבת חוזים והתקשרויות", characteristic: "מנהלי אגפים" },
  { name: "ליזי אוריה לוי טל", department: "מטה חטיבת חוזים והתקשרויות", characteristic: "מנהלות אגפים - ילדים מתחת 14" },
  { name: "שרון רוחאם", department: "מטה חטיבת חוזים והתקשרויות", characteristic: "הסכם קיבוצי ללא מגבלה" },
  { name: "ערן שניר", department: "מטה חטיבת חוזים והתקשרויות", characteristic: "הסכם קיבוצי ללא מגבלה" },
];

export const DEFAULT_STATUS = "עובד בבית";

export function getInitialEmployees(): Employee[] {
  return employeesRaw.map((e, i) => ({
    id: i + 1,
    name: e.name,
    department: e.department,
    characteristic: e.characteristic,
    attendanceStatus: DEFAULT_STATUS,
  }));
}

export const STATUS_COLORS: Record<string, string> = {
  "מגיע לעבודה": "hsl(160, 60%, 45%)",
  "עובד בבית": "hsl(217, 91%, 50%)",
  "מחלה": "hsl(0, 72%, 51%)",
  "חופש בארץ": "hsl(39, 95%, 55%)",
  "חופש בחו\"ל": "hsl(280, 60%, 55%)",
  "מילואים": "hsl(150, 40%, 35%)",
  "חל\"ד/חל\"ת": "hsl(220, 10%, 60%)",
  "אחר": "hsl(220, 10%, 75%)",
};

export const CHAR_COLORS: Record<string, string> = {
  "מנהלי אגפים": "hsl(217, 91%, 50%)",
  "מנהלות אגפים - ילדים מתחת 14": "hsl(280, 60%, 55%)",
  "בני/בנות זוג מגוייסים": "hsl(0, 72%, 51%)",
  "אמהות חד הוריות": "hsl(39, 95%, 55%)",
  "קיבוצי - ילדים מתחת לגיל 14": "hsl(160, 60%, 45%)",
  "פנייה אישית": "hsl(320, 60%, 50%)",
  "הסכם קיבוצי ללא מגבלה": "hsl(200, 70%, 50%)",
  "מילואים": "hsl(150, 40%, 35%)",
  "אחר/חל\"ד-חל\"ת": "hsl(220, 10%, 60%)",
};
