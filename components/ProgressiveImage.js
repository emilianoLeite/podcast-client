import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
})

export default function ProgressiveImage(props) {
  return(
    <View style={styles.container}>
      <Image {...props} />
    </View>
  );
}
