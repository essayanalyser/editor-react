import React, { useEffect, useRef, useState } from "react";
import Statistics from "./Statistics";
import Button from "../Button";
import toast from "react-hot-toast";
import Saly from "../../assets/Saly-10.png";
import Icons from "../Icons";
import app_api from "../../config/ApiConfig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Box from "../../assets/box.png";

const Editor = ({
  setActiveDoc,
  setContent,
  setDocName,
  activeDoc,
  content,
  docName,
  getData,
  analysisContent,
  setAnalysisContent,
  prevAnalysisContent,
  setPrevAnalysisContent,
  setLoading,
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
    setLoading(true);
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
    setLoading(false);
  };

  const deleteVersion = (document_name, version, mode) => {
    setLoading(true);
    const user = localStorage.getItem("user");
    let v = parseInt(version);
    app_api
      .delete(`/users/${user}/${document_name}/${v}`)
      .then((res) => {
        const doc = content.find((doc) => doc.doc_name === document_name);
        if (doc) {
          getData();
          if (mode === "deleteVersion") {
            toast.success("Version Deleted Successfully!");
          }
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteDocument = (document_name) => {
    setLoading(true);
    const user = localStorage.getItem("user");
    const doc = content.find((doc) => doc.doc_name === document_name);
    doc.versions.forEach((version) => {
      deleteVersion(document_name, version.version, "deleteDocument");
    });
    setContent(content.filter((doc) => doc.doc_name !== document_name));
    setDocName("");
    setActiveDoc([]);
    toast.success("Document Deleted Successfully!");
    setLoading(false);
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

  return (
    <div className="w-full ms-16 h-full mx-auto py-6 px-10 bg-gray-100 rounded-md">
      {docName && activeDoc ? (
        <>
          <div className="w-full items-center flex justify-center">
            <div className="font-bold w-full text-2xl h-7">
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
          <div className="w-full h-[1px] my-3 rounded-full bg-gray-600 bg-opacity-25" />
          <div className="w-full h-[65%] gap-3 flex">
            <div className="w-full h-full shadow-md rounded-lg shadow-gray-500 p-5">
              {activeDoc?.versions?.length > 0 ? (
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
                              const currentDoc = content.find(
                                (doc) => doc.doc_name === docName
                              );
                              const currentVersionIndex =
                                currentDoc?.versions.findIndex(
                                  (v) =>
                                    parseInt(v.version) ===
                                    parseInt(version?.version)
                                );

                              const prevVersion =
                                currentVersionIndex > 0
                                  ? currentDoc?.versions[
                                      currentVersionIndex - 1
                                    ]
                                  : null;
                              if (prevVersion) {
                                setPrevAnalysisContent(prevVersion?.content);
                              }
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
                                    version?.version,
                                    "deleteVersion"
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
                              <p className="h-full w-full">
                                {contentItem?.sentences?.map(
                                  (sentence, index) =>
                                    sentence?.content.length > 0 &&
                                    sentence?.content !== " " &&
                                    sentence?.content !== "" &&
                                    sentence?.content !== "." && (
                                      <span
                                        key={sentence?.sentence_id}
                                        className="mb-1 text-sm"
                                      >
                                        {index !== 0 && <span> </span>}
                                        {sentence?.content}
                                      </span>
                                    )
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
                  <img
                    src={Box}
                    alt="empty"
                    className="w-24 h-24 object-cover"
                  />
                  <div className="text-gray-600 font-semibold italic text-sm">
                    No versions available
                  </div>
                </div>
              )}
            </div>
            <div className="w-full overflow-y-auto hideScroll h-full p-3 shadow-md rounded-lg shadow-gray-500">
              <Statistics
                data={analysisContent}
                prevData={prevAnalysisContent}
              />
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
      <div className="w-full py-3 h-40 flex justify-center items-center">
        <div className="w-full bg-white items-center flex h-full rounded-lg border-[1px] overflow-hidden border-gray-300 relative shadow-inner shadow-gray-300">
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
