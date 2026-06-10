import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { ChevronLeft, Calendar, Users, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';
import QRCode from 'react-native-qrcode-svg';

export default function Reservation({ route, navigation }: any) {
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [date, setDate] = useState('25 Juli 2024');
  const [success, setSuccess] = useState(false);

  const total = item.price * count;

  const handleBooking = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <CheckCircle2 size={100} color={COLORS.accent} />
        <Text style={styles.successTitle}>Pemesanan Berhasil!</Text>
        <Text style={styles.successSub}>E-Ticket Anda telah diterbitkan dan dapat ditemukan di riwayat reservasi.</Text>
        
        <View style={styles.qrBox}>
          <QRCode value={`EXP-${Math.floor(Math.random()*10000)}`} size={150} />
          <Text style={styles.qrId}>EXP-{Math.floor(Math.random()*10000)}</Text>
        </View>

        <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.doneBtnText}>Kembali ke Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><ChevronLeft color={COLORS.secondary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Reservasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Item Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Destinasi Pilihan</Text>
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemLoc}>{item.location}</Text>
            </View>
            <Text style={styles.itemPrice}>Rp {item.price.toLocaleString()}</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pilih Tanggal</Text>
          <TouchableOpacity style={styles.inputRow}>
            <Calendar size={18} color={COLORS.primary} />
            <Text style={styles.inputText}>{date}</Text>
            <ChevronRight size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <Text style={[styles.cardTitle, { marginTop: 20 }]}>Jumlah Pengunjung</Text>
          <View style={styles.counterRow}>
            <Users size={18} color={COLORS.primary} />
            <Text style={styles.counterLabel}>Orang</Text>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setCount(Math.max(1, count - 1))} style={styles.countBtn}><Text style={styles.countBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.countVal}>{count}</Text>
              <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.countBtn}><Text style={styles.countBtnText}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Payment */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Metode Pembayaran</Text>
          <TouchableOpacity style={styles.inputRow}>
            <CreditCard size={18} color={COLORS.primary} />
            <Text style={styles.inputText}>Transfer Bank (BCA/Mandiri)</Text>
            <ChevronRight size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Price Breakup */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ringkasan Pembayaran</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Harga x {count}</Text>
            <Text style={styles.priceVal}>Rp {total.toLocaleString()}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Biaya Layanan</Text>
            <Text style={styles.priceVal}>Rp 2.000</Text>
          </View>
          <View style={[styles.priceRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border }]}>
            <Text style={styles.totalLabel}>Total Bayar</Text>
            <Text style={styles.totalVal}>Rp {(total + 2000).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleBooking}>
          <Text style={styles.confirmBtnText}>Konfirmasi & Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary },
  scroll: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 15 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  itemLoc: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    padding: 12, 
    borderRadius: 12,
    gap: 10,
  },
  inputText: { flex: 1, fontSize: 14, color: COLORS.text },
  counterRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  counterLabel: { flex: 1, fontSize: 14, color: COLORS.text },
  counter: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 12, padding: 4 },
  countBtn: { width: 32, height: 32, backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  countBtnText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  countVal: { paddingHorizontal: 15, fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 13, color: COLORS.textMuted },
  priceVal: { fontSize: 13, color: COLORS.secondary, fontWeight: '500' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  totalVal: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  footer: { padding: 20, paddingBottom: 35, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: COLORS.border },
  confirmBtn: { backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  confirmBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  successContainer: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 30 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginTop: 20 },
  successSub: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 20 },
  qrBox: { marginVertical: 40, padding: 20, backgroundColor: COLORS.background, borderRadius: 20, alignItems: 'center' },
  qrId: { marginTop: 15, fontSize: 16, fontWeight: 'bold', color: COLORS.secondary, letterSpacing: 2 },
  doneBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  doneBtnText: { color: 'white', fontWeight: 'bold' },
});
