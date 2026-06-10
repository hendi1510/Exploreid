import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft, Share2, Heart, MapPin, Star, Clock, Users, ShieldCheck } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';

const { width } = Dimensions.get('window');

export default function Detail({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Banner Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.overlayHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={COLORS.secondary} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.circleBtn}><Share2 size={20} color={COLORS.secondary} /></TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { marginLeft: 10 }]}><Heart size={20} color={COLORS.secondary} /></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.category}</Text></View>
            <View style={styles.ratingBox}>
              <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
              <Text style={styles.ratingVal}>{item.rating}</Text>
              <Text style={styles.ratingCount}>({item.reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.locRow}>
            <MapPin size={16} color={COLORS.primary} />
            <Text style={styles.locText}>{item.location}, Indonesia</Text>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#e0f2fe' }]}><Clock size={16} color="#0284c7" /></View>
              <Text style={styles.statLabel}>Durasi</Text>
              <Text style={styles.statVal}>3-4 Jam</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}><Users size={16} color="#d97706" /></View>
              <Text style={styles.statLabel}>Kapasitas</Text>
              <Text style={styles.statVal}>100+ Org</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}><ShieldCheck size={16} color="#16a34a" /></View>
              <Text style={styles.statLabel}>Asuransi</Text>
              <Text style={styles.statVal}>Tersedia</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tentang Destinasi</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Map Placeholder */}
          <Text style={styles.sectionTitle}>Lokasi</Text>
          <View style={styles.mapPlaceholder}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600' }}
              style={styles.mapImg}
            />
            <View style={styles.mapOverlay}>
              <TouchableOpacity style={styles.mapBtn}>
                <Text style={styles.mapBtnText}>Buka di Google Maps</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Footer / Bottom Action */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Mulai dari</Text>
          <Text style={styles.priceVal}>Rp {item.price.toLocaleString()}<Text style={styles.priceUnit}> /org</Text></Text>
        </View>
        <TouchableOpacity 
          style={styles.bookBtn}
          onPress={() => navigation.navigate('Reservation', { item })}
        >
          <Text style={styles.bookBtnText}>Pesan Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: { width: width, height: 350 },
  image: { width: '100%', height: '100%' },
  overlayHeader: {
    position: 'absolute',
    top: 50, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backBtn: { width: 44, height: 44, backgroundColor: 'white', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  headerRight: { flexDirection: 'row' },
  circleBtn: { width: 44, height: 44, backgroundColor: 'white', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white', marginTop: -30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: COLORS.background, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal: { fontSize: 14, fontWeight: 'bold', color: COLORS.secondary },
  ratingCount: { fontSize: 12, color: COLORS.textMuted },
  name: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginTop: 12 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  locText: { color: COLORS.textMuted, fontSize: 14 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  statItem: { alignItems: 'center', flex: 1 },
  statIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statLabel: { fontSize: 11, color: COLORS.textMuted },
  statVal: { fontSize: 13, fontWeight: 'bold', color: COLORS.secondary, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary, marginTop: 30, marginBottom: 12 },
  description: { fontSize: 14, color: COLORS.textMuted, lineHeight: 22 },
  mapPlaceholder: { height: 180, borderRadius: 20, overflow: 'hidden', marginTop: 10 },
  mapImg: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' },
  mapBtn: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, elevation: 5 },
  mapBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceLabel: { fontSize: 12, color: COLORS.textMuted },
  priceVal: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  priceUnit: { fontSize: 12, color: COLORS.textMuted, fontWeight: '400' },
  bookBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 15, elevation: 3 },
  bookBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
