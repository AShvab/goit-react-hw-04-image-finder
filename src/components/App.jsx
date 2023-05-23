import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

export const App =() => {
  const [ pictureName, setPictureName] = useState('');
  const handleFormSubmit = pictureName => {
    setPictureName( pictureName);
   };
  return (
          <Container>
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery pictureName={pictureName} />
            <ToastContainer autoClose={2000} />
          </Container>
        );
}

export default App;

