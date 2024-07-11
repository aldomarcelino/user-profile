import React from "react";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import styled from "@emotion/styled";

interface MapProps {
  borderradius: string;
}

const Map = styled(StaticGoogleMap)<MapProps>(
  ({ borderradius }) => `
  border-radius: ${borderradius};
  object-fit: cover;
`
);

interface StaticMapProps {
  id: string;
  size: string;
  lat: number;
  lng: number;
  width: string;
  height: string;
  borderRadius: string;
}

const StaticMap: React.FC<StaticMapProps> = ({
  id,
  size,
  lat,
  lng,
  width,
  height,
  borderRadius,
}) => {
  console.log(
    process.env.PUBLIC_RESTURL_API_KEY_GOOGLE_MAP_STATIC,
    "<process.env.PUBLIC_RESTURL_API_KEY_GOOGLE_MAP_STATIC"
  );

  return (
    <a
      target="_blank"
      href={`https://maps.google.com/?q=${lat}+${lng}`}
      rel="noopener noreferrer"
    >
      <Map
        id={id}
        size={size}
        width={width}
        height={height}
        borderradius={borderRadius}
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY!}
      >
        <Marker location={`${lat},${lng}`} color="red" />
      </Map>
    </a>
  );
};

export default StaticMap;
