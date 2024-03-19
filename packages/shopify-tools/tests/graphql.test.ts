import { describe, expect } from 'vitest';
import { EnumValue, parseValue } from '../src/utils/graphql';
import { Kind } from 'graphql/language/kinds';
import {
  BooleanValueNode,
  EnumValueNode,
  FloatValueNode,
  IntValueNode,
  ListValueNode,
  NullValueNode,
  StringValueNode,
} from 'graphql/language';
import { ObjectValueNode } from 'graphql/language/ast';

describe('parseValue', () => {
  it('string', () => {
    const val = parseValue('foo') as StringValueNode;
    expect(val.kind).toBe(Kind.STRING);
    expect(val.value).toBe('foo');
  });
  it('integer', () => {
    const val = parseValue(10) as IntValueNode;
    expect(val.kind).toBe(Kind.INT);
    expect(val.value).toBe('10');
  });
  it('float', () => {
    const val = parseValue(0.1) as FloatValueNode;
    expect(val.kind).toBe(Kind.FLOAT);
    expect(val.value).toBe('0.1');
  });
  it('bigint', () => {
    const val = parseValue(BigInt('9007199254740991')) as StringValueNode;
    expect(val.kind).toBe(Kind.STRING);
    expect(val.value).toBe('9007199254740991');
  });
  it('boolean = true', () => {
    const val = parseValue(true) as BooleanValueNode;
    expect(val.kind).toBe(Kind.BOOLEAN);
    expect(val.value).toBe(true);
  });
  it('boolean = false', () => {
    const val = parseValue(false) as BooleanValueNode;
    expect(val.kind).toBe(Kind.BOOLEAN);
    expect(val.value).toBe(false);
  });
  it('undefined', () => {
    const val = parseValue(undefined) as NullValueNode;
    expect(val.kind).toBe(Kind.NULL);
  });
  it('null', () => {
    const val = parseValue(null) as NullValueNode;
    expect(val.kind).toBe(Kind.NULL);
  });
  it('enum', () => {
    const val = parseValue(new EnumValue('ENUM')) as EnumValueNode;
    expect(val.kind).toBe(Kind.ENUM);
    expect(val.value).toBe('ENUM');
  });
  it('simple list', () => {
    const val = parseValue([1, '2', true]) as ListValueNode;
    expect(val.kind).toBe(Kind.LIST);

    expect(val.values[0].kind).toBe(Kind.INT);
    expect(val.values[1].kind).toBe(Kind.STRING);
    expect(val.values[2].kind).toBe(Kind.BOOLEAN);
  });
  it('simple object', () => {
    const val = parseValue({
      foo: 'bar',
      baz: false,
    }) as ObjectValueNode;

    expect(val.kind).toBe(Kind.OBJECT);
    expect(val.fields).toEqual([
      {
        kind: Kind.OBJECT_FIELD,
        name: {
          kind: Kind.NAME,
          value: 'foo',
        },
        value: {
          kind: Kind.STRING,
          value: 'bar',
        },
      },
      {
        kind: Kind.OBJECT_FIELD,
        name: {
          kind: Kind.NAME,
          value: 'baz',
        },
        value: {
          kind: Kind.BOOLEAN,
          value: false,
        },
      },
    ]);
  });
  it('invalid types', () => {
    const noop = () => void 0;

    expect(() => parseValue(noop)).toThrow();
    expect(() => parseValue(Symbol('foo'))).toThrow();
  });
});
