import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor() {
    const [typedData, setTypedData] = useState('');

    return (
        <div className="editor">
            <h2>Welcome to the site !</h2>
            <CKEditor
                editor={ClassicEditor}
                data={typedData}

                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}

                onChange={(event, editor) => {
                    const data = editor.getData();
                    setTypedData(data)
                }}

                config={{ placeholder: "Start typing..." }}
            />
        </div>
    );

}