import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { Display } from '../utils';
import {Fonts, Colors, Images} from '../constants';

const WelcomeCard = ({title, content, image}) => {
    
  return (
    <View style={styles.container} >
        <Image style={styles.image} source={Images[image]} resizeMode="contain" />
        <Text style={styles.titleText} > {title} </Text>
        <Text style={styles.contentText} > {content} </Text>
    </View>
  )
}

export default WelcomeCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(100),
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'black',
    },
    contentText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_LIGHT,
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        color: 'black',
        alignItems: 'center',
    },
})