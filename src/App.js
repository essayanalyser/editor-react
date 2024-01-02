import { useCallback, useEffect, useState } from "react";
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

import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import VersionControl from "./components/VersionControl/VersionControl";
import toast from "react-hot-toast";
import app_api from "./config/ApiConfig";

import logo from './assets/logo.svg'

import { useSelector } from "react-redux";

function App() {
  // Initialize navigation
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // State for authenticated user
  const authUser = useSelector(state => state.user.userInfo)

  // State for data that is used the statistics and editor component
  const [data, setData] = useState([]);

  // State for active document name
  const [docName, setDocName] = useState("");

  // State for document data
  const [docData, setDocData] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);

  // State for versions
  const versions = [];
  const [activeVersion, setActiveVersion] = useState("0");

  // Function to get data
  const getData = useCallback(async () => {
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
  }, [authUser, docName]);

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
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, [authUser, getData]);

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

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
    } else {
      console.log(`${authUser.email} Authorised`)
    }

  }, [authUser]);

  const DrawerWidth = 300

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContent = (
    <>
      <VersionControl
        activeVersion={activeVersion || "0"}
        setActiveVersion={setActiveVersion || "0"}
        docData={docData || []}
        currentDoc={currentDoc || null}
        setCurrentDoc={setCurrentDoc || null}
        authUser={authUser || null}
        setDocName={setDocName}
        setData={setData}
        setDocData={setDocData}
        getData={getData}
        setLoading={setLoading}
      />
    </>
  )

  return (
    <Routes>
      <Link
        path="/"
        element={
          <div
            id="home"
          >
            {/* Loading screen */}
            {loading && (
              <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            {/* Home screen */}
            <div className="home-wrapper">
              <AppBar
                position="fixed"
                sx={{
                  height: '4rem',
                  zIndex: 6,
                  right: "auto",
                  left: 0,
                  background: 'var(--clr-dark-bg)'
                }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    <div className="flex gap-2 items-center">
                      <img src={logo} alt="logo" className="h-8 w-8" />
                      <div className="text-white text-2xl font-bold">Analyser</div>
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box
                sx={{ backgroundColor: 'var(--clr-dark-bg)', width: { md: DrawerWidth }, flexShrink: { md: 0 } }}
              >
                <Drawer
                  container={document.body}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DrawerWidth },
                  }}
                >
                  {DrawerContent}
                </Drawer>
                <Drawer
                  variant="permanent"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DrawerWidth },
                  }}
                  open
                >
                  {DrawerContent}
                </Drawer>
              </Box>
              <Box
                className = 'MuiBox2'
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { md: `calc(100% - ${DrawerWidth}px)` },
                }}
              >
                <div className="analyzer-wrapper">
                  <Editor
                    handleAnalyseButtonClicked={handleAnalyseButtonClicked}
                    authUser={authUser}
                    olderVersionData={data}
                  />
                  <Statistics authUser={authUser} data={data} />
                </div>
              </Box>
            </div>
          </div>
        }
      />

      <Link Link exact path="auth" element={< AuthLayout authUser={authUser} />}>
        <Link path="login" element={<Login />} />
        <Link path="signup" element={<Signup />} />
        <Link path="user" element={<UserPage authUser={authUser} />} />
        <Link path="reset" element={<ResetPass />} />
      </Link >
    </Routes >
  );
}

export default App;
