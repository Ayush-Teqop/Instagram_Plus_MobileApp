import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    FlatList, 
    TouchableOpacity,
} from 'react-native'
import React, {useState, useRef} from 'react'
import {Colors, General, Fonts} from '../constants';
import {WelcomeCard, Separator} from '../components';
import {Display} from '../utils';

const pageStyle = isActive => 
    isActive ? styles.page : {...styles.page, backgroundColor: Colors.DEFAULT_GREY};


const Pagination = ({ index }) => {
    return (
        <View style={styles.pageContainer}>
            {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )}
        </View>
    );
};

const WelcomeScreen = ({navigation}) => {
    const [welcomeListIndex, setWelcomeListIndex] = useState(0);
    const welcomeList = useRef();

    const onViewRef = useRef(({changed}) =>  {
        setWelcomeListIndex(changed[0].index);
    });
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50}); 

    const pageScroll = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex < 3 ? welcomeListIndex + 1 : welcomeListIndex,
        })
    }
    
    const pageScrollBack = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex > 0 ? welcomeListIndex - 1 : welcomeListIndex,
        })
    }

    return (
    <View style={styles.container}>
        <StatusBar 
            barStyle="dark-content"
            backgroundColor={Colors.DEFAULT_WHITE}
            translucent
        />
        <Separator height={StatusBar.currentHeight} />
        <Separator height={Display.setHeight(8)} />
        <View style={styles.welcomeListContainer}>
        <FlatList 
            ref={welcomeList}
            data={General.WELCOME_CONTENTS}
            keyExtractor={item => item.title}
            horizontal
            pagingEnabled
            overScrollMode="never"
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <WelcomeCard {...item} />}
        />
        </View>
        <Separator height={Display.setHeight(8)} />
        <Pagination index={welcomeListIndex} />
        <Separator height={Display.setHeight(8)} />
        {welcomeListIndex === 3 ? (
            <TouchableOpacity 
                style={styles.gettingStartedButton}
                activeOpacity={0.8} 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.gettingStartedButtonText} >Get Started</Text>
            </TouchableOpacity>
        ) : (
            <View style = {styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: 10 }} onPress={() => pageScrollBack()} >
                <Text style={styles.buttonText} >SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => pageScroll()} >
                <Text style={styles.buttonText} >NEXT</Text>
            </TouchableOpacity>
            </View>
        )}
        
    </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    welcomeListContainer: {
        height: Display.setHeight(60),
    },
    pageContainer: {
        flexDirection: 'row',
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: Colors.DEFAULT_BLACK,
        borderRadius: 32,
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Display.setWidth(90),
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.POPPINS_BOLD,
        lineHeight: 16 * 1.4,
        color: 'black'
    },
    button: {
        backgroundColor: Colors.LIGHT_GREEN,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 32,
    },
    gettingStartedButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    gettingStartedButtonText: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        lineHeight: 20 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    }
});