import PropTypes from 'prop-types';
import React from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Font from "expo-font";

export default class Button extends React.Component {
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

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.press()}>
                {this.state.fontsLoaded ? <Text style={styles.text}>{this.props.text}</Text> : null }
            </TouchableOpacity>
        )
    }
}
const {height} = Dimensions.get('window')
const styles = StyleSheet.create({
    text: {
        fontSize: height * 0.025,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#512DA8',
        borderStyle: 'solid',
        padding: 10,
        fontFamily: 'Lato',
        textAlign: 'center',
    }
})
Button.propTypes = {
    text: PropTypes.string.isRequired,
    press: PropTypes.func.isRequired,
};

