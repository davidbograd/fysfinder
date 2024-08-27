import React from "react";

interface GoogleMapProps {
  address: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  // The issue here is that 'process.env' is not available in the browser environment by default.
  // We need to use the 'import.meta.env' syntax for Vite projects to access environment variables.
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing");
    return <div>Map unavailable</div>;
  }

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
