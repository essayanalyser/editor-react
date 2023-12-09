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
import VersionControl from "./components/VersionControl/VersionControl";
import toast from "react-hot-toast";
import app_api from "./config/ApiConfig";

function App() {
  // Initialize navigation
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
  const getData = async () => {
    setLoading(true);
    if (authUser) {
      await app_api
        .get(`users/${authUser.email}/`)
        .then((res) => {
          setDocData(res.data);
          console.log(res.data);
          if (docName !== "") {
            let doc = res.data.find((doc) => doc.doc_name === docName);
            if (doc) {
              setCurrentDoc(doc);
              setDocName(doc.doc_name);
              const av = String(doc.versions.length - 1);
              setActiveVersion(av);
              setData(doc.versions[av].content);
            } else {
              setCurrentDoc(null);
              setDocName("");
              setActiveVersion("0");
              setData([]);
            }
          } else {
            setCurrentDoc(null);
            setDocName("");
            setActiveVersion("0");
            setData([]);
          }
        })
        .catch((err) => {
          toast.error("Error fetching data", err);
        })
        .finally(() => {
          setLoading(false);
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

  // Function to handle click on Analyse button
  const handleAnalyseButtonClicked = async (typedData) => {
    setLoading(true);
    if (!authUser) {
      navigate("/auth");
    } else if (docName === "" || currentDoc === null) {
      toast.error("Please enter a document name");
    } else {
      try {
        await app_api.post(`users/`, {
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
    setLoading(false);
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

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
    }
  }, [authUser]);


  return (
    <Routes>
      <Link
        path="/"
        element={
          <div
            id="home"
            className="h-screen font-pops w-screen overflow-hidden bg-[#141718] flex"
          >
            {/* Loading screen */}
            {loading && (
              <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            {/* Home screen */}
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
                setLoading={setLoading}
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
