
import React, { useRef, useEffect } from "react";
import { FloatingLabel } from "flowbite-react";

export default function AboutUs() {
  const labelRef = useRef(null);

  useEffect(() => {
    if (labelRef.current) {
    
      labelRef.current.style.color = 'rgb(48,175,188)';
    }
  }, []);

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgb(48,175,188)';
    if (labelRef.current) {
      labelRef.current.style.color = 'rgb(48,175,188)';
    }
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '';
    if (labelRef.current) {
      labelRef.current.style.color = '';
    }
  };

  return (
    <div className="grid grid-flow-col justify-stretch space-x-4">
      <div className="relative">
        <FloatingLabel
          style={{ borderColor: 'rgb(48,175,188)', backgroundColor: '#f0f0f0' }}
          label={<label ref={labelRef}>Label</label>}
          variant="filled"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
