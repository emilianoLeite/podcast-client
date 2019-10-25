import React from 'react';

import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

const rssStyles = StyleSheet.create({
  rssItem: {
    backgroundColor: 'red',
    padding: 4,
  }
});


export function PlaybackControl({ episode }) {
  return (
    <View style={rssStyles.rssItem}>
      {/* Não retire a arrow function */}
      <Button title="Pause" onPress={() => { episode.pause() }} />
    </View>
  );
}
