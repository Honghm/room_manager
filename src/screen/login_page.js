import React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import Carousel from '../component/carousel/carousel'
import {dummyData} from '../component/carousel/data'
import LinearGradient from 'react-native-linear-gradient';

export default class LoginPage extends React.Component {
    
    render(){
        return(
            <LinearGradient 
        colors ={['#42AF3B','#17B6A0']} 
        style = {{flex: 5,}}
        start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
             <ScrollView style = {{flex: 10}}>
                 <View style = {{flex: 8}}>
                 <Carousel data = {dummyData} />
                 </View>
             
                <View style = {{flex: 2}}>
                    {/* Đăng nhập với facebook */}
                    <View style = {{alignItems: 'center', paddingTop: 20}}>
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
                            onPress = {()=>this.props.navigation.navigate('Drawer', {name: "aaa"})}
                            >
                            <Image style = {{width: 43, height: 43}} source = {require('../../assets/image/icon-facebook.png')}/>
                            <Text style = {styles.title_button}>Đăng nhập bằng Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    {/* đăng nhập với google */}
                    <View style = {{alignItems: 'center', paddingTop: 20}}>
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
                    </View>

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
        paddingRight: 20 
    }, 
  
});