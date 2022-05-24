import React, { useState, useRef, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    StatusBar,
} from 'react-native';
import { Separator } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../constants';
import {Display} from '../utils';
import {verifyOtpApi, sendOtpApi} from '../Api';
import axios from 'axios';
//import OTPInput from 'react-otp-input'; 

const Counter = ({phoneNumber}) => {
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);
    const [otp, setOtp] = useState(null);


    const responseStatus = (response) => {
        try {
            if (response.status === 200) {
                setOtp(response.data.data);
                console.log(response.data.data);
                setIsLoading(false);
                return;
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
    useEffect(() => {
        if (!timer) {
            return;
        }

        const id = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [timer]);


    if (!timer) {
        return <Pressable
            onPress={() => {
                setTimer(30);
                sendOtpApi(phoneNumber)
                    .then(function (res) {
                        console.log('response', res);
                    }).catch((err) => {
                        console.log('error', err);
                        return err;
                    });
                // console.log("Call SendOTP endpoint");
            }
            }><Text style={{
                paddingLeft: 10,
                paddingRight: 10,
                color: 'black',
                marginTop: 10,
            }}>Tap here to resend Code</Text></Pressable>
    }
    return <Text style={{
        paddingLeft: 10,
        paddingRight: 10,
        color: 'red',
        marginTop: 10,
    }}> Tap here to resend Code ({timer}s) </Text>
}

const OtpScreen = ({
    route: {
        params: {phone, Hash},
        }, navigation
    }) => {

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fifthInput = useRef();
    const sixthInput = useRef();
    const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});
    // let textInput = useRef(null);
    const [text, setText] = useState('');
    const [message, setMessage] = useState("");
    const [color, setColor] = useState(true);
    // const [type, setType] = useState('');
    

    const verifyHandler = async () => {
        let otpArray = Object.values(otp);
        if(otpArray.length !== 6) {
            setColor(true);
            setMessage("Please enter otp proper");
        } else {
            setColor(false);
            setMessage("");
        }
        var otpNumber = 0;
        otpArray.map((i) => otpNumber = (Number)((Number)(otpNumber) * 10) + (Number)(i));
        try {
            // const resp = await verifyOtpApi({ phone: phone, hash: Hash, otp: otpNumber });
            // console.log(resp);
            verifyOtpApi({
                phone: phone, hash: Hash, otp: otpNumber
            }).then((res) => {
                console.log(res);
                if(res.data.success == true) {
                    navigation.navigate('Home');
                }
            }).catch((err) => {
                console.log(err);
                console.warn('OTP wrong or OTP expired');
            })
        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <View style={styles.container}>
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
                    color='black'
                />
                <Text style={styles.headerTitle} >Otp Verification</Text>
            </View>
            <Text style={styles.title}>Otp</Text>
            <Text style={styles.content}>Enter your Otp which we just sent you at 
                <Text style={styles.phoneNumberText} >{` +91${phone}`}</Text>
            </Text>
            <View  >
                <View style={styles.otpContainer}>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 1: text });
                                text && secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 2: text });
                                text ? thirdInput.current.focus() : firstInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 3: text });
                                text ? fourthInput.current.focus() : secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 4: text });
                                text ? fifthInput.current.focus() : thirdInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fifthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 5: text });
                                text ? sixthInput.current.focus() : fourthInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 6: text });
                                !text && fifthInput.current.focus();
                            }}
                        />
                    </View>
                </View>
                <Counter phoneNumber={phone}/>
            </View>
            
            <TouchableOpacity style={styles.signinButton} onPress={verifyHandler}>
                <Text style={styles.signinButtonText}>Verify</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OtpScreen;

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
    phoneNumberText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_REGULAR,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_YELLOW,
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderRadius: 5,
        borderColor: Colors.DEFAULT_GREEN,
        borderWidth: 0.5,
    },
    otpText: {
        fontSize: 25,
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    signinButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'white',
    },
});
