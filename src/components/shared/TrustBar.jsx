import React from 'react';
import { ShieldCheck, Lock, Truck, Award } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, title: "Authenticated", desc: "Every watch inspected by our horological experts" },
  { icon: Lock, title: "Secure Payment", desc: "Encrypted transactions with buyer protection" },
  { icon: Truck, title: "Insured Shipping", desc: "Fully insured worldwide delivery" },
  { icon: Award, title: "Condition Grading", desc: "Transparent and detailed condition reports" }
];

export default function TrustBar({ variant = "dark" }) {
  const bg = variant === "light" ? "bg-[#F4F1EE]" : "bg-[#0F0F10]";
  const textColor = variant === "light" ? "text-[#1A1A1A]" : "text-[#E5E5E5]";
  const subColor = variant === "light" ? "text-[#666]" : "text-[#8E8E93]";
  const iconColor = variant === "light" ? "text-[#8B7340]" : "text-[#C5A367]";

  return (
    <div className={`${bg} py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item, i) => (
            <div key={i} className="text-center">
              <item.icon size={28} className={`${iconColor} mx-auto mb-4`} strokeWidth={1.5} />
              <h3 className={`text-[11px] tracking-[0.15em] uppercase font-medium ${textColor} mb-2`}>{item.title}</h3>
              <p className={`text-xs ${subColor} leading-relaxed max-w-[200px] mx-auto`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}