        import React, {useState} from 'react';
        import {
            View,
            ImageBackground,
            Image,
            TextInput,
            TouchableOpacity,
            Text,
            StyleSheet,
            ScrollView
        } from 'react-native';



        const LoginScreen = ({navigation}) => { 

            // backend data handle
            const [fdata, setFdata] = useState({
                email: '',
                password: ''
            });

            const [errormsg,setErrormsg] = useState(null)

            // ****End************
            // login functioanlity
            const [username, setUsername] = useState('');
            const [password, setPassword] = useState('');

            

        // Login functionality
            const handleLogin = ({props}) => {
                console.log(fdata)
                if(fdata.email === '' || fdata.password === ''){
                    setErrormsg('All fields are Required')
                    return;
                }
                else{
                    fetch('http://192.168.1.115:3000/login',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(fdata)
                        
                    })
                    .then((res) => res.json()).then(
                        data => {
                            console.log(data)
                            if(data.error){
                                setErrormsg(data.error)
                            }
                            else {
                                // Check the role and navigate accordingly
                                if (data.role === 'mechanic') {
                                    navigation.navigate('Mechanic');
                                } else if (data.role === 'user') {
                                    navigation.navigate('User');
                                }
                            }
                        }
                    )
                }
            }

            // signup functionality
            const handleSignUp = () => {
                navigation.navigate('Signup'); // Navigate to SignUp screen
            };

            // background
            return (
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/bg.jpeg')}
                        style={styles.backgroundImage}>

                    {/* logo */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Image source={require('../../assets/logo2.png')}style={styles.logoImage }/>
                            </View>
                        </View>
                    
{
    errormsg ?<Text style={styles.errormsg}>{errormsg}</Text> : null
}
        {/* login form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.welcome}>Welcome Back!</Text>
    <ScrollView>
                            <Text style={styles.placeholder }>Email</Text>
                            <View style={styles.inputContainer }>
                                <Image source={require('../../assets/email.png')}
                                    style={styles.inputIcon}/>
                                <TextInput style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="black"
                                    onPressIn={() => setErrormsg(null)}
                                    onChangeText={(text) => setFdata({...fdata,email:text})} />
                            </View>
                            <Text style={styles.placeholder}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/passIcon.png')}
                                    style={styles.inputIcon}/>
                                <TextInput style={styles.input}
                                    placeholder="password"
                                    placeholderTextColor="black"
                                    onPressIn={() => setErrormsg(null)}
                                    secureTextEntry
                                    onChangeText={(text) => setFdata({...fdata,password:text})} />
                            </View>
                            <TouchableOpacity onPress={
                                    () => alert('Forgot Password?')
                                }
                                style={
                                    styles.forgotPassword
                            }>
                                <Text style={
                                    styles.forgotPasswordText
                                }>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={
                                    styles.loginButton
                                }
                                onPress={handleLogin}>
                                <Text style={
                                    styles.loginButtonText
                                }>Login</Text>
                            </TouchableOpacity>

                            <Text style={
                                {
                                    textAlign: "center",
                                    top: 5,
                                    fontWeight: "bold"
                                }
                            }>Or login with</Text>
                            <View style={
                                styles.socialLoginContainer
                            }>
                                <TouchableOpacity style={
                                    styles.socialLoginButton
                                }>
                                    <Image style={
                                            styles.socialLoginButtonText
                                        }
                                        source={
                                            require("../../assets/google.png")
                                        }/>
                                </TouchableOpacity>
                            </View>
                            <Text 
                                style={{textAlign: "center",fontSize: 15,fontWeight: "bold"}}>Don't have an account?
                            </Text>

                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={{textAlign: "center",color: "#1697C7",fontSize: 15}}>Signup</Text>
                            </TouchableOpacity>
    </ScrollView>
                        </View>

                    </ImageBackground>
                </View>
            );
        };


        // styling
        const styles = StyleSheet.create({
            container: {
                flex: 1
            },
            backgroundImage: {
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
                alignItems: 'center'
            },
            logoContainer: {
                alignItems: 'center',
                marginBottom: 50
            },
            logo: {
                width: 150,
                height: 150,
                borderWidth: 1,
                borderColor: "#1697C7",
                borderRadius: 80,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            },
            logoImage: {
                width: 350,
                height: 300,
                left: 18,
                top: 20,
                resizeMode: 'contain'
            },
            errormsg:{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                backgroundColor: 'red',
                textAlign:'center',
                margin:2,
                padding:5   
            },
            formContainer: {
                width: '80%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 50,
                height:'auto'
            },
            welcome: {
                fontSize: 28,
                fontWeight: "bold",
                fontFamily: "serif",
                textAlign:'center',
            },
            inputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#bfc1c2',
                borderRadius: 15,
                marginBottom: 5,
                marginTop: 30,
                paddingVertical: 10,
                paddingHorizontal: 10
            },


            inputIcon: {
                width: 20,
                height: 20,
                marginRight: 10
            },
            input: {
                flex: 1,
                color: "black"
            },
            placeholder: {
                fontSize: 15,
                fontWeight: "bold",
                paddingLeft: 5,
                top: 30

            },
            forgotPassword: {
                alignSelf: 'flex-end'
            },
            forgotPasswordText: {
                color: 'black'
            },
            loginButton: {
                backgroundColor: '#1697C7',
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 20
            },
            loginButtonText: {
                color: 'white',
                fontSize: 25,
                fontWeight: 'bold',
            },
            socialLoginContainer: {
                marginTop: 0,
                flexDirection: 'row',
                justifyContent:'center'
            },
            socialLoginButton: {
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5
            },
            socialLoginButtonText: {
                color: '#fff',
                width: 150,
                height:50,
            }
        });

        export default LoginScreen;
