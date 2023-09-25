import axios from "axios";
import { useState } from "react";
import ImageUploadForm from "./imageUpload";

const SendMsg = ({ friend,SetmesUpdate,mesUpdate }) => {

   const id = JSON.parse(localStorage.getItem('user'));
    const [msgStore, SetmsgStore] = useState("")
    const [imgStore, SetimgStore] = useState(null)
    const [fileStore, SetfileStore] = useState(null)
    const [videoStore, SetvideoStore] = useState(null)
    const [showOptions, setShowOptions] = useState(false); // state variable to toggle options list

    const [imgBool, SetimgBool] = useState(false);
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = {
          "mes": msgStore,
          "image": imgStore,
          "file": fileStore,
          "video": videoStore,
          "sender": id,
          "receiver": friend
      }
      
      try {
          await axios.post(
              "http://127.0.0.1:8000/msg/",
              formData,
              {
                  headers: { "Content-Type": "multipart/form-data" },
              }
          );
  
          // Clear the message textbox after sending
          SetmsgStore("");
  
          // Trigger a message update or any other necessary updates
          SetmesUpdate(!mesUpdate);
      } catch (error) {
          console.log(error);
      }
  };
  
    const handleAttachClick = () => {
        setShowOptions(!showOptions); // toggle the state variable to show/hide options list
    }

    const handleOptionClick = (option) => {
        // handle the option click here, e.g. set the value of `imgStore` based on the selected option
        SetimgStore(option);
        SetimgBool(false); 
        setShowOptions(false); // hide the options list after selection
    }


    
    return (
        <div className="card-footer">
          <div className="input-group">
            <div className="input-group-append">
              <span
                className="input-group-text attach_btn"
                onClick={handleAttachClick}
              >
                {!showOptions && <i className="fas fa-paperclip"></i>}
              </span>
              {imgBool && <ImageUploadForm SetimgStore={SetimgStore} />}
              {showOptions && (
                <div className="options-list">
                  <ul>
                    <li
                      onClick={() => {
                        SetimgBool(!imgBool);
                      }}
                      className="fas fa-image"
                    ></li>
                    <br />
                    {/* <li
                      onClick={() => handleOptionClick("option2")}
                      className="fas fa-file"
                    ></li> */}
                    <br />
                    <li
                      onClick={() => handleOptionClick("option3")}
                      className="fas fa-times"
                    ></li>
                  </ul>
                </div>
              )}
            </div>
            <textarea
              name="msg"
              className="form-control type_msg"
              placeholder="Type your message..."
              value={msgStore}
              onChange={(event) => {
                SetmsgStore(event.target.value);
              }}
            ></textarea>
            <div className="input-group-append">
              <span className="input-group-text send_btn" onClick={handleSubmit}>
                <i className="fas fa-location-arrow"></i>
              </span>
            </div>
          </div>
    
          {/* Add this block to style the options list */}
          {showOptions && (
            <style>{`
              .options-list {
                position: absolute;
                top: 100%;
                left: 0;
                width: 10%;
                
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                z-index: 10;
              }
              .options-list ul {
                list-style: none;
                margin: 0;
                padding: 0;
              }
              .options-list li {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: #777;
                width: 40px;
                height: 15px;
                border-radius: 50%;
                margin-bottom: 1px;
                cursor: pointer;
              }
              .options-list li:hover {
                background-color: #f5f5f5;
              }
            `}</style>
          )}
        </div>
      );
}

export default SendMsg;
