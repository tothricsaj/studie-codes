// this is because of testing jest

import { sum } from "./util/dummy";

test("Dummy unit test", () => {
  const actual = sum(3, 1); // not implemented yet
  expect(actual).toBe(4);
});