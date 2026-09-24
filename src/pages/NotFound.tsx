import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <section className="bg-brand-beige section-padding pt-32">
      <div className="container-main text-center">
        <p className="text-6xl font-bold font-heading text-brand-orange mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue mb-4">
          Diese Seite gibt es leider nicht
        </h1>
        <p className="text-muted-foreground mb-8">
          Vielleicht wurde sie verschoben. Auf der Startseite finden Sie alle Inhalte.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-4 font-semibold text-primary-foreground hover:brightness-110 transition-all"
        >
          Zur Startseite
        </Link>
      </div>
    </section>
  </Layout>
);

export default NotFound;
