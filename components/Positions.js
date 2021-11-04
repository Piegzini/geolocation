import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native'
import * as Font from "expo-font";
import Button from './Button.js'
import * as Location from "expo-location";
import { AsyncStorage } from "react-native"
import ListItem from "./ListItem";

export default class Positions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            maps: [],
            allPicked: false,
        }
    }

    setPermissions = async () => {
        let { status } = await  Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    getPosition = async () => {
        const pos = await Location.getCurrentPositionAsync({})
        pos.timestamp = Date.now()
        pos.picked = false
        await this.setData(pos)
    }

    setData = async (position) => {
        const timeStamp = `${position.timestamp}`
        await AsyncStorage.setItem(timeStamp, JSON.stringify(position));
        await this.getAllData()
    }

    getAllData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const maps = stores.map((result, index, store) => JSON.parse(store[index][1]))

        this.setState({maps})
    }
    deleteAll = async  () => {
        await AsyncStorage.clear()
        this.setState({maps: []})
    }


    renderListItem = ({item}) => {
        return (
            <ListItem timestamp={item.timestamp} latitude={item.coords.latitude}
                      longitude={item.coords.longitude} picked={item.picked} pick={() => this.setPicked(item.timestamp)}  />
        );
    }
    setPickAll = () => {
        const allPicked = !this.state.allPicked
        const maps = this.state.maps.map(map => {
            map.picked = allPicked
            return map
        })
        this.setState({maps, allPicked})
    }

    setPicked(timestamp) {
        const maps = this.state.maps.map(map => {
            if(map.timestamp === timestamp){
                map.picked = !map.picked
            }
            return map
        })
        this.setState({maps})
    }

    goToMaps = async () => {
        if(!this.state.maps.some(map => map.picked === true))
        {
            alert('Wybierz jakąś pozycje')
            return
        }
        this.props.navigation.navigate("Maps", {maps: this.state.maps})
    }

    componentDidMount = async () => {
        await this.setPermissions()
        await this.getAllData()
    }


    render(){
        return(
            <View style={styles.mainWrapper}>
                <View style={styles.buttonsContainer}>
                    <View style={{flex: 1}}>
                        <Button text='Pobierz i zapisz pozycje' press={() => this.getPosition()}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Button text='Usuń wszystkie pozycje' press={() => this.deleteAll()}/>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={{flex: 4, display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
                        <Button text='Przejdź do mapy' press={() => this.goToMaps()}/>
                    </View>
                    <View style={{ flex: 1, display: 'flex' , alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                       <Switch onValueChange={this.setPickAll} value={this.state.allPicked}/>
                    </View>
                </View>
                <View style={{flex: 6.3, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <FlatList
                        data={this.state.maps}
                        extraData={this.state.allPicked}
                        renderItem={this.renderListItem}
                        keyExtractor={({timestamp}) => timestamp.toString()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonsContainer:{
        flex: 1,
        display: "flex",
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    }
})
