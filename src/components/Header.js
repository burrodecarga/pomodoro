import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const options = ['Pomodoro', 'Short Break', 'Long Break']

export default function Header({ time, currentTime, setCurrentTime, setTime }) {
  const handlerPress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            currentTime !== index && { borderColor: 'transparent' },
          ]}
          onPress={() => handlerPress(index)}
        >
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '33%',
    borderWidth: 3,
    padding: 5,
    borderColor: 'white',
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
})
