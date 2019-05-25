import React from 'react';
import { View, Text } from 'react-native';

export default ({ item }) => {
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text>
        {item.title}
      </Text>
    </View>
  )
}
