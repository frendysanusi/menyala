import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import {
  kNunito_B3,
  kNunito_B6,
  kNunito_B7,
  kNunito_EB3,
  kNunito_EB6,
  kNunito_EB7,
  kNunito_EB8,
  kNunito_R4,
  kNunito_R5,
  kNunito_R6,
  kNunito_R7,
  kNunito_R8,
  kReadexPro_L5,
  kReadexPro_L6,
  kReadexPro_R5,
  kReadexPro_R7,
} from '../utils/constanta';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  useFonts,
} from '@expo-google-fonts/dev';
import LineChartComponent from '../component/LineChartComponent';
import { router } from 'expo-router';

const Home = () => {
  let [fontLoaded] = useFonts({
    ReadexPro_300Light,
    ReadexPro_400Regular,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fireDetected, setFireDetected] = useState(false);
  const [smokeDetected, setSmokeDetected] = useState(false);

  const currentTemperature = Math.floor(Math.random() * 100); // dummy data

  const currentDate = new Date();
  const todayDate = currentDate.getDate();
  const todayDay = currentDate.getDay();
  const todayMonth = currentDate
    .toLocaleDateString('default', { month: 'long' })
    .toUpperCase();
  const startDate = new Date(currentDate);
  startDate.setDate(todayDate - todayDay + 1); // monday to sunday
  const endDate = new Date(currentDate);
  endDate.setDate(startDate.getDate() + 6);

  const datesOfWeek: Date[] = [];
  const iteratorDate = new Date(startDate);
  while (iteratorDate <= endDate) {
    datesOfWeek.push(new Date(iteratorDate));
    iteratorDate.setDate(iteratorDate.getDate() + 1);
  }

  const [pressedDate, setPressedDate] = useState(() => {
    const pressedDate = Array(datesOfWeek.length).fill(false);
    if (todayDay == 0) {
      pressedDate[6] = true; // sunday
    } else {
      pressedDate[todayDay - 1] = true; // monday to saturday
    }
    return pressedDate;
  });

  const handlePressedDate = (index: number) => {
    const updatedPressedDate = Array(datesOfWeek.length).fill(false);
    updatedPressedDate[index] = true;
    setPressedDate(updatedPressedDate);
  };

  const platform = Platform.OS;
  const isWebPlatform = platform === 'web';

  useEffect(() => {
    if (!fireDetected && !smokeDetected) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  });

  return (
    <View style={styles.container}>
      {fireDetected ? (
        <LinearGradient
          colors={['#CC1616', '#0A0F33']}
          style={styles.background}
        />
      ) : smokeDetected ? (
        <LinearGradient
          colors={['#4C4C4C', '#040404']}
          style={styles.background}
        />
      ) : (
        <LinearGradient
          colors={['#1E2D99', '#0A0F33']}
          style={styles.background}
        />
      )}
      <View style={styles.header}>
        <View style={styles.logo}>
          {isWebPlatform ? (
            <Image
              source={require('../assets/images/menyala-logo.svg')}
              style={{ height: '100%', width: '21%', marginRight: '2.5%' }}
            />
          ) : (
            <Image
              source={require('../assets/images/menyala-logo.png')}
              style={{ height: '100%', width: '24%', marginRight: '2.5%' }}
            />
          )}
          <Text
            style={[
              isWebPlatform ? kReadexPro_R7 : kReadexPro_R5,
              { color: 'white' },
            ]}
          >
            {'MENYALA'.split('').join(' ')}
          </Text>
        </View>
        {isWebPlatform ? (
          <View style={styles.rightHeaderWeb}>
            <View style={{ width: '50%' }}>
              <Pressable
                style={[
                  styles.button,
                  buttonDisabled && [
                    { backgroundColor: '#D9D9D9', borderColor: 'black' },
                  ],
                ]}
                disabled={buttonDisabled}
                onPress={() => {
                  setFireDetected(false);
                  setSmokeDetected(false);
                }}
              >
                <Text
                  style={[kNunito_R4, buttonDisabled && { color: '#939393' }]}
                >
                  Solved
                </Text>
              </Pressable>
            </View>
            <View style={{ width: '50%' }}>
              <Pressable
                onPress={() => {
                  router.push('/');
                }}
                style={styles.logout}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={25}
                    color="black"
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                  <Text style={[kNunito_R4, { marginLeft: '2%' }]}>
                    Log Out
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={{ width: '11%' }}>
            <Pressable
              onPress={() => {
                router.push('/');
              }}
              style={styles.logout}
            >
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color="black"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </Pressable>
          </View>
        )}
      </View>
      <Text
        style={[isWebPlatform ? kNunito_B7 : kNunito_B3, { color: '#CECECE' }]}
      >
        Hello
        <Text style={{ color: '#939393' }}>, </Text>
        <Text style={{ color: 'white' }}>Frendy Sanusi!</Text>
      </Text>
      {fireDetected ? (
        <Text
          style={[isWebPlatform ? kNunito_EB7 : kNunito_B6, { color: 'white' }]}
        >
          Fire has been detected{' '}
          <Text
            style={[
              isWebPlatform ? kNunito_R8 : kNunito_R5,
              { color: 'CECECE' },
            ]}
          >
            inside the room!
          </Text>
        </Text>
      ) : smokeDetected ? (
        <Text
          style={[
            isWebPlatform ? kNunito_R8 : kNunito_R5,
            { color: '#CECECE' },
          ]}
        >
          Caution!{' '}
          <Text
            style={[
              isWebPlatform ? kNunito_EB7 : kNunito_EB6,
              { color: 'white' },
            ]}
          >
            Smoke detected{' '}
          </Text>
          inside the room!
        </Text>
      ) : (
        <Text
          style={[
            isWebPlatform ? kNunito_R8 : kNunito_R5,
            { color: '#CECECE' },
          ]}
        >
          Currently, the condition of the room is{' '}
          <Text
            style={[
              isWebPlatform ? kNunito_EB7 : kNunito_EB6,
              { color: 'white' },
            ]}
          >
            normal.
          </Text>
        </Text>
      )}
      {!isWebPlatform && (
        <View style={{ height: '3.75%', marginTop: '4%' }}>
          <Pressable
            style={[
              styles.button,
              buttonDisabled && [
                { backgroundColor: '#D9D9D9', borderColor: 'black' },
              ],
            ]}
            disabled={buttonDisabled}
            onPress={() => {
              setFireDetected(false);
              setSmokeDetected(false);
            }}
          >
            <Text style={[kNunito_R4, buttonDisabled && { color: '#939393' }]}>
              Solved
            </Text>
          </Pressable>
        </View>
      )}
      <Text
        style={[
          isWebPlatform ? kNunito_EB8 : kNunito_EB3,
          { color: 'white', marginTop: isWebPlatform ? '2%' : '6.5%' },
        ]}
      >
        Timeline
      </Text>
      <View style={styles.timeline}>
        {datesOfWeek.map((date, index) => (
          <View
            key={index}
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '14.28%',
            }}
          >
            <View style={{ alignItems: 'center', width: '60%' }}>
              <Text
                style={[
                  kReadexPro_L5,
                  { marginBottom: '0.75%', color: 'white' },
                ]}
              >
                {pressedDate[index] && datesOfWeek[index].getDate()}
              </Text>
              <Pressable
                onPress={() => {
                  handlePressedDate(index);
                }}
                style={[
                  styles.dottedBorderCircle,
                  pressedDate[index] && { backgroundColor: '#F6AE0A' },
                ]}
              />
              <Text
                style={[kReadexPro_L6, { marginTop: '0.75%', color: 'white' }]}
              >
                {pressedDate[index] && todayMonth}
              </Text>
            </View>
            <View style={{ alignItems: 'center', width: '40%' }}>
              {index !== datesOfWeek.length - 1 && (
                <Text style={styles.dotsHorizontal}>
                  {'·'.repeat(
                    Math.floor(
                      (((0.86 * Dimensions.get('window').width) / 7) * 0.4) / 5,
                    ),
                  )}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
      <Text
        style={[isWebPlatform ? kNunito_EB8 : kNunito_EB3, { color: 'white' }]}
      >
        Real Time Stats
      </Text>
      <LineChartComponent />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: '3.5%',
        }}
      >
        <View style={styles.card}>
          <Text style={kNunito_R6}>Temperature</Text>
          <Text style={kNunito_R7}>{currentTemperature}°C</Text>
        </View>
        <View style={styles.card}>
          <Text style={kNunito_R6}>FIre Detector</Text>
          <Text style={kNunito_R7}>{fireDetected ? '✓' : '-'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={kNunito_R6}>Smoke Detector</Text>
          <Text style={kNunito_R7}>{smokeDetected ? '✓' : '-'}</Text>
        </View>
      </View>
      <Text
        style={[isWebPlatform ? kNunito_EB8 : kNunito_EB3, { color: 'white' }]}
      >
        Real Time Situation
      </Text>
      <View style={{ paddingTop: '2.75%', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/room-example.png')}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '7%',
    height: '100%',
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  header: {
    height: Platform.OS === 'web' ? '6.35%' : '4.5%',
    marginTop: '6.25%',
    marginBottom: Platform.OS === 'web' ? '1%' : '3.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: Platform.OS === 'web' ? '30%' : '47.5%',
  },

  logout: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#F6AE0A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#F6AE0A',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    shadowColor: 'black',
    elevation: 10,
  },

  dottedBorderCircle: {
    width: '100%',
    height: '55%',
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'white',
  },

  dotsHorizontal: {
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    // marginHorizontal: 5,
  },

  timeline: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2.5%',
    marginBottom: '2.5%',
    height: '7%',
  },

  card: {
    width: '30%',
    backgroundColor: '#F6AE0A',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
  },

  // web
  rightHeaderWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '31%',
  },
});

export default Home;
