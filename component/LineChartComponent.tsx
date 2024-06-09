import React from 'react';
import { Dimensions, View, Text, StyleSheet, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = (7 / 8) * Dimensions.get('window').width;

// dummy data
const data = {
  labels: ['9', '10', '11', '12', '13', '14', '15'],
  datasets: [
    {
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(65, 79, 178, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const LineChartComponent: React.FC = () => (
  <View style={styles.container}>
    <LineChart
      data={data}
      width={Platform.OS === 'web' ? 0.47*screenWidth : screenWidth}
      height={220}
      chartConfig={chartConfig}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '2.75%',
  },
});

export default LineChartComponent;
