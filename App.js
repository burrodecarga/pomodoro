import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import Header from './src/components/Header'
import Timer from './src/components/Timer'
import { Audio } from 'expo-av'
import { useEffect } from 'react'

const colors = ['#f7dc6f', '#a2d9ce', '#d7bde2']

export default function App() {
  const [isWorking, setIsWorking] = useState(true)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking(!isWorking)
      setTime(isWorking ? 300 : 1500)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  const handlerStartStop = () => {
    playSound()
    setIsActive(!isActive)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3'),
    )
    await sound.playAsync()
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingTop: Platform.OS === 'android' && 60,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          time={time}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handlerStartStop}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            {isActive ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 32,
    fontWeight: 'bold',
  },
  time: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
})
