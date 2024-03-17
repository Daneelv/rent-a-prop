"use client";

import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    logitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeErr, setGeocodeErr] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      const { street, city, state, zipcode } = property.location;

      try {
        const res = await fromAddress(
          `${street} { ' '} ${city} { ' '}  ${state} { ' '}  ${zipcode}`
        );

        //Check for results
        if (res.results.length === 0) {
          setGeocodeErr(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLong(lng);

        setViewPort({ ...viewPort, latitude: lat, logitude: lng });
      } catch (e) {
        console.error(e);
        setGeocodeErr(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property.location, lat, long, viewPort]);

  if (loading) return <Spinner loading={loading} />;

  // Handle Case where geocoding failed
  if (geocodeErr) {
    return <div className="text=xl">No Location Data Found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{ longitude: long, latitude: lat, zoom: 15 }}
        style={{ width: "100%", height: 500 }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker latitude={lat} longitude={long} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
