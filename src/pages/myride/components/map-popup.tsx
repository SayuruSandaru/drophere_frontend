// src/components/MapPopup.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';

import { ref, onValue } from 'firebase/database';
import MapContainer from 'pages/home/components/googleMap';
import { decodePolyline } from 'util/map';
import { database } from '../../../firebase';
import RideTrackerMap from './ride-tracker-map';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

interface MapPopupProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
    databasePath: string;
}

const MapPopup: React.FC<MapPopupProps> = ({ isOpen, onClose, data, databasePath }) => {
    const [polylinePath, setPolylinePath] = useState([]);
    const [location, setLocation] = useState<any>(null);
    const mapRef = useRef(null);
    useEffect(() => {
        if (polylinePath && polylinePath.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach(point => bounds.extend(point));
            mapRef.current.fitBounds(bounds);
        }
    }, [polylinePath]);

    useEffect(() => {
        if (data !== null) {
            console.log(data);
            const path = decodePolyline(data);
            setPolylinePath(path);
        }

        if (databasePath) {
            console.log("Database path: ", databasePath);
            const locationRef = ref(database, `${databasePath}/currentLocation`);
            onValue(locationRef, (snapshot) => {
                const locData = snapshot.val();
                setLocation({
                    lat: locData.latitude,
                    lng: locData.longitude,
                });
                console.log("Location: ", locData);
            });
        }
    }, [data, databasePath]);

    const mapStyles = {
        height: "80vh",
        width: "100%",
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="70vw">
                <ModalHeader>Ride Location</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
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
                                    strokeWeight: 5,
                                }}
                            />
                        )}
                        {location !== null && (
                            <Marker
                                position={location}
                            />
                        )}
                    </GoogleMap>
                </ModalBody>
                <ModalFooter>
                    <Button color="white" bgColor="black" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MapPopup;
