import { getUserById } from "../utils/getUserById";

test("Returns a single user object with the corresponding ID", () => {
  const allUsers = [
    { id: 1, name: "Veta", is_faculty: false },
    { id: 2, name: "Linus", is_faculty: false },
    { id: 3, name: "Faith", is_faculty: false },
    { id: 4, name: "Jo", is_faculty: false },
  ];
  expect(getUserById(allUsers, 1)).toBeDefined();
  expect(getUserById(allUsers, 1)).toHaveProperty("id");
  expect(getUserById(allUsers, 1)).toHaveProperty("name");
  expect(getUserById(allUsers, 1)).toHaveProperty("is_faculty");
  expect(getUserById(allUsers, 1)).toStrictEqual({
    id: 1,
    name: "Veta",
    is_faculty: false,
  });
  expect(getUserById(allUsers, 2)).toStrictEqual({
    id: 2,
    name: "Linus",
    is_faculty: false,
  });
});
