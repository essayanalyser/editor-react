import React, { useEffect, useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";

const AddModal = ({ setShowAddModal, setDocName, setContent }) => {
  const [doc, setDoc] = useState("");
  const handleAdd = () => {
    if (doc === "") {
      toast.error("Please enter a document name");
      return;
    }
    setShowAddModal(false);
    setDocName(doc);
    setContent((prev) => [
      ...prev,
      {
        doc_name: doc,
        versions: [],
      },
    ]);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        setShowAddModal(false);
        setDocName("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowAddModal, setDocName]);

  return (
    <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm bg-opacity-60 flex justify-center items-center p-5">
      <div className="bg-white animate-fade-up animate-duration-[0.5s] flex flex-col w-1/2 gap-6 rounded-xl border-2 shadow-lg">
        <div className="relative items-center flex justify-center text-white bg-[#000842] p-5 rounded-t-xl h-full w-full">
          <div className="text-xl w-full font-medium">Document name</div>
        </div>
        <div className="flex flex-col px-3 pb-3 justify-center items-center gap-2">
          <div className="text-sm text-gray-500 w-full">
            Enter the title for the new document you want to create
          </div>
          <input
            className="w-full rounded-lg outline-none text-sm border-[1px] border-gray-300 px-1 py-2"
            placeholder="Document name . . ."
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
          />
          <div className="mt-5 w-full">
            <Button onClick={() => handleAdd()} icon="add">
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
