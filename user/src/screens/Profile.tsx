import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight, Camera } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

export default function Profile() {
  const [notif, setNotif] = React.useState(true);

  const menuItems = [
    { icon: User, label: 'Edit Profil', color: COLORS.primary },
    { icon: CreditCard, label: 'Metode Pembayaran', color: '#8b5cf6' },
    { icon: Bell, label: 'Notifkasi', color: COLORS.warning, toggle: true },
    { icon: Shield, label: 'Keamanan Keamanan', color: COLORS.accent },
    { icon: HelpCircle, label: 'Pusat Bantuan', color: COLORS.textMuted },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil Saya</Text>
        <TouchableOpacity style={styles.settingsBtn}><Settings size={22} color={COLORS.secondary} /></TouchableOpacity>
      </View>

      <View style={styles.profileBox}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraBtn}><Camera size={14} color="white" /></TouchableOpacity>
        </View>
        <Text style={styles.userName}>Rizky Pratama</Text>
        <Text style={styles.userEmail}>rizky.pratama@email.com</Text>
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editBtnText}>Premium Member</Text></TouchableOpacity>
      </View>

      <View style={styles.menuBox}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
              <item.icon size={20} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            {item.toggle ? (
              <Switch value={notif} onValueChange={setNotif} trackColor={{ true: COLORS.primary }} />
            ) : (
              <ChevronRight size={18} color={COLORS.border} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <LogOut size={20} color={COLORS.danger} />
        <Text style={styles.logoutText}>Keluar Akun</Text>
      </TouchableOpacity>

      <Text style={styles.version}>ExploreID v1.0.4</Text>
      <View style={{ height: 100 }} />
    </ScrollView>
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
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary },
  settingsBtn: { padding: 8 },
  profileBox: { alignItems: 'center', backgroundColor: 'white', paddingBottom: 30 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: { 
    position: 'absolute', 
    bottom: 0, right: 0, 
    backgroundColor: COLORS.primary, 
    width: 32, height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: { fontSize: 20, fontWeight: 'bold', color: COLORS.secondary },
  userEmail: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  editBtn: { backgroundColor: '#fef3c7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  editBtnText: { fontSize: 11, fontWeight: 'bold', color: '#d97706' },
  menuBox: { backgroundColor: 'white', margin: 20, borderRadius: 20, padding: 10 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuLabel: { flex: 1, fontSize: 15, color: COLORS.secondary, fontWeight: '500' },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10, 
    marginHorizontal: 20, 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 20,
  },
  logoutText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 15 },
  version: { textAlign: 'center', marginTop: 30, color: COLORS.textMuted, fontSize: 12 },
});
