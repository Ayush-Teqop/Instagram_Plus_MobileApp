import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors, Images } from '../constants';
import { Display } from '../utils';
const LogoScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Welcome");
        }, 2500);
    })

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
                translucent
            />
            <Image
                source={Images.LOGO}
                resizeMode="contain"
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_BLACK,
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
})

export default LogoScreen;