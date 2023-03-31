import axios from "axios";
import { useState } from "react";
import ImageUploadForm from "./imageUpload";

const SendMsg = ({ friend,SetmesUpdate,mesUpdate }) => {

    const [id, setId] = useState(JSON.parse(localStorage.getItem('user')));
    const [msgStore, SetmsgStore] = useState("")
    const [imgStore, SetimgStore] = useState(null)
    const [fileStore, SetfileStore] = useState(null)
    const [videoStore, SetvideoStore] = useState(null)
    const [showOptions, setShowOptions] = useState(false); // state variable to toggle options list

    const [imgBool, SetimgBool] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append( "mes", "w")
        // formData.append("image", imgStore);
        // formData.append("file", fileStore);
        // formData.append("video", videoStore);
        // formData.append("sender", 1);
        // formData.append("receiver", 3);

        const formData= {
            "mes": msgStore,
            "image": imgStore,
            "file": fileStore,
            "video": videoStore,
            "sender": id,
            "receiver": friend
        }
        SetmesUpdate(!mesUpdate);
        console.log("data successfully sennnnnnneded")
        console.log(formData);
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/msg/",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log(response);
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
                    <span className="input-group-text attach_btn" onClick={handleAttachClick}>
                        {!showOptions && <i className="fas fa-paperclip"></i>}
                    </span>
                    {imgBool && <ImageUploadForm SetimgStore={SetimgStore}/>}
                    {showOptions && (
                        <div className="options-list">
                            <ul>
                                <li onClick={() =>{SetimgBool(!imgBool);}}  className="fas fa-image"></li><br/> 
                                <li onClick={() => handleOptionClick("option2")} className="fas fa-file"></li><br/>
                                <li onClick={() => handleOptionClick("option3")} className="fas fa-video"></li>
                            </ul>
                        </div>
                    )}
                </div>
                <textarea name="msg" className="form-control type_msg"
                    placeholder="Type your message..." onChange={(event) => { SetmsgStore(event.target.value); }}></textarea>
                <div className="input-group-append">
                    <span className="input-group-text send_btn" onClick={handleSubmit}>
                        <i className="fas fa-location-arrow"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SendMsg;
