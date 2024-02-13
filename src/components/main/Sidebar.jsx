import React, { useEffect, useRef, useState } from "react";
import Saly from "../../assets/Saly-10.png";
import Icon from "../Icons";
import Icons from "../Icons";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddModal from "./AddModal";

const Sidebar = ({
  content,
  setContent,
  user,
  setUser,
  activeDoc,
  setActiveDoc,
  setDocName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        setContent([]);
        setActiveDoc([]);
        navigate("/");
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Couldn't log out");
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);

  const [filteredContent, setFilteredContent] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (content) {
      setFilteredContent(content);
    }
  }, [content]);

  return (
    <>
      <div
        className="h-full animate-fade-right animate-duration-[0.5s] z-40 fixed w-fit left-0 top-0 flex justify-center items-center p-3 bg-[#000842] transition-all duration-300 hideScroll border-r-[1px] border-secondary-500 border-opacity-60"
        ref={sidebarRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className={`${
            isOpen ? "w-48" : "w-16"
          } transition-all duration-300 flex flex-col justify-between items-center h-full`}
        >
          <div className="h-full w-full flex flex-col items-center justify-between gap-2">
            <div className="w-full flex justify-between items-center h-fit">
              <div className="h-16 w-16 flex items-center justify-center">
                <img src={Saly} alt="Logo" className="h-14 w-14 scale-90" />
              </div>
              {isOpen && (
                <div className="w-full h-full animate-fade-left animate-delay-[0.25s] -mb-3 font-bold italic text-lg items-center justify-center flex flex-col">
                  <div className="w-full -mb-4 text-white">ESSAY</div>
                  <div className="w-full z-10 text-[#0C21C1]">ANALYSER</div>
                </div>
              )}
            </div>
            {isOpen && (
              <>
                <div className="w-[90%] h-[1px] rounded-full bg-white bg-opacity-20" />
                <div className="flex h-full hideScroll py-5 overflow-y-auto flex-col gap-2 w-full">
                  <div className="text-white text-opacity-70 font-bold">
                    Documents
                  </div>
                  <div className="w-full flex items-center px-2 bg-gray-50 bg-opacity-5  text-white rounded-lg overflow-hidden">
                    <Icon name="search" width={14} height={14} />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        const filtered = content.filter((doc) => {
                          return doc?.doc_name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase());
                        });
                        setFilteredContent(filtered);
                      }}
                      placeholder="Search document..."
                      className="w-full h-full text-xs bg-transparent outline-none p-3"
                    />
                    <div
                      onClick={() => {
                        setSearch("");
                        setFilteredContent(content);
                      }}
                      className="p-1 rounded-full hover:bg-gray-50 hover:bg-opacity-15 cursor-pointer"
                    >
                      <Icon name="cross" width={14} height={14} />
                    </div>
                  </div>
                  <div className="flex h-full hideScroll py-2 overflow-y-auto flex-col gap-2 w-full">
                    {filteredContent?.map((doc, index) => {
                      return (
                        <div
                          key={index}
                          className={`bg-gray-50 w-full relative bg-opacity-15 hover:bg-opacity-25 min-h-14 flex items-center text-white justify-center gap-3 ${
                            isOpen && "px-3"
                          } cursor-pointer rounded-lg`}
                          onClick={() => {
                            setActiveDoc(doc);
                            setDocName(doc?.doc_name);
                          }}
                        >
                          <div className="w-full truncate text-xs font-semibold">
                            {doc?.doc_name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <div className="w-full flex hideScroll flex-col gap-3 items-center justify-center">
              <div
                className="bg-gray-50 cursor-pointer w-full items-center justify-center bg-opacity-15 hover:bg-opacity-25 rounded-lg flex"
                onClick={() => {
                  setActiveDoc([]);
                  setShowAddModal(true);
                }}
              >
                <div className="h-14 w-14 text-lg text-white flex items-center justify-center">
                  <Icon name="newDoc" width={14} height={14} />
                </div>
                {isOpen && (
                  <div className="text-white w-full px-2 text-sm truncate">
                    New Document
                  </div>
                )}
              </div>
              <div
                className="bg-gray-50 w-full cursor-pointer items-center justify-center bg-opacity-15 hover:bg-opacity-25 rounded-lg flex"
                onClick={handleSignOut}
              >
                <div className="h-14 w-14 text-lg text-white flex items-center justify-center">
                  <Icon name="logout" width={14} height={14} />
                </div>
                {isOpen && (
                  <div className="text-white w-full px-2 text-sm truncate">
                    Log out
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddModal && (
        <AddModal
          setShowAddModal={setShowAddModal}
          setDocName={setDocName}
          setContent={setContent}
        />
      )}
    </>
  );
};

export default Sidebar;
