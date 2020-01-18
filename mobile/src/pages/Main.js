import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

function Main() {
    const [currentRegion, setCurrentRegion] = useState();

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
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }

        loadInicialPosition();
    },[]);

    if(!currentRegion){
        return null;
    }

    return <MapView currentRegion={currentRegion} style={styles.map}/>
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
});

export default Main;