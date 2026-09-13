import { localizedMetadata } from '@/lib/seo';

const AUTH_COPY = {
  cs: {
    login: ['Přihlášení', 'Přihlaste se ke svému účtu Kariv Glamour.'],
    register: ['Vytvořit účet', 'Vytvořte si účet Kariv Glamour.'],
    forgotPassword: ['Obnovit heslo', 'Požádejte o bezpečný odkaz pro obnovení hesla.'],
    resetPassword: ['Nové heslo', 'Nastavte nové heslo ke svému účtu Kariv Glamour.'],
  },
  de: {
    login: ['Anmelden', 'Melden Sie sich bei Ihrem Kariv-Glamour-Konto an.'],
    register: ['Konto erstellen', 'Erstellen Sie Ihr Kariv-Glamour-Konto.'],
    forgotPassword: ['Passwort zurücksetzen', 'Fordern Sie einen sicheren Link zum Zurücksetzen Ihres Passworts an.'],
    resetPassword: ['Neues Passwort', 'Legen Sie ein neues Passwort für Ihr Kariv-Glamour-Konto fest.'],
  },
  en: {
    login: ['Sign in', 'Sign in to your Kariv Glamour account.'],
    register: ['Create account', 'Create your Kariv Glamour account.'],
    forgotPassword: ['Reset password', 'Request a secure password-reset link.'],
    resetPassword: ['New password', 'Set a new password for your Kariv Glamour account.'],
  },
};

export function authPageMetadata(locale, pageKey, path) {
  const [title, description] = (AUTH_COPY[locale] || AUTH_COPY.de)[pageKey];
  return localizedMetadata({ locale, path, title, description, index: false });
}
