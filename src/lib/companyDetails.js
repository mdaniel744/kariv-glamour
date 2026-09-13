export const COMPANY_DETAILS = Object.freeze({
  legalName: 'Kariv Glamour s.r.o.',
  registeredAddress: 'Sokolovská 428/130, Karlín, CZ-18600 Praha',
  companyId: '03964761',
  euid: 'CZVROR.03964761',
  vatId: 'CZ03964761',
  email: 'info@karivglamour.com',
  manager: 'Peter Vasko',
});

const COMPANY_DETAILS_COPY = Object.freeze({
  cs: {
    eyebrow: 'Právnická osoba',
    heading: 'Údaje o společnosti',
    location: 'Praha, Česká republika',
    legalName: 'Obchodní firma',
    registeredAddress: 'Sídlo společnosti',
    companyId: 'IČO',
    euid: 'EUID',
    vatId: 'DIČ',
    manager: 'Jednatel',
    email: 'E-mail',
  },
  en: {
    eyebrow: 'Legal entity',
    heading: 'Company details',
    location: 'Prague, Czech Republic',
    legalName: 'Registered company',
    registeredAddress: 'Registered office',
    companyId: 'Company ID (IČO)',
    euid: 'EUID',
    vatId: 'VAT ID',
    manager: 'Managing Director',
    email: 'Email',
  },
  de: {
    eyebrow: 'Rechtsträger',
    heading: 'Unternehmensangaben',
    location: 'Prag, Tschechische Republik',
    legalName: 'Eingetragenes Unternehmen',
    registeredAddress: 'Sitz der Gesellschaft',
    companyId: 'Unternehmens-ID (IČO)',
    euid: 'EUID',
    vatId: 'USt-IdNr.',
    manager: 'Geschäftsführer',
    email: 'E-Mail',
  },
});

export function getCompanyDetailsCopy(locale) {
  return COMPANY_DETAILS_COPY[locale] || COMPANY_DETAILS_COPY.en;
}
