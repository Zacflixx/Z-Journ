import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {AuthContext} from '../navigation/AuthProvider.android';

// import Users from '../model/users';
const image = require('../assets/signin.png');


const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    // username: '',
    // password: '',
    // check_textInputChange: false,
    secureTextEntry: true,
    // isValidUser: true,
    // isValidPassword: true,
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  // const {colors} = useTheme();

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#063C53" barStyle="light-content" />
        <ImageBackground source={image} style={styles.image}>


      <View style={styles.header}>
        <Text style={styles.text_header}>Sign In</Text>
      </View>
      <View>
        <Text style={styles.text_header2}>Sign In to your Z-Journal account</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {

            opacity:0.3,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: '#F4FBFF',
            },
          ]}>
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#F4FBFF" size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#9AABB5"
            style={styles.textInput}
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="#F4FBFF" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {/* {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )} */}

        <Text
          style={[
            styles.text_footer,
            {
              color: '#F4FBFF',

              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#F4FBFF" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#9AABB5"
            style={[
              styles.textInput,
              {
                color: '#F4FBFF',
              },
            ]}
            autoCapitalize="none"
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />
          {/* <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#c4ae66" size={20} />
            ) : (
              <Feather name="eye" color="#c4ae66" size={20} />
            )}
          </TouchableOpacity> */}
        </View>
        {/* {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )} */}

        <TouchableOpacity>
          <Text style={{color: '#F4FBFF', marginTop: 15, opacity:0.7}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => login(email, password)}
            style={[
              styles.signIn,
              {
                width: 236,
  height: 42,
  // left: 76,
  // top: 516,
  backgroundColor: "#F4FBFF",
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  borderBottomRightRadius: 28,
  borderBottomLeftRadius: 28,
  bottom:12,
  marginTop: 20
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {  fontFamily: "Abhaya Libre ExtraBold",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: 28,
  top:8,
  color: "#063C53"
                },
              ]}>
              Sign In
            </Text>
            <FontAwesome style={{
  bottom:20,
  left:70
  }} name="arrow-right" color="#063C53" size={20} />
          </TouchableOpacity>

          <TouchableOpacity   style={{top:2}}
            onPress={() => navigation.navigate('Signup')}>
            <LinearGradient colors={['#063C53', '#5289a3']} style={{  width: 236,
  height: 42,
  // left: 76,
  // top: 516,
  backgroundColor: "#F4FBFF",
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  borderBottomRightRadius: 28,
  borderBottomLeftRadius: 28}}>
              <Text
                style={[
                styles.textSign,
                {  fontFamily: "Abhaya Libre ExtraBold",
  fontStyle: "normal",
   fontWeight: "bold",
  fontSize: 26,
  bottom:2,
  color: "#F4FBFF",
  left:75,
  top:1
                },
              ]}>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        </Animatable.View>
        </ImageBackground>
    </View>
  );
};

export default SignInScreen;


const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#c4ae66',
  },
  header: {

    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 44,
  },
  footer: {
    flex: 3,
    paddingHorizontal: 30,
    bottom:10,

  },
  text_header: {
  fontFamily: "Abhaya Libre ExtraBold",
  fontStyle: "normal",
 fontWeight:'bold',
  fontSize: 38,
  // lineHeight: "85.6%",
  color: "#063C53",
  marginLeft:6,
  bottom:4,
  },
  text_header2: {
  bottom:50,
  width: 343,
  height: 74,
  left: 28,
  fontFamily: "Asar",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 18,
  lineHeight: 85,
  textAlign: "center",
  color: "rgba(244, 251, 255, 0.85)"
  },
  text_footer: {
    color: '#fff',
    fontSize: 20,
    fontFamily: "Amethysta",
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4FBFF',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#4d3900',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
    image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

});
