// 2022-01-07T11:19:55.556Z
// 11:19, 7 January 2022
// 2022-01-07, 11:19

import { timestampFormatter } from "../utils/timestampFormatter";

test("Convert timestamp to human readable date and time", () => {
  expect(timestampFormatter("2022-01-07T11:19:55.556Z")).toMatch(
    /[0-2][0-9]:[0-5][0-9], [1-2]?[0-9] [A-Z][a-z]{2} [0-9]{4}/
  );
  expect(timestampFormatter("2022-01-07T23:19:55.556Z")).toStrictEqual(
    "23:19, 7 Jan 2022"
  );
  expect(timestampFormatter("1999-04-19T18:16:55.556Z")).toStrictEqual(
    "18:16, 19 Apr 1999"
  );
  expect(timestampFormatter("2022-12-25T04:45.556Z")).toStrictEqual(
    "04:45, 25 Dec 2022"
  );
});
