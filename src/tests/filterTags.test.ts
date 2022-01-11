import filterTags from "../utils/filterTags";

test("", () => {
  const selectedTags = [
    { id: 1, name: "HTML" },
    { id: 8, name: "Express" },
  ];
  const resource = {
    id: 1,
    resource_name: "JavaScript tutorial",
    author_name: "CodeCademy",
    description: "a tutorial covering all the basics of js",
    creation_date: "2022-01-07T11:19:55.556Z",
    tags: [
      { id: 1, name: "HTML" },
      { id: 4, name: "JavaScript" },
    ],
    likes: 0,
    dislikes: 1,
  };
  const resource2 = {
    id: 2,
    resource_name: "Bootstrap tutorial",
    author_name: "Bootstrap",
    description: "a tutorial covering all the basics of bootstrap",
    creation_date: "2022-01-08T11:19:55.556Z",
    tags: [
      { id: 2, name: "CSS" },
      { id: 4, name: "JavaScript" },
    ],
    likes: 3,
    dislikes: 1,
  };

  expect(filterTags(selectedTags, resource)).toBeDefined();
  expect(filterTags(selectedTags, resource)).toStrictEqual(true);
  expect(filterTags(selectedTags, resource2)).toStrictEqual(false);
});
