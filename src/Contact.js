import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Con = ({setfriend,id}) => {
    
    const [contactList, SetContactList] = useState([]);
    // const[contactList,SetContactList]=useState([]);
    const getcontacts = () => {
        axios.get(`http://127.0.0.1:8000/person/`).then(response => {
            console.log('get successfully:', response.data);
            SetContactList(response.data);

        })
            .catch(error => { console.error('Error    user:', error); });
    }

    useEffect(() => {
        setfriend(2)
        console.log('friend');
        getcontacts();
    },[])
    return (
        <>
            <div className="card-body contacts_body">
                <ui className="contacts">

                    {
                        contactList.map((data, index) => {
                            if(id!=data.P_id) 
                            return (
                                <li key ={index}className="active">
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <img src={`http://127.0.0.1:8000${data.profilePic}`}
                                                className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span onClick={()=>{
                                                setfriend(data.P_id)
                                                console.log("con "+data.P_id)
                                                }}>{data.fname}</span>
                                            <p>{data.mname} is online</p>
                                        </div>
                                    </div>
                                </li>
                            )
                            return null;
                        })
                    }
                </ui>
            </div>
            <div className="card-footer"></div>
        </>)
}


export default Con;