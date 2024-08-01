import React, { useEffect, useRef, useState } from 'react';

import { database } from '../../../firebase';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { decodePolyline } from 'util/map';
import { ref, onValue } from 'firebase/database';

const MapLive = ({ polylinePath, path }) => {
    const mapRef = useRef(null);
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        if (polylinePath && polylinePath.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach(point => bounds.extend(point));
            mapRef.current.fitBounds(bounds);
        }
    }, [polylinePath]);

    useEffect(() => {
        handleDataAndDatabasePath();
    }, [path]);

    const handleDataAndDatabasePath = async () => {

        if (path) {
            console.log("Database path: ", path);
            const locationRef = ref(database, `${path}/currentLocation`);
            onValue(locationRef, (snapshot) => {
                const locData = snapshot.val();
                if (locData !== null) {
                    setLocation({ lat: locData.latitude, lng: locData.longitude });
                }
                console.log("Location: ", locData);
            });
        }
    };



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
            center={location != null ? location : defaultCenter}
            onLoad={map => {
                mapRef.current = map;
            }}
            options={{
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
                streetViewControl: false,
            }}
        >

            {polylinePath && (
                <Polyline
                    path={polylinePath}
                    options={{
                        strokeColor: "#0000FF",
                        strokeOpacity: 0.8,
                        strokeWeight: 5,
                    }}
                />
            )}
            {location !== null && (
                <Marker position={location} />
            )}
        </GoogleMap>
    );
};

export default MapLive;
