//Displaying all the images in gallery page

import React, { useState } from "react";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div>
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default Gallery;
