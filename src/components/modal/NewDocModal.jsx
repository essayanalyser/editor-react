import React, { useState } from "react";
import toast from "react-hot-toast";

const NewDocModal = ({
  setShowNewDocModal,
  setCurrentDoc,
  setDocName,
  setDocData,
  setData,
}) => {
  // State for new doc name
  const [value, setValue] = useState("");

  const [error, setError] = useState(false);

  // Function to change current doc name and add new doc to docData temporarily (until saved)
  const changeCurrentDoc = () => {
    if (value === "") {
      setError(true);
      toast.error("Document name cannot be empty!");
      return;
    }
    setDocName(value);
    setCurrentDoc(value);
    setShowNewDocModal(false);
    setData([]);
    setDocData((prev) => [...prev, { doc_name: value, versions: [] }]);
  };
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-sky-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add Document
                  </h3>
                </div>
              </div>
              <div className="my-2 flex flex-col">
                <label
                  htmlFor="docName"
                  className={`text-xs transition-all duration-200 ms-1 -mb-1 z-10 bg-white w-fit ${
                    error ? "text-red-600" : "text-sky-600"
                  }`}
                >
                  Document name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter the new document name"
                    className={`w-full active:outline-none transition-all duration-200 focus:outline-none border-[1px] border-gray-200 placeholder:text-opacity-10 rounded-md px-2 py-2 text-xs ${
                      error && "border-red-500"
                    }`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={() => setError(false)}
                  />
                  {error && (
                    <div className="absolute text-[0.5rem] text-red-600 right-0 top-0 p-2 justify-center items-center flex w-fit h-full">
                      required
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                onClick={() => changeCurrentDoc()}
              >
                Add
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowNewDocModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDocModal;
