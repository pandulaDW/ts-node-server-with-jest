import { Utils } from "../app/Utils";

describe("Utils test suite", () => {
  test("test uppercase", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

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

  test("test invalid url", () => {
    expect(() => Utils.parseUrl("")).toThrowError("Empty url!!");
  });

  test("test invalid URL with try catch", () => {
    try {
      Utils.parseUrl("");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty("message", "Empty url!!");
    }
  });
});
