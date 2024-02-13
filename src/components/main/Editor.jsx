import React, { useEffect, useRef, useState } from "react";
import Statistics from "./Statistics";
import Button from "../Button";
import toast from "react-hot-toast";
import Saly from "../../assets/Saly-10.png";
import Icons from "../Icons";
import app_api from "../../config/ApiConfig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({
  setActiveDoc,
  setContent,
  setDocName,
  activeDoc,
  content,
  docName,
  getData,
}) => {
  useEffect(() => {
    if (docName) {
      activeDoc = content.find((doc) => doc.doc_name === docName);
    }
  }, [getData]);

  const [typedData, setTypedData] = useState("");

  const getNewVersionID = () => {
    const currentDoc = activeDoc;
    console.log(currentDoc?.versions);
    if (!currentDoc?.versions || currentDoc?.versions?.length === 0) {
      return "0";
    }
    let id = parseInt(
      currentDoc?.versions[currentDoc?.versions.length - 1].version
    );
    id++;
    return id.toString();
  };

  const handleAnalyseButtonClicked = async () => {
    if (docName === "") {
      toast.error("Please enter a document name");
    } else {
      const user = localStorage.getItem("user");
      await app_api
        .post(`/users/`, {
          key: user,
          doc_name: docName,
          data: {
            version: getNewVersionID(),
            content: typedData,
          },
        })
        .then((res) => {
          getData();
          toast.success("Data saved successfully");
          setTypedData("");
        })
        .catch((error) => {
          toast.error("Error saving data", error);
        });
    }
  };

  const deleteVersion = (document_name, version) => {
    const user = localStorage.getItem("user");
    let v = parseInt(version);
    app_api
      .delete(`/users/${user}/${document_name}/${v}`)
      .then((res) => {
        const doc = content.find((doc) => doc.doc_name === document_name);
        if (doc) {
          getData();
          toast.success("Version Deleted Successfully!");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const deleteDocument = (document_name) => {
    const user = localStorage.getItem("user");
    const doc = content.find((doc) => doc.doc_name === document_name);
    doc.versions.forEach((version) => {
      deleteVersion(document_name, version.version);
    });
    setContent(content.filter((doc) => doc.doc_name !== document_name));
    setDocName("");
    setActiveDoc([]);
    toast.success("Document Deleted Successfully!");
  };

  const [showDocMenu, setShowDocMenu] = useState(false);
  const [showVersionMenu, setShowVersionMenu] = useState("");

  const menuRef = useRef(null);
  const versionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDocMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const [visibleVersions, setVisibleVersions] = useState([]);

  useEffect(() => {
    console.log(showVersionMenu);
  }, [showVersionMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (versionRef.current && !versionRef.current.contains(event.target)) {
        setShowVersionMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [versionRef]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [activeDoc]);

  const [analysisContent, setAnalysisContent] = useState([]);

  return (
    <div className="w-full ms-16 h-full mx-auto py-6 px-10 bg-gray-100 rounded-md">
      {docName && activeDoc ? (
        <>
          <div className="w-full items-center flex justify-center">
            <div className="font-bold w-full text-3xl">
              {activeDoc?.doc_name}
            </div>
            <div
              className={`hover:bg-gray-400 ${
                showDocMenu ? "bg-gray-400 bg-opacity-25" : ""
              } relative rounded-full cursor-pointer hover:bg-opacity-25 h-7 w-7 flex items-center justify-center text-sm mb-1`}
              onClick={() => setShowDocMenu(!showDocMenu)}
            >
              <Icons name="menu" width={16} height={16} />
              {showDocMenu && (
                <div
                  className="absolute rounded-lg text-xs gap-2 w-32 bg-gray-300 bg-opacity-60 backdrop-blur-sm animate-fade-up animate-duration-[0.5s] top-[110%] flex flex-col right-0 h-fit px-3 py-2"
                  ref={menuRef}
                >
                  <div
                    className="w-full h-full p-2 hover:bg-gray-100 hover:bg-opacity-50 rounded-lg transition-all duration-200 items-center justify-between flex"
                    onClick={() => deleteDocument(activeDoc?.doc_name)}
                  >
                    <div>Delete</div>
                    <Icons name="delete" width={16} height={16} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[1px] my-4 rounded-full bg-gray-600 bg-opacity-25" />
          <div className="w-full h-[65%] gap-3 flex">
            <div
              className="w-full h-full hideScroll overflow-y-auto"
              ref={contentRef}
            >
              {activeDoc?.versions?.map((version) => (
                <div
                  key={version?.version}
                  className="mb-4 border-b-[1px] border-gray-300 rounded-lg w-full"
                >
                  <div className="w-full px-2 justify-between flex items-center">
                    <div
                      className="font-bold w-full text-sm mb-1"
                      onClick={() => {
                        if (visibleVersions.includes(version?.version)) {
                          setVisibleVersions(
                            visibleVersions.filter(
                              (item) => item !== version?.version
                            )
                          );
                          setAnalysisContent([]);
                        } else {
                          setVisibleVersions([
                            ...visibleVersions,
                            version?.version,
                          ]);
                          setAnalysisContent(version?.content);
                        }
                      }}
                    >
                      Version {version?.version}
                    </div>
                    <div
                      className={`hover:bg-gray-400 ${
                        showVersionMenu === version?.version
                          ? "bg-gray-400 bg-opacity-25"
                          : ""
                      } relative rounded-full cursor-pointer hover:bg-opacity-25 h-7 w-7 flex items-center justify-center text-sm mb-1`}
                      ref={versionRef}
                      onClick={() => {
                        setShowVersionMenu(
                          showVersionMenu === version?.version
                            ? ""
                            : version?.version
                        );
                      }}
                    >
                      <div className="z-10">
                        <Icons name="menu" width={16} height={16} />
                      </div>
                      {showVersionMenu === version?.version && (
                        <div
                          className="absolute z-50 rounded-lg text-xs gap-2 w-32 bg-gray-300 bg-opacity-60 backdrop-blur-sm animate-fade-up animate-duration-[0.5s] top-[110%] flex flex-col right-0 h-fit px-3 py-2"
                          ref={versionRef}
                        >
                          <div
                            className="w-full h-full p-2 hover:bg-gray-100 hover:bg-opacity-50 rounded-lg transition-all duration-200 items-center justify-between flex"
                            onClick={() => {
                              const user = localStorage.getItem("user");
                              navigator.clipboard.writeText(
                                version?.content.map((contentItem) =>
                                  contentItem?.sentences
                                    .map((sentence) => sentence?.content)
                                    .join(" ")
                                )
                              );
                              toast.success("Copied to clipboard");
                            }}
                          >
                            <div>Copy</div>
                            <Icons name={"copy"} width={16} height={16} />
                          </div>
                          <div
                            className="w-full h-full p-2 hover:bg-gray-100 hover:bg-opacity-50 rounded-lg transition-all duration-200 items-center justify-between flex"
                            onClick={() =>
                              deleteVersion(
                                activeDoc?.doc_name,
                                version?.version
                              )
                            }
                          >
                            <div>Delete</div>
                            <Icons name={"delete"} width={16} height={16} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {visibleVersions.includes(version?.version) && (
                    <div className="bg-white border border-gray-300 p-3 rounded-md">
                      <div className="font-bold">You: </div>
                      {version?.content?.map((contentItem, index) => (
                        <div key={index} className="flex h-full w-full">
                          <div className="flex flex-col h-full w-full">
                            {contentItem?.sentences?.map(
                              (sentence) =>
                                sentence?.content.length > 0 &&
                                sentence?.content !== " " &&
                                sentence?.content !== "" &&
                                sentence?.content !== "." && (
                                  <div
                                    key={sentence?.sentence_id}
                                    className="mb-1 text-sm"
                                  >
                                    {sentence?.content}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full overflow-y-auto hideScroll h-full p-3">
              <Statistics data={analysisContent} />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[75%] flex flex-col items-center justify-center bg-white rounded-lg border-gray-300  border-[1px]">
          <img
            src={Saly}
            alt="Logo"
            className="h-64 animate-fade-up animate-duration-[0.5s] -mt-10 w-fit"
          />
          <div className="mt-5 font-bold text-gray-700 animate-fade-up animate-duration-[0.5s] animate-delay-[0.15s]">
            WELCOME TO
          </div>
          <div className="mt-2 flex flex-col items-center justify-center text-3xl font-bold">
            <div className="text-black animate-fade-up animate-duration-[0.5s] animate-delay-[0.3s] italic -mb-2">
              ESSAY
            </div>
            <div className="text-[#0C21C1] animate-fade-up animate-duration-[0.5s] animate-delay-[0.45s]">
              ANALYZER
            </div>
          </div>
        </div>
      )}
      <div className="w-full py-3 h-36 flex justify-center items-center">
        <div className="w-full bg-white items-center flex h-full rounded-lg border-[1px] overflow-hidden border-gray-300 relative">
          <div className="w-[85%] h-full overflow-y-auto">
            <CKEditor
              editor={ClassicEditor}
              data={typedData}
              config={{ toolbar: [], placeholder: "Enter your essay..." }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTypedData(data);
              }}
            />
          </div>
          <div className="w-[15%] px-5 absolute flex justify-center items-center right-0 top-0 h-full">
            <Button
              onClick={() => {
                handleAnalyseButtonClicked();
              }}
              icon={"analyze"}
            >
              Analyze
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
