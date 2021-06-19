import { URL } from "url";
import { IncomingMessage } from "http";

export class Utils {
  public static parseUrl(url: string): URL {
    if (!url) {
      throw new Error("Empty url!!");
    }
    return new URL(url);
  }

  public static async getRequestBody(request: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";

      request.on("data", (data: string) => {
        body += data;
      });

      request.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });

      request.on("error", (err: any) => {
        reject(err);
      });
    });
  }
}
