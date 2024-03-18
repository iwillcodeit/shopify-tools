import { Kind, VariableDefinitionNode } from 'graphql';
import { ConstValueNode, ObjectFieldNode, SelectionSetNode, ValueNode } from 'graphql/language/ast';
import type { DeepMutable } from '../types';

export class EnumValue {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

export function parseValue(value: any): ValueNode {
  switch (typeof value) {
    case 'bigint':
      return {
        kind: Kind.STRING,
        value: value.toString(),
      };
    case 'number':
      if (Number.isInteger(value)) {
        return {
          kind: Kind.INT,
          value: value.toString(),
        };
      } else {
        return {
          kind: Kind.FLOAT,
          value: value.toString(),
        };
      }
    case 'boolean':
      return {
        kind: Kind.BOOLEAN,
        value,
      };
    case 'string':
      return {
        kind: Kind.STRING,
        value,
      };
    case 'undefined':
      return { kind: Kind.NULL };
    case 'object':
      if (value === null) {
        return { kind: Kind.NULL };
      }

      if (Array.isArray(value)) {
        return {
          kind: Kind.LIST,
          values: value.map(parseValue),
        };
      }

      if (value instanceof EnumValue) {
        return {
          kind: Kind.ENUM,
          value: value.value,
        };
      }

      // eslint-disable-next-line no-case-declarations
      const fields: Array<ObjectFieldNode> = [];
      for (const [key, val] of Object.entries(value)) {
        fields.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: key,
          },
          value: parseValue(val),
        });
      }

      return {
        kind: Kind.OBJECT,
        fields,
      };
    case 'function':
    case 'symbol':
      throw new Error('Invalid value type');
  }
}

export function parseValues(
  values: Record<string, any> = {},
  variableDefinitions: DeepMutable<VariableDefinitionNode[] | undefined> = []
): Record<string, ValueNode> {
  const missingVariables = new Set();
  // Define first the array with all provided values and then when iterating through needed values, we remove it from the set. If after the process, the set is not empty, it means that some values have not been used.
  const unusedVariable = new Set(Object.keys(values));

  const parsed = variableDefinitions.reduce<Record<string, ValueNode>>((acc, variableDefinition) => {
    const key = variableDefinition.variable.name.value;
    const defaultValue = variableDefinition.defaultValue as ConstValueNode | undefined;

    if (values[key]) {
      acc[key] = parseValue(values[key]);
    } else if (defaultValue) {
      acc[key] = defaultValue;
    } else {
      missingVariables.add(key);
    }

    unusedVariable.delete(key);

    return acc;
  }, {});

  if (missingVariables.size > 0) {
    throw new Error(`Missing variables: ${Array.from(missingVariables.values()).join(',')}`);
  }

  if (unusedVariable.size > 0) {
    throw new Error(`Unused variables: ${Array.from(unusedVariable.values()).join(',')}`);
  }

  return parsed;
}

export function applyVariables(
  selectionSet: DeepMutable<SelectionSetNode>,
  values: Record<string, ValueNode>
): DeepMutable<SelectionSetNode> {
  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.INLINE_FRAGMENT || selection.kind === Kind.FIELD) {
      if (selection.kind === Kind.FIELD) {
        if (selection.arguments) {
          for (const argument of selection.arguments) {
            if (argument.value.kind === Kind.VARIABLE) {
              const name = argument.value.name.value;

              if (name in values) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                argument.value = values[name];
              } else {
                throw new Error(`Variable '${name}' is used inside the query but was not provided inside the values`);
              }
            }
          }
        }
      }

      if (selection.selectionSet) {
        applyVariables(selection.selectionSet, values);
      }
    }
  }

  return selectionSet;
}
