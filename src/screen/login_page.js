import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet,ScrollView, TextInput, Alert, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {firebaseApp} from '../component/FirebaseConfig'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
       this.state = {
        username: '',
        password: '',
        idUser:'',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
       }
       this.getData()
      
    }
     storeData = async (tk, mk) => {
        try {
          await AsyncStorage.setItem('@TK:tk', tk)
          await AsyncStorage.setItem('@MK:mk', mk)
        } catch (e) {
            console.log(e);
          // saving error
        }
      }
      getData = async () => {
        try {
          const tk = await AsyncStorage.getItem('@TK:tk')
          const mk = await AsyncStorage.getItem('@MK:mk')
         if(tk!= null && mk != null){
             console.log(tk);
             console.log(mk);
             this.dangNhap(tk,mk)
         }
        //  this.dangNhap(tk, mk)
         
        } catch(e) {
         console.log(e);
        }
      }
      componentDidMount(){
         
      }
    dangNhap(taikhoan, matkhau){
        firebaseApp.auth().signInWithEmailAndPassword(taikhoan, matkhau).then(
            (props)=>{
               this.storeData(taikhoan, matkhau)
                this.props.navigation.navigate('MainPage', {taikhoan: props.user.email})}
        ).catch(function(error){
            Alert.alert(
                'Thông báo',
                'Đăng nhập thất bại',
            )
        })
    }
    textInputChange(val) {
        if( val.trim().length >= 4 ) {
            this.setState({
                username: val,
                check_textInputChange: true,
                isValidUser: true
            })
        } else {
            this.setState({
                username: val,
                check_textInputChange: false,
                isValidUser: false
            })
        }
    }
    handlePasswordChange (val) {
        if( val.trim().length >= 8 ) {
            this.setState({
                password: val,
                isValidPassword: true
            })
        } else {
            this.setState({
                password: val,
                isValidPassword: false
            })
        }
    }
    updateSecureTextEntry(){
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }
    handleValidUser (val) {
        if( val.trim().length >= 4 ) {
            this.setState({
                isValidUser: true
            })
        } else {
            this.setState({
                isValidUser: false
            })
        }
    }
    render(){
        return(
            <LinearGradient 
        colors ={['#42AF3B','#17B6A0']} 
        style = {{flex: 1,}}
        start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
             <ScrollView style = {{flex: 0.5}}>
           
                 <Animatable.View animation="bounceIn" style = {{flex: 1, alignItems: 'center'}}>
                
                 <View style={styles.header}>
                    <Animatable.Image 
                        animation="bounceIn"
                        duraton="1500"
                    source={require('../../assets/image/icon_app.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                    />
                </View>
                <Text style = {styles.title_header}>ROOM MANAGER</Text>
                
                 </Animatable.View>
                 <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: 'white'
            }]}
        >
            <Text style={[styles.text_footer, {
                color: 'black'
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color='black'
                    size={20}
                />
                <TextInput 
                    placeholder="Nhập email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: 'black'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) =>this.textInputChange(val)}
                    onEndEditing={(e)=>this.handleValidUser(e.nativeEvent.text)}
                />
                {this.state.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { this.state.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email nhập vào không đúng</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color:'black',
                marginTop: 35
            }]}>Mật khẩu</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color='black'
                    size={20}
                />
                <TextInput 
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#666666"
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color:'black'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => this.handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={()=>this.updateSecureTextEntry()}
                >
                    {this.state.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            
            { this.state.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            <TouchableOpacity
           onPress={() => Alert.alert('Thông báo', 'Liên hệ Minh Hồng để lấy lại mật khẩu')}
            >
                <Text style={{color: '#009387', marginTop:15}}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => this.dangNhap(this.state.username, this.state.password)}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Đăng Nhập</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
            </ScrollView>
        </LinearGradient>
           
        );
    }
};

const styles = StyleSheet.create({
    title_button:{
        fontFamily:  'Segoe UI', 
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingRight: 20 ,
        color: 'white'
    }, 
    title_text:{
        fontFamily:  'Segoe UI', 
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingRight: 20 ,
        color: 'black'
    }, 
    title_header:{
        fontFamily:  'Segoe UI', 
        fontSize: 30, 
        fontWeight: 'bold', 
        paddingRight: 20 ,
        color: 'red',
    },
    header: {
        flex: 2,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
       marginHorizontal: 100,
       marginTop:50

    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 10
    },
      footer: {
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius:20
      },
    
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
         
      },
      actionError: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 12,
      },
      button: {
          alignItems: 'center',
          marginTop: 20
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold'
      }
});