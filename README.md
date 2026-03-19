# React Native Image Slider Component

A lightweight, customizable image slider component for React Native with **zero dependencies**. Bring your own icons!

## Demo

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/exist08/react-native-image-slider-component/raw/main/img_slider.gif" width="300" alt="Full Height Demo"/>
      <br/>
      <sub><b>Full Height Demo</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/exist08/react-native-image-slider-component/raw/main/img_slider_200.gif" width="300" alt="Custom Height Demo"/>
      <br/>
      <sub><b>Custom Height (200px)</b></sub>
    </td>
  </tr>
</table>

## Features

✨ Zero dependencies - only requires React Native  
🎨 Fully customizable navigation arrows  
📱 Responsive and performant  
🔧 TypeScript support  
⚡ Lightweight bundle size  
🖼️ Built-in loading states  
⏰ Auto-play support with customizable intervals  
🔄 Infinite loop/carousel mode  
🎯 Customizable dot indicators  

## Installation

```bash
npm install react-native-image-slider-component
```

or

```bash
yarn add react-native-image-slider-component
```

## Usage

### Complete Example

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageSlider } from 'react-native-image-slider-component';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const App = () => {
  const images = [
    { uri: 'https://picsum.photos/seed/a/600/400' },
    { uri: 'https://picsum.photos/seed/b/600/400' },
    { uri: 'https://picsum.photos/seed/c/600/400' },
    { uri: 'https://picsum.photos/seed/d/600/400' },
  ];
  
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.text}>Image Slider 200 height</Text>
      <ImageSlider
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        height={200}
        leftArrowComponent={<ChevronLeft size={22} color={'black'} />}
        rightArrowComponent={<ChevronRight size={22} color={'black'} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b19ff',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
```

### Basic Usage (Minimal)

```javascript
import React, { useState } from 'react';
import { ImageSlider } from 'react-native-image-slider-component';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { uri: 'https://picsum.photos/seed/a/600/400' },
    { uri: 'https://picsum.photos/seed/b/600/400' },
    { uri: 'https://picsum.photos/seed/c/600/400' },
  ];

  return (
    <ImageSlider
      images={images}
      currentIndex={currentIndex}
      onIndexChange={setCurrentIndex}
      height={300}
    />
  );
};
```

### Custom Arrow Icons

You can use any icon library you prefer (react-native-vector-icons, @expo/vector-icons, lucide-react-native, etc.)

#### With Lucide React Native

```javascript
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  leftArrowComponent={<ChevronLeft size={30} color="#fff" />}
  rightArrowComponent={<ChevronRight size={30} color="#fff" />}
/>
```

#### With React Native Vector Icons

```javascript
import Icon from 'react-native-vector-icons/Ionicons';

<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  leftArrowComponent={<Icon name="chevron-back" size={30} color="#007AFF" />}
  rightArrowComponent={<Icon name="chevron-forward" size={30} color="#007AFF" />}
/>
```

#### With Expo Vector Icons

```javascript
import { AntDesign } from '@expo/vector-icons';

<ImageSlider
  images={images}
  leftArrowComponent={<AntDesign name="left" size={24} color="white" />}
  rightArrowComponent={<AntDesign name="right" size={24} color="white" />}
/>
```

### Auto-Play Mode

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  autoPlay={true}
  autoPlayInterval={5000} // 5 seconds between slides
  loop={true} // Enable infinite loop
  height={300}
/>
```

### Custom Dot Indicators

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  showDots={true}
  dotColor="rgba(255,255,255,0.5)"
  activeDotColor="#ff6b6b"
  dotSize={10}
  dotContainerStyle={{
    bottom: 20,
  }}
/>
```

### Without Dots

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  showDots={false}
/>
```

### Custom Arrow Container Style

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  arrowContainerStyle={{
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    padding: 12,
  }}
  leftArrowComponent={<YourCustomIcon />}
  rightArrowComponent={<YourCustomIcon />}
/>
```

### Without Navigation Arrows

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  showNavigationArrows={false}
/>
```

### Image Resize Modes

```javascript
<ImageSlider
  images={images}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
  imageResizeMode="contain" // 'cover' | 'contain' | 'stretch' | 'center'
/>
```

### With Custom Image Component

```javascript
import { Image } from 'react-native';

<ImageSlider
  images={images}
  leftArrowComponent={
    <Image 
      source={require('./assets/left-arrow.png')} 
      style={{ width: 24, height: 24 }}
    />
  }
  rightArrowComponent={
    <Image 
      source={require('./assets/right-arrow.png')} 
      style={{ width: 24, height: 24 }}
    />
  }
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `{ uri: string }[]` | **required** | Array of images to display |
| `height` | `number` | `220` | Height of the slider |
| `currentIndex` | `number` | `0` | Current visible image index |
| `onIndexChange` | `(index: number) => void` | `() => {}` | Callback when index changes |
| `showNavigationArrows` | `boolean` | `true` | Show/hide navigation arrows |
| `showPlaceholder` | `boolean` | `true` | Show loading placeholder |
| `placeholderBackgroundColor` | `string` | `'#e0e0e0'` | Background color while loading |
| `loaderColor` | `string` | `'#007AFF'` | Color of loading indicator |
| `onImagePress` | `() => void` | `undefined` | Callback when image is pressed |
| `leftArrowComponent` | `React.ReactNode` | Default chevron | Custom left arrow component |
| `rightArrowComponent` | `React.ReactNode` | Default chevron | Custom right arrow component |
| `arrowContainerStyle` | `ViewStyle` | Default style | Custom style for arrow containers |
| `showScrollIndicator` | `boolean` | `false` | Show horizontal scroll indicator |
| `showDots` | `boolean` | `true` | Show/hide dot indicators |
| `dotColor` | `string` | `'#ccc'` | Color of inactive dots |
| `activeDotColor` | `string` | `'#007AFF'` | Color of active dot |
| `dotSize` | `number` | `8` | Size of dots in pixels |
| `dotContainerStyle` | `ViewStyle` | Default style | Custom style for dot container |
| `autoPlay` | `boolean` | `false` | Enable automatic slide transitions |
| `autoPlayInterval` | `number` | `3000` | Time between slides in milliseconds |
| `loop` | `boolean` | `false` | Enable infinite loop/carousel mode |
| `imageResizeMode` | `'cover' \| 'contain' \| 'stretch' \| 'center'` | `'cover'` | How images should fit in the container |

## Platform Support

| Platform | Supported |
|----------|-----------|
| iOS | ✅ |
| Android | ✅ |
| Expo Go | ✅ |
| Windows | ✅ |
| macOS | ✅ |
| tvOS | ✅ |
| visionOS | ✅ |
| Web | ❌ |

## Why Zero Dependencies?

This package has **zero runtime dependencies**, meaning:
- 📦 Smaller bundle size
- 🚀 Faster installation
- 🔒 Better security (fewer supply chain risks)
- 🎨 Complete flexibility - use any icon library you prefer
- 🔄 No version conflicts with your existing dependencies

## Advanced Usage

### Programmatic Navigation

```javascript
const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (loop) {
      setCurrentIndex(0);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (loop) {
      setCurrentIndex(images.length - 1);
    }
  };
  
  return (
    <>
      <ImageSlider
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        loop={true}
      />
      <Button title="Previous" onPress={goToPrevious} />
      <Button title="Next" onPress={goToNext} />
    </>
  );
};
```

### Image Press Handler

```javascript
<ImageSlider
  images={images}
  onImagePress={() => {
    console.log('Image pressed at index:', currentIndex);
    // Navigate to full-screen viewer, open modal, etc.
  }}
/>
```

### Auto-Play with Pause on Interaction

```javascript
const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const handleIndexChange = (index) => {
    setCurrentIndex(index);
    // Temporarily pause auto-play on manual interaction
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000); // Resume after 5 seconds
  };
  
  return (
    <ImageSlider
      images={images}
      currentIndex={currentIndex}
      onIndexChange={handleIndexChange}
      autoPlay={autoPlay}
      autoPlayInterval={3000}
      loop={true}
    />
  );
};
```

## Troubleshooting

### Images not loading?
- Ensure image URIs are valid and accessible
- Check network permissions in your app
- For local images, use `require()` syntax: `{ uri: require('./image.jpg') }`

### Arrows not showing?
- Make sure `showNavigationArrows={true}` (default)
- Verify you have more than 1 image
- Check if custom arrow components are rendering correctly

### Dots not showing?
- Make sure `showDots={true}` (default)
- Verify you have more than 1 image
- Check `dotContainerStyle` positioning

### Auto-play not working?
- Ensure `autoPlay={true}` is set
- Check that `loop={true}` if you want continuous playback
- Verify `autoPlayInterval` is set to a reasonable value (minimum 1000ms recommended)

### TypeScript errors?
- Ensure you're using TypeScript 4.0+
- Import types: `import type { ImageSliderProps } from 'react-native-image-slider-component'`

## Examples

Check out the [example](https://github.com/exist08/react-native-image-slider-component/tree/main/example) directory for a complete working example.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Changelog

See [CHANGELOG.md](https://github.com/exist08/react-native-image-slider-component/blob/main/CHANGELOG.md) for a list of changes.

## License

MIT

## Author

[exist08](https://github.com/exist08)

## Support

If you like this package, please give it a ⭐️ on [GitHub](https://github.com/exist08/react-native-image-slider-component)!

For issues and feature requests, please use the [GitHub Issues](https://github.com/exist08/react-native-image-slider-component/issues) page.

## Links

- [📦 npm Package](https://www.npmjs.com/package/react-native-image-slider-component)
- [📖 Documentation](https://exist08.github.io/react-native-image-slider-component/)
- [🐛 Issues](https://github.com/exist08/react-native-image-slider-component/issues)
- [🔄 Changelog](https://github.com/exist08/react-native-image-slider-component/blob/main/CHANGELOG.md)