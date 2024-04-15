export function shallowEqual(object1: unknown, object2: unknown): boolean {
  if (object1 === object2) return true;

  // If one object is undefined and that the other is undefined, it automatically means that the objects are not equals
  if (object1 === null || object1 === undefined || object2 === null || object2 === undefined) {
    // If one of both is undefined
    return !(object1 || object2); // Then check if one of both is defined. If true, then return false
  }

  // Ensure both variables are of type 'object' and are not null before comparing properties
  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    return false;
  }

  if (Array.isArray(object1) && Array.isArray(object2)) {
    if (object1.length !== object2.length) {
      return false;
    }

    return object1.every((_, i) => object1[i] === object2[i]);
  }

  // Convert the values to objects (this is TypeScript safe, since we've already checked types)
  const obj1 = object1 as Record<string, unknown>;
  const obj2 = object2 as Record<string, unknown>;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all properties in object1 exist in object2 and have the same value
  for (const key of keys1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If all checks pass, the objects are shallowly equal
  return true;
}
