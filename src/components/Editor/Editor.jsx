import React, { useState,useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import "./../../stylesheets/editor.css"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
let version 
export default function Editor({ handleAnalyseButtonClicked, authUser }) {
    const navigate = useNavigate()
    const [typedData, setTypedData] = useState('');
    useEffect(()=>{
        // Get data if authenticated
        if(authUser){
            axios
			 .get(`http://localhost:8000/api/users/${authUser.email}/`)
			 .then((res)=>{
				version = res.data[0];
                console.log(res.data[0]);
			 })
			 .catch((err)=>{})
        }
    })
    
    return (
        <div className="editor">
            <div className="titleWrapper">
                <h2>Analyser</h2>
                <div className="authSection">
                    {
                        (JSON.parse(localStorage.getItem('isLoggedIn')) || authUser) ?
                        <div className="userInfo" title={authUser?.displayName} onClick={()=>navigate('/auth')}>
                            <FontAwesomeIcon icon={faUser} />
                            
                        </div>
                            :
                            <>
                                <Link to='/auth/login'>Login</Link>
                                <Link to='/auth/signup'>Signup</Link>
                            </>
                    }
                </div>
            </div>

            <div className="editorWrapper">
                <CKEditor
                    editor={ClassicEditor}
                    data={typedData}
                    
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setTypedData(data)
                    }}

                    config={{ placeholder: "Start Typing..." }}
                />
                <div className="submitButtonWrapper">
                    <button className='application-button' onClick={() => handleAnalyseButtonClicked(typedData)}>Analyse</button>
                </div>
            </div>

        </div>
    );
}

export {version}