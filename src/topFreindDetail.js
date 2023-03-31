import axios from "axios";
import { useEffect, useState } from "react";

const FriendDetailTop = ({friend,id}) => {
    const [contact, SetContact] = useState({
        "P_id": -8,
        "fname": "none",
        "mname": "k",
        "lname": "k",
        "profilePic": "/media/pic/krishna.jpg"
    }
    
    );
    // const[contact,SetContact]=useState([]);
    const getcontacts = () => {
        axios.get(`http://127.0.0.1:8000/person?id=${friend}`).then(response => {
            console.log('get successfully fff:', response.data);
            SetContact(response.data);

        })
            .catch(error => { console.error('Error    user:', error); });
    }

    const videoCamera = () => {
        window.location.replace(`http://127.0.0.1:8000/first?id=${id}&id1=${friend}`);
    }

    useEffect(() => {
        // setfriend(2)
        console.log('friend');
        getcontacts();
    },[friend])

    return (
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">

                {/* <!-- receiver image --> */}
                <div className="img_cont">
                    <img src={`http://127.0.0.1:8000${contact.profilePic}`}
                        className="rounded-circle user_img" />
                    <span className="online_icon"></span>
                </div>
                {/* <!-- receiver data --> */}
                <div className="user_info">
                    <span>Chat with {contact.fname}</span>
                    <p>Messages</p>
                </div>
                <div className="video_cam">
                    <span onClick={()=>{videoCamera()}}><i className="fas fa-video"></i></span>
                    {/* <span><i className="fas fa-phone"></i></span> */}
                </div>
            </div>

            {/* <!-- 3 dot --> */}
            <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
            <div className="action_menu">
                <ul>
                    <li><i className="fas fa-user-circle"></i> View profile</li>
                    <li><i className="fas fa-users"></i> Add to close friends</li>
                    <li><i className="fas fa-plus"></i> Add to group</li>
                    <li><i className="fas fa-ban"></i> Block</li>
                </ul>
            </div>

        </div>
    );
}


export default FriendDetailTop;