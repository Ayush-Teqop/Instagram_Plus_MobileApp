import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

const Card = ({ name, imageUrl, followers_count, follows_count}) => {
    console.log(name);
    return (
        <View style={styles.cardContainer}>
            <Image source={{uri: imageUrl}} style={styles.imageStyle} />
            <Text style={styles.textStyle}>{name}</Text>
            <View style={styles.subContainer}>
                <View>
                    <Text style={styles.subTextStyle}>Followers = {followers_count}</Text>
                </View>
                <View>
                    <Text style={styles.subTextStyle}>Follows count = {follows_count}</Text>
                </View>
            </View>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 30,
        backgroundColor: 'white',
        height: 200,
        borderRadius: 20,
        margin: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 9,
    },
    imageStyle: {
        height: 130,
        width: deviceWidth - 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.9,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '800',
        margin: 5,
        color: 'black',
    },
    subTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        margin: 5,
        color: 'black',
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    }
})

export default Card;