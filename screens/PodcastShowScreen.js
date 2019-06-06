import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView
} from 'react-native';
import { FileSystem } from "expo";

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
      <Button
        title="Test2"
        onPress={() => {
          // const fileName = `${FileSystem.documentDirectory}podcasts/${item.title}.mp3`;
          const fileName = `${FileSystem.documentDirectory}podcasts/nome.jpg`;
          console.warn(fileName);
          FileSystem.getInfoAsync(fileName).then((fileInfo) => {
            if (fileInfo.exists) {
              console.warn("VOCE JA BAIXOU");
            } else {
              console.warn("DEU BOM");
              FileSystem.downloadAsync(
                'https://www.w3schools.com/w3css/img_lights.jpg',
                fileName
              ).then(console.warn).catch(console.warn);
            }
          })
        }}
      >
        <Text>
          Teste
        </Text>
      </Button>
      <View>
        <ProgressiveImage
          source={{uri: imageUri(item)}}
          style={[styles.image, { height: 400}]}
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
