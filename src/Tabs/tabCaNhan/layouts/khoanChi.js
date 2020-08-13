import React, {useState, useRef, Component} from 'react';
import { View,
     Text, 
     StyleSheet, 
     TouchableOpacity,
     FlatList, 
     Dimensions,
     Animated,
     Button
     } from 'react-native';
import ListKhoanChi from '../component/listKhoanChi'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';

//const { width, heigth } = Dimensions.get('window')

const  dataKhoanChi = [
    {id: 1, ngayMua: '03/08/2020', idData: 1},
    {id: 2, ngayMua: '04/08/2020', idData: 2},
    {id: 3, ngayMua: '19/08/2020', idData: 3},
    {id: 4, ngayMua: '09/08/2020', idData: 3}
]



KhoanChi = (props)=>{
    const {width, height} = Dimensions.get('window')
    let _panel = useRef(null)
    const _draggedValue = new Animated.Value(50);
   console.log(props);
    return(
        <View style = {{flex:1, alignItems:'center'}}>
            <View style ={{flex: 1, justifyContent:'flex-end', alignItems: 'center', }}>
                <View style = {{flex: 1, width: width}} >
                    <FlatList 
                    data = {dataKhoanChi}
                    renderItem = {({item}) => <View style = {{paddingBottom: 10}}>
                        <ListKhoanChi listData = {item}/>
                        </View>}
                    keyExtractor = {item =>'${item.id}'}
                    contentContainerStyle = {{padding: 10}}
                    />          
                </View>
                <View style = {{height: 45 ,position: 'absolute'}}>
                    <View style= {{width:width, height: 45,  alignItems: 'center'}}>
                        {/* <TouchableOpacity
                        onPress = {()=>_panel.show()}>
                            <View style ={styles.buttom}> 
                                <Icon 
                                name="plus" 
                                color= {'white'} 
                                size= {40}
                                />
                            </View>
                        </TouchableOpacity> */}

                        <SlidingUpPanel
                            ref={c => _panel = c}
                            draggableRange = {{top: 500, bottom: 50 }}
                            animatedValue = {_draggedValue}
                            backdropOpacity = {0.5}
                            snappingPoints = {[0]}
                            height = {height - 200}
                            friction = {0.9}
                            containerStyle = {{width: width - 20, marginLeft: 10,}}
                            >
                                <View style = {{flex: 1, height: 50, borderRadius: 24, alignItems: 'center'}}>
                                    <TouchableOpacity
                                    onPress = {()=> {_panel.show(1000, 2000)}}
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
                                <View style = {{height: height - 250, backgroundColor: 'red'}}>
                                    
                                </View>

                        </SlidingUpPanel>

                    </View>
                
                </View>
            </View>

        </View>

    )
}



 
 const styles =  StyleSheet.create({
    buttom: {
        height: 44, 
        width: 44,
        backgroundColor: '#10FF00',
        borderRadius: 22, 
        alignItems: 'center',
        paddingTop: 2
    },
    PanelHandle:{
        height: 5,
        width: 50,
        backgroundColor: '#666',
        borderRadius: 6,
        alignSelf:'center',
        margin: 6
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }
 })
 export default KhoanChi;

