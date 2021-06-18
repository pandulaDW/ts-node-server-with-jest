import { URL } from "url";

export class Utils {
  public static parseUrl(url: string): URL {
    if (!url) {
      throw new Error("Empty url!!");
    }
    return new URL(url);
  }
}
