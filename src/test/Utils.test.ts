import { Utils } from "../app/Utils/Utils";

describe("Utils test suite", () => {
  test("parse simple URL", () => {
    const parsedUrl = Utils.parseUrl("http://localhost:8080/login");
    expect(parsedUrl.href).toBe("http://localhost:8080/login");
    expect(parsedUrl.port).toBe("8080");
    expect(parsedUrl.protocol).toBe("http:");
    expect(parsedUrl.searchParams.entries().next().done).toBe(true);
  });

  test("parse URL with query", () => {
    const parsedUrl = Utils.parseUrl(
      "http://localhost:8080/login?user=user&password=pass"
    );
    expect(parsedUrl.searchParams.get("user")).toBe("user");
    expect(parsedUrl.searchParams.get("password")).toBe("pass");
  });

  test("invalid url will throw an error", () => {
    try {
      Utils.parseUrl("");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty("message", "Empty url!!");
    }
  });

  test("parse url basename", () => {
    expect(Utils.getRequestBasePath("http://localhost:8080/login")).toBe(
      "login"
    );
    expect(
      Utils.getRequestBasePath("http://localhost:8080/login?user=adam")
    ).toBe("login");
  });
});
