import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';

// attēla augšupielādes pogas komponente
function ImageUpload() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      dispatch(actions.changeImage(URL.createObjectURL(file)));
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        id="imageInput"
        hidden
      />
      <label
        className="mx-auto block w-full cursor-pointer self-center rounded-xl border border-[#f797cf] px-4 py-3 text-center font-mono font-semibold text-[#f797cf] uppercase transition-colors hover:border-white hover:text-white focus:ring-2 focus:ring-[#f797cf]/80 focus:outline-none"
        htmlFor="imageInput"
      >
        Choose Image
      </label>
    </div>
  );
}

export default ImageUpload;
