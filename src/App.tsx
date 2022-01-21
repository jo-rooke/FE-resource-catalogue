import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import IndividualResource from "./routes/IndividualResource";
import AddResource from "./routes/AddResource";
import { IUser } from "./interfaces/IUser";
import { IResourceShort } from "./interfaces/IResource";
import { ITag } from "./interfaces/ITag";
import { fetchData } from "./utils/fetchData";
import { baseUrl } from "./utils/baseUrl";
import PageHeader from "./components/PageHeader";
import { getUserById } from "./utils/getUserById";

function App(): JSX.Element {
  const [allResources, setAllResources] = useState<IResourceShort[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [tags, setTags] = useState<ITag[]>([]);
  const [studyList, setStudyList] = useState<IResourceShort[]>([]);
  useEffect(() => {
    fetchData(baseUrl + "/resources", setAllResources);
    fetchData(baseUrl + "/users", setAllUsers);
    fetchData(baseUrl + "/tags", setTags);
  }, []);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(getUserById(allUsers, foundUser));
    }
  }, [allUsers]);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                {...{
                  user,
                  setUser,
                  studyList,
                  setStudyList,
                  allUsers,
                  tags,
                  allResources,
                  setAllResources,
                }}
              />
            }
          />
          <Route
            path="/resources/:id"
            element={
              <IndividualResource
                {...{
                  studyList,
                  setStudyList,
                  user,
                  setUser,
                  allUsers,
                }}
              />
            }
          />
          <Route
            path="/resources/add"
            element={
              user ? (
                <AddResource
                  tags={tags}
                  user={user}
                  allUsers={allUsers}
                  setAllResources={setAllResources}
                  setUser={setUser}
                  setStudyList={setStudyList}
                  allResources={allResources}
                />
              ) : (
                <>
                  <PageHeader
                    title={"Add a Resource"}
                    allUsers={allUsers}
                    user={user}
                    setUser={setUser}
                    setStudyList={setStudyList}
                  />
                  <h2 className="p-3">Please log in to add a resource.</h2>
                </>
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
