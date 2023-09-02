import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import "./../../stylesheets/editor.css"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Editor({ handleAnalyseButtonClicked, authUser }) {
    const navigate = useNavigate()
    const [typedData, setTypedData] = useState('');

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

                    config={{ placeholder: "Start typing..." }}
                />
                <div className="submitButtonWrapper">
                    <button className='application-button' onClick={() => handleAnalyseButtonClicked(typedData)}>Analyse</button>
                </div>
            </div>

        </div>
    );

}