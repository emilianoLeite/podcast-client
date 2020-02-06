// @ts-check
import React from "react";
import { parse } from "react-native-rss-parser";
import { PlaybackControl } from "./PlaybackControl";
import { PodcastEpisode } from "./PodcastEpisode";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import PodcastInput from "./PodcastInput";
import PodcastList from "./PodcastList";
import { PodcastRepository } from "../Repository/Podcast";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { podcasts: [] };
    // this.state = { displayControls: false }
    this._rssItems = this._rssItems.bind(this);
  }

  async componentDidMount() {
    fetch("https://rss.simplecast.com/podcasts/282/rss")
      .then(response => response.text())
      .then(parse)
      .then(rss => this.setState({ rss }))
      .catch(console.error);
    await this.getPodcasts();
  }

  async getPodcasts() {
    const podcasts = await PodcastRepository.allPodcasts();
    this.setState({ podcasts });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>
          </View>
          {this._rssItems()}
          {this.state.displayControls ? <PlaybackControl /> : <View />}
          <PodcastInput></PodcastInput>
          <PodcastList podcasts={this.state.podcasts}></PodcastList>
        </ScrollView>
      </View>
    );
  }

  _rssItems() {
    if (this.state.rss) {
      return <PodcastEpisode item={this.state.rss.items[0]} />;
    } else {
      return <Text> Loading...</Text>;
    }
  }
}
