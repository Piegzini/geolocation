import React from "react";
import MapView from 'react-native-maps';
const Maps = ({route}) => {
    const markers = route.params.maps.filter(map => map.picked)
    console.log(markers.length)
    return (
    <MapView  style={{ flex: 1 }}>
        {markers.map(marker => (
            <MapView.Marker
                coordinate={{latitude: marker.coords.latitude, longitude: marker.coords.longitude,}}
                title={marker.timestamp + ''}
                key={marker.timestamp + ''}
            />))}
    </MapView>
)}

export default Maps

