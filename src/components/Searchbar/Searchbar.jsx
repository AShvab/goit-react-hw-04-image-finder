import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { Button, Input, SearchbarForm, SearchbarHeader } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [pictureName, setPictureName] = useState('');

  const handleSearchChange = (event) => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pictureName.trim() === '') {
      return toast.warn('Enter picture name');
    }
    onSubmit(pictureName);
    // -якщо необхідно очистити форму:
    setPictureName(''); 
  };

  return (
    <SearchbarHeader>
      <SearchbarForm onSubmit={handleSubmit}>
        <Button type="submit" aria-label="Search">
          <ImSearch size={28} />
        </Button>

        <Input
          onChange={handleSearchChange}
          value={pictureName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
