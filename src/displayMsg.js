import axios from "axios";
import { StrictMode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SendMsg from "./sendMsg";

const DisMsg = ({ friend }) => {
    const [messageData, SetmessageData] = useState([]);
    const [mesUpdate, SetmesUpdate] = useState(true);
    const location = useLocation();

    const [id, setId] = useState(JSON.parse(localStorage.getItem('user')));

    const getMessage = () => {
        axios.get(`http://127.0.0.1:8000/msg/?id=${id}&id2=${friend}`).then(response => {
            // console.log('get successfully:', response.data);
            SetmessageData(response.data);
        })
            .catch(error => {
                console.error('Error    user:', error);
            });
    }

    const deleteMessage = (obj_id) => {
        axios.delete(`http://127.0.0.1:8000/msg/?id=${obj_id}`).then(response => {
            // console.log('get successfully:', response.data);
            // SetmessageData(response.data);
        })
            .catch(error => {
                console.error('Error    user:', error);
            });
    }

    ///////////////////
    const [contact, SetContact] = useState({
        "P_id": -8,
        "fname": "none",
        "mname": "k",
        "lname": "k",
        "profilePic": "/media/pic/krishna.jpg"
    }
    
    );
    const getcontacts = () => {
        axios.get(`http://127.0.0.1:8000/person?id=${friend}`).then(response => {
            console.log('get successfully fff:', response.data);
            SetContact(response.data);

        })
            .catch(error => { console.error('Error    user:', error); });
    }
    
    useEffect(() => {
        // setfriend(2)
        console.log('friend');
        getcontacts();
    },[friend])
    
    ///owener detail
    const[owner,setowner]=useState({
        "P_id": -8,
        "fname": "none",
        "mname": "k",
        "lname": "k",
        "profilePic": "/media/pic/krishna.jp"
    });
    const getOwner = () => {
        axios.get(`http://127.0.0.1:8000/person?id=${id}`).then(response => {
            console.log('get successfully fff:', response.data);
            setowner(response.data);

        })
            .catch(error => { console.error('Error    user:', error); });
    }



    useEffect(() => {
        // console.log("display msg frind")
        // console.log(friend)
        const intervalId = setInterval(() => {
            getMessage();
          }, 2000);
        
          return () => clearInterval(intervalId);
    } )
    useEffect(() => {
        // console.log("display msg frind")
        // console.log(friend)
        getMessage();
        getMessage();
    }, [friend,mesUpdate])
    useEffect(()=>{
        getOwner();
    },[])
    return (
        <>
            <div className="card-body msg_card_body">
                {messageData.map((data, index) => {
                    return (<>
                        {data.sender === friend &&
                            <div onDoubleClick={()=>{deleteMessage(data.id)}}  className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src={`http://127.0.0.1:8000${contact.profilePic}`}
                                        className="rounded-circle user_img_msg" alt="img" />
                                </div>
                                <div  onDoubleClick={()=>{deleteMessage(data.id)}}className="msg_cotainer">
                                    {  data.mes}
                                    {/* <buttonk</button> */}
                                    <span className="msg_time">8:40 AM</span>
                                </div><br></br>
                                { data.image!=null && 
                                    <img style={{height:200,width:200}} src={`http://127.0.0.1:8000${data.image}`}/>}
                            </div>
                        }
                        {data.sender === id &&
                            <div className="d-flex justify-content-end mb-4">
                                <div onDoubleClick={()=>{deleteMessage(data.id)}} className="msg_cotainer_send">
                                    {data.mes}
                                    <span className="msg_time_send">8:55 AM</span>
                                </div>
                                { data.image!=null && 
                                    <img style={{height:200,width:200}} src={`http://127.0.0.1:8000${data.image}`}/>}
                                <div onDoubleClick={()=>{deleteMessage(data.id)}} className="img_cont_msg">
                                    <img src={`http://127.0.0.1:8000${owner.profilePic}`} alt='img'
                                        className="rounded-circle user_img_msg" />
                                </div>
                            </div>
                        }
                    </>)
                })}
            </div>
            <SendMsg friend={friend} SetmesUpdate={SetmesUpdate} mesUpdate={mesUpdate} />
        </>
    );
}

export default DisMsg;
