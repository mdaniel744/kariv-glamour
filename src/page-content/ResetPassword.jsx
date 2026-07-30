import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { getSafeReturnUrl } from "@/lib/authRedirect";
import { useLanguage } from "@/lib/languageContext";
import { useUrlSearchParams } from "@/hooks/useUrlSearchParams";
import LocalizedLink from "@/components/LocalizedLink";

export default function ResetPassword() {
  const [searchParams] = useUrlSearchParams();
  const { localePath } = useLanguage();
  const emailFromLink = searchParams.get("email") || "";
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState(emailFromLink);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });
      if (result.status !== "complete") {
        setError("Verification incomplete — please check the code and try again.");
        return;
      }
      await setActive({ session: result.createdSessionId });
      const returnTo = getSafeReturnUrl(searchParams.get('returnTo'));
      window.location.href = /^\/(de|en|admin)(\/|$)/.test(returnTo) ? returnTo : localePath(returnTo);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout
        icon={AlertTriangle}
        title="Missing email"
        subtitle="Request a reset code first"
        footer={
          <LocalizedLink to="/forgot-password" className="text-primary font-medium hover:underline">
            Request a new code
          </LocalizedLink>
        }
      >
        <p className="text-sm text-foreground text-center">
          Please request a password reset code first.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={Lock}
      title="New password"
      subtitle={`Enter the code sent to ${email} and your new password`}
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Reset code</Label>
          <div className="relative">
            <Input
              id="code"
              type="text"
              autoComplete="one-time-code"
              autoFocus
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              autoFocus
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
