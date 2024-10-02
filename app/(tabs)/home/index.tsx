import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import React from 'react';
const image = require('../../../src/assets/images/人生就係要試一次.png');

export function spare_TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/home/index.tsx" />
    </View>
  );
}
export default function HOME() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={[
            styles.center,
            {
              height: 200,
              zIndex: 1,
            },
          ]}
        >
          {/* <Text style={[styles.h1]}>HOME</Text> */}
        </ImageBackground>
        <View
          style={[
            {
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              zIndex: 2,
              top: -25,
              // height: 200,
              paddingVertical: 20,
              paddingLeft: 20,
            },
          ]}
        >
          <View style={[styles.contentMargin, { backgroundColor: undefined }]}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: undefined,
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginRight: 15,
                },
              ]}
            >
              <Text style={[styles.h2, {}]}>最新活動</Text>
              <Text style={[styles.p1, {}]}>查看更多</Text>
            </View>
          </View>

          <ScrollView
            horizontal={true}
            style={{
              flexDirection: 'row',
              backgroundColor: undefined,
            }}
          >
            <View
              style={[
                { backgroundColor: 'orange', overflow: 'hidden' },
                styles.frame,
                styles.center,
              ]}
            >
              <Image
                source={require('../../../src/assets/images/temp.jpg')}
                style={{
                  resizeMode: 'contain',
                  height: '100%',
                }}
              />
            </View>
            <View style={[{ backgroundColor: 'orange' }, styles.frame]} />
            <View style={[{ backgroundColor: 'orange' }, styles.frame]} />
            <View
              style={[
                { backgroundColor: 'orange' },
                styles.frame,
                styles.center,
              ]}
            >
              <Text>查看更多</Text>
            </View>
          </ScrollView>

          <View
            style={[
              { marginRight: 20, backgroundColor: undefined },
              styles.contentMargin,
            ]}
          >
            <Text style={[styles.h2, { marginTop: 30 }]}>對話紀錄</Text>
          </View>
          <View style={[{ marginRight: 20, backgroundColor: undefined }]}>
            <View
              style={[
                {
                  backgroundColor: 'aliceblue',
                  borderRadius: 20,
                  height: 100,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                },
              ]}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../../src/assets/images/penguin.png')}
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    resizeMode: 'contain',
                    flexGrow: 1,
                  }}
                ></Image>
              </View>
              <View
                style={{
                  height: '100%',
                  backgroundColor: undefined,
                  flexGrow: 2,
                  marginLeft: 10,
                }}
              >
                <Text style={[styles.h2, {}]}>KING KING</Text>
                <Text style={[styles.p1, {}]}>聊天文字</Text>
              </View>
            </View>
            <View
              style={[
                {
                  backgroundColor: 'aliceblue',
                  borderRadius: 15,
                  height: 100,
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                },
              ]}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 5,
                }}
              >
                <Image
                  source={require('../../../src/assets/images/penguin.png')}
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    resizeMode: 'contain',
                    flexGrow: 1,
                  }}
                ></Image>
              </View>
              <View
                style={{
                  height: '100%',
                  backgroundColor: undefined,
                  flexGrow: 2,
                  marginLeft: 10,
                }}
              >
                <Text style={[styles.h2, {}]}>KING KING</Text>
                <Text style={[styles.p1, {}]}>聊天文字</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center', // 可以調整內容的對齊方式
    alignItems: 'center',
  },
  container: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  contentMargin: {
    marginVertical: 15,
  },
  frame: {
    width: 200,
    height: 150,
    borderRadius: 15,
    marginRight: 10,
  },
  h1: {
    fontFamily: 'src/assets/fonts/SourceHanSansHW-VF.ttf',
    // fontWeight: 'light',
    fontSize: 24,
  },
  h2: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  p1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// const Frame = ({WidthRatio, HeightRatio, Width}) => {};
