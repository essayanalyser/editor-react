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
  // Initialize navigation
  const navigate = useNavigate();

  // State for authenticated user
  const [authUser, setAuthUser] = useState(null);

  // State for data that is used the statistics and editor component
  const [data, setData] = useState([]);

  // State for active document name
  const [docName, setDocName] = useState("");

  // State for document data
  const [docData, setDocData] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);

  // State for versions
  const [versions, setVersions] = useState([]);
  const [activeVersion, setActiveVersion] = useState("0");

  // Function to get data
  const getData = () => {
    if (authUser) {
      axios
        .get(`http://localhost:8000/users/${authUser.email}/`)
        .then((res) => {
          setDocData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Error fetching data", err);
        });
    }
  };

  // Function to get new version ID in the current document
  const getNewVersionID = () => {
    // if there is a new document, returns 0
    if (!currentDoc?.versions || currentDoc?.versions?.length === 0) {
      return "0";
    }
    // else returns the length of the versions array
    let id = versions?.length;
    return id.toString();
  };

  // Effect to get data when authUser changes
  useEffect(() => {
    getData();
  }, [authUser]);

  // Effect to set active version and versions when currentDoc changes
  useEffect(() => {
    if (currentDoc?.versions?.length === 0) {
      setActiveVersion("0");
      setVersions([]);
      return;
    }
    setActiveVersion(currentDoc?.versions?.length - 1);
    setVersions(currentDoc?.versions);
  }, [currentDoc]);

  // Function to handle click on Analyse button
  const handleAnalyseButtonClicked = async (typedData) => {
    if (!authUser) {
      navigate("/auth");
    } else if (docName === "" || currentDoc === null) {
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

  // Effect to handle authentication state
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
                getData={getData}
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
