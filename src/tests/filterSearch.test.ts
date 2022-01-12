import filterSearch from "../utils/filterSearch";

test("Callback function to be used in a filter, should return boolean to show if a given resource matches the search term", () => {
  const resource1 = {
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

  expect(filterSearch("Bootstrap", resource2)).toBeDefined();
  expect(filterSearch("Bootstrap", resource2)).toStrictEqual(true); //search in the title
  expect(filterSearch("Javascript", resource1)).toStrictEqual(true); // search in tags
  expect(filterSearch("basic", resource1)).toStrictEqual(true); // search in description
  expect(filterSearch("java", resource1)).toStrictEqual(true); // search in lowercase; incomplete search term
  expect(filterSearch("JAVA", resource1)).toStrictEqual(true); // search in uppercase; incomplete search term
  expect(filterSearch("react", resource2)).toStrictEqual(false);
});
