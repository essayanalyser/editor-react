import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo.svg";

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
  return (
    <div className="h-screen w-1/4 flex flex-col justify-between px-4 py-6">
      <div className="flex gap-2 items-center">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <div className="text-white text-2xl font-bold">Analyser</div>
      </div>
      <div className="flex h-full my-4 flex-col gap-1 text-sm text-white overflow-y-auto">
        {versions?.map((version) => (
          <div key={version.version}>
            <button
              className={`${
                activeVersion === version.version
                  ? "bg-gray-100 bg-opacity-30"
                  : "hover:bg-gray-50 bg-opacity-30"
              } w-full flex justify-start px-4 items-center py-2 rounded-md`}
              onClick={() => {
                setActiveVersion(version.version);
                setData(version.content);
              }}
            >
              Version : {version.version}
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between h-12 w-full">
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
    </div>
  );
};

export default VersionControl;
