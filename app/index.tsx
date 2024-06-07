import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import LoginPage from './login';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <LoginPage />
      <StatusBar style="auto" />
    </>
  );
}
