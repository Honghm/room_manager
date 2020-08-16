import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'


export default function ItemKhoanChi(props){
   var {data} = props;
    return  <View style = {styles.container}>
        <View style = {{flexDirection:'row', flex: 1}}>
            <Image style = {styles.image} source= {{uri: data.iconLoai}}></Image>
        <Text style = {styles.text}>{data.tenLoai}</Text>
        </View>
        <View style = {{flex: 1}}>
        <Text style = {styles.text}>{data.noiDung}</Text>
        </View>
       <View style = {{flex: 1, alignItems: 'flex-end'}}>
       <Text style = {{ fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold', color:'red'}}>
                {data.giaTien} vnđ</Text>

       </View>
       
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 30, 
        display: 'flex', 
        flexDirection:'row',
        justifyContent:'space-between', 
        paddingRight: 10, 
        paddingLeft: 30, flex: 1
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
