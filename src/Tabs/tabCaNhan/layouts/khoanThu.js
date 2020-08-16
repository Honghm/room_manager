import * as React from 'react';
import { View, Text, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window')
KhoanThu = ()=><View style = {styles.center}>
    <Text>Khoản thu</Text>
    {/* <View style = {{height:height - 250, width: width - 40,margin: 10, backgroundColor: 'white', borderRadius: 24, alignItems: 'center'}}>
       <View style = {{paddingTop: 5}}>
       <Text style = {{
           fontSize: 20,
           fontWeight: 'bold',
           color:'#002087',
           fontFamily: 'Segoe UI', 
       }}>THÊM KHOẢN CHI TIÊU</Text>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Loại chi</Text>
           <View style = {{width: 140, height: 40, borderWidth: 1}}></View>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Nội dung</Text>
           <View style = {{width: 200, height: 40, borderWidth: 1}}>
              
           </View>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Giá tiền</Text>
           <View style = {{width: 200, height: 40, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-betweend'}}>
               
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>vnđ</Text>
           </View>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Ngày mua</Text>
           <View style = {{width: 200, height: 40, borderWidth: 1}}></View>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Hóa đơn</Text>
           <View style = {{width: 200, height: 40, borderWidth: 1}}></View>
       </View>
       <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style = {{
           fontSize: 18,
           fontWeight: 'bold',
           color:'black',
           fontFamily: 'Segoe UI', }}>Ghi chú</Text>
           <View style = {{width: 200, height: 80, borderWidth: 1}}></View>
       </View>
       <View style = {{width: width - 60, padding: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
              <View style  ={{width: 120, height: 40, backgroundColor: '#1BAC98', alignItems: 'center', paddingTop: 5, borderRadius: 20, borderWidth: 1}}>
              <Text style = {{
                fontSize: 18,
                fontWeight: 'bold',
                color:'white',
                fontFamily: 'Segoe UI', }}>Thêm</Text>
                </View>
          </TouchableOpacity>
          <TouchableOpacity>
              <View style  ={{width: 120, height: 40, backgroundColor: '#FF0000',alignItems: 'center', paddingTop: 5,borderRadius: 20, borderWidth: 1}}>
              <Text style = {{
                fontSize: 18,
                fontWeight: 'bold',
                color:'white',
                fontFamily: 'Segoe UI', }}>Hủy</Text>
                </View>
          </TouchableOpacity>
       </View>
    </View> */}

</View>

export default KhoanThu;

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: '#CDCCCC',

    },
    tile:{
        fontFamily: 'Segoe UI', 
        fontSize: 36,
        marginBottom: 16
    },
})