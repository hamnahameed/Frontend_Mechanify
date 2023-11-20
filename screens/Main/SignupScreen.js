import React, { useState } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library you prefer


const SignupScreen = ({ navigation }) => {
    // data from backend part
    const [fdata,setFdata]=useState({
        username:'',
        password:'',
        email:'',
        role:'',
        cpassword:''
      })
    
      const [errormsg,setErrormsg]=useState('')


      const handleSignUp = async () => {
        if (fdata.username === '' || fdata.email === '' || fdata.password === '' || fdata.cpassword === '') {
            setErrormsg('All fields are Required');
            return;
        } else {
            if (fdata.password !== fdata.cpassword) {
                setErrormsg('Password and Confirm Password should be the same');
                return;
            } else {
                try {
                    const response = await fetch('http://192.168.1.115:3000/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(fdata)
                    });
    
                    const data = await response.json();
                    console.log('Response Data:', data);
    
                    if (data.error) {
                        setErrormsg(data.error);
                    } else if (data.message === 'verification code is sent to your Email') {
                        // console.log(data.userdata);
                        try {
                            alert(data.message)
                            // console.log('Before navigation attempt');
                            navigation.navigate('EmailVerification', { userdata: data.userdata });
                            // console.log('After navigation attempt');
                        } catch (error) {
                            console.error('Navigation error:', error);
                        }
                        
                    }
                    // Handle other cases if needed
                } catch (error) {
                    
                    console.error('Fetch Error:', error);
                    setErrormsg('Error: ' + error.message);
                }
            }
        }
    };
    
// ************end*************
    const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    
  };

 
  const handleSubmit = () => {
    // Here, you can use the `selectedRole` state to determine which role the user selected.
    // You can send this value to your backend for user registration.

    console.log('Selected Role:', selectedRole);
    // Perform the signup logic based on the selected role.
  };
    return (

        // background
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.jpeg')}style={styles.backgroundImage}>
                <View style={styles.logoContainer}>

            {/* logo */}
                    <View style={styles.logo }>
                        <Image source={require('../../assets/logo2.png')} style={styles.logoImage} />
                    </View>
                </View>

{
    errormsg?<Text style={styles.errormsg}>{errormsg}</Text> : null
}
                {/* signup form  */}
                <View style={styles.formContainer}>

                    <Text style={styles.placeholder}>Username</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../assets/userIcon.png')}
                            style={styles.inputIcon} />

                        <TextInput style={styles.input}
                            placeholder="username"
                            placeholderTextColor="black"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({...fdata,username:text})} />
                    </View>


                    <Text style={styles.placeholder}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../assets/email.png')}
                            style={styles.inputIcon} />
                        <TextInput style={styles.input}
                            placeholder="email"
                            placeholderTextColor="black"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({...fdata,email:text})} />
                    </View>

                    <Text style={styles.placeholder}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../assets/passIcon.png')}
                            style={styles.inputIcon} />
                        <TextInput style={styles.input}
                            placeholder="password"
                            placeholderTextColor="black"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry
                            onChangeText={(text) => setFdata({...fdata,password:text})} />
                    </View>
                    <Text style={styles.placeholder}>Re-Enter Password</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../assets/passIcon.png')}
                            style={styles.inputIcon} />
                        <TextInput style={styles.input }
                            placeholder="confirm password"
                            placeholderTextColor="black"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry
                            onChangeText={(text) => setFdata({...fdata,cpassword:text})} />

                    </View>
                    <Text style={styles.placeholder}>Login As</Text>

                <View style={[styles.inputContainer,{height:50}] }>
                    <Picker style={styles.input} selectedValue={selectedRole} 
                        onValueChange={(itemValue, itemIndex) => {
                            handleRoleChange(itemValue);
                            setFdata({ ...fdata, role: itemValue });
                        }}                       
                         onPressIn={() => setErrormsg(null)}>
                        
                    
                        <Picker.Item label="User" value="user"  />
                        <Picker.Item label="Mechanic" value="mechanic" />
                        <Picker.Item label="Shop Owner" value="shopOwner" />
                    </Picker>
                </View>



      
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                        <Text style={styles.loginButtonText}>Sign up</Text>
                    </TouchableOpacity>

                    <Text style={
                        {
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "bold"
                        }
                    }>Already have an account?
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('EmailVerification')}>
                        <Text style={
                            {
                                textAlign: "center",
                                color: "#1697C7",
                                fontSize: 15,
                            }
                        }>Sign In</Text>
                    </TouchableOpacity>

                 
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
        height: 'auto'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bfc1c2',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 15,
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
        top: 10

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
        fontWeight: 'bold'
    },
    socialLoginContainer: {
        marginTop: 0,
        flexDirection: 'row',
        marginLeft: 55
    },
    socialLoginButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
});

export default SignupScreen;
