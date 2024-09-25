import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

// interface LocationPickerProps {
//     onSelectPosition?: (position: google.maps.LatLngLiteral) => void;
// }

// const LocationPicker: React.FC<LocationPickerProps> = ({ onSelectPosition }) => {
//     const mapRef = useRef<google.maps.Map | null>(null);
//     const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);
//     const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false);

//     const mapStyles = {
//         height: "60vh",
//         width: "100%",
//     };

//     const defaultCenter: google.maps.LatLngLiteral = {
//         lat: 7.8731, 
//         lng: 80.7718,
//     };

//     const onMapLoad = useCallback((map: google.maps.Map) => {
//         mapRef.current = map;
//     }, []);

//     const handleMapClick = useCallback(
//         (e: google.maps.MapMouseEvent) => {
//             if (e.latLng) {
//                 const clickedLocation: google.maps.LatLngLiteral = {
//                     lat: e.latLng.lat(),
//                     lng: e.latLng.lng(),
//                 };
//                 setLocation(clickedLocation);
//                 setInfoWindowOpen(true);
//                 if (onSelectPosition) {
//                     onSelectPosition(clickedLocation);
//                 }
//             }
//         },
//         [onSelectPosition]
//     );

//     return (
//         <GoogleMap
//             mapContainerStyle={mapStyles}
//             zoom={15}
//             center={location || defaultCenter}
//             onLoad={onMapLoad}
//             onClick={handleMapClick}
//             options={{
//                 zoomControl: true,
//                 fullscreenControl: true,
//                 mapTypeControl: false,
//                 streetViewControl: false,
//             }}
//         >
//             {location && (
//                 <>
//                     <Marker position={location} />
//                     {infoWindowOpen && (
//                         <InfoWindow
//                             position={location}
//                             onCloseClick={() => setInfoWindowOpen(false)}
//                         >
//                             <div>
//                                 <h3>Selected Location</h3>
//                                 <p>Latitude: {location.lat}</p>
//                                 <p>Longitude: {location.lng}</p>
//                             </div>
//                         </InfoWindow>
//                     )}
//                 </>
//             )}
//         </GoogleMap>
//     );
// };

// export default LocationPicker;
