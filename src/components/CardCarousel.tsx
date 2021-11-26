import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  carouselBox: {
    backgroundColor: '#936ee3',
    borderRadius: 30,
    height: 220,
    width: 306,
    paddingHorizontal: 40,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
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
    bottom: -12,
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
      <View style={styles.carouselBox}>
        <Text style={styles.carouselText}>{item.title}</Text>
        <Text style={styles.carouselText}>{item.text}</Text>
        <View style={styles.addBtn} />
      </View>
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
