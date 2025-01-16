import { Button, StyleSheet, TextInput } from 'react-native';
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { getBackgroundColorAsync } from 'expo-system-ui';

export default function TabOneScreen() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([
    { text: 'Hello!', sent_by: 'You', time: '10:00 AM' },
    { text: 'Hi, Alice!', sent_by: 'You', time: '10:05 AM' },
    { text: "How's your day?", sent_by: 'Alice', time: '10:10 AM' },
  ]);
  //建立一個以MessageProps為類型的flatList引用
  const flatListRef = useRef<FlatList<MessageProps>>(null);

  // 滾動到底部
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (text.trim().length > 0) {
      const newMessage: MessageProps = {
        text: text,
        sent_by: 'You',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText('');
    }
  };

  const renderItem = ({ item }: { item: MessageProps }) => {
    const isMyMessage = item.sent_by === 'You';
    return (
      <View
        style={[
          {
            marginBottom: 10,
            backgroundColor: 'transparent',
          },
        ]}
      >
        <View
          style={[
            isMyMessage ? styles.myBubbleWrapper : styles.otherBubbleWrapper,
            {
              maxWidth: '60%',
              alignItems: 'stretch',
              backgroundColor: 'transparent',
            },
          ]}
        >
          <View
            style={[
              isMyMessage ? styles.myBubble : styles.otherBubble,
              {
                padding: 15,
                borderRadius: 15,
              },
            ]}
          >
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={[styles.p1, { fontWeight: 'bold' }]}>
                {item.sent_by}
              </Text>
              <Text style={[styles.p1]}>{item.text}</Text>
            </View>
          </View>
          <Text
            style={[
              isMyMessage ? styles.myBubbleWrapper : styles.otherBubbleWrapper,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[{ flex: 1, flexDirection: 'column' }]}>
      <View style={[styles.convensationArea, { flex: 1 }]}>
        <FlatList
          data={messages}
          ref={flatListRef}
          renderItem={renderItem}
        ></FlatList>
      </View>
      <View
        style={[
          styles.inputBar,
          {
            minHeight: 50,
            maxHeight: 120,
            flexDirection: 'row',
            backgroundColor: 'blue',
            padding: 5,
          },
        ]}
      >
        <View
          style={[
            {
              backgroundColor: 'yellow',
              borderRadius: 20,
              flex: 1,
              padding: 10,
              paddingHorizontal: 15,
              marginRight: 10,
            },
          ]}
        >
          <TextInput
            value={text}
            style={[styles.p1, {}]}
            onChangeText={setText}
            placeholder="訊息"
            multiline={true}
          />
        </View>
        <View
          style={[
            { backgroundColor: 'transparent', flexDirection: 'column-reverse' },
          ]}
        >
          <Button title="傳送" onPress={handleSend} />
        </View>
      </View>
    </View>
  );
}
interface MessageProps {
  text: String;
  sent_by?: String;
  time?: String;
}

const styles = StyleSheet.create({
  convensationArea: {
    // flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
    fontSize: 16,
  },
  myBubble: {
    backgroundColor: 'yellow',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: 'red',
    borderBottomLeftRadius: 0,
  },
  myBubbleWrapper: {
    alignSelf: 'flex-end',
  },
  otherBubbleWrapper: {
    alignSelf: 'flex-start',
  },
  inputBar: {
    // backgroundColor: 'red',
  },
  inputButton: {
    // alignSelf: 'flex-end',
  },
});
