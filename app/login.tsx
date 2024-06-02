import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import {
  useFonts,
  ReadexPro_400Regular,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/dev';
import {
  kMonsterrat_B6,
  kMonsterrat_M6,
  kNunito_R6,
  kNunito_SB3,
  kReadexPro_R1,
  kReadexPro_R5,
} from '../utils/constanta';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { Link, useRouter } from 'expo-router';

const LoginPage = () => {
  const router = useRouter();

  let [fontLoaded] = useFonts({
    ReadexPro_400Regular,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    passwordVisibility,
    eyeIcon: passwordEyeIcon,
    handlePasswordVisibility,
  } = useTogglePasswordVisibility();

  useEffect(() => {
    if (emailOrName && password && !loading) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailOrName, password, loading]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0F33', '#195B02']}
        style={styles.background}
      />
      <View style={styles.logo}>
        <Image source={require('../assets/images/menyala-logo.png')} />
        <Text style={[kReadexPro_R1, { color: 'white' }]}>M E N Y A L A</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={[kReadexPro_R5, { marginBottom: '17%', color: 'white' }]}>
          A L R E A D Y   A N   U S E R ?
        </Text>
      </View>
      <Text style={styles.inputLabel}>Email or Name</Text>
      <TextInput
        style={styles.inputContainer}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        placeholder="Email address/Name"
        placeholderTextColor={'#272727'}
        value={emailOrName}
        onChangeText={setEmailOrName}
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
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={passwordEyeIcon}
            size={22}
            color={'#757575'}
          />
        </Pressable>
      </View>
      <Pressable
        style={[
          styles.button,
          { marginTop: '56.25%' },
          buttonDisabled && { opacity: 0.5 },
        ]}
        disabled={buttonDisabled}
        onPress={() => router.push('/')}
      >
        <Text style={kNunito_SB3}>LOGIN</Text>
      </Pressable>
      <View style={{ alignItems: 'center' }}>
        <Text style={[kMonsterrat_M6, { marginTop: '2.25%', color: 'white' }]}>
          DON'T HAVE AN ACCOUNT YET?{' '}
          <Link href="/register">
            <Text
              style={[
                kMonsterrat_B6,
                { color: 'white', textDecorationLine: 'underline' },
              ]}
            >
              REGISTER
            </Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    height: '100%',
  },

  logo: {
    marginTop: '23.5%',
    marginBottom: '13%',
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
  },

  inputContainer: {
    marginBottom: '2.25%',
    height: '6.25%',
    width: '100%',
    color: '#272727',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 10,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#F6AE0A',
    width: '100%',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default LoginPage;
