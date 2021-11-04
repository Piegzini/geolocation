import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import * as Font from "expo-font";
import Button from './Button.js'

export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
        }
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            Lato: require('../assets/fonts/Lato-Regular.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }


    render(){
        return(
            <View style={styles.Wrapper}>
                {this.state.fontsLoaded ?
                    <View style={styles.Header}>
                        <Text style={{fontSize: 40, fontFamily: 'Lato', color: '#fff'}}>GeoApp</Text>
                        <Text style={{fontSize: 20, fontFamily: 'Lato', color: '#fff'}}>Find and save your location</Text>
                    </View> :  <ActivityIndicator size="small" color="#ff0000" />
                }
                <View style={styles.ButtonWrapper}>
                    <Button text='Start'  press={() => this.props.navigation.navigate("Positions")} />
                </View>
            </View>
            )
    }
}


const styles = StyleSheet.create({
    Wrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    Header: {
        flex: 2,
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#673AB7',
        width: '100%',
        height: '100%',
    },

    ButtonWrapper: {
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})



