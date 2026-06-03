export const siteConfig = {
  name: "prophylaxe.club",
  tagline: "Kalender-Erinnerungen für Zahnarztpraxen",
  domain: "prophylaxe.club",
  url: "https://prophylaxe.club",
  operator: {
    name: "Mirko Meister",
    street: "Emdener Straße 29",
    zip: "10551",
    city: "Berlin",
    country: "Deutschland",
    email: "kontakt@prophylaxe.club",
  },
} as const;

export function operatorAddressLines(): string[] {
  const { name, street, zip, city, country } = siteConfig.operator;
  return [name, street, `${zip} ${city}`, country];
}

export function siteUrlHint(slug = "praxis-mueller"): string {
  return `${siteConfig.domain}/${slug}`;
}
