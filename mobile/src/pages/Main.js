import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';
import api from '../services/api';
import {connect, disconnect} from '../services/socket';

function Main({navigation}) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');

    function webSocketSetup(){
        const {latitude, longitude} = currentRegion;
        connect(
            latitude,
            longitude,
            techs
        );
    }
    async function loadDevs(){
        const {latitude, longitude} = currentRegion;

        const response = await api.get('/search',{
            params:{
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
        webSocketSetup();
    }


    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

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
        <MapView 
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map}>
            
            {devs.map(dev => (
                <Marker 
                    key={dev._id}
                    coordinate={{ 
                        latitude:dev.location.coordinates[1],
                        longitude:dev.location.coordinates[0]} }>
                    <Image 
                            source={{uri:dev.avatar_url}} 
                            style={styles.avatar}/>
                        <Callout onPress={()=>{
                                navigation.navigate('Profile', {github_username:dev.github_username});
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.DevName}>{dev.name}</Text>
                                <Text style={styles.DevBio}>{dev.bio}</Text>
                                <Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                </Marker>
            ))}


        
        
        </MapView>
        
        <View style={styles.searchForm}>
        <TextInput style={styles.searchInput}
            placeholder="Buscar Devs por techs"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={setTechs}
        />

        <TouchableOpacity 
            style={styles.loadButtom} 
            onPress={loadDevs}>
            <MaterialIcons 
                name="my-location" 
                size={20} 
                color="#FFF"></MaterialIcons>
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