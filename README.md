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
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <>
      <ImageSlider
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
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

## Troubleshooting

### Images not loading?
- Ensure image URIs are valid and accessible
- Check network permissions in your app
- For local images, use `require()` syntax: `{ uri: require('./image.jpg') }`

### Arrows not showing?
- Make sure `showNavigationArrows={true}` (default)
- Verify you have more than 1 image
- Check if custom arrow components are rendering correctly

### TypeScript errors?
- Ensure you're using TypeScript 4.0+
- Import types: `import type { ImageSliderProps } from 'react-native-image-slider-component'`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Author

[Your Name](https://github.com/exist08)

## Support

If you like this package, please give it a ⭐️ on [GitHub](https://github.com/exist08/react-native-image-slider-component)!

For issues and feature requests, please use the [GitHub Issues](https://github.com/exist08/react-native-image-slider-component/issues) page.