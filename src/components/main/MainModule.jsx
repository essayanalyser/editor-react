import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import Editor from "./Editor";
import app_api from "../../config/ApiConfig";

const MainModule = ({ setIsLoggedIn, user, setUser, setLoading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  const [content, setContent] = useState([]);
  const [activeDoc, setActiveDoc] = useState([]);
  const [docName, setDocName] = useState("");

  const getData = async () => {
    setLoading(true);
    if (!user) {
      if (localStorage.getItem("user")) {
        setUser(localStorage.getItem("user"));
        let historyuser = localStorage.getItem("user");
        await app_api.get(`/users/${historyuser}`).then((res) => {
          setContent(res.data);
          toast.success("Data fetched successfully");
        });
      }
    } else {
      await app_api.get(`/users/${user}`).then((res) => {
        setContent(res.data);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (docName !== "") {
      setActiveDoc(content.find((doc) => doc.doc_name === docName));
    }
  }, [content, docName]);

  const [analysisContent, setAnalysisContent] = useState([]);
  const [prevAnalysisContent, setPrevAnalysisContent] = useState([]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Sidebar
        content={content}
        setContent={setContent}
        user={user}
        setUser={setUser}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        setDocName={setDocName}
        setAnalysisContent={setAnalysisContent}
        setLoading={setLoading}
      />
      <Editor
        setActiveDoc={setActiveDoc}
        setDocName={setDocName}
        setContent={setContent}
        activeDoc={activeDoc}
        content={content}
        docName={docName}
        getData={getData}
        analysisContent={analysisContent}
        setAnalysisContent={setAnalysisContent}
        prevAnalysisContent={prevAnalysisContent}
        setPrevAnalysisContent={setPrevAnalysisContent}
        setLoading={setLoading}
      />
    </div>
  );
};

export default MainModule;
