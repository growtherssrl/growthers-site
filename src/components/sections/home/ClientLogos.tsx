const clients = [
  "Museum of Dreamers",
  "IMPACT2030",
  "SHR Italia",
  "Laborability",
  "School of Disruption",
  "Essia Skincare",
  "Morfeo",
  "YManage",
  "Silagum",
  "Rizoma",
  "Auto One",
  "Tech4You",
];

export default function ClientLogos() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Title */}
        <p className="text-xs uppercase tracking-[0.3em] text-center text-[var(--text-muted)] mb-16">
          TRUSTED BY
        </p>

        {/* Marquee container */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="flex gap-12 animate-marquee">
            {/* First set */}
            {clients.map((name) => (
              <div
                key={name}
                className="glass-card rounded-xl px-8 py-5 flex-shrink-0 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 cursor-default"
              >
                {name}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((name) => (
              <div
                key={`dup-${name}`}
                className="glass-card rounded-xl px-8 py-5 flex-shrink-0 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
