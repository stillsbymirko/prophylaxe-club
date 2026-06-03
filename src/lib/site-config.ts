export const siteConfig = {
  name: "Prophylaxe-Erinnerung",
  url: "https://prophylaxeerinnerung.de",
  operator: {
    name: "Mirko Meister",
    street: "Emdener Straße 29",
    zip: "10551",
    city: "Berlin",
    country: "Deutschland",
    email: "kontakt@prophylaxeerinnerung.de",
  },
} as const;

export function operatorAddressLines(): string[] {
  const { name, street, zip, city, country } = siteConfig.operator;
  return [name, street, `${zip} ${city}`, country];
}
