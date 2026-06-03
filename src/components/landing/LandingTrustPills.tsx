import { Clock, Shield, Smartphone } from "lucide-react";

const items = [
  { icon: Shield, label: "DSGVO-konform" },
  { icon: Smartphone, label: "Kein Login nötig" },
  { icon: Clock, label: "In unter 2 Min." },
];

export function LandingTrustPills() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-surface/80 px-3.5 py-2 text-sm text-ink-muted shadow-sm"
        >
          <Icon className="h-4 w-4 shrink-0 text-sage" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}
