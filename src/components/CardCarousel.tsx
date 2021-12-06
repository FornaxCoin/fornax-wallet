import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
const BgImage = '../../assets/images/Group_35card.png';
const plusImg = '../../assets/images/Plusmini.png';

const styles = StyleSheet.create({
  carouselBox: {
    height: 240,
    marginLeft: -40,
    marginRight: 50,
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
    padding: 13,
    position: 'absolute',
    bottom: 5,
    right: 12,
    borderRadius: 20,
  },
});

const CardCarousel = (props: any) => {
  const carouselRef = useRef(null);
  const navigate = props.navigate;
  const [activeIndex, setActiveIndex] = useState(0);

  const { accounts } = useSelector(({ wallet }: any) => {
    return {
      accounts: wallet?.accounts,
    };
  });

  const _renderItem = ({ item, index }: any) => {
    return (
      <ImageBackground source={require(BgImage)} style={styles.carouselBox}>
        <Text style={styles.carouselText}>
          {item?.title || `Wallet ${index + 1}`}
        </Text>
        <Text style={styles.carouselText}>
          {(parseInt(item?.balance, 10) === 0.0
            ? 0
            : parseInt(item?.balance, 10)?.toFixed(2)) || 0}
        </Text>
        <View style={styles.addBtn}>
          <Pressable onPress={() => navigate('AddCard')}>
            <Image
              source={require(plusImg)}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
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
            data={accounts}
            sliderWidth={410}
            removeClippedSubviews={false}
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
