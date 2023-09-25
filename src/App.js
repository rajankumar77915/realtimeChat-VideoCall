import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import './App.css';
import DisMsg from './displayMsg';


import FriendDetailTop from './topFreindDetail';
import Con from './contact';



function App() {
    const id = JSON.parse(localStorage.getItem('user'));
    const [friend, setfriend] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === null) {
            navigate(`/`);
        }
        else {
            navigate('/app')
        }
    }, [id, navigate]);


    return (
        id ?
            <body>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <Link className='link' to="/Logout" style={{ fontSize: '20px', background: 'yellow', color: 'red', textDecoration: 'none', padding: '10px 15px', borderRadius: '5px' }}>
                        Logout
                    </Link>
                    <a className='link' href={`http://127.0.0.1:8000/person_update/${id}`} style={{ marginLeft: '12px', background: 'yellow', color: 'purple', textDecoration: 'none', fontSize: '20px', padding: '10px 15px', borderRadius: '5px' }}>
                        Update
                    </a>
                    <a className='link' href={`http://127.0.0.1:8000/person_detail/${id}`} style={{ marginLeft: '12px', background: 'yellow', color: 'purple', textDecoration: 'none', fontSize: '20px', padding: '10px 15px', borderRadius: '5px' }}>
                        profile
                    </a>
                    <a className='link' href={`http://127.0.0.1:8000/person_delete/${id}`} style={{ marginLeft: '12px', background: 'yellow', color: 'purple', textDecoration: 'none', fontSize: '20px', padding: '10px 15px', borderRadius: '5px' }}>
                        delete acc
                    </a>
                </div>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-4 col-xl-3 chat">
                            <div className="card mb-sm-3 mb-md-0 contacts_card">

                                {/* <!-- search --> */}
                                {/* <Search /> */}

                                {/* <!-- contact --> */}

                                <Con setfriend={setfriend} id={id} />

                            </div>
                        </div>

                        <div className="col-md-8 col-xl-6 chat">
                            <div className="card">

                                {/*  to whom send message at seen hearder */}
                                <FriendDetailTop friend={friend} id={id} />

                                {/* {display message} */}

                                <DisMsg friend={friend} />

                                {/* <!-- message --> */}

                            </div>
                        </div>
                    </div>
                </div>
            </body>
            : <h1>Not Login</h1>
    )

}

export default App;





















