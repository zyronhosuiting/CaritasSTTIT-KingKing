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
import gpt_api from './gpt_api';
const imageUrl = require('../../../src/assets/images/background.png');
const kingkingtextbubble2 = require('../../../src/assets/images/textbubble/kingkingtextbubble2.png');

const homeIcon = require('../../../src/assets/icons/home.png');
const cross = require('../../../src/assets/icons/cross.png');

const { width, height } = Dimensions.get('window');

const ChatRoom = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<aMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList<aMessage>>(null);
  const currentUser = 'John'; // remove unused variable
  const isCurrentUser = (message: aMessage) => message.name === currentUser;
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [showAllMessage, setShowAllMessage] = useState<boolean>(false);
  const [kingkingMes, setKingkingMes] = useState('你好呀!');

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
    const msgKing: aMessage = {
      id: messages.length + 2,
      name: 'kingking',
      script: gpt_api(newMessage),
    };
    setMessages([...messages, newMsg, msgKing]);
    setKingkingMes(msgKing.script);
    setNewMessage('');

    if (!isStorage()) {
      setItem('@chat:messages', messages);
    } else {
      mergeItem('@chat:messages', newMsg);
    }
  }, [messages, newMessage]);

  const handleShowAllMessage = () => {
    setShowAllMessage(!showAllMessage);
  };
  const clearChatMessage = () => {
    setMessages([]);
    removeItem('@chat:messages');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={imageUrl}
        style={styles.background}
        resizeMode="cover"
        onError={error =>
          console.log('Error loading image', error.nativeEvent.error)
        }
      />

      <View style={styles.innerContainer}>
        <View>
          <TouchableOpacity
            style={[styles.homeButton, { backgroundColor: '#FFB027' }]}
            onPress={() => {
              router.push('/home');
            }}
          >
            <Image source={homeIcon} style={styles.homeIcon} />
          </TouchableOpacity>
          <View style={[styles.kingkingTextbox, { padding: 10, margin: 10 }]}>
            <Image
              source={kingkingtextbubble2}
              resizeMode="stretch"
              style={[
                styles.kingkingTextbox,
                {
                  position: 'absolute',
                  alignItems: 'center',
                  width: '100%',
                  height: '150%',
                },
              ]}
              onError={error =>
                console.log('Error loading image', error.nativeEvent.error)
              }
            />
            <Text style={{ color: 'white', fontSize: 18, paddingBottom: 15 }}>
              {kingkingMes}
            </Text>
          </View>
        </View>
        <View style={[styles.messageSection, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity
            style={styles.viewMessagesButton}
            onPress={handleShowAllMessage}
          >
            <Text style={styles.viewMessagesText}>查看所有對話</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <View style={styles.messageBox}>
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
          <View style={styles.userIndicator}>
            <Text style={styles.userText}>你</Text>
          </View>
        </View>

        {showAllMessage && (
          <View style={styles.messageList}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleShowAllMessage}
            >
              <Image source={cross} style={styles.homeIcon} />
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
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
  innerContainer: {
    flex: 1,
    width: width,
    paddingTop: 20, // To give some space from the top
    justifyContent: 'space-between',
  },
  homeButton: {
    margin: 10,
    alignSelf: 'flex-end',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  homeIcon: {
    width: 32,
    height: 32,
  },
  messageSection: {
    height: 215,
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 25,
  },
  viewMessagesButton: {
    height: 53,
    width: 226,
    backgroundColor: '#EDC241',
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 115,
  },
  viewMessagesText: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(222, 179, 97, 0.5)',
    height: 215 - 53,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },
  kingkingTextbox: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  messageBox: {
    flexDirection: 'row',
    borderColor: '#FFB027',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderRadius: 25,
    flex: 1,
    height: 72,
  },
  inputBox: {
    margin: 10,
    padding: 10,
    flex: 3,
  },
  sendBox: {
    flex: 1,
    backgroundColor: '#FFB027',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  userIndicator: {
    marginLeft: 20,
    height: 72,
    width: 143,
    backgroundColor: '#FFB027',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  userText: {
    color: 'white',
    fontSize: 28,
  },
  messageList: {
    backgroundColor: 'rgba(118,106,90,0.7)',
    borderRadius: 25,
    width: '95%',
    height: '100%', // Adjust height based on need
    position: 'absolute',
    zIndex: 1,
    margin: 10,
  },
});

export default ChatRoom;
