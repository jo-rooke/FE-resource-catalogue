import filterOutStudyList from "../utils/filterOutStudyList";

test("Callback function to be used in a filter, should return boolean to show if a given resource is found in the studylist", () => {
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
  const studyList = [
    {
      id: 1,
      resource_name: "JavaScript tutorial",
      author_name: "CodeCademy",
      description: "a tutorial covering all the basics of js",
      creation_date: "2022-01-07T11:19:55.556Z",
      tags: [
        { id: 1, name: "HTML" },
        { id: 4, name: "JavaScript" },
      ],
    },
    {
      id: 7,
      resource_name: "front-end tutorial",
      author_name: "CodeCademy",
      description: "a tutorial covering all the basics of js",
      creation_date: "2022-01-07T11:19:55.556Z",
      tags: [{ id: 1, name: "HTML" }],
    },
  ];

  expect(filterOutStudyList(resource1, studyList)).toBeDefined();
  expect(filterOutStudyList(resource1, studyList)).toStrictEqual(false);
  expect(filterOutStudyList(resource2, studyList)).toStrictEqual(true);
});
