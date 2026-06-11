import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

export default function Register({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = () => {
    if (formData.name && formData.email && formData.password) {
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Daftar Akun</Text>
          <Text style={styles.subtitle}>Buat akun baru untuk mulai merencanakan liburan impian Anda.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <View style={styles.inputRow}>
              <User size={20} color={COLORS.textMuted} />
              <TextInput 
                style={styles.input}
                placeholder="Contoh: Rizky Pratama"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
              <Mail size={20} color={COLORS.textMuted} />
              <TextInput 
                style={styles.input}
                placeholder="Contoh: rzki@email.com"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
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
                placeholder="Buat password kuat..."
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color={COLORS.textMuted} /> : <Eye size={20} color={COLORS.textMuted} />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.regBtn} onPress={handleRegister}>
            <Text style={styles.regBtnText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Masuk Disini</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { flexGrow: 1, padding: 25 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  header: { marginBottom: 35 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20 },
  form: { marginBottom: 25 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.secondary, marginBottom: 6, marginLeft: 4 },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    borderRadius: 12, 
    paddingHorizontal: 15,
    height: 52,
    gap: 10,
  },
  input: { flex: 1, fontSize: 14, color: COLORS.secondary },
  regBtn: { 
    backgroundColor: COLORS.primary, 
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  regBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  footerText: { color: COLORS.textMuted, fontSize: 13 },
  loginLink: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
});
