import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
  
} from 'react-native'
import {firebaseApp} from '../../../component/FirebaseConfig'
import ItemKhoanChi from './itemKhoanChi'
import {defines} from '../../../defines'


export default class ListKhoanChi extends Component {
  constructor(props){
      super(props);
      this.itemRef = firebaseApp.database();
      this.state = {
        dataSource: [],
        tongTien: 0,
        heightContainer: 0
    }
   
  }
   getData(idData){
    this.itemRef.ref('Groups/PenHouse/KhoanChi').child(idData).child('data').on('child_added', (dataSnapshot)=>{
        var item = [];
        var ten  = this.getTenNguoiLap(dataSnapshot.child('nguoiLap').val())
        item.push({
            id: dataSnapshot.key,
            iconLoai: dataSnapshot.child('iconLoai').val(),
            tenLoai: dataSnapshot.child('tenLoai').val(),
            noiDung: dataSnapshot.child('noiDung').val(),
            giaTien: dataSnapshot.child('giaTien').val(),
            nguoiLap: ten
        })
       this.setState(
        this.state.dataSource  = this.state.dataSource.concat(item)
    )
    })
   }
   getTenNguoiLap(idName){
       var ten;
    this.itemRef.ref('Users').child(idName).on('value', (dataSnapshot)=>{
        ten = dataSnapshot.child('ten').val()
    })
    return ten;
   } 
 componentDidMount( ){
    this.getData(this.props.listData.idData);
    this.state.heightContainer = 60 + this.state.dataSource.length*30;
 }
    render(){
        var dd = this.props.listData.ngayMua.slice(0,2);
        var mm = this.props.listData.ngayMua.slice(3,5);
        var yyyy = this.props.listData.ngayMua.slice(6,10);
        var day_of_week = get_day(dd, mm, yyyy);
       var tongTien = 0;
       this.state.dataSource.map((data)=>{
        tongTien += data.giaTien;
    });

        return(
            <View>
                {
                    this.state.dataSource.length>0?<View style = {{height: this.state.heightContainer, 
                        display: 'flex', flexDirection: 'row', 
                        backgroundColor:'white',
                        borderRadius: 20,
                        padding: 5,
                        flex: 10
                        }}>
                                  {/* ngày tháng */}
                                <View style = {{height: this.state.heightContainer, justifyContent:'space-around', flex: 1}}>
                                  <View style = {styles.date}>
                                      <View style = {{width: 60, height: 30, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                                       {
                                          day_of_week == 'CN' ? <Text/> :<Text style= {{fontSize: defines.sizeText, fontFamily: defines.font}}> Thứ </Text>
                                       } 
                                     
                                          <Text style= {{fontSize: defines.sizeText*2, fontFamily: defines.font, fontWeight: 'bold'}}>{day_of_week}</Text>
                                      </View>
                                      <Text style= {{fontSize: defines.sizeText, fontFamily: defines.font}}>{dd}-{mm}</Text>
                                      <Text style= {{fontSize: defines.sizeText, fontFamily: defines.font, paddingBottom: 3}}>{yyyy}</Text>
                                  </View>
                                </View>
                                
                                <View style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 9}}>
                       
                                    {/* Tiêu đề */}
                                  <View style = {{display: 'flex', flexDirection: 'row', flex: 1, paddingBottom: 10, marginLeft: 30}}>
                                      <View style ={{ width: 90, alignItems: 'center' ,flex: 1}}>
                                          <Text style = {styles.textTieuDe} >Loại</Text>
                                      </View>
                                      <View style ={{ width: 90, alignItems: 'center' ,flex: 1.6}}>
                                          <Text style = {styles.textTieuDe}>N.Dung</Text>
                                      </View>
                                      <View style ={{ width: 90, alignItems: 'center' ,flex: 0.8}}>
                                          <Text style = {styles.textTieuDe}>G.Tiền</Text>
                                      </View>
                                      <View style ={{ width: 90, alignItems: 'center' ,flex: 0.8}}>
                                          <Text style = {styles.textTieuDe}>N.Lập</Text>
                                      </View>
                                  </View>
                                  
                                  {/* list Thông tin */}
                                  <View style = {{flex: 8}}>
                                  <View style = {{justifyContent: 'space-between', flex: 7, paddingLeft: 5}}>
                                      {this.state.dataSource.map(data =>(
                                          <ItemKhoanChi key = {data.id} data = {data}/>
                                      ))}
                                     
                                  </View>
                                      <View style = {{flexDirection:'row', flex:1, paddingBottom: 10 ,alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
                                          <View style = {{paddingLeft:30, paddingRight: 20}}>
                                              <Text style = {{fontSize: defines.sizeText + 2, fontFamily: defines.font, fontWeight: 'bold',color: 'red'}}>TỔNG CHI: {tongTien}K</Text>
                                          </View>
                                          <TouchableOpacity>
                                              <Text style = {{fontSize: defines.sizeText, fontFamily: defines.font, fontWeight: 'bold', color: '#054FFC', textDecorationLine:'underline'}}>Xem chi tiết</Text>
                                          </TouchableOpacity>
                                      
                                      </View>
                                  </View>
                                
                                </View>
                               
                            </View>
                    :<View/>
                }
            </View>
              ) 
    }
};
const styles = StyleSheet.create({
    date:{
        width: 60,
        height:60,
        backgroundColor:'white',
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'
    },
   textTieuDe: {
    fontSize: defines.sizeText,
     fontFamily: defines.font, 
     fontWeight: 'bold',
   },
});

function get_day(dd, mm, yyyy) {
    var JMD = Math.round((Number(dd)  + ((153 * (Number(mm) + 12 * ((14 - Number(mm)) / 12) - 3) + 2) / 5) +
    (365 * (Number(yyyy) + 4800 - ((14 - Number(mm)) / 12))) +
    ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 4) - 
   ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 100) + 
   ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 400)  - 32045) % 7);
   switch (JMD) {
    case 0:
        return 'CN';
     case 1:
        return '2';
     case 2:
        return '3';
     case 3:
        return '4';
     case 4:
        return '5';
     case 5:
        return '6';
     case 6:
        return '7';
    }
     
}

