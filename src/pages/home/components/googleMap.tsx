import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {
        height: "80vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDPVTj_4pkQwV9t2ylExQpFixYFsFd55ac'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}

                
            >
                <Marker position={defaultCenter}/>
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;