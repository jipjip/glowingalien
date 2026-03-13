import { describe, it, expect } from "vitest";
import { validateUsername } from "../src/lib/user";

describe("Username validation", () => {
  it("accepts valid usernames", () => {
    const validUsernames = [
      "alien",
      "player1",
      "usr!@$%*()?|-_=+"
    ];

    validUsernames.forEach(uname => {
      expect(validateUsername(uname)).toBe(true);
    });
  });

  it("rejects invalid usernames", () => {
    const invalidUsernames = [
      "thisiswaytoolongusername", // >16 chars
      "with space",
      "with~tilde",
      "emoji😊"
    ];

    invalidUsernames.forEach(uname => {
      expect(validateUsername(uname)).toBe(false);
    });
  });
});