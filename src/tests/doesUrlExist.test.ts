import doesUrlExist from '../utils/doesUrlExist'

test("function to find out if the url being posted already exists", () => {

    const resourceAdded1 = {
      resource_name: "JavaScript tutorial",
      author_name: "CodeCademy",
      tags: [
        { id: 1, name: "HTML" },
        { id: 4, name: "JavaScript" },
      ],
      description: "a tutorial covering all the basics of js",
      url: "https://www.codecademy.com/learn/introduction-to-javascript",
      creation_date: "2022-01-07T11:19:55.556Z",
      content_type: "video",
      week_no: 5,
      recommender_id:4,
      rec_status: "I recommend this resource after having used it",
      rec_message: "great tutorial"
    };
    const resourceAdded2 = {
        resource_name: "JavaScript tutorial",
        author_name: "CodeCademy",
        tags: [
          { id: 1, name: "HTML" },
          { id: 4, name: "JavaScript" },
        ],
        description: "a tutorial covering all the basics of js",
        url: "www.codecademy.com/learn/introduction-to-javascript",
        creation_date: "2022-01-07T11:19:55.556Z",
        content_type: "video",
        week_no: 5,
        recommender_id:4,
        rec_status: "I recommend this resource after having used it",
        rec_message: "great tutorial"
      };
    const resourceAdded3 = {
        resource_name: "Typescript tutorial",
        author_name: "CodeCademy",
        tags: [
          { id: 6, name: "TypeScript" },
        ],
        description: "a tutorial covering all the basics of ts",
        url: "https://www.codecademy.com/learn/introduction-to-typescript",
        creation_date: "2022-01-07T11:19:55.556Z",
        content_type: "video",
        week_no: 5,
        recommender_id:4,
        rec_status: "I recommend this resource after having used it",
        rec_message: "good tutorial"
      };
    const allResources = [{
        id: 1,
        resource_name: "JavaScript tutorial",
        author_name: "CodeCademy",
        tags: [
          { id: 1, name: "HTML" },
          { id: 4, name: "JavaScript" },
        ],
        description: "a tutorial covering all the basics of js",
        url: "www.codewars.com",
        creation_date: "2022-01-07T11:19:55.556Z"
      }, 
      {
        id: 2,
        resource_name: "JavaScript tutorial",
        author_name: "CodeCademy",
        tags: [
          { id: 1, name: "HTML" },
          { id: 4, name: "JavaScript" },
        ],
        description: "a tutorial covering all the basics of js",
        url: "codecademy.com/learn/introduction-to-javascript",
        creation_date: "2022-01-07T11:19:55.556Z"
    }]
    expect(doesUrlExist(allResources, resourceAdded1)).toBeDefined();
    expect(doesUrlExist(allResources, resourceAdded1)).toStrictEqual(true); 
    expect(doesUrlExist(allResources, resourceAdded2)).toStrictEqual(true); 
    expect(doesUrlExist(allResources, resourceAdded3)).toStrictEqual(false);
  });
  