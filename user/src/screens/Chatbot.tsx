import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, Send, Sparkles, User, MessageCircle } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

const INITIAL_MESSAGES = [
  { id: '1', text: 'Halo! Saya ExploreBot 🤖. Ada yang bisa saya bantu terkait liburan Anda di ExploreID?', sender: 'bot' },
];

export default function Chatbot({ navigation }: any) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate Bot Response
    setTimeout(() => {
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        text: getBotResponse(input), 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getBotResponse = (text: string) => {
    const low = text.toLowerCase();
    if (low.includes('pantai')) return 'ExploreID memiliki banyak pantai indah, salah satu yang paling populer adalah Pantai Kuta di Bali. Ingin lihat lebih detail?';
    if (low.includes('tiket') || low.includes('bayar')) return 'Anda bisa memesan tiket melalui halaman Detail Destinasi lalu klik tombol "Pesan Sekarang".';
    if (low.includes('promo')) return 'Saat ini ada Promo Musim Panas hemat hingga 50%! Cek di banner halaman Home ya.';
    return 'Maaf, saya belum mengerti pertanyaan Anda. Bisa coba tanyakan tentang destinasi, tiket, atau promo?';
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><ChevronLeft color={COLORS.secondary} /></TouchableOpacity>
        <View style={styles.botInfo}>
          <View style={styles.botAvatar}>
            <Sparkles size={16} color="white" />
          </View>
          <View>
            <Text style={styles.botName}>ExploreBot AI</Text>
            <Text style={styles.botStatus}>Online</Text>
          </View>
        </View>
        <MessageCircle size={20} color={COLORS.textMuted} />
      </View>

      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => (
          <View key={msg.id} style={[styles.msgWrapper, msg.sender === 'user' ? styles.userWrapper : styles.botWrapper]}>
            <View style={[styles.msgBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.msgText, msg.sender === 'user' ? styles.userText : styles.botText]}>
                {msg.text}
              </Text>
            </View>
            <Text style={styles.msgTime}>12:05</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Tanyakan sesuatu..."
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !input.trim() && { backgroundColor: COLORS.border }]} 
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Send size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  botInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 15, gap: 10 },
  botAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  botName: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  botStatus: { fontSize: 12, color: COLORS.accent, fontWeight: '500' },
  chatList: { padding: 20, paddingBottom: 30 },
  msgWrapper: { marginBottom: 20, maxWidth: '80%' },
  botWrapper: { alignSelf: 'flex-start' },
  userWrapper: { alignSelf: 'flex-end' },
  msgBubble: { padding: 12, borderRadius: 18 },
  botBubble: { backgroundColor: 'white', borderTopLeftRadius: 0, elevation: 1 },
  userBubble: { backgroundColor: COLORS.primary, borderTopRightRadius: 0 },
  msgText: { fontSize: 14, lineHeight: 20 },
  botText: { color: COLORS.secondary },
  userText: { color: 'white' },
  msgTime: { fontSize: 10, color: COLORS.textMuted, marginTop: 4, alignSelf: 'flex-end' },
  inputArea: { padding: 20, paddingBottom: 35, backgroundColor: 'white' },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    borderRadius: 25, 
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: { flex: 1, maxHeight: 100, color: COLORS.text },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
});
