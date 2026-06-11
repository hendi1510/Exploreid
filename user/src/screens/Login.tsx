import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock Auth
    if (email && password) {
      // In a real app we'd use a global context or storage
      navigation.replace('Tabs');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>Masuk untuk mulai menjelajahi keindahan Indonesia bersama ExploreID.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Mail size={20} color={COLORS.textMuted} />
              <TextInput 
                style={styles.input}
                placeholder="Contoh: rzki@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Lock size={20} color={COLORS.textMuted} />
              <TextInput 
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color={COLORS.textMuted} /> : <Eye size={20} color={COLORS.textMuted} />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotPassText}>Lupa Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Masuk Sekarang</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Daftar Disini</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { flexGrow: 1, padding: 25, justifyContent: 'center' },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 10 },
  subtitle: { fontSize: 15, color: COLORS.textMuted, lineHeight: 22 },
  form: { marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, marginBottom: 8, marginLeft: 4 },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    borderRadius: 15, 
    paddingHorizontal: 15,
    height: 55,
    gap: 12,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.secondary },
  forgotPass: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotPassText: { color: COLORS.primary, fontWeight: '600', fontSize: 14 },
  loginBtn: { 
    backgroundColor: COLORS.primary, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 15,
    gap: 10,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: COLORS.textMuted, fontSize: 14 },
  registerLink: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
});
