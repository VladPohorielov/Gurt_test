import data from "../data/about.json";

const Section = ({children}) => <section className="container mx-auto px-5 py-12 md:py-16">{children}</section>;
const H2 = ({children, sub}) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-semibold text-white">{children}</h2>
    {sub && <p className="mt-3 text-white/70 max-w-2xl">{sub}</p>}
  </div>
);

export default function About(){
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <main className="space-y-14 md:space-y-20">
        {/* Intro + values */}
        <Section>
          <H2 sub="GURT — студія любові та квітів. Ми створюємо букети, які дарують радість і запам'ятовуються надовго.">
            Про нас
          </H2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {t:"Місія", d:"Робити кожен момент особливим. Квіти — мова любові без перекладу."},
              {t:"Матеріали", d:"Лише свіжі квіти від перевірених постачальників, уважність до деталей."},
              {t:"Команда", d:"Досвідчені флористи й сервіс-менеджери перетворюють ідеї на шедеври."}
            ].map((v,i)=>(
              <article key={i} className="glass p-5 rounded-2xl">
                <h3 className="text-lg font-semibold text-brand-yellow">{v.t}</h3>
                <p className="mt-2 text-white/80">{v.d}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Metrics */}
        <Section>
          <div className="glass rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {data.metrics.map(m=>(
              <div key={m.label}>
                <div className="text-3xl md:text-4xl font-semibold text-brand-yellow drop-shadow-glow">{m.k}</div>
                <div className="mt-1 text-white/70">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Timeline */}
        <Section>
          <H2>Історія</H2>
          <ol className="relative border-s border-white/10 pl-6">
            {data.timeline.map((n,i)=>(
              <li key={i} className="mb-8 ps-4">
                <span className="absolute -start-2 mt-1 h-3 w-3 rounded-full bg-brand-yellow"></span>
                <div className="text-white/60 text-sm">{n.y}</div>
                <div className="text-white font-medium">{n.t}</div>
                <p className="text-white/80">{n.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Team */}
        <Section>
          <H2>Команда</H2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {data.team.map(p=>(
              <article key={p.name} className="glass p-4 rounded-2xl">
                <img src={`${import.meta.env.BASE_URL}${p.img.replace(/^\//, '')}`} alt={p.name} width="480" height="480"
                     className="h-56 w-full object-cover rounded-xl" loading="lazy"/>
                <div className="mt-3">
                  <div className="text-white font-medium">{p.name}</div>
                  <div className="text-white/70 text-sm">{p.role}</div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section>
          <H2>Як ми працюємо</H2>
          <div className="grid gap-4 md:grid-cols-5">
            {["Бриф","Ескіз","Збірка","Фото/узгодження","Доставка"].map((s,i)=>(
              <div key={s} className="glass p-4 rounded-2xl text-center">
                <div className="text-2xl font-semibold text-brand-yellow">{i+1}</div>
                <div className="mt-1 text-white">{s}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section>
          <H2>Відгуки</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {data.testimonials.map((t,i)=>(
              <blockquote key={i} className="glass p-5 rounded-2xl">
                <p className="text-white/90">"{t.text}"</p>
                <footer className="mt-2 text-white/60">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </Section>

        {/* Gallery */}
        <Section>
          <H2>Живі роботи</H2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
            {data.gallery.map((src,i)=>(
              <img key={i} src={`${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`} alt={`Букет ${i+1}`} width="800" height="600"
                   className="rounded-xl object-cover h-40 md:h-56" loading="lazy"/>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">Готові замовити?</h3>
            <p className="mt-2 text-white/70">Напишіть нам і ми підберемо букет під подію та бюджет.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
              <a href="tel:+380637027770"
                 className="inline-block bg-brand-yellow text-brand-black rounded-2xl px-6 py-3 font-medium hover:opacity-90 transition-opacity">
                📞 Подзвонити
              </a>
              <a href="https://t.me/gurt_flowers"
                 className="inline-block border-2 border-brand-yellow text-brand-yellow rounded-2xl px-6 py-3 font-medium hover:bg-brand-yellow hover:text-brand-black transition-colors">
                💬 Telegram
              </a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
