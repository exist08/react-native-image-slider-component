import React, { useRef, useState } from 'react';
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

const screenWidth = Dimensions.get('window').width;

interface ImageWithLoaderProps {
  item: { uri: string };
  height: number;
  placeholderBackgroundColor: string;
  loaderColor: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  item,
  height,
  placeholderBackgroundColor,
  loaderColor,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles2.container, { height, backgroundColor: placeholderBackgroundColor }]}>
      <Image
        source={item}
        style={[styles2.image, { height }]}
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles2.loaderOverlay}>
          <ActivityIndicator size="large" color={loaderColor} />
        </View>
      )}
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

  // Dot indicators
  showDots?: boolean;
  dotColor?: string;
  activeDotColor?: string;
  dotSize?: number;
  dotContainerStyle?: ViewStyle;

  // Auto play
  autoPlay?: boolean;
  autoPlayInterval?: number;

  // Loop
  loop?: boolean;

  // Image resize mode
  imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImagePress,
  height = 220,
  showNavigationArrows = true,
  showPlaceholder = true,
  placeholderBackgroundColor = '#e0e0e0',
  currentIndex = 0,
  onIndexChange = () => { },
  loaderColor = '#007AFF',
  leftArrowComponent,
  rightArrowComponent,
  arrowContainerStyle,
  showScrollIndicator = false,

  // Dot indicators
  showDots = true,
  dotColor = '#ccc',
  activeDotColor = '#007AFF',
  dotSize = 8,
  dotContainerStyle,

  // Auto play
  autoPlay = false,
  autoPlayInterval = 3000,

  // Loop
  loop = false,

  // Image resize mode
  imageResizeMode = 'cover',
}) => {
  const flatListRef = useRef<FlatList>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (flatListRef.current && images.length > 0) {
      flatListRef.current.scrollToOffset({
        offset: currentIndex * screenWidth,
        animated: true,
      });
    }
  }, [currentIndex, images.length]);

  // Auto play functionality
  React.useEffect(() => {
    if (autoPlay && images.length > 1) {
      autoPlayTimer.current = setInterval(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < images.length) {
          onIndexChange(nextIndex);
        } else if (loop) {
          onIndexChange(0);
        }
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimer.current) {
          clearInterval(autoPlayTimer.current);
        }
      };
    }
  }, [autoPlay, currentIndex, images.length, autoPlayInterval, loop, onIndexChange]);

  const handleScroll = (e: any) => {
    const { contentOffset } = e.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    if (index !== currentIndex && index >= 0 && index < images.length) {
      onIndexChange(index);
    }
  };

  const handleNavigate = (index: number) => {
    // Reset auto play timer on manual navigation
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
    onIndexChange(index);
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

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < images.length - 1;
  const showLeftArrow = loop ? images.length > 1 : canGoLeft;
  const showRightArrow = loop ? images.length > 1 : canGoRight;

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Pressable onPress={onImagePress} style={[styles.sliderImage, { height }]}>
            {showPlaceholder ? (
              <ImageWithLoader
                item={item}
                height={height}
                placeholderBackgroundColor={placeholderBackgroundColor}
                loaderColor={loaderColor}
              />
            ) : (
              <Image
                source={item}
                style={[styles.sliderImage, { height }]}
                resizeMode={imageResizeMode}
              />
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
          {showLeftArrow && (
            <Pressable
              style={[styles.navigationArrow, styles.leftArrow, arrowContainerStyle]}
              onPress={() => {
                const newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? images.length - 1 : 0);
                handleNavigate(newIndex);
              }}
            >
              {leftArrowComponent || renderDefaultLeftArrow()}
            </Pressable>
          )}
          {showRightArrow && (
            <Pressable
              style={[styles.navigationArrow, styles.rightArrow, arrowContainerStyle]}
              onPress={() => {
                const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
                handleNavigate(newIndex);
              }}
            >
              {rightArrowComponent || renderDefaultRightArrow()}
            </Pressable>
          )}
        </>
      )}

      {showDots && images.length > 1 && (
        <View style={[styles.dotsContainer, dotContainerStyle]}>
          {images.map((_, index: number) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: index === currentIndex ? activeDotColor : dotColor
                }
              ]}
              onPress={() => handleNavigate(index)}
            />
          ))}
        </View>
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    marginHorizontal: 4,
  },
});

export default ImageSlider;
export type { ImageSliderProps };