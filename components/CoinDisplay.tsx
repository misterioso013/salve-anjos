import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CoinDisplay({ coins }: { coins: number }) {
  return (
    <View style={styles.coinContainer}>
      <MaterialIcons name="attach-money" size={48} color="green" />
      <Text style={styles.coinText}>{coins}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinText: {
    fontSize: 48,
    marginLeft: 10,
  },
});
