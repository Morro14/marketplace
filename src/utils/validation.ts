export function validateEmail(email: string): boolean {
  const atCheck = /^[^@]+@[^@]+$/;
  const edgeDotCheck = /^[^\.](.*[^\.])?$/;
  const doubleDotCheck = /^(\.(?!\.)|[^\.])*$/;
  const domainDotCheck = /.+\..+/;

  function emailCheckAt(email: string) {
    const regex = atCheck;
    return regex.test(email);
  }

  function emailEdgeDotsCheck(emailPart: string) {
    const regex = edgeDotCheck;
    return regex.test(emailPart);
  }

  function emailDoubleDotCheck(emailPart: string) {
    const regex = doubleDotCheck;
    return regex.test(emailPart);
  }

  function emailDomainDotCheck(domain: string) {
    const regex = domainDotCheck;
    return regex.test(domain);
  }
  if (emailCheckAt(email)) {
    const [local, domain] = email.split("@");
    const is_valid =
      emailDoubleDotCheck(local) &&
      emailDoubleDotCheck(domain) &&
      emailEdgeDotsCheck(local) &&
      emailEdgeDotsCheck(domain) &&
      emailDomainDotCheck(domain);

    return is_valid;
  } else {
    return false;
  }
}
const isWord = (str: string) => {
  return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(str);
};

export type AddAddressFormData = {
  username: string;
  email: string;
  "phone-number": string;
  apartment: string;
  building: string;
  street: string;
  town: string;
  province: string;
  country: string;
};

function getFormString(formData: FormData, name: keyof AddAddressFormData) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

const addAddressFields = [
  "username",
  "email",
  "phone-number",
  "apartment",
  "building",
  "street",
  "town",
  "province",
  "country",
] as const satisfies readonly (keyof AddAddressFormData)[];
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

const validateRequiredField = (
  value: string,
  fieldName: string,
): ValidationResult => {
  if (!value.trim()) {
    return { valid: false, message: `${fieldName} is required` };
  }

  return { valid: true };
};

const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) return { valid: true };

  if (!/^\+?[0-9 ()-]{7,}$/.test(phone)) {
    return { valid: false, message: "Phone number is invalid" };
  }

  return { valid: true };
};

const validateApartment = (apartment: string): ValidationResult => {
  if (!apartment.trim()) return { valid: true };

  if (!/^[A-Za-z0-9 -]+$/.test(apartment)) {
    return { valid: false, message: "Apartment is invalid" };
  }

  return { valid: true };
};

const validateFullName = (str: string): ValidationResult => {
  const parts = str.split(" ").filter((part) => part !== "");
  if (parts.length === 0) {
    return { valid: false, message: "Please enter your full name" };
  }

  if (!parts.every((part) => isWord(part))) {
    return { valid: false, message: "Name contains unacceptable characters" };
  }

  return { valid: true };
};
const validateEmailField = (email: string) => {
  const result: ValidationResult = { valid: true };
  const isValid = validateEmail(email);
  if (!isValid) {
    result.message = "Email is invalid";
    result.valid = false;
  }
  return result;
};
export function validateAddAddressForm(
  formData: FormData,
): Record<keyof AddAddressFormData, ValidationResult> {
  const values = Object.fromEntries(
    addAddressFields.map((name) => [name, getFormString(formData, name)]),
  ) as AddAddressFormData;
  const results: Record<keyof AddAddressFormData, ValidationResult> = {
    username: validateFullName(values.username),
    email: validateEmailField(values.email),
    "phone-number": validatePhone(values["phone-number"]),
    apartment: validateApartment(values.apartment),
    building: validateRequiredField(values.building, "Building"),
    street: validateRequiredField(values.street, "Street"),
    town: validateRequiredField(values.town, "Town/City"),
    province: validateRequiredField(values.province, "Province"),
    country: validateRequiredField(values.country, "Country"),
  };

  return results;
}
