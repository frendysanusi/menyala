import React from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = (7 / 8) * Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(65, 79, 178, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const LineChartComponent = ({ jsonData }: { jsonData: any }) => {
  const temperatureArr = jsonData.data.map((item: any) => item.temperature);
  const createdAtArr = jsonData.data.map((item: any) => {
    const hour = new Date(item.createdAt)
      .getHours()
      .toLocaleString('en-US', { minimumIntegerDigits: 2 })
      .padStart(2, '0');
    const minute = new Date(item.createdAt)
      .getMinutes()
      .toLocaleString('en-US', { minimumIntegerDigits: 2 })
      .padStart(2, '0');
    const second = new Date(item.createdAt)
      .getSeconds()
      .toLocaleString('en-US', { minimumIntegerDigits: 2 })
      .padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  });

  const data = {
    labels: createdAtArr,
    datasets: [
      {
        data: temperatureArr,
        strokeWidth: 2,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <LineChart
        verticalLabelRotation={-30}
        data={data}
        width={Platform.OS === 'web' ? 0.47 * screenWidth : screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '2.75%',
  },
});

export default LineChartComponent;
