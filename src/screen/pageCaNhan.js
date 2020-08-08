import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    ScrollView,
    Alert, 
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import ItemThongTin from '../component/itemThongTin'


export default class PageCaNhan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataKhoanChi:[
                {id: 1, ngayMua: '03/08/2020', idData: 1},
                {id: 2, ngayMua: '04/08/2020', idData: 2},
                {id: 3, ngayMua: '19/08/2020', idData: 3},
                {id: 4, ngayMua: '09/08/2020', idData: 3}
            ]
        };
    }
    render(){
        const {dataKhoanChi} = this.state;
        return  <LinearGradient 
        colors ={['#42AF3B','#17B6A0']} 
        style = {{flex: 5,}}
        start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
          <View>
                <View>
                    <View style = {styles.app_bar}>
                        <View paddingLeft = {5}>
                            <Image style = {styles.image_app_bar} source={require('../../assets/image/icon-menu.png')}/>
                        </View>
                        <Text style = {styles.text_app_bar}>QUẢN LÝ CHI TIÊU CÁ NHÂN</Text>
                    </View>
                    <View style = {styles.body} >

                        {/*buttom điều hướng*/}

                        <View style = {{flexDirection: 'row', paddingBottom: 10, paddingLeft: 15, paddingRight: 15, display: 'flex', justifyContent: 'space-between'}}>
                            <View >
                                <TouchableOpacity style = {styles.btn_KhoanThu}>
                                    <Text style = {styles.txt_btn}>Khoản Thu</Text>
                                </TouchableOpacity>
                            </View>

                            <View >
                                <TouchableOpacity style = {styles.btn_KhoanChi}>
                                    <Text style = {{color:"white", paddingTop: 5, fontFamily: "Segoe UI", fontSize: 14, fontWeight: 'bold',}} >Khoản Chi</Text>
                                </TouchableOpacity>
                            </View>

                            <View >
                                <TouchableOpacity style = {styles.btn_KhoanThu}>
                                    <Text style = {styles.txt_btn}>Thống kê</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                        {/*list thông tin */}
                        <ScrollView>
                            {dataKhoanChi.map((data)=> (
                                <ItemThongTin key = {data.id} listData = {data}></ItemThongTin>
                            ))}
                            </ScrollView>
                    </View>

                    {/*bottom app bar */}
                    <View style = {{backgroundColor: '#17B6A0'}}>
                        <View>
                            <View style = {{height: 25, alignItems: 'center', backgroundColor: '#CDCCCC' }}>
                                <View style = {{width: 50, height: 50, backgroundColor: '#2CDC07', borderRadius: 25, alignItems: 'center', 
                                paddingTop: 12,  shadowOpacity: 0, shadowRadius: 20, shadowColor: 'black', shadowOffset: {width: 0, height: 0}}}>
                                    <TouchableOpacity onPress = {()=> Alert.alert("hello")} >
                                        <Image style = {{width: 25, height: 25}} source = {require('../../assets/image/icon-plus.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center', display:'flex', justifyContent: 'space-between', paddingLeft: 40, paddingRight: 40, paddingTop: 5}}>
                                <View style = {{width: 32, height: 32, borderRadius: 16, backgroundColor: 'white',  alignItems: 'center', paddingTop: 5}} >
                                <TouchableOpacity >
                                        <Image style = {{width: 25, height: 25}} source = {require('../../assets/image/icon-nhom.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style = {{width: 32, height: 32, borderRadius: 16, backgroundColor: 'white', alignItems: 'center', paddingTop: 3}}>
                                <TouchableOpacity>
                                        <Image style = {{width: 25, height: 25}} source = {require('../../assets/image/icon-ca-nhan-red.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                    
                </View>

          </View>
        </LinearGradient>
      
    }
};

const styles = StyleSheet.create({
    app_bar: {
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        padding: 5,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0}
    },
    text_app_bar:{
        fontFamily: 'Segoe UI',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: 'white'
    },
    image_app_bar:{
        width: 25,
        height: 35,
    },
    body: {
        height: 585,
        backgroundColor: 'rgb(205,204,204)',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        
    },
    buttom_app_bar:{

    },
    btn_KhoanThu:{
        alignItems: 'center',
        width: 90,
        height: 35,
        backgroundColor: 'white',
        borderColor: '#05FF30',
        borderWidth: 2,
        alignItems: 'center'
    },
    btn_KhoanChi:{
        alignItems: 'center',
        width: 90,
        height: 35,
        backgroundColor: '#07E459',
        borderColor: '#05FF30',
        borderWidth: 2,
        alignItems: 'center',
    },
    txt_btn:{
        paddingTop: 5,
        fontFamily: 'Segoe UI',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },
});