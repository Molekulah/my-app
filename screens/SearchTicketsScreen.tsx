import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';

export default function SearchTicketsScreen() {
  return (
    <View style={styles.container}>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
