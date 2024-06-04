import { randomUUID } from "node:crypto";
import pino from "pino";
import pinoHttp from "pino-http";
import { reqSerializer } from "./serializer/req";
import { resSerializer } from "./serializer/res";
import Logger = pino.Logger;

export const getHttpLogger = (logger: Logger) =>
  pinoHttp({
    logger,

    genReqId: function (req, res) {
      const existingID = req.id ?? req.headers["x-request-id"];
      if (existingID) return existingID;
      const id = randomUUID();
      res.setHeader("X-Request-Id", id);
      req.id = id;
      return id;
    },

    serializers: {
      req: reqSerializer,
      res: resSerializer,
    },

    wrapSerializers: false,

    // Define a custom logger level
    customLogLevel: function (_req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return "warn";
      } else if (res.statusCode >= 500 || err) {
        return "error";
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return "silent";
      }
      return "info";
    },

    // Define a custom success message
    customSuccessMessage: function (req, res) {
      if (res.statusCode === 404) {
        return "resource not found";
      }
      return `${req.method} completed`;
    },

    // Define a custom receive message
    customReceivedMessage: function (req) {
      return "request received: " + req.method;
    },

    // Define a custom error message
    customErrorMessage: function (_req, res) {
      return "request errored with status code: " + res.statusCode;
    },
  });
