import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Research from './components/navbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Research />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
