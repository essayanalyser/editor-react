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
import toast from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  const [data, setData] = useState([]);

  const [docName, setDocName] = useState("");

  const [docData, setDocData] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);

  const [versions, setVersions] = useState([]);
  const [activeVersion, setActiveVersion] = useState("0");

  const getData = () => {
    if (authUser) {
      axios
        .get(`http://localhost:8000/users/${authUser.email}/`)
        .then((res) => {
          setDocData(res.data);
        })
        .catch((err) => {
          toast.error("Error fetching data", err);
        });
    }
  };

  const getNewVersionID = () => {
    if (!currentDoc?.versions || currentDoc?.versions?.length === 0) {
      return "0";
    }
    let id = versions?.length;
    return id.toString();
  };

  useEffect(() => {
    getData();
  }, [authUser]);

  useEffect(() => {
    if (currentDoc?.versions?.length === 0) {
      setActiveVersion("0");
      setVersions([]);
      return;
    }
    setActiveVersion(currentDoc?.versions?.length - 1);
    setVersions(currentDoc?.versions);
  }, [currentDoc]);

  const handleAnalyseButtonClicked = async (typedData) => {
    if (!authUser) {
      navigate("/auth");
    } else if (docName === "") {
      toast.error("Please enter a document name");
    } else {
      try {
        const { data } = await axios.post(`http://localhost:8000/users/`, {
          key: authUser.email,
          doc_name: docName,
          data: {
            version: getNewVersionID(),
            content: typedData,
          },
        });
        toast.success("Data saved successfully");
      } catch (error) {
        toast.error("Error saving data", error);
      }
    }
    getData();
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
                docData={docData || []}
                currentDoc={currentDoc || null}
                setCurrentDoc={setCurrentDoc || null}
                versions={versions || []}
                authUser={authUser || null}
                setDocName={setDocName}
                setData={setData}
                setDocData={setDocData}
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
