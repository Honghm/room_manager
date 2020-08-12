import React from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import {styles} from '../../styles/styles';

const {width, height} = Dimensions.get('window')

const CarouselItem = ({item}) => {
    return <View style = {styles.cardView_Carousel}>
        <Image style = {styles.image_Carousel} source = {item.url}/>
        <View style = {styles.txt_Carousel}>
            <Text style = {styles.itemTitle_Carousel}>{item.title}</Text>
            <Text style = {styles.itemDescription_Carousel}>{item.description}</Text>
        </View>
    </View>
}

export default CarouselItem;