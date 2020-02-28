// @ts-check

import React, { Component } from "react";
import { Text, View } from "react-native";

export class PodcastList extends Component {
  componentDidMount() {}

  render() {
    return (
      <View>
        {this.props.podcasts.map(podcast => {
          console.warn(`listing podcasts`, this.props.podcasts);

          return (
            <Text key={podcast.getIdentifier()}>{podcast.getTitle()}</Text>
          );
        })}
      </View>
    );
  }
}

export default PodcastList;
