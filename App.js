/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import ToastExample from './ToastExample';
import RCTImageView from './RCTImageView';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const subscription = ToastExample.addListener((event) => {
      console.log("收到原生事件:", event);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 500, // 给个高度让居中效果明显一点，因为外层是 ScrollView
          }}>
          <RCTImageView
            style={{ width: 200, height: 200 }}
            borderRadius={20}
            resizeMode="cover"
            // 注意：这里必须传数组，因为你的 Java 代码 setSrc 接收的是 ReadableArray
            src={[{ uri: 'https://reactnative.dev/img/tiny_logo.png' }]}
          />
          <Button
            title="Show Toast"
            onPress={() => {
              ToastExample.show('Awesome', ToastExample.SHORT, (errorStr) => {
                console.log("NativeErrorCallback: " + errorStr);
              }, (successStr) => {
                console.log("NativeSuccessCallback: " + successStr);
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
