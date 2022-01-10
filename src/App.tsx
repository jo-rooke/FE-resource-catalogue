import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./routes/Home";
import IndividualResource from "./routes/IndividualResource";
import HomeLoggedIn from "./routes/HomeLoggedIn";
import AddResource from "./routes/AddResource";
import { IUser } from "./interfaces/IUser";
import { IResourceShort } from "./interfaces/IResource";

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [allResources, setAllResources] = useState<IResourceShort[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home {...{ loggedIn, setLoggedIn, user, setUser, allUsers }} />
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
