import { useState, useEffect } from "react";

const MobileStickyBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const quizSection = document.getElementById("ki-quiz");
      if (quizSection) {
        const rect = quizSection.getBoundingClientRect();
        // Hide once user has scrolled past the quiz section
        setVisible(rect.bottom > 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-blue/95 backdrop-blur-sm p-3 border-t border-primary-foreground/10">
      <a
        href="#ki-quiz"
        className="block w-full rounded-lg bg-brand-orange py-3 text-center text-sm font-semibold text-primary-foreground"
      >
        KI-Potenzial prüfen →
      </a>
    </div>
  );
};

export default MobileStickyBar;
