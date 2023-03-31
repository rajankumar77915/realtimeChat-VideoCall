import { useState } from "react";
import axios from "axios";

const ImageUploadForm = ({SetimgStore}) => {
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    SetimgStore(event.target.files[0]);
  };



  return (
    <form>
      <input type="file" onChange={handleUpload} />
    </form>
  );
};

export default ImageUploadForm;
