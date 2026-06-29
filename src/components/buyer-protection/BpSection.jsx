import React from 'react';

export default function BpSection({ id, icon: Icon, title, children, className = "" }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          {Icon &&
          <span className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card flex-shrink-0">
              <Icon size={22} className="text-primary" strokeWidth={1.5} />
            </span>
          }
          <h2 className="text-3xl md:text-4xl text-foreground tracking-tight [font-family:'Cormorant_Garamond',_serif] font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </section>);

}