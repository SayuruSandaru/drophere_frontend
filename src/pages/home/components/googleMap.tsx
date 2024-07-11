import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const MapContainer = ({ polylinePath }) => {
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
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
            onLoad={map => {
                mapRef.current = map;
            }}
            options={{
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
            }}
        >

            {polylinePath && (
                <Polyline
                    path={polylinePath}
                    options={{
                        strokeColor: "#0000FF",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}
                />
            )}
        </GoogleMap>
    );
};

export default MapContainer;
