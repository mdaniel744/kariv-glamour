import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import LocalizedLink from '@/components/LocalizedLink';
import { ShieldCheck, Lock } from 'lucide-react';

export default function BuyNowAuthModal({ open, onClose, continueTo }) {
  const returnUrl = continueTo ? `?returnTo=${encodeURIComponent(continueTo)}` : '';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock size={20} className="text-primary" />
          </div>
          <DialogTitle className="text-center font-display text-xl text-foreground">
            Create Your Account to Continue
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
            To place your order securely through our escrow service, please register or log in to your Kariv Glamour account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <LocalizedLink
            to={`/register${returnUrl}`}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors"
          >
            Register Now
          </LocalizedLink>
          <LocalizedLink
            to={`/login${returnUrl}`}
            className="w-full flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.15em] uppercase font-medium py-4 text-foreground hover:border-primary transition-colors"
          >
            I Already Have an Account
          </LocalizedLink>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-muted-foreground">
          <ShieldCheck size={12} className="text-primary" />
          <span>Protected by Kariv Buyer Protection &amp; Escrow</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
