import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import NewDocModal from "../modal/NewDocModal";
import Accordion from "./Accordion";
import { FolderAddOutlined, UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import app_api from "../../config/ApiConfig";
import DeleteVersionModal from "../modal/DeleteVersionModal";

const VersionControl = ({
  activeVersion,
  setActiveVersion,
  authUser,
  docData,
  currentDoc,
  setCurrentDoc,
  setDocName,
  setData,
  setDocData,
  getData,
  setLoading,
}) => {

  // State for new document modal visibility
  const [showNewDocModal, setShowNewDocModal] = useState(false);

  // Function to handle new document button click
  const newDocButtonHandler = () => {
    setShowNewDocModal(true);
  };

  // const deleteDoc = (document_name) => {
  //   app_api
  //     .delete(`/users/${authUser.email}/${document_name}`)
  //     .then((res) => {
  //       getData();
  //       toast.success("Document Deleted Successfully!");
  //       setCurrentDoc(null);
  //       setDocName("");
  //       setData([]);
  //       setDocData([]);
  //     })
  //     .catch((err) => toast.error(err.message));
  // };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState({
    doc_name: "",
    version: "",
  });

  const deleteVersion = (document_name, version) => {
    setLoading(true);
    let v = parseInt(version);
    const d = docData.filter((doc) => doc.doc_name === document_name)[0];
    if (d.versions.length === 1) {
      setCurrentDoc(null);
      setDocName("");
      setActiveVersion("");
      setData([]);
    } else {
      setCurrentDoc(d);
      setDocName(d.doc_name);
      const av = String(d.versions.length - 2);
      setActiveVersion(av);
      setData(d.versions[av].content);
    }
    app_api
      .delete(`users/${authUser.email}/${document_name}/${v}`)
      .then((res) => {
        getData();
        toast.success("Version Deleted Successfully!");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <div className="text-white text-2xl font-bold">Analyser</div>
      </div>
      <div className="text-xs font-bold text-gray-500 mt-4">Documents</div>
      <div className="flex h-full my-4 flex-col gap-1 text-sm text-white overflow-y-auto hideScroll">
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
            // deleteDoc={deleteDoc}
            setToDelete={setToDelete}
            setShowDeleteModal={setShowDeleteModal}
          />
        ))}
      </div>
      <div
        className="flex items-center justify-center h-16 w-full text-white border-[1px] border-gray-100 border-opacity-20 hover:bg-gray-100 hover:bg-opacity-20 text-sm rounded-md cursor-pointer"
        onClick={() => {
          newDocButtonHandler();
        }}
      >
        <div className="w-[30%] h-full text-lg flex justify-center items-center">
          <FolderAddOutlined />
        </div>
        <div className="w-[80%] h-full flex items-center">New Doc</div>
      </div>
      <div
        className="mt-5 h-12 w-full"
      >
        {authUser ? (
          <Link
            className="flex p-1 gap-4 hover:bg-gray-100 hover:bg-opacity-20 cursor-pointer rounded-md"
            to='auth'
            title={authUser?.displayName}
          >
            <div
              className="text-white flex justify-center items-center"
            >
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 cursor-pointer flex justify-center items-center overflow-hidden">
                {
                  authUser.photoURL ?
                    <img src={authUser.photoURL} alt={authUser.name} />
                    :
                    <UserOutlined />
                }
              </div>
            </div>
            <div className="truncate text-white flex items-center">
              {authUser?.displayName}
            </div>
          </Link>
        ) : (
          <div className="w-full px-2 text-white flex justify-evenly items-center">
            <Link to="/auth/login">
              <div className="hover:text-gray-300 border-[1px] border-gray-100 border-opacity-20 py-2 px-4 rounded cursor-pointer">
                Log in
              </div>
            </Link>
            <Link to="/auth/signup">
              <div className="bg-white hover:bg-opacity-80 border-[1px] border-white color-application py-2 px-4 rounded cursor-pointer">
                Sign up
              </div>
            </Link>
          </div>
        )}
      </div>
      {showNewDocModal && (
        <NewDocModal
          setShowNewDocModal={setShowNewDocModal}
          setCurrentDoc={setCurrentDoc}
          setDocName={setDocName}
          setDocData={setDocData}
          setData={setData}
        />
      )}
      {showDeleteModal && (
        <DeleteVersionModal
          setShowDeleteModal={setShowDeleteModal}
          toDelete={toDelete}
          setToDelete={setToDelete}
          deleteVersion={deleteVersion}
        />
      )}
    </>
  );
};

export default VersionControl;
