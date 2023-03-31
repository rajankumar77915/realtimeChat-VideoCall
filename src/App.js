import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Con from './Contact';
import DisMsg from './displayMsg';
import Search from './search';
import SendMsg from './sendMsg';

import FriendDetailTop from './topFreindDetail';



function App() {
    const location = useLocation();
    const [id, setId] = useState(JSON.parse(localStorage.getItem('user')));
    const [friend, setfriend] = useState(1);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const searchParams =localStorage.getItem('user');
    //     setId(JSON.parse(localStorage.getItem('user')));
    // }, [location]);
    
    useEffect(() => {
        if (id === null) {
            navigate(`/`);
        }
        else{
            navigate('/app')
        }
    }, [id, navigate]);


    return (
        id?
        <body>
        <Link to="/Logout">Logout</Link>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat">
                        <div className="card mb-sm-3 mb-md-0 contacts_card">

                            {/* <!-- search --> */}
                            <Search />

                            {/* <!-- contact --> */}

                            <Con setfriend={setfriend} id={id}/>

                        </div>
                    </div>

                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card">

                            {/*  to whom send message at seen hearder */}
                            <FriendDetailTop friend={friend} id={id}/>

                            {/* {display message} */}

                            <DisMsg friend={friend}/>

                            {/* <!-- message --> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </body>
        :null
    )

}

export default App;





















