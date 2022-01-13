import isObjectDefined from "../utils/isObjectDefined";

test("function that loops through the properties of an object and returns false if any of them unfilled, true if all are filled in", () => {
  const resourceDetails1 = {
    resource_name: "JavaScript tutorial",
    author_name: "CodeCademy",
    tags: [
      { id: 1, name: "HTML" },
      { id: 4, name: "JavaScript" },
    ],
    description: "a tutorial covering all the basics of js",
    url: "https://www.codecademy.com/learn/introduction-to-javascript",
    content_type: "tutorial",
    week_no: 1,
    recommender_id: 3,
    rec_status: "I recommend this resource after having used it",
    rec_message: "learnt a lot",
  };

  const resourceDetails2 = {
    resource_name: "JavaScript tutorial",
    author_name: "",
    tags: [
      { id: 1, name: "HTML" },
      { id: 4, name: "JavaScript" },
    ],
    description: "a tutorial covering all the basics of js",
    url: "https://www.codecademy.com/learn/introduction-to-javascript",
    content_type: "tutorial",
    week_no: 1,
    recommender_id: 3,
    rec_status: "I recommend this resource after having used it",
    rec_message: "learnt a lot",
  };

  expect(isObjectDefined(resourceDetails1)).toBeDefined();
  expect(isObjectDefined(resourceDetails1)).toStrictEqual(true); // when all properies are filled
  expect(isObjectDefined(resourceDetails2)).toStrictEqual(false); // when one of the properties are empty
});
