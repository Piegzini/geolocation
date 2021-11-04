import React, { useState } from "react";
import mapPicture from '../assets/map.jpg'
import {Image, StyleSheet, Text, View, Switch} from 'react-native'
import Button from './Button.js'


class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View style={styles.column}>
                <View style={styles.cell}>
                    <Image style={styles.image} source={mapPicture}/>
                </View>
                <View style={styles.informations}>
                    <Text style={{fontWeight: 'bold'}}>TimeStamp: {this.props.timestamp}</Text>
                    <Text>Latitude: {this.props.latitude}</Text>
                    <Text>Longitude: {this.props.longitude}</Text>
                </View>
                <View style={styles.cell}>
                    <Switch onValueChange={this.props.pick} value={this.props.picked}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    column: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    informations: {
        flex: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'cover',
    }
})
export default ListItem
