import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SectionHeading({ index, title, subtitle, linkTo, linkLabel }) {
  const { t } = useTranslation();
  const label = linkLabel || t('components.sectionHeading.viewAll');

  return (
    <div className="flex items-end justify-between mb-10 md:mb-14">
      <div>
        

        
        <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] text-primary md:text-4xl">{title}</h2>
        {subtitle &&
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{subtitle}</p>
        }
      </div>
      {linkTo &&
      <LocalizedLink to={linkTo} className="group hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-foreground md:flex">
          {label}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </LocalizedLink>
      }
    </div>
  );
}
