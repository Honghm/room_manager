import React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet,ScrollView, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {firebaseApp} from '../component/FirebaseConfig'
export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
       this.state = {
        taiKhoan:'nhập email',
        matKhau:'nhập mật khẩu'
       }
    }
    dangNhap(taikhoan, matkhau){
        firebaseApp.auth().signInWithEmailAndPassword(taikhoan, matkhau).then(
            ()=>this.props.navigation.navigate('Drawer', {taikhoan: 'minhhong'})
        ).catch(function(error){
            Alert.alert(
                'Thông báo',
                'Đăng nhập thất bại',
            )
        })
    }
    render(){
        return(
            <LinearGradient 
        colors ={['#42AF3B','#17B6A0']} 
        style = {{flex: 5,}}
        start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
             <ScrollView style = {{flex: 10}}>
                 <View style = {{flex: 8}}>
                 {/* <Carousel data = {dummyData} /> */}
                 <Image style = {{width: 360, flex: 1}} source = {require('../../assets/image/intro1.png')}/>
                 </View>
             
                <View style = {{flex: 2, alignItems: 'center', paddingTop: 50}}>
                    <View style = {{width: 300, height: 50, borderWidth: 1, backgroundColor: 'white', flexDirection: 'row'}}>
                        <View style = {{width: 60, alignItems:'center', paddingTop: 10}}>
                            <Text style = {styles.title_text}>TK:</Text>
                        </View>
                        <View style = {{width: 240, height: 50}}>
                            <TextInput style = {styles.title_text}
                            value = {this.state.taiKhoan}
                            onFocus = {()=>this.setState({
                                taiKhoan: ''
                            })}
                            onChange = {(tk)=>this.setState({
                                taiKhoan: tk.nativeEvent.text
                            })}
                            />
                        </View>
                    </View>
                    <View style = {{width: 300, height: 50, borderWidth: 1, backgroundColor: 'white', flexDirection: 'row', marginTop: 20}}>
                        <View style = {{width: 60, alignItems:'center', paddingTop: 10}}>
                            <Text style = {styles.title_text}>MK:</Text>
                        </View>
                        <View style = {{width: 240, height: 50}}>
                            <TextInput style = {styles.title_text}
                            value = {this.state.matKhau}
                            onFocus = {()=>this.setState({
                                matKhau: ''
                            })}
                            onChange = {(mk)=>this.setState({
                                matKhau: mk.nativeEvent.text
                            })}
                            />
                        </View>
                    </View>
                    <TouchableOpacity 
                    onPress = {()=>this.dangNhap(this.state.taiKhoan, this.state.matKhau)}
                    >
                    <View style = {{width: 200, height: 50, backgroundColor: 'blue', marginTop: 20, alignItems: 'center', paddingTop: 10}}>
                        <Text style = {styles.title_button}> Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Đăng nhập với facebook */}
                    {/* <View style = {{alignItems: 'center', paddingTop: 20}}>
                        <TouchableOpacity
                            style={{   width: 300,  
                                height: 45, 
                                alignItems: 'center', 
                                flexDirection: 'row' , 
                                justifyContent: 'space-between',
                                backgroundColor: '#576EA5',
                                borderColor: 'black',
                                borderWidth: 1
                            }}
                            onPress = {()=>this.props.navigation.navigate('Drawer')}
                            >
                            <Image style = {{width: 43, height: 43}} source = {require('../../assets/image/icon-facebook.png')}/>
                            <Text style = {styles.title_button}>Đăng nhập bằng Facebook</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* đăng nhập với google */}
                    {/* <View style = {{alignItems: 'center', paddingTop: 20}}>
                        <TouchableOpacity
                        style={{   width: 300,  
                            height: 45, 
                            alignItems: 'center', 
                            flexDirection: 'row' , 
                            justifyContent: 'space-between',
                            backgroundColor: '#FF0000',
                            borderColor: 'black',
                            borderWidth: 1
                        }}
                            onPress = {()=>this.props.navigation.navigate('PageCaNhan')}
                            >
                            <Image style = {{width: 43, height: 43}} source = {require('../../assets/image/icon-google.png')}/>
                            <Text style = {styles.title_button}>Đăng nhập bằng Google</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
                
              
                
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
  
});