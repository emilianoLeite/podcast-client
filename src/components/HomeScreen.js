import React from 'react';
import { parse } from 'react-native-rss-parser';
const Sound = require('react-native-sound');
const RNFS = require("react-native-fs");

Sound.setCategory('Playback');

import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this._rssItems = this._rssItems.bind(this);
  }

  componentDidMount() {
    return fetch('https://rss.simplecast.com/podcasts/282/rss')
      .then((response) => response.text())
      .then(parse)
      .then((rss) => this.setState({ rss }))
      .catch(console.error);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>
          </View>

          {this._rssItems()}

        </ScrollView>
      </View>
    );
  }

  _rssItems() {
    if (this.state.rss) {
      return <RSSItem item={this.state.rss.items[0]} />;
    } else {
      return <Text> Loading...</Text>;
    }
  }
}

const rssStyles = StyleSheet.create({
  rssItem: {
    backgroundColor: '#EEEEEE',
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
  }
});

function RSSItem({ item }) {
  return (
    <View style={rssStyles.rssItem}>
      <Text>{item.title}</Text>
      <Button
        title={"Download"}
        onPress={() => {
          const enclosure = item.enclosures[0];

          var path = `${RNFS.DocumentDirectoryPath}podcast_name.mp3`;
          console.warn(path);

          RNFS.downloadFile({
            fromUrl: enclosure.url,
            toFile: path,
          }).promise.then((success) => {
            console.warn('FILE WRITTEN!');

            let whoosh = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
              console.warn('entrou');

              if (error) {
                console.warn('failed to load the sound', error);
                return;
              }
              // loaded successfully
              console.warn(
                'duration in seconds: ' +
                  whoosh.getDuration() +
                  'number of channels: ' +
                  whoosh.getNumberOfChannels(),
              );

              // Play the sound with an onEnd callback
              whoosh.play((success) => {
                if (success) {
                  console.warn('successfully finished playing');
                } else {
                  console.warn('playback failed due to audio decoding errors');
                }
              });
            });

            console.warn(Object.keys(item));
          });
        }}
      />
    </View>
  );
}

class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
