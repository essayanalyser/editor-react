import { useEffect, useState } from 'react';
import {
  Editor,
  Statistics,
  AuthLayout,
  Login,
  Signup,
  UserPage,
  ResetPass,
} from "./components";
import "./stylesheets/home.css";
import { Route as Link, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase";
import axios from "axios";
import VersionControl from "./components/VersionControl/VersionControl";

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  const [versions, setVersions] = useState([]);
  const [activeVersion, setActiveVersion] = useState("0");

  const [data, setData] = useState([]);

  const getData = () => {
    if (authUser) {
      axios
        .get(`http://localhost:8000/users/${authUser.email}/`)
        .then((res) => {
          console.log(res.data);
          // console.log(getNewVersionID());
          setVersions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getNewVersionID = () => {
    if (versions.length === 0) {
      return "0";
    }
    let id = versions?.length;
    return id.toString();
  };

  useEffect(() => {
    getData();
  }, [authUser]);

  const handleAnalyseButtonClicked = async (typedData) => {
    console.log(typedData);
    // TODO: Complete this function when linked with backend
    if (!authUser) {
      navigate("/auth");
    } else {
      await axios
        .post(`http://localhost:8000/api/users/`, {
          key: authUser.email,
          data: {
            version: getNewVersionID(),
            content: typedData,
          },
        })
        .then((res) => {
          getData();
          setActiveVersion(getNewVersionID());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        localStorage.setItem("isLoggedIn", true);
      } else {
        setAuthUser(null);
        localStorage.setItem("isLoggedIn", false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Link
        path="/"
        element={
          <div
            id="home"
            className="h-screen font-pops w-screen overflow-hidden bg-[#141718] flex"
          >
            <div className="h-screen w-screen overflow-hidden flex">
              <VersionControl
                activeVersion={activeVersion || "0"}
                setActiveVersion={setActiveVersion || "0"}
                versions={versions || []}
                authUser={authUser || null}
                setData={setData || []}
              />
              <div className="px-4 py-4 w-full h-full">
                <div className="rounded-lg bg-white flex h-full w-full">
                  <Editor
                    handleAnalyseButtonClicked={handleAnalyseButtonClicked}
                    authUser={authUser}
                    olderVersionData={data}
                  />
                  <Statistics authUser={authUser} data={data} />
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Link exact path="auth" element={<AuthLayout authUser={authUser} />}>
        <Link path="login" element={<Login />} />
        <Link path="signup" element={<Signup />} />
        <Link path="user" element={<UserPage authUser={authUser} />} />
        <Link path="reset" element={<ResetPass />} />
      </Link>
    </Routes>
  );
}

export default App;
