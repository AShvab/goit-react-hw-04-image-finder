import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { fetchImages } from '../../services/api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ pictureName }) => {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isEndOfListReached, setIsEndOfListReached] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('pending');
      setPage(1);
      setIsEndOfListReached(false);

      try {
        const { hits, total, totalHits } = await fetchImages(pictureName, 1);

        if (total === 0) {
          setStatus('rejected');
          toast.error('Sorry, we found no images');
          return;
        }

        const isEndOfListReached = totalHits / 12 <= 1;

        setGallery(hits);
        setStatus('resolved');
        setPage(2);
        setIsEndOfListReached(isEndOfListReached);
      } catch (error) {
        setStatus('rejected');
      }
    };

    if (pictureName) {
      fetchData();
    }
  }, [pictureName]);

  const loadMoreHandler = async () => {
    try {
      const { hits, totalHits } = await fetchImages(pictureName, page);

      if (hits.length === 0) {
        setIsEndOfListReached(true);
        return;
      }

      const isEndOfListReached = totalHits / 12 <= page;

      setGallery(prevGallery => [...prevGallery, ...hits]);
      setPage(prevPage => prevPage + 1);
      setIsEndOfListReached(isEndOfListReached);
    } catch (error) {
      setStatus('rejected');
    }
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return null;
  }

  if (status === 'resolved') {
    return (
      <>
        <Gallery>
          {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
            />
          ))}
        </Gallery>
        {!isEndOfListReached && (          
          <Button onClick={loadMoreHandler}>Load more</Button>
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  pictureName: PropTypes.string.isRequired,
};

export default ImageGallery;
