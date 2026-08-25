import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';

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
        <MediaImage src={TEXTURE_BG} alt="" fill sizes="100vw" quality={70} className="object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading index="06" title={t('components.editorialSection.title')} subtitle={t('components.editorialSection.subtitle')} linkTo="/guides" />
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <LocalizedLink key={i} to="/guides" className="group block">
              <div className="border border-border p-8 hover:border-primary/30 transition-colors h-full flex flex-col">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t(guide.tagKey)}</span>
                <h3 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {t(guide.titleKey)}
                </h3>
                <p className="mb-6 flex-1 text-base leading-relaxed text-muted-foreground">{t(guide.excerptKey)}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
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
