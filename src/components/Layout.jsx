import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import  './Checkbox.css'

const images = [
  'https://i.ibb.co/mFwcjJp/ezgif-com-webp-to-jpg.jpg',
  'https://i.ibb.co/D7cYCRr/ezgif-com-webp-to-jpg-1.jpg',
  'https://i.ibb.co/5F0qTKd/ezgif-com-webp-to-jpg-2.jpg',
  'https://i.ibb.co/DK6xdS3/ezgif-com-webp-to-jpg-3.jpg',
  'https://i.ibb.co/H20rV39/ezgif-com-webp-to-jpg-4.jpg',
  'https://i.ibb.co/k0GXwwQ/ezgif-com-webp-to-jpg-5.jpg',
  'https://i.ibb.co/8gX7q20/ezgif-com-webp-to-jpg-6.jpg',
  'https://i.ibb.co/44c5R7r/ezgif-com-webp-to-jpg-7.jpg',
  'https://i.ibb.co/0C6k1sf/ezgif-com-webp-to-jpg-8.jpg',
  "https://i.ibb.co/YNKQT7z/image-10.jpg",
  "https://i.ibb.co/8srrrrC/image-11.jpg"
];

const Layout = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  
//handle the selected images 
  const handleSelect = (index) => {
    const updatedSelection = [...selectedImages];
    const imageIndex = updatedSelection.indexOf(index);

    if (imageIndex !== -1) {
      updatedSelection.splice(imageIndex, 1);
    } else {
      updatedSelection.push(index);
    }

    setSelectedImages(updatedSelection);
    setShowDeleteButton(updatedSelection.length > 0);
  };
// delete the selected images
  const handleDeleteSelected = () => {
    const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
    setSelectedImages([]);
    setShowDeleteButton(false);

    images.length = 0;
    images.push(...updatedImages);
  };
  //drag and drop

  return (
    <div style={{ padding: '10px' }}>
     <h1
  className={`text-center border-bottom-2 border-light-subtle ${selectedImages.length > 0 ? 'hidden' : ''}`}
  id='image-galary'
>
  Image Gallery
</h1>

      <header style={{ display: 'flex', justifyContent: 'space-between' }} className='border-b-4 border-gray-300 '>
        <div className='text-3xl p-2'>
          {selectedImages.length > 0 && <div>{selectedImages.length} Files Selected</div>}
        </div>
        {/* show the delete button when images are selected  */}
        {showDeleteButton && (
          <button style={{ color: 'red', border: 'none' }} className='font-bold text-3xl' onClick={handleDeleteSelected}>
            Delete Files
          </button>
        )}
      </header>
      <br />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 700: 3, 900: 4 }}>
        <Masonry gutter="20px" columnsCount={4}>
          {images.map((image, i) => (
            <div
              key={i}
              className={`image-container flex flex-col items-center cursor-pointer transition duration-300 ease-in-out ${
                i === 0 ? 'image-grid-col-2 image-grid-row-2' : ''
              }`}
              

              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              
              }}
              onClick={() => handleSelect(i)}
            >
              <div style={{ position: 'relative' }}>
  <input
    type="checkbox"
    checked={selectedImages.includes(i)}
    // show the checkbox when image is selected
    className={selectedImages.includes(i) ? 'show-checkbox' : 'hide-checkbox'}
    style={{
      display: selectedImages.includes(i) ? 'block' : 'none', // Show checkbox if the image is selected
      position: 'absolute', 
      top: '10px', 
      left: '10px', 
      zIndex: '1',
    
   

    }}
  />
  <img
    src={image}
  
    
    style={{
      width: '100%',
      display: 'block',
      border: '4px solid gray',
      borderRadius: '10px',
      gridColumn: i % 4 === 0 ? 'span 2' : 'span 1',
      gridRow: i === 0 ? 'span 2' : 'auto',
    }}
    alt=""
  />
</div>

              <div
                style={{
                  marginTop: '10px',
                  color: 'red',
                  fontWeight: 'bold',
                  display: selectedImages.includes(i) ? 'block' : 'none',
                }}
              ></div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

  
      
    </div>
  );
};

export default Layout;
