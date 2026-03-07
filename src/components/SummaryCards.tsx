import { Users, UserCheck } from "lucide-react";

interface Props {
  total: number;
  present: number;
  activeCard?: string | null;
  onCardClick?: (card: string) => void;
}

export default function SummaryCards({ total, present, activeCard, onCardClick }: Props) {
  const cards = [
    { key: "total", label: "עובדים בחטיבה", value: total, icon: Users, color: "bg-primary/10 text-primary" },
    { key: "present", label: "נוכחים", value: present, icon: UserCheck, color: "bg-green-500/10 text-green-600" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          onClick={() => onCardClick?.(card.key)}
          className={`bg-card rounded-xl border border-border p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${
            activeCard === card.key ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold text-card-foreground">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
