import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  rssItem: {
    backgroundColor: '#EEEEEE',
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
  }
});

export default function RSSItem({ item, navigation }) {
  function handleOnPress() {
    navigation.navigate('PodcastShow');
  };

  return (
    <View style={styles.rssItem}>
      <Text onPress={() => handleOnPress()}>
        {item.title}
      </Text>
    </View>
  );
}
