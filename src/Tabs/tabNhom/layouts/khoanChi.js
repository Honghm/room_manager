import React, {Component} from 'react';
import { View,
     StyleSheet, 
     TouchableOpacity,
     FlatList, 
     Dimensions,
     Animated,
     Text,
     TextInput,
    Image,
    ScrollView,
    Alert,RefreshControl
     } from 'react-native';
import ListKhoanChi from '../component/listKhoanChi'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {firebaseApp} from '../../../component/FirebaseConfig'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {defines} from '../../../defines'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
const {width, height} = Dimensions.get('screen')

export default class KhoanChi extends Component {
    
   constructor(props){
       super(props);
       this.itemRef = firebaseApp.database();
       this.state = {
           dataSource: [],
           trang: 0, 
           loai: 0,
           show: false, 
           date: new Date(),
           email: props.route.params.email,
           tenLoai:"",
           iconLoai: "",
           noiDung: "",
           giaTien: "",
           ngayMua: "",
           hoaDon: "",
           ghiChu:"",
           nguoiLap: "",
           nguoiThamGia: [],
           dataNguoiTrongNhom:[],
           refreshing: false
       }
   }

   //xử lý sự kiện thay đổi ngày
   onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var ngay = selectedDate.getDate();
    var thang =  selectedDate.getMonth() + 1;
    var nam  = selectedDate.getFullYear();
    if(ngay<10){ngay = '0' + ngay}
    if(thang<10){thang = '0' + thang}
   Platform.OS === 'ios';
   console.log(event);
   this.setState({
       date: this.state.date = currentDate,
       show: false,
       ngayMua: ngay + '-' + thang  + '-' + nam 
   })
    };

    setData (){
        //lấy idUser từ email 
        var idUser;
        this.itemRef.ref('Users').on('child_added', (dataSnapshot)=>{
            if(dataSnapshot.child('email').val() == this.state.email){
                idUser = dataSnapshot.key
            }
        })
        var tinhTien = Math.ceil(this.state.giaTien/(this.state.nguoiThamGia.length))
        this.state.nguoiThamGia.map((user)=>{
            var soDu;
            this.itemRef.ref('Users').child(user).on('value' ,(data)=>{
                soDu = data.child('soDu').val()
            })
            this.itemRef.ref('Users').child(user).update({
                soDu:soDu - tinhTien
            })
        })
      
        var numData = 0;
        var idData = '';
        this.itemRef.ref('Groups/PenHouse').child('KhoanChi').on('child_added', (dataSnapshot)=>{
           if(dataSnapshot.child('ngayMua').val()==this.state.ngayMua){
               numData++;
               idData = dataSnapshot.key
           }
        })
       
        // kiểm tra xem ngày tạo khoản chi đã tồn tại hay chưa
        if(numData > 0){
            //ngày tạo đã tồn tại -> thêm dữ liệu vào ngày đã tạo
            this.itemRef.ref('Groups/PenHouse/KhoanChi').child(idData).child('data').push({
                iconLoai: this.state.iconLoai,
                tenLoai: this.state.tenLoai,
                noiDung: this.state.noiDung,
                giaTien: Math.round(this.state.giaTien)/1000,
                ghiChu: this.state.ghiChu,
                nguoiLap: idUser,
                nguoiThamGia:this.state.nguoiThamGia
            }).then(
                this.setState({
                    loai: 0,
                    iconLoai: "",
                    tenLoai: "",
                noiDung: "",
                giaTien: 0,
                ngayMua: "",
                hoaDon: "",
                ghiChu:"",
                nguoiThamGia: []

                })
            )
        }else{
            //ngày chưa tồn tại -> tạo ngày mới + thêm dữ liệu vào
            this.itemRef.ref('Groups/PenHouse/KhoanChi').push({
                data: [{
                    iconLoai: this.state.iconLoai,
                    tenLoai: this.state.tenLoai,
                    noiDung: this.state.noiDung,
                    giaTien: Math.round(this.state.giaTien/1000),
                    ghiChu: this.state.ghiChu,
                    nguoiLap: idUser,
                    nguoiThamGia:this.state.nguoiThamGia
                }],
                ngayMua: this.state.ngayMua
            }).then(
                this.setState({
                loai: 0,
                iconLoai: "",
                tenLoai: "",
                noiDung: "",
                giaTien: 0,
                ngayMua: "",
                hoaDon: "",
                ghiChu:"",
                nguoiThamGia: []
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

    //lấy data từ firebase
   getData() {
  
    //lấy danh sách các thành viên trong nhóm
    this.itemRef.ref('Groups/PenHouse/ThanhVien').on('child_added',(dataSnapshot)=>{
        var dataUserInGroup = [];
      this.itemRef.ref('Users/'+dataSnapshot.val()).on('value', (data)=>{
        dataUserInGroup.push({
            label: data.child('ten').val(),
            value: data.key,
        })
        this.setState(
            this.state.dataNguoiTrongNhom  = this.state.dataNguoiTrongNhom.concat(dataUserInGroup),
        );
      });
    })

    //lấy tên người đang đăng nhập theo email
    this.itemRef.ref('Users').on('child_added', (dataSnapshot)=>{
       if(dataSnapshot.child('email').val() == this.state.email){
           this.setState({
               nguoiLap: dataSnapshot.child('ten').val()
           })
       }
    })

    this.itemRef.ref('Groups/PenHouse/KhoanChi').on('child_added', (dataSnapshot)=>{
        var dataKhoanChi = [];
        dataKhoanChi.push({
            ngayMua:dataSnapshot.child('ngayMua').val(),
            idData: dataSnapshot.key
        })
        this.setState({
            dataSource: this.state.dataSource  = this.state.dataSource.concat(dataKhoanChi),
        }
          
        );
    });
    this.setState({refreshing: false})
   }

   themKhoanChi = () => {
       if(this.state.iconLoai !=""&&this.state.tenLoai!=""){
            if(this.state.noiDung!=""){
                if(this.state.giaTien!= 0){
                    if(this.state.ngayMua !=""){
                        if(this.state.nguoiThamGia.length!=0){
                            this._panel.hide(),
                            this.setData()
                        }else{
                            Alert.alert('Cảnh báo', 'Bạn cần chọn người tham gia khoản chi')
                        }
                    }else{
                        Alert.alert('Cảnh báo', 'Bạn cần chọn ngày khoản chi')
                    }
                }else{
                    Alert.alert('Cảnh báo', 'Bạn cần nhập giá tiền khoản chi')
                }
            }else{
                Alert.alert('Cảnh báo', 'Bạn cần nhập nội dung khoản chi')
            }
       }else{
           Alert.alert('Cảnh báo', 'Bạn cần chọn loại khoản chi')
       }
       console.log('ok');
   }
   onRefresh (){
    this.setState({
        dataSource:this.state.dataSource=  [],
        refreshing: true,
    });
   this.getData()
   
}
    render(){
        const _draggedValue = new Animated.Value(50);
        return(
         
            <View style ={{flex: 1, justifyContent:'flex-end', alignItems: 'flex-end', }}>
                <Text style = {{fontFamily: defines.font, fontSize: defines.sizeText, color: 'red', fontWeight:'bold', paddingRight: 10}}>Quy đổi: 1K = 1.000 VNĐ</Text>
                <Text style = {{fontFamily: defines.font, fontSize: defines.sizeText, color: 'red', fontWeight:'bold', paddingRight: 10}}>1TR = 1.000.000 VNĐ</Text>
                <View style = {{flex: 1, width: width}} >
               <FlatList 
                 refreshControl = {
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                }
               data = {this.state.dataSource}
               renderItem = {({item}) => <View style = {{paddingBottom: 10}}>
                   <ListKhoanChi listData = {item}/>
                   </View>}
               keyExtractor = {item =>item.idData}
               contentContainerStyle = {{padding: 10}}
               />          
            </View>
                <SlidingUpPanel
                    ref={c => this._panel = c}
                    draggableRange = {{top: height - 110, bottom: 50 }}
                    animatedValue = {_draggedValue}
                    backdropOpacity = {0.2}
                    height = {height - 125}
                    friction = {0.9}
                    containerStyle = {{width: width - 20, marginLeft: 10,}}
                    allowDragging = {false}
                    avoidKeyboard
                    >
                 <ScrollView style = {{flex: 10}}>

                    <View style = {{ height: 50, borderRadius: 24, alignItems: 'center'}}>
                            <TouchableOpacity
                            onPress = {()=> this._panel.show()}
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
                    
                    <View style = {{height: height - 180, backgroundColor: 'white', borderRadius: 24, justifyContent: 'center', alignItems: 'center', flexDirection:'column-reverse'}}>
                        {/* Buttom điều hướng */}
                        <View style = {{height: 50,  width: width - 60, flexDirection:'row', justifyContent:'space-between'}}>
                                        <TouchableOpacity
                                        onPress = {()=> {
                                            this.themKhoanChi()}}
                                        >
                                            <View style  ={{width: 120, height: 40, backgroundColor: '#1BAC98', alignItems: 'center', paddingTop: 5, borderRadius: 20, borderWidth: 1}}>
                                            <Text style = {styles.btnTitle}>Thêm</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress = {()=>{
                                            this._panel.hide()
                                            this.setState({
                                                nguoiThamGia: this.state.nguoiThamGia = []
                                            })
                                        }}
                                        >
                                            <View style  ={{width: 120, height: 40, backgroundColor: '#FF0000',alignItems: 'center', paddingTop: 5,borderRadius: 20, borderWidth: 1}}>
                                            <Text style = {styles.btnTitle}>Hủy</Text>
                                                </View>
                                        </TouchableOpacity>
                                    </View>
                        
                        <View style = {{height:height-300, paddingTop: 0}}>
                            {/* Loại chi */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Loại chi</Text>
                                <DropDownPicker
                                    items={[
                                        {label: 'Ăn uống', value: 1, icon:()=> <Image style = {{width: 25, height: 25, marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-an-uong.png?alt=media&token=34b4680f-11e7-496e-9409-062ab1d22bf0'}} />},
                                        {label: 'Mua sắm', value: 2, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-mua-sam.png?alt=media&token=096fee69-f40f-4da3-b9c4-5a966ed6154e'}} />},
                                        {label: 'Sức khỏe', value: 3, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-suc-khoe.png?alt=media&token=36edcf9e-0bcc-42ab-936a-514e56977aff'}} />},
                                        {label: 'Di chuyển', value: 4, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/delivery-man.png?alt=media&token=4269a806-b231-408c-821d-20e2d26634bf'}} />},
                                        {label: 'Khác', value: 5, icon:()=> <Image style = {{width: 25, height: 25,marginBottom: 5}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/icon-khac.png?alt=media&token=834cdc5f-51d3-45e7-b003-245e5c4cf262'}} />},
                                    
                                    ]}
                                    defaultValue={0}
                                    placeholder="Chọn loại"
                                    containerStyle={{height: 40, width: 160}}
                                    style={{backgroundColor: 'white',borderColor: 'black'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: 'white',borderColor: 'black', borderWidth: 1}}
                                    onChangeItem={item => {
                                        this.setState({
                                        loai: item.value,
                                        iconLoai: this.getIcon(item.value),
                                        tenLoai: item.label
                                    })}}
                                    labelStyle = {styles.titleInput}
                                />
                            </View>
                            
                            {/* Nội dung */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Nội dung</Text>
                                <View style = {styles.viewTextInput}>
                                    <TextInput
                                    placeholder= "Nhập chi tiết khoản chi"
                                    style = {[styles.titleInput],{flex:1}}
                                     onChange = {(nd) =>this.setState({
                                        noiDung: nd.nativeEvent.text
                                    })}
                                    value = {this.state.noiDung} 
                                    autoCapitalize="none"
                                    />
                                   
                                </View>
                            </View>
                            
                            {/* Giá tiền */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Giá tiền</Text>
                                <View style = {styles.viewTextInput}>
                                    <View style = {{width: 160, height: 40 }}>
                                        <TextInput 
                                        placeholder = "nhập giá tiền"
                                            style = {styles.titleInput}
                                            defaultValue=""
                                            onChange = {(gia)=>this.setState({
                                                giaTien: gia.nativeEvent.text
                                            })}
                                            keyboardType={'numeric'}
                                            value = {this.state.giaTien.toString()}  
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <Text style = {styles.title}>vnđ</Text>
                                </View>
                            </View>
                        
                            {/* Ngày mua */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Ngày mua</Text>
                                <View style = {styles.viewTextInput}>
                                    <View style = {{width: 165, height: 40}}>
                                        <TextInput 
                                        placeholder = "Chọn ngày mua"
                                            style = {styles.titleInput}
                                            value = {this.state.ngayMua}
                                            onChange = {(ngayMua)=>this.setState({
                                                ngayMua: ngayMua.nativeEvent.text
                                            })}
                                            autoCapitalize="none"
                                                
                                        /> 
                                    </View>
                                    <View style = {{width: 30, height: 30}}>
                                        <TouchableOpacity
                                            onPress = {()  => this.setState({
                                                show: this.state.show = true
                                            })}>
                                            <Icon
                                                name = {'calendar-month-outline'}
                                                size = {28}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                            {/* Hóa đơn */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Hóa đơn</Text>
                                <View style = {styles.viewTextInput}>
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
                            
                            {/* Người lập */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Người lập</Text>
                                <View style = {{width: 200, height: 40, borderWidth: 1,borderRadius: 5, alignItems: 'center',}}>
                                    <Text style = {styles.title}>{this.state.nguoiLap}</Text>
                                </View>
                            </View>
                            
                            {/* Người tham gia */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}>Người t.gia</Text>
                                <DropDownPicker
                                    items={this.state.dataNguoiTrongNhom}
                                    multiple
                                    defaultValue={0}
                                    placeholder="Chọn người"
                                    containerStyle={{height: 40, width: 160}}
                                    style={{backgroundColor: 'white',borderColor: 'black'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    multipleText = {this.state.nguoiThamGia.length!== 0? "đã chọn %d": "Chọn người"}
                                    dropDownStyle={{backgroundColor: 'white',borderColor: 'black', borderWidth: 1, height: 100}}
                                    onChangeItem={item => {
                                        this.setState({
                                        nguoiThamGia: this.state.nguoiThamGia = item
                                    })}}
                                    labelStyle = {styles.titleInput}
                                
                                />
                            </View>

                            {/* Ghi chú */}
                            <View style = {styles.viewThongTin}>
                                <Text style = {styles.title}
                                >Ghi chú</Text>
                                <View style = {{width: 200, height: 80, borderWidth: 1 ,borderRadius: 5}}>
                                    <TextInput style = {[styles.titleInput], {flex: 1}} 
                                    multiline
                                    onChange = {(ghiChu)=>this.setState({
                                        ghiChu: ghiChu.nativeEvent.text
                                    })}
                                    value = {this.state.ghiChu}
                                    autoCapitalize="none"
                                    />
                                </View>
                            </View>
                                
                        </View>
                        
                         {/* tiêu đề */}
                         <View style = {{paddingTop: 0, height: 40}}>
                            <Text style = {{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color:'#002087',
                                fontFamily: defines.font, 
                            }}>THÊM KHOẢN CHI TIÊU</Text>
                        </View>
                     
                        {/* ngày tháng */}
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
        
                          
                 </ScrollView>
                 
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
    title: {
        fontSize: defines.sizeText + 2,
        fontWeight: 'bold',
        color:'black',
        fontFamily: defines.font,
        marginTop: 5,
        
    },
    viewTextInput:{
        width: 200, 
        height: 40, 
        borderWidth: 1,
        borderRadius: 5, 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    titleInput: {
        fontSize: defines.sizeText + 2,
        fontWeight: 'bold',
        color:'black',
        fontFamily:defines.font,
        marginTop: -5
    },
    btnTitle: {
        fontSize: defines.sizeText + 6,
        fontWeight: 'bold',
        color:'white',
        fontFamily: defines.font,
    },
    viewThongTin:{
        width: width - 60,
        height: (height - 180)/11,
        paddingBottom: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between',
       
    }
 })


