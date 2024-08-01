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
import { decodePolyline } from 'util/map';
import { database } from '../../../firebase';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import MapLive from './map';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adjustMapBounds();
    }, [polylinePath]);

    useEffect(() => {
        handleDataAndDatabasePath();
    }, [data, databasePath]);

    const adjustMapBounds = () => {
        if (polylinePath && polylinePath.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach(point => bounds.extend(point));
            mapRef.current.fitBounds(bounds);
        }
    };

    const handleDataAndDatabasePath = async () => {
        setLoading(true);
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
                if (locData !== null) {
                    setLocation({ lat: locData.latitude, lng: locData.longitude });
                }
                console.log("Location: ", locData);
            });
        }
        setLoading(false);
    };

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

                    <MapLive polylinePath={polylinePath} path={databasePath} />
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

