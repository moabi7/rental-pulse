'use client';
import { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from'react-map-gl';
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
// import pin from "@/assets/images/pin.png";

const PropertyMap = ({property}) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewPort, setViewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });
    const [loading, setLoading] = useState(true);

    // Set defaults for South Africa
    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "za",
        limit: 1,
    });

    useEffect(() => {
        const fetchCoords = async () => {
            const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);
            const { lat, lng } = res.results[0].geometry.location;

            // set longitude and latitude
            setLat(lat);
            setLng(lng);
            setViewPort({
               ...viewPort,
                latitude: lat,
                longitude: lng
            });
            setLoading(false);
        }
        fetchCoords();
    }, []); 

    if (loading) {
        return <Spinner loading={loading} />
    }

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import("mapbox-gl")}
            initialViewState={{
                latitude: viewPort.latitude,
                longitude: viewPort.longitude,
                zoom: 15,
            }}
            style={{
                width: viewPort.width,
                height: 500,
            }}
            mapStyle={"mapbox://styles/mapbox/streets-v11"}
        >
            <Marker latitude={lat} longitude={lng} anchor="bottom" ></Marker>
        </Map>
    )
}

export default PropertyMap; 