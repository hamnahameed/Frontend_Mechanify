//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet,ImageBackground,Image,TextInput,TouchableOpacity } from 'react-native';

// create a component
const EmailVerificationScreen = ({navigation,route}) => {
   
   
    const [usercode,setUserCode]=useState("xxx")
    const [actualcode,setactualcode]=useState(null)
   

    useEffect(()=>{
        setactualcode(route.params?.userdata[0]?.verificationCode)
       
    },[])


    const handleVerify=()=>{
        
        console.log("actualcode",actualcode,"usercode",usercode);
        if (!userdata) {
            // Handle the case where userdata is not defined
            console.error('Userdata is not defined');
            return;
        }

        if(usercode==='xxx'|| usercode===''){
            setErrormsg("Please Enter Valid Code");
        }
       else  if(usercode==actualcode){
        const fdata={
            username:userdata[0]?.username,
            password:userdata[0]?.password,
            email:userdata[0]?.email,
            role:userdata[0]?.role,
            
          }
            fetch('http://192.168.1.115:3000/signup',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(fdata)
        
            }).then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.message==='User created successfully'){
                    alert(data.message)
                    navigation.navigate('Login')}
                    
                });
           
        }
        else {
            setErrormsg("Invalid Code");
        }
    }

    
    const { userdata } = route.params || {};
    const [errormsg,setErrormsg]=useState('')

   
    
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>

            {/* logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Image source={require('../../assets/logo2.png')}style={styles.logoImage }/>
                    </View>
                </View>
            
{
    errormsg?<Text style={styles.errormsg}>{errormsg}</Text>:null
}
{/*  form */}
                <View style={styles.formContainer}>
                
                    <Text style={styles.title}>Email Verification</Text>
                    <Text style={{textAlign:'center',color:'green'}}>Enter 6 digit code sent to your email</Text>
                    <View style={styles.inputContainer }>
                    


                        <TextInput style={styles.input}
                            placeholder="Enter Code"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            maxLength={6}
                            onChangeText={(text) => setUserCode(text)} 
                            onPressIn={() => setErrormsg(null)}
                            />
                    </View>
                    
                    
                    <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                        {/* <Text style={{textAlign: "center",fontSize: 15,fontWeight: "bold"}}
                         onPress={handleResendCode}>Resend Code?</Text> */}
                 
                </View>

            </ImageBackground>
        </View>
    );
};


// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:80
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop:-190
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
        left: 20,
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
        borderRadius: 30,
       
    },
    title:{
        fontSize: 25,
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
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        color: "black"
    },
    verifyButton: {
        backgroundColor: '#1697C7',
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10
    },
    verifyButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
export default EmailVerificationScreen;
