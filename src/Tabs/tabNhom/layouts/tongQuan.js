import * as React from 'react';
import { View, 
    Text,
     StyleSheet,
     Dimensions,
     Image, 
     ScrollView,
    RefreshControl } from 'react-native';
import {defines} from '../../../defines'
import {firebaseApp} from '../../../component/FirebaseConfig'
const {width, height} = Dimensions.get('window')

export default class TongQuan extends React.Component {
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            quyPhong: '',
            thanhVien: [],
            refreshing: false
        }
    }
    setRefreshing(){
        this.setState({
            refreshing: !this.state.refreshing
        })
    }

    getData(){
        var tongtien = 0;
        this.itemRef.ref('Users').on('child_added', (dataSnapshot)=>{
            var dataTV = [];
            tongtien = tongtien +  Math.round(dataSnapshot.child('soDu').val())
            dataTV.push({
                id: dataSnapshot.key,
                ten: dataSnapshot.child('ten').val(),
                soDu: dataSnapshot.child('soDu').val()
            })
            this.setState({
                thanhVien: this.state.thanhVien  = this.state.thanhVien.concat(dataTV),
                quyPhong: tongtien,
                refreshing: false
            })
        })
    }
   
    onRefresh (){
        this.setState({
            refreshing: true,
            thanhVien: this.state.thanhVien = []
        });
       this.getData()
       
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        return(
            <ScrollView
            refreshControl = {
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
            }
            >
                    <View style = {{width: width - 40, height: height - 250, backgroundColor: 'white', justifyContent:'center', alignItems:'center', marginLeft: 20,borderRadius: 24,marginTop: 40}}>
                <View style = {{height: 120, width: 120, borderRadius: 60, borderWidth: 2}}>
                    <Image style = {{height: 116, width: 116, borderRadius: 56}} source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/room-manager-94bb0.appspot.com/o/avatar.jpg?alt=media&token=1985a3c0-eae1-443e-b7af-84a92d98dbee'}}/>
                </View>
                <Text style = {{color: 'red', fontSize: 22, fontWeight: 'bold', fontFamily:defines.font}}>PENHOUSE</Text>
                <Text style = {{color: 'red', fontSize: 18, fontWeight: 'bold', fontFamily:defines.font}}>Quỹ phòng {this.state.quyPhong} VNĐ</Text>
                <View style = {{marginTop: 20}}>
                    {this.state.thanhVien.map(data => (
                        <View key = {data.id} style = {{height: 30, width: 250,marginBottom: 5, flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                             <Text style = {{color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily:defines.font}}>{data.ten}: </Text>
                            <Text style = {{color: 'red', fontSize: 18, fontWeight: 'bold', fontFamily:defines.font}}>{data.soDu} VND</Text>
                        </View>
                    ))}
                </View>

            </View>
           
            </ScrollView>
             
        )
    }
};


const styles = StyleSheet.create({
    enter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'red'
    },
    tile:{
        fontFamily: 'Segoe UI', 
        fontSize: 36,
        marginBottom: 16
    },
})