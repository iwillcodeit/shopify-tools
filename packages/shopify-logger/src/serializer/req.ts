import type { Request } from 'express';

const rawSymbol = Symbol('raw-req-ref');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reqSerializer(req: Request<any, any, any, any, any>) {
  return {
    id: req.id ?? req.headers['x-request-id'],
    shop: req.res?.locals?.['shopify']?.shop,
    app: req.res?.locals?.['shopify']?.app,
    method: req.method,
    url: req.originalUrl ?? req.path ?? req.url,
    query: req.query,
    params: req.params,
    remoteAddress: req.socket?.remoteAddress ?? req.ip,
    remotePort: req.socket?.remotePort,
    get originalUrl() {
      return req.originalUrl;
    },
    get [rawSymbol]() {
      return req;
    },
  };
}

export type PinoReq = ReturnType<typeof reqSerializer>;
