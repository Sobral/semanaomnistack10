import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';

function Main({navigation}) {
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
    <>
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude:-3.0780363,longitude:-60.0606397} }>
            <Image source={{uri:'https://avatars1.githubusercontent.com/u/1907108?v=4'}} style={styles.avatar}/>
            <Callout onPress={()=>{
                    navigation.navigate('Profile', {github_username:'Sobral'});
                }
            }>
                <View style={styles.callout}>
                    <Text style={styles.DevName}>Luciano Sobral</Text>
                    <Text style={styles.DevBio}>Manda o job que eu mato a parada</Text>
                    <Text style={styles.DevTechs}>Nodejs, React, ReactNative</Text>
                </View>
            </Callout>
            </Marker>
        </MapView>
        
        <View style={styles.searchForm}>
        <TextInput style={styles.searchInput}
            placeholder="Buscar Devs por techs"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
        />

        <TouchableOpacity style={styles.loadButtom} onPress={()=>{return}}>
            <MaterialIcons name="my-location" size={20} color="#FFF"></MaterialIcons>
        </TouchableOpacity>
        </View>
    </>
    );
    
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
    },
    callout:{
        width:260},
    DevName:{
        fontWeight: "bold",
        fontSize: 16
    },
    DevBio:{
        color:'#666',
        marginTop:5
    },
    DevTechs:{
        marginTop:5
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            height: 4,
            width: 4
        },
        elevation: 3
    },
    searchForm:{
        position:'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    loadButtom:{
        width:50,
        height:50,
        backgroundColor:'#8e4dff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:15,
        borderRadius:25
    }

});

export default Main;