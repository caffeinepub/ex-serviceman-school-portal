export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/generated/school-logo-transparent.dim_400x400.png"
                alt="School Logo"
                className="w-12 h-12 rounded-full bg-white p-0.5"
              />
              <div>
                <div className="font-display font-bold text-base leading-tight">
                  Ex-Servicemen Public
                </div>
                <div className="font-display font-bold text-base leading-tight">
                  Higher Secondary School
                </div>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-xs leading-relaxed">
              Thathri, District Doda, Jammu &amp; Kashmir
              <br />
              Recognised by Government of J&amp;K
              <br />
              Affiliated to JKBOSE
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-2">Quick Links</h4>
            <ul className="space-y-1 text-primary-foreground/70">
              <li>Parent Portal</li>
              <li>Academic Calendar</li>
              <li>Fee Structure</li>
              <li>School Timings: 9:00 AM – 3:00 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-2">School Info</h4>
            <ul className="space-y-1 text-primary-foreground/70">
              <li>📅 Est. 1999</li>
              <li>👨‍🎓 1200+ Students</li>
              <li>📚 Classes: 1st to 12th</li>
              <li>🏫 Classes: Arts, Science, Commerce</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sidebar-border mt-6 pt-4 text-center text-xs text-primary-foreground/50">
          © {year} Ex-Servicemen Public Higher Secondary School, Thathri. Built
          with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
