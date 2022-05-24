import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Separator} from '../components';
import {Display} from '../utils';
import axios from 'axios';
import {registerApi} from '../Api';

const SignupScreen = ({navigation}) => {
    
    const[company, setCompany] = useState({
        name: '',
        email: '',
        password: '',
        billingAddress: '',
        gstNumber: '',
        phone: ''
    })
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    const validate = (email) => {
        const expression = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        return expression.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        //console.log(company);
        if(company.name.length < 5) {
            console.warn('Username must be atleast 5 characters');
        } else if(company.password.length < 8) { 
            console.warn('Password must be atleast 8 characters');
        } else if(company.gstNumber.length < 15) {
            console.warn('Please enter correct GST Number');
        } else if(company.phone.length < 10) {
            console.warn('Please enter correct Phone Number');
        } else {
            try {
                console.log(company);
                axios.post('http://192.168.66.215:5004/api/v1/register', company)
                    .then((res) => {
                        console.log(res);
                        if(res.data.success === true) {
                            console.log(res.data.message);
                            navigation.navigate('Home');
                        }
                    }).catch ((error) => {
                        console.log('error message: ',error.message);
                        console.warn('Duplicate entry not allowed');
                        setCompany('');
                    })
            } catch (error) {
                console.log('error message from try catch block',error.message);
                console.warn('Duplicate entry not allowed');
                setCompany('');
            }
        }
    }

  return (
    <ScrollView style={styles.container} >
        <StatusBar 
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
        />
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer} >
        <Ionicons 
            name="chevron-back-outline"
            size={30}
            color="black"
            onPress={(e) => navigation.navigate('Welcome')}
        />
        <Text style={styles.headerTitle} > Sign Up </Text>
        </View>
        <Text style={styles.title} >Create Account</Text>
        <Text style={styles.content} >
            Enter your email, choose a username and passoword
        </Text>
        
        <View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="user"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    placeholder="Company Name"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.name}
                    onChange={e => setCompany({...company, name: e.nativeEvent.text})}
                />
            </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="mail"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.email}
                    onChange={e => setCompany({ ...company, email: e.nativeEvent.text })}
                />
            </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="lock"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    secureTextEntry={isPasswordShow ? false : true}
                    placeholder="Password"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.password}
                    onChange={e => setCompany({ ...company, password: e.nativeEvent.text })}
                />
                <Feather 
                    name={isPasswordShow ? "eye" : "eye-off"}
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{marginRight: 10}}
                    onPress={() => setIsPasswordShow(!isPasswordShow)}
                />
            </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="lock"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    placeholder="Billing Address"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.billingAddress}
                    onChange={e => setCompany({ ...company, billingAddress: e.nativeEvent.text })}
                />
            </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="info"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    placeholder="GST Number"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.gstNumber}
                    maxLength={15}
                    keyboardType="number-pad"
                    onChange={e => setCompany({ ...company, gstNumber: e.nativeEvent.text })}
                />
            </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer} >
            <View style={styles.inputSubContainer} >
                <Feather
                    name="phone"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{ marginLeft: 10, marginRight: 10 }}
                />
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    value={company.phone}
                    maxLength={10}
                    keyboardType="number-pad"
                    onChange={e => setCompany({ ...company, phone: e.nativeEvent.text })}
                />
            </View>
        </View>
        <Separator height={15} />
        <TouchableOpacity style={styles.signupButton} onPress={submitHandler} >
            <Text style={styles.signupButtonText} >Create Account</Text>
        </TouchableOpacity>
        {/* <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.facebookButton} >
            <View style={styles.socialButtonsContainer} >
                <View style={styles.socialButtonsLogoContainer} >
                    <Image style={styles.signinButtonLogo} source={Images.FACEBOOK} />
                </View>
                <Text style={styles.socialSigninButtonText} >Connect with Facebook</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} >
            <View style={styles.socialButtonsContainer} >
                <View style={styles.socialButtonsLogoContainer} >
                <Image style={styles.signinButtonLogo} source={Images.GOOGLE} />
                </View>
                <Text style={styles.socialSigninButtonText} >Connect with Google</Text>
            </View>
        </TouchableOpacity> */}
        </View>
    </ScrollView>
  );
};

export default SignupScreen;

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
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
        flex: 1,
    },
    signupButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'black',
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 5,
        alignSelf: 'center',
        marginTop: 20,
        color: 'black',
    },
    facebookButton: {
        backgroundColor: Colors.FACEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    socialSigninButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    signinButtonLogoContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25,
    },
    signinButtonLogo: {
        height: 18,
        width: 18,
        marginRight: 10
    },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 20,
        marginVertical: 3,
    },

})