import { blue, gray, green, red, redBright, yellow } from "colorette";
import pinoPretty from "pino-pretty";
import type { PinoReq } from "./serializer/req";
import type { PinoRes } from "./serializer/res";

function colorStatusCode(code: number) {
  if (code >= 400 && code < 500) {
    return yellow(code);
  } else if (code >= 500) {
    return red(code);
  } else if (code >= 300 && code < 400) {
    return blue(code);
  }
  return green(code);
}

function colorMethod(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string,
) {
  switch (method.toUpperCase()) {
    case "GET":
      return blue(method);
    case "POST":
      return green(method);
    case "PUT":
    case "PATCH":
      return yellow(method);
    case "DELETE":
      return red(method);
    default:
      return gray(method);
  }
}

function colorResponseTime(responseTime: number) {
  if (responseTime > 10000) {
    return red(`${responseTime}ms`);
  } else if (responseTime > 1000) {
    return redBright(`${responseTime}ms`);
  } else if (responseTime > 500) {
    return yellow(`${responseTime}ms`);
  }
  return green(`${responseTime}ms`);
}

export const pretty = () =>
  pinoPretty({
    colorize: true,
    messageFormat(log, messageKey) {
      let msg = `${log[messageKey] ?? ""}`;

      if (log["ns"]) {
        msg = `${yellow(`[${log['ns']}]`)} ${msg}`;
      }

      if (log["req"]) {
        const req = log["req"] as PinoReq;
        const res = log["res"] as PinoRes;
        const responseTime = log["responseTime"];

        const reqPrefix = `${colorMethod(req.method)} ${req.originalUrl}`;
        let reqMessage = `ReqId: ${req.id}`;
        if(req.shop) {
          reqMessage += ` | ${req.shop}`;

          if(req.app) {
            reqMessage += ` / ${req.app}`
          }
        }

        if (res) {
          let resPrefix = `${colorStatusCode(res.statusCode)}`;
          if (responseTime) {
            resPrefix += ` ${colorResponseTime(Number(responseTime))}`;
          }
          msg = `⬅️ ${reqPrefix} | ${resPrefix}  - ${reqMessage}`;
        } else {
          msg = `➡️ ${reqPrefix} - ${reqMessage}`;
        }
      }

      return msg;
    },
    ignore: "ns,req,res,responseTime",
  });
