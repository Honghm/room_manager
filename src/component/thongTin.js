import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    Alert
} from 'react-native'


export default function ThongTin(props){
   var {data} = props;
    var iconImage;
    iconImage = get_icon(data.iconLoai);
    return  <View style = {styles.container}>
        <View style = {{flexDirection:'row'}}>
            <Image style = {styles.image} source= {iconImage}></Image>
        <Text style = {styles.text}>{data.tenLoai}</Text>
        </View>
        <Text style = {styles.text}>{data.noiDung}</Text>
        <Text style = {{ fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold', color:'red'}}>
                {data.giaTien} vnđ</Text>

    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 270, 
        height: 25, 
        display: 'flex', 
        flexDirection:'row',
        justifyContent:'space-between', 
        paddingRight: 10, 
        paddingLeft: 5
    },
    text: {
        fontSize: 14, 
        fontFamily: 'Segoe UI', 
        fontWeight: 'bold',
    },
    image:{
        width: 20,
        height: 20,
    }
}
);

function get_icon(params) {
    switch (params) {
        case '1':
           return require('../../assets/image/icon-an-uong.png');
        case '2':
            return require('../../assets/image/icon-mua-sam.png');
        case '3':
            return require('../../assets/image/icon-suc-khoe.png');
        case '4':
            return require('../../assets/image/icon-khac.png');
    }

}