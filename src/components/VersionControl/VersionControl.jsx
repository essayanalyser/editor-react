import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo.svg";
import NewDocModal from "../modal/NewDocModal";
import Accordion from "./Accordion";
import { FolderAddOutlined, UserOutlined } from "@ant-design/icons";

const VersionControl = ({
  activeVersion,
  setActiveVersion,
  versions,
  authUser,
  docData,
  currentDoc,
  setCurrentDoc,
  setDocName,
  setData,
  setDocData,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (versions?.length) {
  //     setActiveVersion(versions[versions.length - 1].version);
  //     setData(versions[versions.length - 1].content);
  //   }
  // }, [versions, setActiveVersion, setData]);

  const [showNewDocModal, setShowNewDocModal] = useState(false);

  const newDocButtonHandler = () => {
    setShowNewDocModal(true);
  };

  return (
    <div className="h-screen w-1/4 flex flex-col justify-between px-4 py-6">
      <div className="flex gap-2 items-center">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <div className="text-white text-2xl font-bold">Analyser</div>
      </div>
      <div className="text-xs font-bold text-gray-500 mt-4">Documents</div>
      <div className="flex h-full mb-4 flex-col gap-1 text-sm text-white overflow-y-auto hideScroll">
        {docData?.map((doc, index) => (
          <Accordion
            key={index}
            doc={doc}
            setData={setData}
            setCurrentDoc={setCurrentDoc}
            setDocName={setDocName}
            activeVersion={activeVersion}
            setActiveVersion={setActiveVersion}
            docName={currentDoc?.doc_name}
          />
        ))}
      </div>
      <div
        className="flex items-center justify-center h-16 w-full text-white border-[1px] border-gray-100 border-opacity-20 hover:bg-gray-100 hover:bg-opacity-20 text-xs rounded-md cursor-pointer"
        onClick={() => {
          newDocButtonHandler();
        }}
      >
        <div className="w-[30%] h-full text-lg flex justify-center items-center">
          <FolderAddOutlined />
        </div>
        <div className="w-[80%] h-full flex items-center">New Doc</div>
      </div>
      <div className="flex items-center justify-between mt-5 h-12 w-full">
        <div className="w-32 text-xs truncate text-white">
          {authUser?.email?.split("@")[0]}
        </div>
        {JSON.parse(localStorage.getItem("isLoggedIn")) || authUser ? (
          <div
            className="w-12 h-12 rounded-full hover:bg-white hover:bg-opacity-10 text-white flex justify-center items-center cursor-pointer"
            title={authUser?.displayName}
            onClick={() => navigate("/auth")}
          >
            <UserOutlined />
          </div>
        ) : (
          <div className="w-full justify-between flex items-center">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
          </div>
        )}
      </div>
      {showNewDocModal && (
        <NewDocModal
          setShowNewDocModal={setShowNewDocModal}
          setCurrentDoc={setCurrentDoc}
          setDocName={setDocName}
          setDocData={setDocData}
        />
      )}
    </div>
  );
};

export default VersionControl;
