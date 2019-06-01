import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function PodcastShowScreen(props) {
  const item = props.navigation.state.params;

  return (
    <ScrollView>
      <View>
        <Text>
          {item.title}
        </Text>
      </View>
      <View>
        <Text>
          {item.description}
        </Text>
      </View>
    </ScrollView>
  )
}