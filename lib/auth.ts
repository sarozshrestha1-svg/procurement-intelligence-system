export function normalizeNepaliPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const withoutCountry = digits.startsWith("977") ? digits.slice(3) : digits;

  if (!/^9[6-8]\d{8}$/.test(withoutCountry)) {
    throw new Error("Enter a valid Nepali mobile number, for example 98XXXXXXXX.");
  }

  return `977${withoutCountry}`;
}

export function phoneToAuthEmail(value: string) {
  const phone = normalizeNepaliPhone(value);
  return `${phone}@users.bidpatra.local`;
}

export function displayNepaliPhone(value: string) {
  const phone = normalizeNepaliPhone(value);
  return `+${phone.slice(0, 3)} ${phone.slice(3)}`;
}
