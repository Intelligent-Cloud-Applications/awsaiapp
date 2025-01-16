import QRCode from "qrcode";
import { useState, useEffect } from "react";

const QR = ({ url, size, download }) => {
  const [QRSrc, setQRSrc] = useState("");

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url)
        .then((data) => {
          setQRSrc(data);
        })
        .catch((err) => {
          console.error("Error generating QR code:", err);
        });
    }
  }, [url]);

  return (
    <a href={QRSrc} download={download}>
      <img src={QRSrc} alt="QR Code" width={size} height={size} />
    </a>
  );
};

export default QR;
