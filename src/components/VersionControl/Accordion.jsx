import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const Accordion = ({
  doc,
  setData,
  setCurrentDoc,
  setDocName,
  activeVersion,
  setActiveVersion,
  docName,
  // deleteDoc,
  setToDelete,
  setShowDeleteModal,
}) => {
  // State for accordion open status
  const [isOpen, setIsOpen] = useState(false);

  // const [isHovered, setIsHovered] = useState(false);x
  const [versionHovered, setVersionHovered] = useState(-1);

  // Effect to set open status based on doc name. If doc name matches, open accordion
  useEffect(() => {
    if (doc.doc_name === docName) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [doc.doc_name, docName]);

  const handleClick = () => {
    if (isOpen) {
      setCurrentDoc(null);
      setDocName("");
    } else {
      setCurrentDoc(doc);
      setDocName(doc.doc_name);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`cursor-pointer py-3 px-4 hover:bg-gray-200 hover:bg-opacity-20 ${
          isOpen && "bg-gray-200 bg-opacity-30"
        } transition-colors rounded-lg duration-200 ease-in-out flex items-center justify-between`}
        onClick={() => handleClick()}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-3 w-3 transition-transform duration-200 ease-in-out ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="text-xs w-32 truncate">
            {doc.doc_name === "" ? "untitled" : doc.doc_name}
          </span>
        </div>
        {/* {isHovered ? (
          <div
            className="h-6 w-6 flex justify-center items-center hover:bg-gray-200 hover:bg-opacity-10 rounded-full"
            onClick={() => {
              deleteDoc(doc.doc_name);
            }}
          >
            <DeleteOutlined />
          </div>
        ) : (
          <div className="h-6 w-6" />
        )} */}
      </div>
      {isOpen && (
        <div className="ms-4">
          {doc?.versions?.map((version, i) => (
            <div
              key={i}
              onClick={() => {
                setData(version.content);
                setActiveVersion(version.version);
              }}
              className={`py-2 px-4 flex hover:bg-opacity-20 items-center justify-between hover:bg-gray-50 ${
                activeVersion === version.version && "bg-gray-50 bg-opacity-10"
              } rounded-lg cursor-pointer text-xs  transition-colors duration-200 ease-in-out`}
              onMouseEnter={() => setVersionHovered(i)}
              onMouseLeave={() => setVersionHovered(-1)}
            >
              Version {i}
              {versionHovered === i ? (
                <div
                  className="h-6 w-6 flex justify-center items-center hover:bg-gray-200 hover:bg-opacity-10 rounded-full"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setToDelete({
                      doc_name: doc.doc_name,
                      version: version.version,
                    });
                  }}
                >
                  <DeleteOutlined />
                </div>
              ) : (
                <div className="h-6 w-6" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Accordion;
