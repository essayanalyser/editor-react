import React, { useEffect, useState } from "react";

const Accordion = ({
  doc,
  setData,
  setCurrentDoc,
  setDocName,
  activeVersion,
  setActiveVersion,
  docName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (doc.doc_name === docName) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [doc.doc_name, docName]);

  return (
    <div className="border-b border-gray-200">
      <div
        className="cursor-pointer py-3 px-4 hover:bg-gray-200 hover:bg-opacity-20 transition-colors rounded-lg duration-200 ease-in-out flex items-center justify-between"
        onClick={() => {
          setCurrentDoc(doc);
          setDocName(doc.doc_name);
        }}
      >
        <span>{doc.doc_name === "" ? "untitled" : doc.doc_name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-6 w-6 transition-transform duration-200 ease-in-out ${
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
      </div>
      {isOpen && (
        <>
          {doc?.versions?.map((version, i) => (
            <div
              key={i}
              onClick={() => {
                setData(version.content);
                setActiveVersion(version.version);
              }}
              className="py-2 px-4 hover:bg-gray-50 hover:bg-opacity-20 transition-colors duration-200 ease-in-out"
            >
              Version {i}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Accordion;
