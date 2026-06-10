import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

const HISTORY = [
  { id: '1', name: 'Pantai Kuta', date: '20 Juli 2024', price: 50000, status: 'completed', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500' },
  { id: '2', name: 'Gunung Bromo', date: '28 Juli 2024', price: 35000, status: 'confirmed', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=500' },
  { id: '3', name: 'Raja Ampat', date: '05 Agt 2024', price: 450000, status: 'pending', image: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?w=500' },
];

const statusStyles: any = {
  completed: { color: COLORS.accent, bg: '#dcfce7', label: 'Selesai', icon: CheckCircle2 },
  confirmed: { color: COLORS.primary, bg: '#e0f2fe', label: 'Dikonfirmasi', icon: Clock },
  pending: { color: COLORS.warning, bg: '#fef3c7', label: 'Menunggu', icon: Clock },
  cancelled: { color: COLORS.danger, bg: '#fee2e2', label: 'Dibatalkan', icon: XCircle },
};

export default function History({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Riwayat Reservasi</Text>
      </View>

      <FlatList 
        data={HISTORY}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const status = statusStyles[item.status];
          const Icon = status.icon;
          return (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.content}>
                <View style={styles.topRow}>
                  <View style={[styles.badge, { backgroundColor: status.bg }]}>
                    <Icon size={12} color={status.color} />
                    <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                  </View>
                  <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
                </View>

                <Text style={styles.name}>{item.name}</Text>
                
                <View style={styles.infoRow}>
                  <Calendar size={14} color={COLORS.textMuted} />
                  <Text style={styles.infoText}>{item.date}</Text>
                </View>
                
                <View style={[styles.infoRow, { marginTop: 4 }]}>
                  <MapPin size={14} color={COLORS.textMuted} />
                  <Text style={styles.infoText}>Bali, Indonesia</Text>
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionText}>Lihat E-Ticket</Text>
                    <ChevronRight size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 50, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary },
  list: { padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 20, marginBottom: 15, overflow: 'hidden', flexDirection: 'row', elevation: 3 },
  image: { width: 100, height: '100%' },
  content: { flex: 1, padding: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  price: { fontSize: 13, fontWeight: 'bold', color: COLORS.secondary },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary, marginVertical: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 12, color: COLORS.textMuted },
  footer: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  actionText: { fontSize: 12, color: COLORS.primary, fontWeight: 'bold' },
});
