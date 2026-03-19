import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageSlider } from 'react-native-image-slider-component';

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { uri: 'https://picsum.photos/400/300?random=1' },
        { uri: 'https://picsum.photos/400/300?random=2' },
        { uri: 'https://picsum.photos/400/300?random=3' },
    ];

    return (
        <View style={styles.container}>
            <ImageSlider
                images={images}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
                height={300}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default App;