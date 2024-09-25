import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box
} from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

interface MapPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmLocation: (location: google.maps.LatLngLiteral, placeName: string) => void;
}

const MapPopup: React.FC<MapPopupProps> = ({ isOpen, onClose, onConfirmLocation }) => {
    const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [infoOpen, setInfoOpen] = useState(false); 
    const [placeName, setPlaceName] = useState<string | null>(null); 

    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    const defaultCenter = {
        lat: 7.8731,  
        lng: 80.7718
    };

    
    const geocoder = new google.maps.Geocoder();

    
    const reverseGeocode = (latLng: google.maps.LatLngLiteral) => {
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
                console.log(results[0]);
                setPlaceName(results[0].formatted_address); 
            } else {
                setPlaceName("Unknown place"); 
            }
        });
    };

    
    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const clickedLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            };
            setLocation(clickedLocation);
            setInfoOpen(true); 
            reverseGeocode(clickedLocation); 
        }
    };

    const handleConfirm = () => {
        if (location && placeName) {
            onConfirmLocation(location, placeName);
            onClose(); 
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="60vw">
                <ModalHeader>Select Location</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={8}
                        center={location || defaultCenter}
                        onClick={handleMapClick}
                    >
                        {location && (
                            <>
                                <Marker position={location} />
                                {infoOpen && (
                                    <InfoWindow
                                        position={location}
                                        onCloseClick={() => setInfoOpen(false)}
                                    >
                                        <div>
                                            {placeName && <p>{placeName}</p>} 
                                        </div>
                                    </InfoWindow>
                                )}
                            </>
                        )}
                    </GoogleMap>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleConfirm} isDisabled={!location}>
                        Confirm Location
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MapPopup;
