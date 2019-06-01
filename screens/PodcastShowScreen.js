import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ProgressiveImage from '../components/ProgressiveImage';

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
  }
})

export default function PodcastShowScreen(props) {
  const item = props.navigation.state.params;

  function imageUri(item) {
    if(item.imageUri) {
      return item.imageUri;
    }

    if(item.itunes.image) {
      return item.itunes.image
    }

    return 'https://facebook.github.io/react/logo-og.png';
  }

  return (
    <ScrollView>
      <View>
        <ProgressiveImage
          source={{uri: imageUri(item)}}
          style={styles.image}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {item.title}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>
          {item.description}
        </Text>
      </View>
    </ScrollView>
  )
}