import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultAddress } from '../redux/reducers/Wallet';
const BgImage = '../../assets/images/Group_35card.png';
const plusImg = '../../assets/images/Plusmini.png';
const copyImg = '../../assets/images/copy.png';

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
  copyIcon: {
    height: 20,
    width: 20,
    backgroundColor: '#ffffff',
  },
});

const CardCarousel = (props: any) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = props.navigate;
  const [activeIndex, setActiveIndex] = useState(0);

  const { accounts } = useSelector(({ wallet }: any) => {
    return {
      accounts: wallet?.accounts,
    };
  });

  const handleClipboard = (address: string) => {
    Clipboard.setString(address);
  };

  useEffect(() => {
    if (activeIndex) {
      dispatch(setDefaultAddress(accounts[activeIndex]?.address || ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    dispatch(setDefaultAddress(accounts[0]?.address || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const _renderItem = ({ item, index }: any) => {
    return (
      <ImageBackground source={require(BgImage)} style={styles.carouselBox}>
        <Text style={styles.carouselText}>
          {item?.title || `Account ${index + 1}`}
        </Text>
        <Text style={styles.carouselText}>
          {(parseFloat(item?.balance) === 0.0
            ? 0
            : parseFloat(item?.balance)?.toFixed(2)) || 0}
        </Text>
        <Text
          style={styles.carouselText}
          numberOfLines={1}
          ellipsizeMode="middle">
          {item?.address || '0x123...3213'}
          <Pressable onPress={() => handleClipboard(item?.address)}>
            <Image source={require(copyImg)} style={styles.copyIcon} />
          </Pressable>
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
