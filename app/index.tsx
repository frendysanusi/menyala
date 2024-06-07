import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import Home from './home';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
}
