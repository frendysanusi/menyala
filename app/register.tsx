import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  kMonsterrat_B6,
  kMonsterrat_M6,
  kNunito_R6,
  kNunito_SB3,
  kReadexPro_R1,
  kReadexPro_R5,
  kReadexPro_R6,
} from '../utils/constanta';
import {
  useFonts,
  ReadexPro_400Regular,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/dev';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { Link, router } from 'expo-router';

const RegisterPage = () => {
  let [fontLoaded] = useFonts({
    ReadexPro_400Regular: ReadexPro_400Regular,
    Nunito_400Regular: Nunito_400Regular,
    Nunito_600SemiBold: Nunito_600SemiBold,
    Montserrat_500Medium: Montserrat_500Medium,
    Montserrat_700Bold: Montserrat_700Bold,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const platform = Platform.OS;
  const isWebPlatform = platform === 'web';

  const {
    passwordVisibility,
    eyeIcon: passwordEyeIcon,
    handlePasswordVisibility,
  } = useTogglePasswordVisibility();
  const {
    passwordVisibility: confirmPasswordVisibility,
    eyeIcon: confirmPasswordEyeIcon,
    handlePasswordVisibility: handleConfirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  useEffect(() => {
    if (
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      !loading
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, confirmPassword, loading]);

  return (
    <View style={isWebPlatform ? styles.containerWeb : styles.container}>
      <LinearGradient
        colors={['#0A0F33', '#195B02']}
        style={styles.background}
      />
      <View style={isWebPlatform ? styles.logoCardWeb : styles.logoCard}>
        <View style={styles.logo}>
          {isWebPlatform ? (
            <Image source={require('../assets/images/menyala-logo.svg')} />
          ) : (
            <Image source={require('../assets/images/menyala-logo.png')} />
          )}
          <Text
            style={[
              isWebPlatform ? kReadexPro_R6 : kReadexPro_R1,
              { color: 'white' },
            ]}
          >
            {'MENYALA '.split('').join(' ')}
          </Text>
        </View>
      </View>
      <View
        style={isWebPlatform ? styles.registerFormWeb : styles.registerForm}
      >
        {isWebPlatform && <View style={styles.registerFormWebBackground} />}
        <View
          style={{
            alignItems: 'center',
            marginBottom: isWebPlatform ? '6%' : '5%',
          }}
        >
          <Text style={[kReadexPro_R5, { color: 'white' }]}>
            {'CREATE YOUR ACCOUNT'.split('').join(' ')}
          </Text>
        </View>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputContainer}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email address"
          placeholderTextColor={'#272727'}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            placeholder="Password"
            placeholderTextColor={'#272727'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordVisibility}
          />
          <Pressable
            onPress={handlePasswordVisibility}
            style={{ paddingRight: '3%' }}
          >
            <MaterialCommunityIcons
              name={passwordEyeIcon}
              size={22}
              color={'#757575'}
            />
          </Pressable>
        </View>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            placeholder="Confirm Your Password"
            placeholderTextColor={'#272727'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmPasswordVisibility}
          />
          <Pressable
            onPress={handleConfirmPasswordVisibility}
            style={{ paddingRight: '3%' }}
          >
            <MaterialCommunityIcons
              name={confirmPasswordEyeIcon}
              size={22}
              color={'#757575'}
            />
          </Pressable>
        </View>
        <View
          style={
            isWebPlatform
              ? styles.registerButtonCardWeb
              : styles.registerButtonCard
          }
        >
          <Pressable
            style={[
              styles.button,
              buttonDisabled && { opacity: 0.5 },
              isWebPlatform && { width: '80%' },
            ]}
            disabled={buttonDisabled}
            onPress={async () => {
              try {
                await fetch(
                  'https://menyala-web-service-production.up.railway.app/user/register',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                  },
                );
                router.push('/login');
              } catch (error) {
                alert('An error occured');
              }
            }}
          >
            <Text style={kNunito_SB3}>CREATE ACCOUNT</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={[kMonsterrat_M6, { marginTop: '2.25%', color: 'white' }]}
          >
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link href="/login">
              <Text
                style={[
                  kMonsterrat_B6,
                  { color: 'white', textDecorationLine: 'underline' },
                ]}
              >
                LOGIN
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '6.25%',
    height: '100%',
  },

  registerForm: {
    height: '100%',
  },

  logoCard: {
    marginTop: '23.5%',
    marginBottom: '13%',
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  inputLabel: {
    ...kNunito_R6,
    color: 'white',
    marginBottom: '1.75%',
  },

  inputField: {
    width: '90%',
    height: '100%',
  },

  inputContainer: {
    marginBottom: '2.25%',
    height: Platform.OS === 'web' ? '8%' : '6.25%',
    width: '100%',
    color: '#272727',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 10,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: '#F6AE0A',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },

  registerButtonCard: {
    marginTop: '27.25%',
    height: '6.5%',
  },

  // web styling
  containerWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },

  logoCardWeb: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerFormWeb: {
    justifyContent: 'center',
    paddingHorizontal: '4%',
    width: '60%',
  },

  registerFormWebBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#A6A6A6',
    opacity: 0.25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },

  registerButtonCardWeb: {
    marginTop: '6.8%',
    alignItems: 'center',
    height: '8%',
  },
});

export default RegisterPage;
