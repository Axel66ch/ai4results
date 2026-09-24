import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

const navLinks = [
  { label: "Leistungen", to: "/leistungen" },
  { label: "Über uns", to: "/ueber" },
  { label: "Referenzen", to: "/referenzen" },
  { label: "Kontakt", to: "/kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-blue shadow-lg" : "bg-brand-blue/95"}`}>
      <div className="container-main flex items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-1 text-xl font-bold font-heading">
          <span className="text-primary-foreground">ai4results</span>
          <span className="inline-block w-2 h-2 rounded-full bg-brand-orange" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                location.pathname === link.to ? "text-brand-orange" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Gespräch buchen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-primary-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-brand-blue border-t border-primary-foreground/10 px-4 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-3 text-primary-foreground/80 hover:text-brand-orange font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-lg bg-brand-orange px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Gespräch buchen
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
