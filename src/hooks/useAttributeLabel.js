import { useLanguage } from '@/lib/languageContext';
import { attributeLabel } from '@/lib/attributeLabels';

export function useAttributeLabel() {
  const { locale } = useLanguage();
  return (value) => attributeLabel(value, locale);
}
