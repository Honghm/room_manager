import {StyleSheet, Dimensions} from 'react-native'
const {width, height} = Dimensions.get('screen')

export const styles = StyleSheet.create({
    center: {
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
    app_bar: {
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        padding: 5,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        //backgroundColor: '#42AF3B'
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
    cardView_Carousel: {
        flex: 1,
        width: width,
        height: height/1.6,
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 0, 
    },
    txt_Carousel: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5
    },
    image_Carousel: {
        width: width ,
        height: height/2,
        borderRadius: 0,
    },
    itemTitle_Carousel: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5,
      
    },
    itemDescription_Carousel: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    }, 
    dotView_Carousel:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        fontSize: 36,
        marginBottom: 16
      },
      androidButtonText: {
        color: 'blue',
        fontSize: 20
      }
})
