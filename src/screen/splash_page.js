import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {firebaseApp} from '../component/FirebaseConfig'

export default class SplashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            logged: false,
            taikhoan: '',
            matkhau: ''
        }
    }
    getData = async () => {
        try {
          const tk = await AsyncStorage.getItem('@TK:tk')
          const mk = await AsyncStorage.getItem('@MK:mk')
         if(tk!= null && mk != null){
             this.setState({
                 isLoading: false,
                 logged: true,
                 taikhoan: tk,
                 matkhau:mk
             })
         } else{
            this.setState({
                isLoading: false,
                logged: false
            })
         }
        } catch(e) {
         console.log(e);
        }
      }
      dangNhap(taikhoan, matkhau){
        firebaseApp.auth().signInWithEmailAndPassword(taikhoan, matkhau).then(
            this.props.navigation.navigate('MainPage', {taikhoan: this.state.taikhoan})
        ).then( this.setState({
            isLoading: false
        })).catch(function(error){
            Alert.alert(
                'Thông báo',
                'Đăng nhập thất bại',
            )
        })
    }
   componentDidMount(){
       this.getData()
   }
    render(){
        return (
            <LinearGradient 
            colors ={['#42AF3B','#17B6A0']} 
            style = {{flex: 1,}}
            start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
            <View style={styles.header}>
                <Animatable.View style = {styles.border_logo}  
                animation="bounceIn"
                duraton="1500">
                <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon_app.png?alt=media&token=5f8abb56-0937-4f7e-a737-b4cfdc5a5bd9'}}
                style={styles.logo}
                resizeMode="stretch"
                />
    
                </Animatable.View>
                <Text style = {styles.title_header}>ROOM MANAGER</Text>
            </View>
            {
                this.state.isLoading?<ActivityIndicator size={50} color="#0000ff" />:
                (this.state.logged ? <TouchableOpacity 
                onPress={()=>{
                    this.setState({
                        isLoading: true
                    })
                    this.dangNhap(this.state.taikhoan, this.state.matkhau)}} 
                style = {{flex:1, alignItems: 'center'}}>
                    <Text style  ={{color:'white'}}>Chạm để tiếp tục!</Text>
                </TouchableOpacity> :
                    <Animatable.View 
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
                    animation="fadeInUpBig"
                    >
                    <Text style={[styles.title, {
                        color: 'black'
                    }]}>Hãy quản lý chi tiêu thông minh!</Text>
                    <Text style={styles.text}>Tham gia cùng chúng tôi</Text>
                    <View style={styles.button}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginPage')}>
                        <LinearGradient
                                colors ={['#42AF3B','#17B6A0']} 
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Đăng nhập</Text>
                            <MaterialIcons 
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    </Animatable.View>
                  )
               
            }
            </LinearGradient>
        
        );
    }
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
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
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  border_logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo/2,
    backgroundColor: 'white',
    borderWidth: 2
},
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});