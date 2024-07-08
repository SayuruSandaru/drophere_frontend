import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons

const MapContainerMulitRoute = ({ polylinePath, onRouteSelect }) => {
    const mapRef = useRef(null);
    const [infoWindowPositions, setInfoWindowPositions] = useState([]);
    const [infoWindowVisible, setInfoWindowVisible] = useState([]);

    useEffect(() => {
        if (polylinePath && polylinePath.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach(path => {
                path.forEach(point => bounds.extend(point));
            });
            mapRef.current.fitBounds(bounds);

            const midpoints = polylinePath.map(path => {
                const midIndex = Math.floor(path.length / 2);
                return path[midIndex];
            });
            setInfoWindowPositions(midpoints);
            setInfoWindowVisible(new Array(midpoints.length).fill(true));
        }
    }, [polylinePath]);

    const handleCloseClick = (index) => {
        const newVisibility = [...infoWindowVisible];
        newVisibility[index] = false;
        setInfoWindowVisible(newVisibility);
    };

    const mapStyles = {
        height: "80vh",
        width: "100%",
        borderRadius: "15px"
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
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: true,
                scaleControl: true,
            }}
        >
            {polylinePath && polylinePath.map((path, index) => (
                <React.Fragment key={index}>
                    <Polyline
                        path={path}
                        options={{
                            strokeColor: ["#0000FF", "#FF0000", "#000000"][index % 3], // Different colors for each route
                            strokeOpacity: 0.4,
                            strokeWeight: 4,
                        }}
                    />
                    {infoWindowPositions[index] && infoWindowVisible[index] && (
                        <InfoWindow
                            position={infoWindowPositions[index]}
                            options={{ disableAutoPan: true }}
                            onCloseClick={() => handleCloseClick(index)}
                        >
                            <Box position="relative">
                                <Text fontSize="sm" fontWeight="bold">Route {index + 1}</Text>
                                <Flex direction={"row"} alignItems="center">
                                    <Button
                                        mr={2}
                                        fontWeight="normal"
                                        bgColor={"teal.600"}
                                        color={"white"}
                                        size="sm"
                                        onClick={() => onRouteSelect(index)}
                                    >
                                        Select route
                                    </Button>
                                    <Button
                                        fontWeight="normal"
                                        bgColor={"red.400"}
                                        color={"white"}
                                        size="sm"
                                        onClick={() => handleCloseClick(index)}
                                    >
                                        <FaTimes />
                                    </Button>
                                </Flex>
                            </Box>
                        </InfoWindow>
                    )}
                </React.Fragment>
            ))}
        </GoogleMap>
    );
};

export default MapContainerMulitRoute;
