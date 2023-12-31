import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./../../stylesheets/editor.css";
import { ToolOutlined } from "@ant-design/icons";

export default function Editor({
  handleAnalyseButtonClicked,
  authUser,
  olderVersionData,
}) {
  // State for typed data
  const [typedData, setTypedData] = useState("");

  // Function to modify data
  const modify = (data) => {
    let output = "";
    data.forEach((item) => {
      output += "<p>";
      item.sentences.forEach((sentence) => {
        output += `${sentence.content} `;
      });
      output += "</p></br>";
    });
    return output;
  };

  // Effect to set typed data when olderVersionData changes
  useEffect(() => {
    if (olderVersionData) {
      setTypedData(modify(olderVersionData));
    }
  }, [olderVersionData]);

  return (
    <div id="editor-wrapper">
      <div className="h-full w-full text-sm flex justify-center items-center">
        <CKEditor
          editor={ClassicEditor}
          data={typedData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setTypedData(data);
          }}
          config={{
            placeholder: "Start Typing...",
          }}
        />
      </div>
      <div className="absolute bottom-5 right-7">
        <button
          className="bg-[#0084FF] text-sm gap-2 flex items-center hover:scale-105 active:scale-95 text-white px-4 py-2 rounded-md"
          onClick={() => handleAnalyseButtonClicked(typedData)}
        >
          <ToolOutlined />
          Analyse
        </button>
      </div>
    </div>
  );
}
