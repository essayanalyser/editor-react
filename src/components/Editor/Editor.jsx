import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button} from 'reactstrap';
import axios from 'axios';

export default function Editor() {
    const [typedData, setTypedData] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
  
        axios
            .post("http://localhost:8000/api/users/", {
                title: 'Its me ',
                content: this.data,
            })
            .then((res) => {
                this.setState({
                    title: "",
                    content: "",
                });
            })
            .catch((err) => {});
    };
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
            <Button color='info' onClick={handleSubmit}>Submit</Button>
        </div>
    );

}