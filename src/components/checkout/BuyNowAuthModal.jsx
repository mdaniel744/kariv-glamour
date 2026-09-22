import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import LocalizedLink from '@/components/LocalizedLink';
import { ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';

const COPY = {
  en: {
    title: 'Create Your Account to Continue',
    directDescription: 'Please register or sign in to your Kariv Glamour account before continuing to checkout.',
    protectedDescription: 'Please register or sign in to continue with Kariv Protected Payment.',
    register: 'Register Now',
    login: 'I Already Have an Account',
    directNote: 'An account is required to place and manage your order',
    protectedNote: 'Kariv Protected Payment selected',
  },
  de: {
    title: 'Erstellen Sie Ihr Konto, um fortzufahren',
    directDescription: 'Registrieren Sie sich oder melden Sie sich bei Ihrem Kariv Glamour Konto an, bevor Sie zur Kasse gehen.',
    protectedDescription: 'Registrieren Sie sich oder melden Sie sich an, um mit der geschützten Zahlung von Kariv fortzufahren.',
    register: 'Jetzt registrieren',
    login: 'Ich habe bereits ein Konto',
    directNote: 'Ein Konto ist erforderlich, um Ihre Bestellung aufzugeben und zu verwalten',
    protectedNote: 'Geschützte Zahlung von Kariv ausgewählt',
  },
  cs: {
    title: 'Pokračujte vytvořením účtu',
    directDescription: 'Před pokračováním k pokladně se zaregistrujte nebo přihlaste ke svému účtu Kariv Glamour.',
    protectedDescription: 'Pro pokračování s chráněnou platbou Kariv se zaregistrujte nebo přihlaste.',
    register: 'Zaregistrovat se',
    login: 'Již mám účet',
    directNote: 'Pro vytvoření a správu objednávky je vyžadován účet',
    protectedNote: 'Vybrána chráněná platba Kariv',
  },
};

export default function BuyNowAuthModal({ open, onClose, continueTo, protectedPurchase = false }) {
  const { locale } = useLanguage();
  const copy = COPY[locale] || COPY.en;
  const returnUrl = continueTo ? `?returnTo=${encodeURIComponent(continueTo)}` : '';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock size={20} className="text-primary" />
          </div>
          <DialogTitle className="text-center font-display text-xl text-foreground">
            {copy.title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
            {protectedPurchase ? copy.protectedDescription : copy.directDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <LocalizedLink
            to={`/register${returnUrl}`}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors"
          >
            {copy.register}
          </LocalizedLink>
          <LocalizedLink
            to={`/login${returnUrl}`}
            className="w-full flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.15em] uppercase font-medium py-4 text-foreground hover:border-primary transition-colors"
          >
            {copy.login}
          </LocalizedLink>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-muted-foreground">
          <ShieldCheck size={12} className="text-primary" />
          <span>{protectedPurchase ? copy.protectedNote : copy.directNote}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
