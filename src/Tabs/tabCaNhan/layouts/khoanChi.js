import React, {Component, useState} from 'react';
import { View,
     StyleSheet, 
     TouchableOpacity,
     FlatList, 
     Dimensions,
     Animated,
     Text,
     TextInput,
      Image
     } from 'react-native';
import ListKhoanChi from '../component/listKhoanChi'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {firebaseApp} from '../../../component/FirebaseConfig'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('window')

export default class KhoanChi extends Component {
    
   constructor(props){
       super(props);
       this.itemRef = firebaseApp.database();
       this.state = {
           dataSource: [],
           trang: 0, 
           loai: 0,
           show: false, 
           date: new Date(1598051730000),
           tenLoai:"",
           iconLoai: "",
           noiDung: "",
           giaTien: 0,
           ngayMua: "",
           hoaDon: "",
           ghiChu:"",
       }
   }
   onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var ngay = selectedDate.getDate();
    var thang =  selectedDate.getMonth() + 1;
    var nam  = selectedDate.getFullYear();
    if(ngay<10){ngay = '0' + ngay}
    if(thang<10){thang = '0' + thang}
   Platform.OS === 'ios';
   this.setState({
       date: this.state.date = currentDate,
       show: false,
       ngayMua: ngay + '-' + thang  + '-' + nam 
   })
  };
  setData (){
    const linkData = this.itemRef.ref('KhoanChi').child(this.state.ngayMua);
    var numData;
   linkData.child('data').once('value', (dataSnapshot)=>{
      numData = dataSnapshot.numChildren()
   })

   if(numData > 0){
    linkData.child('data').push({
        iconLoai: this.state.iconLoai,
        tenLoai: this.state.tenLoai,
        noiDung: this.state.noiDung,
        giaTien: Math.round(this.state.giaTien),
        ghiChu: this.state.ghiChu
    }).then(
        this.setState({
            tenLoai:"",
           iconLoai: "",
           noiDung: "",
           giaTien: 0,
           ngayMua: "",
           hoaDon: "",
           ghiChu:"",
          })
    )
   }else{
    linkData.set({
        data: [{
            iconLoai: this.state.iconLoai,
            tenLoai: this.state.tenLoai,
            noiDung: this.state.noiDung,
            giaTien: Math.round(this.state.giaTien),
            ghiChu: this.state.ghiChu
        }],
        ngayMua: this.state.ngayMua
      }).then(
          this.setState({
            tenLoai:"",
           iconLoai: "",
           noiDung: "",
           giaTien: 0,
           ngayMua: "",
           hoaDon: "",
           ghiChu:"",
          })
      )
   }
  
   
  }
  getIcon(value){
      switch (value) {
          case 1:
            return 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-an-uong.png?alt=media&token=34b4680f-11e7-496e-9409-062ab1d22bf0';
        
            case 2:
            return 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-mua-sam.png?alt=media&token=096fee69-f40f-4da3-b9c4-5a966ed6154e';
       
            case 3:
            return 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-suc-khoe.png?alt=media&token=36edcf9e-0bcc-42ab-936a-514e56977aff';

            case 4:
            return 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/delivery-man.png?alt=media&token=4269a806-b231-408c-821d-20e2d26634bf';
            
            case 5:
            return 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-khac.png?alt=media&token=834cdc5f-51d3-45e7-b003-245e5c4cf262';
            
      }
  }
   getData () {
    this.itemRef.ref('KhoanChi').on('child_added', (dataSnapshot)=>{
        var dataKhoanChi = [];
        dataKhoanChi.push({
            id: dataSnapshot.child('id').val(),
            ngayMua:dataSnapshot.child('ngayMua').val(),
            idData: dataSnapshot.key
        })
        this.setState(
            this.state.dataSource  = this.state.dataSource.concat(dataKhoanChi),
        );
    });

   }
   themKhoanChi = () => {
    this._panel.hide(),
    this.setData()
   }
    render(){
        const _draggedValue = new Animated.Value(50);
        return(
            <View style ={{flex: 1, justifyContent:'flex-end', alignItems: 'flex-end', }}>
            <View style = {{flex: 1, width: width}} >
               <FlatList 
               data = {this.state.dataSource}
               renderItem = {({item}) => <View style = {{paddingBottom: 10}}>
                   <ListKhoanChi listData = {item}/>
                   </View>}
               keyExtractor = {item =>item.id}
               contentContainerStyle = {{padding: 10}}
               />          
            </View>
            <SlidingUpPanel
                       ref={c => this._panel = c}
                       draggableRange = {{top: height - 180, bottom: 50 }}
                       animatedValue = {_draggedValue}
                       backdropOpacity = {0.2}
                       snappingPoints = {[0]}
                       height = {height - 200}
                       friction = {0.9}
                       containerStyle = {{width: width - 20, marginLeft: 10,}}
                       >
                           <View style = {{flex: 1, height: 50, borderRadius: 24, alignItems: 'center'}}>
                               <TouchableOpacity
                               onPress = {()=> {this._panel.show()}}
                               >
                               <View style ={styles.buttom}> 
                                   <Icon 
                                   name="plus" 
                                   color= {'white'} 
                                   size= {40}
                                   />
                               </View>
                               </TouchableOpacity>
                           </View>
                           <View style = {{height: height - 250, backgroundColor: 'white', borderRadius: 24, justifyContent: 'center', alignItems: 'center', flexDirection:'column-reverse'}}>
                             
                              {/* Buttom điều hướng */}
                              <View style = {{width: width - 60, padding: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <TouchableOpacity
                                   onPress = {()=> {this.themKhoanChi()}}
                                   >
                                       <View style  ={{width: 120, height: 40, backgroundColor: '#1BAC98', alignItems: 'center', paddingTop: 5, borderRadius: 20, borderWidth: 1}}>
                                       <Text style = {styles.btnTitle}>Thêm</Text>
                                           </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity
                                   onPress = {()=> {this._panel.hide()}}
                                   >
                                       <View style  ={{width: 120, height: 40, backgroundColor: '#FF0000',alignItems: 'center', paddingTop: 5,borderRadius: 20, borderWidth: 1}}>
                                       <Text style = {styles.btnTitle}>Hủy</Text>
                                           </View>
                                   </TouchableOpacity>
                               </View>
                               {/* Ghi chú */}
                               <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style = {styles.title}
                                   >Ghi chú</Text>
                                   <View style = {{width: 200, height: 80, borderWidth: 1 ,borderRadius: 5}}>
                                   <TextInput style = {styles.titleInput} 
                                   multiline
                                   onChange = {(ghiChu)=>this.setState({
                                       ghiChu: ghiChu.nativeEvent.text
                                   })}
                                   value = {this.state.ghiChu}
                                   />
                                   </View>
                               </View>
                                
                                {/* Hóa đơn */}
                                <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style = {styles.title}>Hóa đơn</Text>
                                   <View style = {{width: 200, height: 40, borderWidth: 1, flexDirection: 'row', paddingTop: 3,borderRadius: 5}}>
                                   <View style = {{width: 165}}>
                                   <TextInput style = {styles.titleInput} />
                                   </View>
                                   <View style = {{width: 30, height: 30}}>
                                       <TouchableOpacity>
                                           <Icon
                                           name = {'camera'}
                                           size = {28}
                                           />
            
                                       </TouchableOpacity>
                                   </View>
                                   </View>
                               </View>
                               
                                {/* Ngày mua */}
                                <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style = {styles.title}>Ngày mua</Text>
                                   <View style = {{width: 200, height: 40, borderWidth: 1, flexDirection: 'row', paddingTop: 3, borderRadius: 5}}>
                                   <View style = {{width: 165, height: 40}}>
                                   <TextInput style = {styles.titleInput}
                                   value = {this.state.ngayMua}
                                   onChange = {(ngayMua)=>this.setState({
                                       ngayMua: ngayMua.nativeEvent.text
                                   })}
                                    /> 
                                   </View>
                                   <View style = {{width: 30, height: 30}}>
                                       <TouchableOpacity
                                       onPress = {()  => this.setState({
                                           show: this.state.show = true
                                       })}
                                       >
                                           <Icon
                                           name = {'calendar-month-outline'}
                                           size = {28}
                                           />
            
                                       </TouchableOpacity>
                                   </View>
                                   </View>
                               </View>
                               
                               {/* Giá tiền */}
                               <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style = {styles.title}>Giá tiền</Text>
                                   <View style = {{width: 200, height: 40, borderWidth: 1, flexDirection: 'row',borderRadius: 5}}>
                                       <View style = {{width: 160, height: 40 }}>
                                           <TextInput style = {styles.titleInput}
                                           onChange = {(gia)=>this.setState({
                                               giaTien: gia.nativeEvent.text
                                           })}
                                           keyboardType={'numeric'}
                                           value = {this.state.giaTien}  />
                                       </View>
                                       <Text style = {styles.title}
                                       >vnđ</Text>
                                   </View>
                               </View>
                              
                              {/* Nội dung */}
                              <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style = {styles.title}>Nội dung</Text>
                                   <View style = {{width: 200, height: 40, borderWidth: 1, borderRadius: 5}}>
                                   <TextInput style = {styles.titleInput}
                                   onChange = {(nd) =>this.setState({
                                       noiDung: this.state.noiDung = nd.nativeEvent.text
                                   })}
                                   value = {this.state.noiDung} />
                                   </View>
                               </View>
                              
                               {/* Loại chi */}
                               <View style = {{width: width - 60, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between',}}>
                                   <Text style = {styles.title}>Loại chi</Text>
                                   <DropDownPicker
                                    items={[
                                        {label: 'Ăn uống', value: 1, icon:()=> <Image style = {{width: 25, height: 25, marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-an-uong.png?alt=media&token=34b4680f-11e7-496e-9409-062ab1d22bf0'}} />},
                                        {label: 'Mua sắm', value: 2, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-mua-sam.png?alt=media&token=096fee69-f40f-4da3-b9c4-5a966ed6154e'}} />},
                                        {label: 'Sức khỏe', value: 3, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-suc-khoe.png?alt=media&token=36edcf9e-0bcc-42ab-936a-514e56977aff'}} />},
                                        {label: 'Di chuyển', value: 4, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/delivery-man.png?alt=media&token=4269a806-b231-408c-821d-20e2d26634bf'}} />},
                                        {label: 'Khác', value: 5, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-khac.png?alt=media&token=834cdc5f-51d3-45e7-b003-245e5c4cf262'}} />},
                                    
                                    ]}
                                    defaultValue={this.state.loai}
                                    placeholder="Chọn loại"
                                    containerStyle={{height: 40, width: 160}}
                                    style={{backgroundColor: 'white',borderColor: 'black'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: 'white',borderColor: 'black', borderWidth: 1}}
                                    onChangeItem={item => this.setState({
                                        loai: item.value,
                                        iconLoai: this.getIcon(item.value),
                                        tenLoai: item.label
                                    })}
                                    labelStyle = {styles.titleInput}
                                   
                                />
                               </View>
                              
                              {/* tiêu đề */}
                               <View style = {{paddingTop: 5}}>
                                   <Text style = {{
                                       fontSize: 20,
                                       fontWeight: 'bold',
                                       color:'#002087',
                                       fontFamily: 'Segoe UI', 
                                   }}>THÊM KHOẢN CHI TIÊU</Text>
                               </View>
                               {this.state.show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={this.state.date}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) =>this.onChangeDate(event, selectedDate)}
                                />
                            )}
                           </View>
            
                   </SlidingUpPanel>
            </View>
        )
    }

    componentDidMount(){
        this.getData();
    }
    
};




 
 const styles =  StyleSheet.create({
    buttom: {
        height: 44, 
        width: 44,
        backgroundColor: '#10FF00',
        borderRadius: 22, 
        alignItems: 'center',
        paddingTop: 2,
        
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }, 
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        fontFamily: 'Arial',
        marginTop: 5,
        
    },
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        fontFamily:'Arial',
        marginTop: -5
    },
    btnTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white',
        fontFamily: 'Arial',
    }
 })


