import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/lib/languageContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { signIn, isLoaded } = useSignIn();
  const { localePath } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signIn.create({ strategy: "reset_password_email_code", identifier: email });
    } catch {
      // Always show success regardless, matching the previous behavior
      // (don't reveal whether an account exists for this email)
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      icon={Mail}
      title="Reset password"
      subtitle="We'll send you a link to reset it"
      footer={
        <LocalizedLink to="/login" className="text-primary font-medium hover:underline">
          <ArrowLeft className="w-3 h-3 inline mr-1" />Back to log in
        </LocalizedLink>
      }
    >
      {sent ? (
        <div className="text-center space-y-4">
          <p className="text-sm text-foreground">
            If an account exists with that email, you'll receive a code shortly.
          </p>
          <LocalizedLink
            to={`/reset-password?email=${encodeURIComponent(email)}`}
            className="inline-block bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase px-6 py-3"
          >
            Enter code
          </LocalizedLink>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
