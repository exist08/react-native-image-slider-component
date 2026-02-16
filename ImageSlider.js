"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const screenWidth = react_native_1.Dimensions.get('window').width;
const ImageSlider = ({ images, onImagePress, height = 220, showNavigationArrows = true, showPlaceholder = true, placeholderBackgroundColor = '#e0e0e0', currentIndex = 0, onIndexChange = () => { }, loaderColor = '#007AFF', leftArrowComponent, rightArrowComponent, arrowContainerStyle, showScrollIndicator = false, }) => {
    const flatListRef = (0, react_1.useRef)(null);
    react_1.default.useEffect(() => {
        if (flatListRef.current && images.length > 0) {
            flatListRef.current.scrollToOffset({
                offset: currentIndex * screenWidth,
                animated: true,
            });
        }
    }, [currentIndex, images.length]);
    const handleScroll = (e) => {
        const { contentOffset } = e.nativeEvent;
        const index = Math.round(contentOffset.x / screenWidth);
        if (index !== currentIndex && index >= 0 && index < images.length) {
            onIndexChange(index);
        }
    };
    const renderDefaultLeftArrow = () => (<react_native_1.View style={styles.defaultArrow}>
      <react_native_1.View style={styles.defaultArrowIcon}>
        <react_native_1.View style={styles.chevronLeft}/>
      </react_native_1.View>
    </react_native_1.View>);
    const renderDefaultRightArrow = () => (<react_native_1.View style={styles.defaultArrow}>
      <react_native_1.View style={styles.defaultArrowIcon}>
        <react_native_1.View style={styles.chevronRight}/>
      </react_native_1.View>
    </react_native_1.View>);
    return (<react_native_1.View style={[styles.container, { height }]}>
      <react_native_1.FlatList ref={flatListRef} data={images} renderItem={({ item }) => (<react_native_1.Pressable onPress={onImagePress} style={[styles.sliderImage, { height }]}>
            {showPlaceholder ? (<react_native_1.ImageBackground source={{}} style={[styles.image, { backgroundColor: placeholderBackgroundColor }]} resizeMode="contain">
                <react_native_1.ActivityIndicator size="large" color={loaderColor}/>
                <react_native_1.Image source={item} style={[styles.sliderImage, { height }]}/>
              </react_native_1.ImageBackground>) : (<react_native_1.Image source={item} style={[styles.sliderImage, { height }]} resizeMode="cover"/>)}
          </react_native_1.Pressable>)} horizontal pagingEnabled showsHorizontalScrollIndicator={showScrollIndicator} onMomentumScrollEnd={handleScroll} keyExtractor={(_, idx) => idx.toString()}/>

      {showNavigationArrows && images.length > 1 && (<>
          {currentIndex > 0 && (<react_native_1.Pressable style={[styles.navigationArrow, styles.leftArrow, arrowContainerStyle]} onPress={() => onIndexChange(currentIndex - 1)}>
              {leftArrowComponent || renderDefaultLeftArrow()}
            </react_native_1.Pressable>)}
          {currentIndex < images.length - 1 && (<react_native_1.Pressable style={[styles.navigationArrow, styles.rightArrow, arrowContainerStyle]} onPress={() => onIndexChange(currentIndex + 1)}>
              {rightArrowComponent || renderDefaultRightArrow()}
            </react_native_1.Pressable>)}
        </>)}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = ImageSlider;
