import React from "react";

const MessageItem = ({ data, contact, owner, deleteMessage, isSender }) => {
  console.log(owner)
    return (
    <div className={`d-flex justify-content-${isSender ? "end" : "start"} mb-4`}>
      <div onDoubleClick={() => deleteMessage(data.id)} className="img_cont_msg">
        <img src={`http://127.0.0.1:8000${isSender ? owner.profilePic : contact.profilePic}`} className="rounded-circle user_img_msg" alt="img" />
      </div>
      <div onDoubleClick={() => deleteMessage(data.id)} className={`msg_cotainer${isSender ? "_send" : ""}`}>
        {data.mes}
        <span className={`msg_time${isSender ? "_send" : ""}`}></span>
      </div><br />
      {data.image != null && <img style={{ height: 200, width: 200 }} src={`http://127.0.0.1:8000${data.image}`} />}
    </div>
  );
}

export default MessageItem;
