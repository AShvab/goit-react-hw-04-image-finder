import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Img, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, alt, largeImage }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Img src={url} alt={alt} />
      </Item>
      {isShowModal && (
        <Modal onClose={toggleModal}>
          <img alt={alt} src={largeImage} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;