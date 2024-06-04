import type { Response } from "express";

const rawSymbol = Symbol("raw-req-ref");

export function resSerializer(res: Response) {
  return {
    statusCode: res.statusCode,
    get [rawSymbol]() {
      return res;
    },
  };
}

export type PinoRes = ReturnType<typeof resSerializer>;
