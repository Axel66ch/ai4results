import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-brand-blue text-primary-foreground">
    <div className="container-main section-padding">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-1 text-xl font-bold font-heading mb-3">
            ai4results<span className="inline-block w-2 h-2 rounded-full bg-brand-orange" />
          </Link>
          <p className="text-primary-foreground/60 text-sm">KI, die Klarheit schafft.</p>
        </div>
        <div>
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            4results AG<br />
            Etzelstr. 82<br />
            8808 Pfäffikon SZ
          </p>
          <p className="mt-3 text-sm text-primary-foreground/80">
            <a href="tel:+41445057078" className="hover:text-brand-orange transition-colors">+41 44 505 70 78</a>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href="https://www.marketingautomation.tech/impressum/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-brand-orange transition-colors">Impressum</a>
          <a href="https://www.marketingautomation.tech/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-brand-orange transition-colors">Datenschutz</a>
        </div>
      </div>
      <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
        © 2026 4results AG, Pfäffikon SZ
      </div>
    </div>
  </footer>
);

export default Footer;
