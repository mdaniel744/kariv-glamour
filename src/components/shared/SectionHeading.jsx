import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ index, title, subtitle, linkTo, linkLabel = "Alle ansehen" }) {
  return (
    <div className="flex items-end justify-between mb-10 md:mb-14">
      <div>
        

        
        <h2 className="text-3xl md:text-4xl text-foreground tracking-tight [font-family:'Cormorant_Garamond',_serif] font-bold">{title}</h2>
        {subtitle &&
        <p className="text-sm text-muted-foreground mt-2 max-w-lg">{subtitle}</p>
        }
      </div>
      {linkTo &&
      <Link to={linkTo} className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors group">
          {linkLabel}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      }
    </div>);

}