import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Below the hero, your beige section blocks go here */}
      <section className="bg-brand-desert py-16">
        <div className="container mx-auto">
          {/* put your 3 feature cards etc. */}
        </div>
      </section>
    </>
  );
}
