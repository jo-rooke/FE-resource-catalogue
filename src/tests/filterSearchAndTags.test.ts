import filterSearchAndTags from "../utils/filterSearchAndTags";

test("Callback function to be used in a filter, should return boolean whether a given resource meets the tag and search criteria", () => {
  const selectedTags = [
    { id: 1, name: "HTML" },
    { id: 8, name: "Express" },
  ];
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
  expect(filterSearchAndTags(resource1, selectedTags, "")).toBeDefined();
  expect(filterSearchAndTags(resource1, selectedTags, "")).toStrictEqual(true); // A tag is selected, but nothing is searched
  expect(filterSearchAndTags(resource2, selectedTags, "")).toStrictEqual(false); // A tag is selected, but nothing is searched
  expect(filterSearchAndTags(resource2, [], "bootstrap")).toStrictEqual(true); // A search term is specified, but no tags are selected
  expect(filterSearchAndTags(resource1, [], "bootstrap")).toStrictEqual(false); // A search term is specified, but no tags are selected
  expect(
    filterSearchAndTags(resource1, selectedTags, "CodeCademy")
  ).toStrictEqual(true); // both tags and search term have been specified
  expect(filterSearchAndTags(resource1, selectedTags, "rainbow")).toStrictEqual(
    false
  ); // both tags and search term have been specified
  expect(filterSearchAndTags(resource1, [], "")).toStrictEqual(true); // no tags or search terms are specified
});
