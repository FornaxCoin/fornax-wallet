import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const BgImage = '../../assets/images/Group_35card.png';
const plusImg = '../../assets/images/Plusmini.png';

const styles = StyleSheet.create({
  carouselBox: {
    height: 240,
    width: 320,
    marginLeft: -10,
    paddingHorizontal: 50,
    flexDirection: 'column',
    paddingTop: 45,
  },
  carouselText: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    color: '#ffffff',
    textAlign: 'left',
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: '#363853',
    padding: 17,
    position: 'absolute',
    bottom: 25,
    right: 4,
    borderRadius: 20,
  },
});

const CardCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    {
      title: 'FRX Balance',
      text: 7430,
    },
    {
      title: 'FRX Balance',
      text: 7430,
    },
    {
      title: 'FRX Balance',
      text: 7430,
    },
    {
      title: 'FRX Balance',
      text: 7430,
    },
  ];

  const _renderItem = ({ item }: any) => {
    return (
      <ImageBackground source={require(BgImage)} style={styles.carouselBox}>
        <Text style={styles.carouselText}>{item.title}</Text>
        <Text style={styles.carouselText}>{item.text}</Text>
        <View style={styles.addBtn}>
          <Image source={require(plusImg)} style={{ width: 20, height: 20 }} />
        </View>
      </ImageBackground>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Carousel
            layout={'default'}
            ref={carouselRef}
            data={carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={_renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default CardCarousel;
