import { describe, it, expect } from "vitest";
import { loginService } from "../services/auth";

describe("Auth Service", () => {
  it("logs in with correct credentials", () => {
    const res = loginService("intern@demo.com", "intern123");
    expect(res.success).toBe(true);
    expect(res.user.email).toBe("intern@demo.com");
  });

  it("fails with incorrect credentials", () => {
    const res = loginService("wrong@test.com", "123");
    expect(res.success).toBe(false);
  });
});
