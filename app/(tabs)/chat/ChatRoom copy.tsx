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
  ImageBackground,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { aMessage } from './interface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatMessage from './ChatMessage';
import randomText from './randomText.json';

import { useRouter } from 'expo-router';

import { setItem, getItem, mergeItem, removeItem } from './AsyncStorage';

const imageUrl = require('../../../src/assets/images/background.png');
const homeIcon = require('../../../src/assets/icons/home.png');

const { width } = Dimensions.get('window');

const ChatRoom = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<aMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList<aMessage>>(null);
  const currentUser = 'John'; // remove unused variable
  const isCurrentUser = (message: aMessage) => message.name === currentUser;
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [showAllMessage, setShowAllMessage] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const router = useRouter();

  const isStorage = async () => {
    try {
      const value = await getItem('@chat:messages');
      if (value) {
        setMessages(JSON.parse(value));
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // Initialize with messages from the JSON file
    if (!isStorage()) {
      const initialMessages: aMessage[] = randomText;
      setMessages(initialMessages);
    }
  }, []);

  const handleContentSizeChange = useCallback(() => {
    // Scroll to the end of the list only after the first render
    if (flatListRef.current && isAtBottom) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [isAtBottom, flatListRef]);

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

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 20; // small buffer

    setIsAtBottom(isScrolledToBottom);
  }, []);

  const memoizedMessages = useMemo(() => messages, [messages]);

  const buttonHandler = useCallback(() => {
    if (newMessage.trim() === '') return;

    const newMsg: aMessage = {
      id: messages.length + 1,
      name: currentUser,
      script: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    if (!isStorage()) {
      setItem('@chat:messages', messages);
    } else {
      mergeItem('@chat:messages', newMsg);
    }
  }, [messages, newMessage]);

  const clearChatMessage = () => {
    setMessages([]);
    removeItem('@chat:messages');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={imageUrl}
        style={styles.background}
        resizeMode="cover" // you can also use "stretch", "contain", etc.
        onError={error =>
          console.log('Error loading image', error.nativeEvent.error)
        }
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                margin: 10,
                alignSelf: 'flex-end',
                width: 48,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#FFB027',
              }}
              onPress={() => {
                router.push('/home');
              }}
            >
              <Image source={homeIcon} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <FlatList
              ref={flatListRef}
              data={memoizedMessages}
              renderItem={handleRenderItem}
              keyExtractor={item => item.id.toString()}
              onContentSizeChange={handleContentSizeChange}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={{ display: 'flex', paddingBottom: 70 }}
            />
            <View
              style={{
                width: '100%',
                height: '25%',
                backgroundColor: '#DEB361',
                marginBottom: 10,
              }}
            >
              <View style={styles.messageContainer}>
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    overflow: 'scroll',
  },
  background: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    width: width,
  },
  messageContainer: {
    flexDirection: 'row',
    borderColor: '#E8F1FF',
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
    width: width * 0.9,
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
