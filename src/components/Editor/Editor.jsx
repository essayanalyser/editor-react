import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./../../stylesheets/editor.css";

export default function Editor({ handleAnalyseButtonClicked, authUser }) {
  const [typedData, setTypedData] = useState("");

  return (
    <div className="h-full w-full flex relative justify-center items-center">
      <div className="h-full w-full flex justify-center items-center">
        <CKEditor
          editor={ClassicEditor}
          data={typedData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setTypedData(data);
          }}
          config={{ placeholder: "Start Typing..." }}
        />
      </div>
      <div className="absolute bottom-5 right-5">
        <button
          className="application-button"
          onClick={() => handleAnalyseButtonClicked(typedData)}
        >
          Analyse
        </button>
      </div>
    </div>
  );
}
