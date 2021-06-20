import { IncomingMessage } from "http";
import { Utils } from "../../app/Utils/Utils";

describe("Utils test suite", () => {
  test("getRequestPath valid request", () => {
    const request = {
      url: "/login",
      headers: {
        host: "http://localhost:8080",
      },
    };
    const resultPath = Utils.getRequestBasePath(request as IncomingMessage);
    expect(resultPath).toBe("login");
  });

  test("getRequestPath no path name", () => {
    const request = {
      url: "",
      headers: {
        host: "http://localhost:8080",
      },
    };
    const resultPath = Utils.getRequestBasePath(request as IncomingMessage);
    expect(resultPath).toBeFalsy();
  });
});
