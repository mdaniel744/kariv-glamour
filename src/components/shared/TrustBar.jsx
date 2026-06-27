import React from 'react';
import { ShieldCheck, Lock, Truck, Award } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, title: "Authentifiziert", desc: "Jede Uhr von unseren Experten geprüft" },
  { icon: Lock, title: "Sichere Zahlung", desc: "Verschlüsselte Transaktionen mit Käuferschutz" },
  { icon: Truck, title: "Versicherter Versand", desc: "Weltweit versicherte Lieferung" },
  { icon: Award, title: "Zustandsbewertung", desc: "Transparente und detaillierte Zustandsberichte" }
];

export default function TrustBar() {
  return (
    <div className="bg-secondary py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item, i) => (
            <div key={i} className="text-center">
              <item.icon size={28} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}