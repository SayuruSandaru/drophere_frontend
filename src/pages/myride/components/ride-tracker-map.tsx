import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const RideTrackerMap = ({ polylinePath, currentLocation }) => {
    const mapRef = useRef(null);
    useEffect(() => {
        if (polylinePath && polylinePath.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach(point => bounds.extend(point));
            mapRef.current.fitBounds(bounds);
        }
    }, [polylinePath]);

    const mapStyles = {
        height: "80vh",
        width: "100%",
    };

    const defaultCenter = {
        lat: 7.8731, lng: 80.7718
    };

    return (
        <div></div>
    );
};

export default RideTrackerMap;
