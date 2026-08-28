import { isDigits, isEmpty } from "./general";

export function formatProductCount(value: string): null | number {
  let result = null;
  const isDigits_ = isDigits(value);
  const isEmpty_ = isEmpty(value);
  if (isEmpty_) {
    result = 0;
  } else if (isDigits_) {
    result = Number(value);
  }

  return result;
}
