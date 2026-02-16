import React, { useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

interface ImageSliderProps {
  images: { uri: string }[];
  onImagePress?: () => void;
  height?: number;
  showNavigationArrows?: boolean;
  showPlaceholder?: boolean;
  placeholderBackgroundColor?: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  loaderColor?: string;
  leftArrowComponent?: React.ReactNode;
  rightArrowComponent?: React.ReactNode;
  arrowContainerStyle?: ViewStyle;
  showScrollIndicator?: boolean;
}

const screenWidth = Dimensions.get('window').width;

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImagePress,
  height = 220,
  showNavigationArrows = true,
  showPlaceholder = true,
  placeholderBackgroundColor = '#e0e0e0',
  currentIndex = 0,
  onIndexChange = () => {},
  loaderColor = '#007AFF',
  leftArrowComponent,
  rightArrowComponent,
  arrowContainerStyle,
  showScrollIndicator = false,
}) => {
  const flatListRef = useRef<FlatList>(null);

  React.useEffect(() => {
    if (flatListRef.current && images.length > 0) {
      flatListRef.current.scrollToOffset({
        offset: currentIndex * screenWidth,
        animated: true,
      });
    }
  }, [currentIndex, images.length]);

  const handleScroll = (e: any) => {
    const { contentOffset } = e.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    if (index !== currentIndex && index >= 0 && index < images.length) {
      onIndexChange(index);
    }
  };

  const renderDefaultLeftArrow = () => (
    <View style={styles.defaultArrow}>
      <View style={styles.defaultArrowIcon}>
        <View style={styles.chevronLeft} />
      </View>
    </View>
  );

  const renderDefaultRightArrow = () => (
    <View style={styles.defaultArrow}>
      <View style={styles.defaultArrowIcon}>
        <View style={styles.chevronRight} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Pressable onPress={onImagePress} style={[styles.sliderImage, { height }]}>
            {showPlaceholder ? (
              <ImageBackground
                source={{}}
                style={[styles.image, { backgroundColor: placeholderBackgroundColor }]}
                resizeMode="contain"
              >
                <ActivityIndicator size="large" color={loaderColor} />
                <Image source={item} style={[styles.sliderImage, { height }]} />
              </ImageBackground>
            ) : (
              <Image source={item} style={[styles.sliderImage, { height }]} resizeMode="cover" />
            )}
          </Pressable>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={showScrollIndicator}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(_, idx) => idx.toString()}
      />

      {showNavigationArrows && images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <Pressable
              style={[styles.navigationArrow, styles.leftArrow, arrowContainerStyle]}
              onPress={() => onIndexChange(currentIndex - 1)}
            >
              {leftArrowComponent || renderDefaultLeftArrow()}
            </Pressable>
          )}
          {currentIndex < images.length - 1 && (
            <Pressable
              style={[styles.navigationArrow, styles.rightArrow, arrowContainerStyle]}
              onPress={() => onIndexChange(currentIndex + 1)}
            >
              {rightArrowComponent || renderDefaultRightArrow()}
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: screenWidth,
  },
  navigationArrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  defaultArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultArrowIcon: {
    width: 12,
    height: 12,
    position: 'relative',
  },
  chevronLeft: {
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#333',
    transform: [{ rotate: '45deg' }],
  },
  chevronRight: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#333',
    transform: [{ rotate: '45deg' }],
  },
});

export default ImageSlider;
export type { ImageSliderProps };