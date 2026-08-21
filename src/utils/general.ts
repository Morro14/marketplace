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
export function objDeepCompare(target: any, source: any): boolean {
  let eq = true;
  const isObject = (item: any) =>
    typeof item === "object" && !Array.isArray(item);
  if (isObject(target) && isObject(source)) {
    console.log(target, source);
    const targetKeys = Object.keys(target);
    const sourceKeys = Object.keys(source);
    const keysCheck =
      targetKeys.length === sourceKeys.length ||
      targetKeys.every((key_, i) => key_ === sourceKeys[i]);
    if (!keysCheck) {
      console.log("!keysCheck");
      eq = false;
      return eq;
    }
    console.log("sanity check", eq);
    for (const key in source) {
      const targetVal = target[key];
      const sourceVal = source[key];
      if (targetVal && isObject(targetVal) && isObject(sourceVal)) {
        eq = objDeepCompare(targetVal, sourceVal);
        return eq;
      } else if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        targetVal.forEach((item, i) => {
          eq = objDeepCompare(item, sourceVal[i]);
          return eq;
        });
      } else if (typeof targetVal !== typeof sourceVal) {
        eq = false;
        return eq;
      }
    }
  } else if (typeof target === typeof source) {
    if (target !== source) {
      eq = false;
      return eq;
    }
  }
  console.log("eq", eq, target, source);
  return eq;
}
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepPartial<T[P]>
    : T[P] extends Array<any>
      ? Array<any>
      : T[P];
};

function isObject(item: unknown): item is Record<string, any> {
  return typeof item === "object" && item !== null && !Array.isArray(item);
}

export function objDeepSubtract<T extends Record<string, any>>(
  target: T,
  source: DeepPartial<T>,
  defaultState: DeepPartial<T>,
) {
  const result = { ...target };
  if (isObject(result)) {
    for (const key in source) {
      if (!Object.hasOwn(result, key)) continue;
      const sourceVal = source[key];
      const targetVal = result[key];
      if (!isObject(sourceVal)) {
        delete result[key];
        if (defaultState && key in defaultState) {
          result[key] = defaultState[key] as T[Extract<keyof T, string>];
        }
      }
      if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        const isEq = objDeepCompare(targetVal, sourceVal);
        result[key] = targetVal.filter();
      }
      if (isObject(source[key])) {
        result[key] = objDeepSubtract(
          result[key],
          source[key],
          defaultState[key] as DeepPartial<typeof targetVal>,
        );
      }
    }
  }
  return result;
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
