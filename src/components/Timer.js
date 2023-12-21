import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Timer({ time }) {
  const formatedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatedTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  text: { fontSize: 80, fontWeight: 'bold', color: '#333333' },
})
