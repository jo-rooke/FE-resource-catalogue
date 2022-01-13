import {
  BrowserRouter as Router,
  Route,
  Routes /*Link*/,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import IndividualResource from "./routes/IndividualResource";
import HomeLoggedIn from "./routes/HomeLoggedIn";
import AddResource from "./routes/AddResource";
import { IUser } from "./interfaces/IUser";
import { IResourceShort } from "./interfaces/IResource";
import { ITag } from "./interfaces/ITag";
import { fetchData } from "./utils/fetchData";
import { baseUrl } from "./utils/baseUrl";
import PageHeader from "./components/PageHeader";

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
          <Route path="/dashboard" element={<HomeLoggedIn />} />
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
                />
              ) : (
                <PageHeader
                  title={"Add a Resource"}
                  allUsers={allUsers}
                  user={user}
                  setUser={setUser}
                />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
