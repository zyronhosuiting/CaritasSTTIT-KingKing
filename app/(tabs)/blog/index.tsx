// NotionScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function NotionScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://www.notion.so/Blog-Post-1-17d74a803eb880b2bcddcdfef79b1e68',
        }}
        style={styles.webview}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
