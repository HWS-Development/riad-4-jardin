export default function Blog() {
    return (
      <div className="pt-24">
        <header className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="font-serif text-3xl">Blog</h1>
          <p className="opacity-80">Actualités du riad, recettes, conseils de voyage.</p>
        </header>
  
        <section className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6 pb-16">
          {[1,2,3].map((i)=>(
            <article key={i} className="rounded-xl overflow-hidden bg-white shadow">
              <div className="aspect-[4/3] bg-neutral-200" />
              <div className="p-5">
                <h3 className="font-serif text-xl">Article {i}</h3>
                <p className="text-sm opacity-70">Extrait de l’article…</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  }
  