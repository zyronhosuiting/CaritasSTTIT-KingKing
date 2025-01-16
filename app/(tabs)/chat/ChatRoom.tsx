import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ListRenderItem,
  SafeAreaView,
} from 'react-native';
import randomText from './randomText.json';
import { aMessage } from './interface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatMessage from './ChatMessage';

const ChatRoom = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<aMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = 'John';
  const flatListRef = useRef<FlatList<aMessage>>(null);
  const isCurrentUser = (message: aMessage) => message.name === currentUser;
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  useEffect(() => {
    // Initialize with messages from the JSON file
    const initialMessages: aMessage[] = randomText;
    setMessages(initialMessages);
  }, []);

  const handleContentSizeChange = () => {
    // Scroll to the end of the list only after the first render
    if (flatListRef.current && isAtBottom) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleRenderItem: ListRenderItem<aMessage> = useCallback(
    ({ item }) => (
      <View>
        <ChatMessage isCurrentUser={isCurrentUser} item={item} />
      </View>
    ),
    [isCurrentUser],
  );

  useEffect(() => {
    setIsAtBottom(true); // Reset the atBottom state to false when scrolling
  }, [messages]);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 20; // small buffer

    setIsAtBottom(isScrolledToBottom);
  };

  const memoizedMessages = useMemo(() => messages, [messages]);

  const buttonHandler = useCallback(() => {
    if (newMessage.trim() === '') return;

    const newMsg: aMessage = {
      id: messages.length + 1,
      name: currentUser,
      script: newMessage,
      createdAt: new Date().toString(),
      readAt: null,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  }, [newMessage]);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={memoizedMessages}
          renderItem={handleRenderItem}
          keyExtractor={item => item.id.toString()}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ display: 'flex' }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderColor: '#E8F1FF',
            borderWidth: 3,
            borderRadius: 25,
            margin: 10,
          }}
        >
          <TextInput
            style={styles.inputBox}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="輸入文字..."
          />
          <TouchableOpacity
            style={[styles.inputBox, styles.sendBox]}
            onPress={buttonHandler}
          >
            <Text style={{ color: 'white' }}>送出</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    overflow: 'scroll',
  },
  inputBox: {
    margin: 10,
    padding: 10,
    flex: 3,
    backgroundColor: '#ffffff',
  },
  sendBox: {
    flex: 1,
    backgroundColor: '#0961F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: 'transparent',
  },
});

export default ChatRoom;
