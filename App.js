import React, { useEffect } from 'react';
import { View, Button, NativeModules, Alert } from 'react-native';

const { OverlayPermissionModule } = NativeModules;

const App = () => {
  useEffect(() => {
    checkAndRequestOverlayPermission();
  }, []);

  const checkAndRequestOverlayPermission = async () => {
    try {
      const hasPermission = await OverlayPermissionModule.hasOverlayPermission();
      if (!hasPermission) {
        const granted = await OverlayPermissionModule.requestOverlayPermission();
        if (!granted) {
          Alert.alert('Permission not granted', 'Overlay permission is required for this app.');
        }
      }
    } catch (error) {
      console.error('Error checking or requesting overlay permission:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Request Overlay Permission" onPress={checkAndRequestOverlayPermission} />
    </View>
  );
};

export default App;
