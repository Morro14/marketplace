export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize()
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export const isDigits = (str: string) => /^\d+$/.test(str);
export const isEmpty = (str: string) => {
  const strTrimmed = str.trim();
  return /^$/.test(strTrimmed);
};
