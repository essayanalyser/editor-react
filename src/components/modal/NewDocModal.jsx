import React, { useState } from "react";

const NewDocModal = ({
  setShowNewDocModal,
  setCurrentDoc,
  setDocName,
  setDocData,
}) => {
  const [value, setValue] = useState("");
  const changeCurrentDoc = () => {
    setDocName(value);
    setCurrentDoc(value);
    setShowNewDocModal(false);
    setDocData((prev) => [...prev, { doc_name: value, versions: [] }]);
  };
  return (
    <div className="h-screen fixed top-0 left-0 z-50 w-screen bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/3 h-28 bg-white relative rounded-xl flex justify-center items-center p-3">
        <div className="flex flex-col justify-between h-full px-3 py-1 w-full">
          <span className="text-[#0084FF] font-bold text-lg">New Document</span>
          <div
            onClick={() => {
              setShowNewDocModal(false);
            }}
            className="absolute top-3 right-3 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" />
            </svg>
          </div>
          <div className="w-full flex gap-4">
            <input
              type="text"
              placeholder="Enter new document name"
              className="border-[1px] w-[80%] text-gray-700 text-sm border-gray-100 rounded-md px-3 p-2"
              style={{ boxShadow: "inset 0px 0px 5px 0px rgba(0,0,0,0.25)" }}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="w-[20%] rounded-md bg-[#0084FF] text-white"
              onClick={() => {
                changeCurrentDoc();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDocModal;
