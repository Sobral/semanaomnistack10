import React, {useEffect, useState} from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInicialPosition(){
            const {granted } = await requestPermissionsAsync();
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInicialPosition();
    },[]);

    if(!currentRegion){
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude:-3.0780363,longitude:-60.0606397} }>
        <Image source={{uri:'https://avatars1.githubusercontent.com/u/1907108?v=4'}} style={styles.avatar}/>

        </Marker>
    </MapView>);
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    avatar:{
        width:54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    }
});

export default Main;