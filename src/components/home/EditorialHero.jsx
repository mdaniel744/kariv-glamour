import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';

const EDITORIAL_IMAGE = '/media/kariv-principle.webp';

export default function EditorialHero() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 border border-border overflow-hidden">
          
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <MediaImage
              src={EDITORIAL_IMAGE}
              alt={t('components.editorialHero.alt')}
              fill
              sizes="(max-width: 767px) calc(100vw - 3rem), 50vw"
              quality={84}
              className="object-cover" />
            
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center p-10 md:p-16 bg-secondary">
            <span className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t('components.editorialHero.eyebrow')}</span>
            <h2 className="mb-6 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground md:text-4xl">
              {t('components.editorialHero.title')}
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('components.editorialHero.description')}
            </p>
            <LocalizedLink to="/authentication"
            className="group inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:text-primary">
              
              {t('components.editorialHero.cta')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
