import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button} from 'reactstrap';
import axios from 'axios';

export default function Editor() {
    const [typedData, setTypedData] = useState('');
    useEffect(()=>{
        getAllPara()
    },[])
    const getAllPara = ()=>{
        let data;
        axios
            .get("http://localhost:8000/api/users/")
            .then((res) => {
                data = res.data;
                console.log(data)
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {});
    }
    function handleSubmit(e) {
        e.preventDefault();
  
        axios
            .post("http://localhost:8000/api/users/", {
                title: 'Its me ',
                content: typedData,
            })
            .then((res) => {
                console.log(res.data)
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
                    const sendData = editor.getData();
                    setTypedData(sendData)
                }}

                config={{ placeholder: "Start typing..." }}
            />
            <Button color='info' onClick={handleSubmit}>Submit</Button>
        </div>
    );

}