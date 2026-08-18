export function objDeepMerge(target: any, source: any) {
  const isObject = (item: any) =>
    typeof item === "object" && !Array.isArray(item);
  if (isObject(target)) {
    for (const key in source) {
      if (target[key] && isObject(source[key])) {
        objDeepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return target;
}

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
