import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo.svg";
import NewDocModal from "../modal/NewDocModal";

const VersionControl = ({
  activeVersion,
  setActiveVersion,
  versions,
  authUser,
  setData,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (versions?.length) {
      setActiveVersion(versions[versions.length - 1].version);
      setData(versions[versions.length - 1].content);
    }
  }, [versions, setActiveVersion, setData]);

  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");

  const newDocButtonHandler = () => {
    setShowNewDocModal(true);
  };

  return (
    <div className="h-screen w-1/4 flex flex-col justify-between px-4 py-6">
      <div className="flex gap-2 items-center">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <div className="text-white text-2xl font-bold">Analyser</div>
      </div>
      <div className="flex h-full my-4 flex-col gap-1 text-sm text-white overflow-y-auto hideScroll">
        {Array.isArray(versions) &&
          versions.map((version, index) => (
            <div key={version?.version}>
              <button
                className={`${
                  activeVersion === version?.version
                    ? "bg-gray-100 bg-opacity-30"
                    : "hover:bg-gray-50 hover:bg-opacity-30"
                } w-full flex justify-start px-4 items-center py-2 rounded-md`}
                onClick={() => {
                  setActiveVersion(version?.version);
                  setData(version?.content);
                }}
              >
                Version : {index}
              </button>
            </div>
          ))}
      </div>
      <div
        className="flex items-center justify-center h-16 w-full text-white border-[1px] border-gray-100 border-opacity-20 hover:bg-gray-100 hover:bg-opacity-20 text-xs rounded-md cursor-pointer"
        onClick={() => {
          newDocButtonHandler();
        }}
      >
        <div className="w-[20%] h-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.75 11H12.5V3.75C12.5 3.33579 12.1642 3 11.75 3C11.3358 3 11 3.33579 11 3.75V11H3.75C3.33579 11 3 11.3358 3 11.75C3 12.1642 3.33579 12.5 3.75 12.5H11V19.75C11 20.1642 11.3358 20.5 11.75 20.5C12.1642 20.5 12.5 20.1642 12.5 19.75V12.5H19.75C20.1642 12.5 20.5 12.1642 20.5 11.75C20.5 11.3358 20.1642 11 19.75 11Z" />
          </svg>
        </div>
        <div className="w-[80%] h-full flex items-center">New Doc</div>
      </div>
      <div className="flex items-center justify-between mt-5 h-12 w-full">
        <div className="w-32 text-sm truncate text-white">
          {authUser?.email}
        </div>
        {JSON.parse(localStorage.getItem("isLoggedIn")) || authUser ? (
          <div
            className="userInfo"
            title={authUser?.displayName}
            onClick={() => navigate("/auth")}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <>
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
          </>
        )}
      </div>
      {showNewDocModal && (
        <NewDocModal
          setShowNewDocModal={setShowNewDocModal}
          setCurrentDoc={setCurrentDoc}
        />
      )}
    </div>
  );
};

export default VersionControl;
