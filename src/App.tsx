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

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [allResources, setAllResources] = useState<IResourceShort[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [tags, setTags] = useState<ITag[]>([]);
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
                  loggedIn,
                  setLoggedIn,
                  user,
                  setUser,
                  allUsers,
                  tags,
                  allResources,
                  setAllResources,
                }}
              />
            }
          />
          <Route path="/dashboard" element={<HomeLoggedIn />} />
          <Route path="/resource/:id" element={<IndividualResource />} />
          <Route path="/resource/add" element={<AddResource />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
