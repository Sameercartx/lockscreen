// LockScreenOverlay.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const LockScreenOverlay = ({ onSwipeDown }) => {
  const handleGesture = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > height / 4) {
        onSwipeDown();
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleGesture}>
      <View style={styles.container}>
        <Text style={styles.text}>Swipe down to return to the lock screen.</Text>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default LockScreenOverlay;
