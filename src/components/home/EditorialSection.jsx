import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useTranslation } from 'react-i18next';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

export default function EditorialSection() {
  const { t } = useTranslation();

  const guides = [
    { titleKey: 'components.editorialSection.guide1.title', excerptKey: 'components.editorialSection.guide1.excerpt', tagKey: 'components.editorialSection.guide1.tag' },
    { titleKey: 'components.editorialSection.guide2.title', excerptKey: 'components.editorialSection.guide2.excerpt', tagKey: 'components.editorialSection.guide2.tag' },
    { titleKey: 'components.editorialSection.guide3.title', excerptKey: 'components.editorialSection.guide3.excerpt', tagKey: 'components.editorialSection.guide3.tag' }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 opacity-10">
        <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading index="06" title={t('components.editorialSection.title')} subtitle={t('components.editorialSection.subtitle')} linkTo="/guides" />
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <LocalizedLink key={i} to="/guides" className="group block">
              <div className="border border-border p-8 hover:border-primary/30 transition-colors h-full flex flex-col">
                <span className="text-[9px] tracking-[0.2em] uppercase text-primary mb-4">{t(guide.tagKey)}</span>
                <h3 className="font-display text-xl text-foreground font-normal mb-3 group-hover:text-primary transition-colors leading-tight">
                  {t(guide.titleKey)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-6">{t(guide.excerptKey)}</p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary">
                  {t('components.editorialSection.readMore')} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}