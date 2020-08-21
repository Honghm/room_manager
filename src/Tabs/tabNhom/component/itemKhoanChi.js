import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import {defines} from '../../../defines'

export default function ItemKhoanChi(props){
   var {data} = props;
    return  <View style = {styles.container}>
          <View style = {{flexDirection:'row', flex: 1, paddingLeft: 3}}>
            <Image style = {styles.image} source= {{uri: data.iconLoai}}></Image>
        <Text style = {styles.text}>{data.tenLoai}</Text>
        </View>
        <View style = {{flex: 1.6, alignItems: 'center',paddingLeft: 5}}>
        <Text style = {styles.text}>{data.noiDung}</Text>
        </View>
       <View style = {{alignItems: 'center', flex: 0.8}}>
      {
          data.giaTien>=1000? <Text style = {{ fontSize: defines.sizeText, fontFamily: defines.font, fontWeight: 'bold', color:'red'}}>
          {data.giaTien/1000}TR</Text>: <Text style = {{ fontSize: defines.sizeText, fontFamily: defines.font, fontWeight: 'bold', color:'red'}}>
                {data.giaTien}K</Text>
      }
       </View>
       <View style = {{flex: 0.6, alignItems: 'center'}}>
        <Text style = {styles.text}>{data.nguoiLap}</Text>
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
        paddingLeft: 20, flex: 1,
        
    },
    text: {
        fontSize: defines.sizeText, 
        fontFamily: defines.font, 
        fontWeight: 'bold',
    },
    image:{
        width: 15,
        height: 15,
    }
}
);
