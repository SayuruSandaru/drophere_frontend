import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {
        height: "80vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }


    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
        >
            <Marker position={defaultCenter} />
        </GoogleMap>

    )
}

export default MapContainer;