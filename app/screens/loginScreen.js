import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    StatusBar,
    FlatList
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Images, CountryCodes } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Separator, FlagItem } from '../components';
import { Display } from '../utils';
import { StaticImageService } from '../services';
import { sendOtpApi } from '../Api';
import axios from 'axios';

const getDropdownStyle = y => ({ ...styles.countryDropdown, top: y + 60 });

const LoginScreen = ({ navigation }) => {

    const [selectedCountry, setSelectedCountry] = useState(CountryCodes.find(country => country.name === "India"),);

    const [inputsContainerY, setInputsContainerY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');

    const closeDropdown = (pageX, pageY) => {
        if (isDropdownOpen) {
            if (
                pageX < dropdownLayout?.x ||
                pageX > dropdownLayout?.x + dropdownLayout?.width ||
                pageY < dropdownLayout?.y ||
                pageY > dropdownLayout?.y + dropdownLayout?.height
            ) {
                setIsDropdownOpen(false);
            }
        }
    };

    const continueHandler = (e) => {
        axios
            .post('http://192.168.29.131:5004/api/v1/sendOTP', {
                phone: `${phoneNumber}`
            })
            .then(function (res) {
                console.log(res);
                return res.data;
            }).catch((err) => {
                console.log('error', err);
                return err;
            });
    };

    const responseStatus = (response, postData) => {
        try {
            if (response.data.success === true) {
                setOtp(response.data.data);
                // console.log(response.data.data);
                setIsLoading(false);
                return true;
            } else {
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Data fetching cancelled');
            } else {
                setErrorFlag(true);
                setIsLoading(false);
            }
        }
    }

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
                closeDropdown(pageX, pageY)
            }>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                    color="black"
                />
                <Text style={styles.headerTitle}>Register Phone</Text>
            </View>
            <Text style={styles.title}>Register Phone</Text>
            <Text style={styles.content}>
                Enter your registered phone number to login.
            </Text>
            <View>
                <View
                    style={styles.inputsContainer}
                    onLayout={({
                        nativeEvent: {
                            layout: { y },
                        },
                    }) => setInputsContainerY(y)}>
                    <TouchableOpacity
                        style={styles.countryListContainer}
                        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <Image
                            source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code) }}
                            style={styles.flatIcon}
                        />
                        <Text style={styles.countryCodeText}>
                            {selectedCountry.dial_code}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: Colors.LIGHT_GREY,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        borderWidth: 0.5,
                        borderColor: !color ? Colors.LIGHT_GREY2 : Colors.DEFAULT_RED,
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor={Colors.DEFAULT_GREY}
                            selectionColor={Colors.DEFAULT_GREY}
                            keyboardType="number-pad"
                            maxLength={10}
                            onFocus={() => setIsDropdownOpen(false)}
                            style={styles.inputText}
                            onChangeText={text => {
                                if (text.length === 0 || text.length === 10) {
                                    setMessage('');
                                    setColor(false);
                                } else if (text.length < 10) {
                                    setColor(true);
                                    setMessage('Please enter valid number')
                                }
                                setPhoneNumber(text);
                            }
                            }
                        />
                    </View>
                </View>
                <View>
                    <Text style={{
                        paddingLeft: 10,
                        color: 'red',
                        fontSize: 12,
                        margin: 10,
                    }}> {message} </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.signinButton}
                activeOpacity={0.8}
                onPress={async () => {
                    if (!color) {
                        sendOtpApi(phoneNumber)
                            .then(function (res) {
                                console.log('response', res);
                                res && navigation.navigate('Otp', {phone: phoneNumber, Hash: res.data.hash});
                            }).catch((err) => {
                                console.warn('Company not registered, Please register first');
                                navigation.navigate('SignUp');
                                return err;
                            });
                    } else {
                        console.warn('Please enter valid number');
                    }
                }}>
                <Text style={styles.signinButtonText}>Contiue</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View
                    style={getDropdownStyle(inputsContainerY)}
                    onLayout={({
                        nativeEvent: {
                            layout: { x, y, height, width },
                        },
                    }) => setDropdownLayout({ x, y, height, width })}>
                    <FlatList
                        data={CountryCodes}
                        keyExtractor={item => item.code}
                        renderItem={({ item }) => (
                            <FlagItem
                                {...item}
                                onPress={country => {
                                    setSelectedCountry(country);
                                    setIsDropdownOpen(false);
                                }}
                            />
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
        color: 'black',
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
        color: 'black',
    },
    content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        color: 'black',
    },
    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row',
    },
    // phoneInputContainer: {
    //     backgroundColor: Colors.LIGHT_GREY,
    //     paddingHorizontal: 10,
    //     borderRadius: 8,
    //     borderWidth: 0.5,
    //     borderColor: color ? Colors.LIGHT_GREY2 : Colors.DEFAULT_RED,
    //     justifyContent: 'center',
    //     flex: 1,
    // },
    flatIcon: {
        height: 20,
        width: 20,
    },
    countryCodeText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'black',
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
    },
    countryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: 'absolute',
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        zIndex: 3,
    },
    signinButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'white',
    },
});
