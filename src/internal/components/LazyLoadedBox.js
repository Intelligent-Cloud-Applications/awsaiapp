import React, { useState, useEffect, useRef } from 'react';
import Box from './Box'; // Adjust the import path as necessary

const LazyLoadedBox = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return (
    <div ref={elementRef}>
      {isVisible && <Box {...props} />}
    </div>
  );
};

export default LazyLoadedBox;