import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SendMsg from "./sendMsg";

const DisMsg = ({ friend }) => {
  const [messageData, SetmessageData] = useState([]);
  const [mesUpdate, SetmesUpdate] = useState(true);
  const [contact, SetContact] = useState({
    "P_id": -8,
    "fname": "none",
    "mname": "k",
    "lname": "k",
    "profilePic": "/media/pic/krishna.jpg"
  });
  const [owner, setowner] = useState({
    "P_id": -8,
    "fname": "none",
    "mname": "k",
    "lname": "k",
    "profilePic": "/media/pic/krishna.jp"
  });

  const id = JSON.parse(localStorage.getItem('user'));
  const messageContainerRef = useRef(null);

  const getMessage = () => {
    axios.get(`http://127.0.0.1:8000/msg/?id=${id}&id2=${friend}`)
      .then(response => {
        SetmessageData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const deleteMessage = (obj_id) => {
    axios.delete(`http://127.0.0.1:8000/msg/?id=${obj_id}`)
      .then(response => {
        // Handle the deletion as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getcontacts = () => {
    axios.get(`http://127.0.0.1:8000/person?id=${friend}`)
      .then(response => {
        SetContact(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getcontacts();
  }, [friend]);

  const getOwner = () => {
    axios.get(`http://127.0.0.1:8000/person?id=${id}`)
      .then(response => {
        setowner(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getMessage();
    const intervalId = setInterval(() => {
      getMessage();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [friend, mesUpdate]);

  useEffect(() => {
    getOwner();
  }, []);

  useEffect(() => {
    // Scroll the message container to the bottom after rendering messages
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messageData]);

  return (
    <>
      <div ref={messageContainerRef} className="card-body msg_card_body">
        {messageData.map((data, index) => {
          return (
            <>
              {data.sender === friend &&
                <div onDoubleClick={() => { deleteMessage(data.id) }} className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src={`http://127.0.0.1:8000${contact.profilePic}`} className="rounded-circle user_img_msg" alt="img" />
                  </div>
                  <div onDoubleClick={() => { deleteMessage(data.id) }} className="msg_cotainer">
                    {data.mes}
                    <span className="msg_time"></span>
                  </div><br />
                  {data.image != null &&
                    <img style={{ height: 200, width: 200 }} src={`http://127.0.0.1:8000${data.image}`} />}
                </div>
              }
              {data.sender === id &&
                <div className="d-flex justify-content-end mb-4">
                  <div onDoubleClick={() => { deleteMessage(data.id) }} className="msg_cotainer_send">
                    {data.mes}
                    <span className="msg_time_send"></span>
                  </div>
                  {data.image != null &&
                    <img style={{ height: 200, width: 200 }} src={`http://127.0.0.1:8000${data.image}`} />}
                  <div onDoubleClick={() => { deleteMessage(data.id) }} className="img_cont_msg">
                    <img src={`http://127.0.0.1:8000${owner.profilePic}`} alt='img' className="rounded-circle user_img_msg" />
                  </div>
                </div>
              }
            </>
          )
        })}
      </div>
      <SendMsg friend={friend} SetmesUpdate={SetmesUpdate} mesUpdate={mesUpdate} />
    </>
  );
}

export default DisMsg;
