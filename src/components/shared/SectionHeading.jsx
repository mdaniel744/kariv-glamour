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
        

        
        <h2 className="text-3xl md:text-4xl tracking-tight [font-family:'Cormorant_Garamond',_serif] font-bold text-[hsl(var(--primary))]">{title}</h2>
        {subtitle &&
        <p className="text-sm text-muted-foreground mt-2 max-w-lg">{subtitle}</p>
        }
      </div>
      {linkTo &&
      <LocalizedLink to={linkTo} className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors group">
          {label}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </LocalizedLink>
      }
    </div>
  );
}