// import React, { Component } from 'react';
import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground
} from 'react-native';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    

   
    render() {

        return (
            <View style={{flex:1}}>
                <View style={{}}>
                    <Image resizeMode="contain" 
                        source={require('./../../Images/download.jpeg')} />
                    <Text>Profile</Text>
                </View>
                
            </View>
        );
    }
}


