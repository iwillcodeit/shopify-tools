import { describe, expect } from 'vitest';
import { shallowEqual } from '../src/utils/object';

const obj1 = {
  foo: 'bar',
  baz: null,
};

const obj2 = {
  hello: 'world',
  toto: 'tata',
};

describe('shallowEqual', () => {
  it('null and null', () => {
    expect(shallowEqual(null, null)).toBe(true);
  });
  it('empty objects ', () => {
    expect(shallowEqual({}, {})).toBe(true);
  });
  it('empty object and null', () => {
    expect(shallowEqual({}, null)).toBe(false);
  });
  it('same number', () => {
    expect(shallowEqual(0, 0)).toBe(true);
  });
  it('different number', () => {
    expect(shallowEqual(0, 1)).toBe(false);
  });
  it('falsy number and string', () => {
    expect(shallowEqual(0, '')).toBe(false);
  });
  it('truth number and string', () => {
    expect(shallowEqual(1, 'hello, world')).toBe(false);
  });
  it('two empty array', () => {
    expect(shallowEqual([], [])).toBe(true);
  });
  it('same array', () => {
    expect(shallowEqual([1], [1])).toBe(true);
  });
  it('different arrays', () => {
    expect(shallowEqual([1], [10])).toBe(false);
  });
  it('same objects', () => {
    expect(shallowEqual({ ...obj1 }, { ...obj1 })).toBe(true);
  });
  it('different objects (in order)', () => {
    expect(shallowEqual({ ...obj2 }, { ...obj1 })).toBe(false);
  });
  it('different objects (in other order)', () => {
    expect(shallowEqual({ ...obj1 }, { ...obj2 })).toBe(false);
  });
});
