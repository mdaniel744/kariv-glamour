import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Eye, Award, Users, Globe, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import TrustBar from '@/components/shared/TrustBar';
import { BRAND_DISCLAIMER } from '@/lib/constants';
import { motion } from 'framer-motion';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

const values = [
  { icon: ShieldCheck, title: "Authentizität zuerst", desc: "Jeder Zeitmesser durchläuft eine strenge Authentifizierung durch unser Team zertifizierter horologischer Experten, bevor er in unsere Kollektion aufgenommen wird." },
  { icon: Eye, title: "Transparenz", desc: "Detaillierte Zustandsbewertung, umfassende Fotografie und ehrliche Beschreibungen sorgen dafür, dass Sie genau wissen, was Sie erwerben." },
  { icon: Award, title: "Exzellenz", desc: "Wir kuratieren nur die besten Exemplare jeder Referenz und halten die höchsten Standards für Qualität und Provenienz aufrecht." },
  { icon: Users, title: "Kundenfokus", desc: "Unser engagiertes Team von Uhrenspezialisten bietet persönliche Beratung während Ihres gesamten Erwerbsprozesses." },
  { icon: Globe, title: "Globale Reichweite", desc: "Weltweit versicherter Versand mit White-Glove-Service, damit Ihr Zeitmesser sicher ankommt, wo auch immer Sie sind." },
  { icon: Heart, title: "Leidenschaft", desc: "Von Sammlern für Sammler gegründet, treibt unsere Leidenschaft für feine Uhrmacherei jede Entscheidung, die wir treffen." }
];

export default function About() {
  const { t } = useTranslation();
  return (
    <div>
      <SEO title={t('common:seo.about.title')} description={t('common:seo.about.description')} />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Start</Link>
          <ChevronRight size={10} />
          <span className="text-foreground">Über uns</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block"
          >
            Über uns
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-8"
          >
            Ein Ziel für<br />
            <span className="text-primary italic">anspruchsvolle Sammler</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Kariv Glamour ist eine unabhängige Luxusuhren-E-Commerce-Plattform, die Sammler mit authentifizierten Zeitmessern der ikonischsten Manufakturen der Welt verbindet. Wir glauben, dass der Erwerb einer Luxusuhr genauso außergewöhnlich sein sollte wie der Zeitmesser selbst.
          </motion.p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">Unsere Geschichte</span>
            <h2 className="font-display text-3xl text-foreground font-light mb-6">Von Sammlern gegründet,<br />für Sammler</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Kariv Glamour entstand aus einer einfachen Beobachtung: Der Erwerb einer authentifizierten Luxusuhr sollte unkompliziert, transparent und angenehm sein. Zu oft stehen Sammler vor Unsicherheit bezüglich Authentizität, intransparenter Preisgestaltung und unpersönlichem Service.
              </p>
              <p>
                Unsere Plattform vereint die feinsten neuen, gebrauchten, vintage und Sammler-Uhren, jede inspiziert und authentifiziert von unserem Team horologischer Experten. Von der ersten Omega Speedmaster bis zu einer seltenen Patek Philippe Grand Complication kuratieren wir Uhren, die Geschichten erzählen.
              </p>
              <p>
                Mit Sitz in Deutschland und Sammlern weltweit dienend, verbindet Kariv Glamour digitale Exzellenz mit der persönlichen Aufmerksamkeit einer traditionellen Uhren-Boutique.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-card">
            <img
              src="https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png"
              alt="Luxusuhren Handwerkskunst"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">Unsere Prinzipien</span>
            <h2 className="font-display text-3xl text-foreground font-light">Was uns leitet</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border p-8"
              >
                <val.icon size={24} className="text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm text-foreground font-medium mb-3">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ShieldCheck size={24} className="text-primary mx-auto mb-4" />
          <h3 className="text-[11px] tracking-[0.15em] uppercase text-foreground font-medium mb-4">Marken-Haftungsausschluss</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{BRAND_DISCLAIMER}</p>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}