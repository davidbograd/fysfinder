import React from "react";

interface GoogleMapProps {
  address: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  const apiKey = "AIzaSyAm2SHijsqnRnjdHUd9GVq4tkRqu_s-t8U"; // Replace with your actual API key

  return (
    <iframe
      width="100%"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`}
    ></iframe>
  );
};

export default GoogleMap;
