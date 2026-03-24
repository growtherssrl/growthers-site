const clients = [
  "Museum of Dreamers",
  "IMPACT2030",
  "SHR Italia",
  "Laborability",
  "School of Disruption",
  "Rizoma",
  "Auto One",
  "Tech4You",
  "Morfeo",
  "Silagum",
  "Essia Skincare",
  "YManage",
];

export default function Clients() {
  return (
    <div className="py-16 overflow-hidden relative">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex gap-16 animate-marquee">
          {clients.map((name) => (
            <span
              key={name}
              className="text-[13px] font-medium text-[var(--text-faint)] uppercase tracking-[0.12em] flex-shrink-0 whitespace-nowrap hover:text-[var(--text-dim)] transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
          {clients.map((name) => (
            <span
              key={`dup-${name}`}
              className="text-[13px] font-medium text-[var(--text-faint)] uppercase tracking-[0.12em] flex-shrink-0 whitespace-nowrap hover:text-[var(--text-dim)] transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
