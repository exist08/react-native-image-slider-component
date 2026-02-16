# React Native Image Slider Component

A lightweight, customizable image slider component for React Native with **zero dependencies**. Bring your own icons!

## Features

✨ Zero dependencies - only requires React Native  
🎨 Fully customizable navigation arrows  
📱 Responsive and performant  
🔧 TypeScript support  
⚡ Lightweight bundle size  

## Installation
```bash
npm install react-native-image-slider-component
```

or
```bash
yarn add react-native-image-slider-component
```

## Usage

### Basic Usage
```javascript
import React, { useState } from 'react';
import { ImageSlider } from 'react-native-image-slider-component';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
    { uri: 'https://example.com/image3.jpg' },
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
```javascript
import { ImageSlider } from 'react-native-image-slider-component';
import Icon from 'react-native-vector-icons/Ionicons';
// or import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <ImageSlider
      images={images}
      currentIndex={currentIndex}
      onIndexChange={setCurrentIndex}
      leftArrowComponent={<Icon name="chevron-back" size={30} color="#007AFF" />}
      rightArrowComponent={<Icon name="chevron-forward" size={30} color="#007AFF" />}
    />
  );
};
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

## Examples

### With Expo Vector Icons
```javascript
import { AntDesign } from '@expo/vector-icons';

<ImageSlider
  images={images}
  leftArrowComponent={<AntDesign name="left" size={24} color="white" />}
  rightArrowComponent={<AntDesign name="right" size={24} color="white" />}
/>
```

### With Lucide React Native
```javascript
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

<ImageSlider
  images={images}
  leftArrowComponent={<ChevronLeft size={30} color="#fff" />}
  rightArrowComponent={<ChevronRight size={30} color="#fff" />}
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

## Why Zero Dependencies?

This package has **zero runtime dependencies**, meaning:
- 📦 Smaller bundle size
- 🚀 Faster installation
- 🔒 Better security (fewer supply chain risks)
- 🎨 Complete flexibility - use any icon library you prefer
- 🔄 No version conflicts with your existing dependencies

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.