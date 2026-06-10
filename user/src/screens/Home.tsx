import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Search, MapPin, Bell, Star } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';
import { CATEGORIES, DESTINATIONS } from '../data/mock';

export default function Home({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Wisatawan!</Text>
          <Text style={styles.subGreeting}>Mau liburan kemana hari ini?</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Bell size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={() => navigation.navigate('Explore')}
      >
        <Search size={20} color={COLORS.textMuted} />
        <Text style={styles.searchText}>Cari destinasi impianmu...</Text>
      </TouchableOpacity>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1506929199175-fb09a25d7156?w=800' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Promo Liburan Musim Panas!</Text>
          <Text style={styles.heroSub}>Hemat hingga 50% untuk tiket masuk</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Cek Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kategori</Text>
        <TouchableOpacity><Text style={styles.seeAll}>Lihat Semua</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
        {CATEGORIES.map(c => (
          <TouchableOpacity key={c.id} style={styles.catItem}>
            <View style={styles.catIcon}><Text style={{fontSize: 20}}>🗺️</Text></View>
            <Text style={styles.catText}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recommendations */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Rekomendasi Populer</Text>
        <TouchableOpacity><Text style={styles.seeAll}>Lihat Semua</Text></TouchableOpacity>
      </View>
      <FlatList 
        data={DESTINATIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.destScroll}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.destCard}
            onPress={() => navigation.navigate('Detail', { item })}
          >
            <Image source={{ uri: item.image }} style={styles.destImage} />
            <View style={styles.destInfo}>
              <Text style={styles.destName}>{item.name}</Text>
              <View style={styles.destLoc}>
                <MapPin size={12} color={COLORS.textMuted} />
                <Text style={styles.destLocText}>{item.location}</Text>
              </View>
              <View style={styles.destFooter}>
                <Text style={styles.destPrice}>Rp {item.price.toLocaleString()}</Text>
                <View style={styles.destRating}>
                  <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
                  <Text style={styles.destRatingText}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary },
  subGreeting: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  iconBtn: { padding: 10, backgroundColor: COLORS.card, borderRadius: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    padding: 12,
    borderRadius: 15,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchText: { color: COLORS.textMuted, fontSize: 14 },
  heroBanner: {
    margin: SPACING.lg,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0, top: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    justifyContent: 'center',
  },
  heroTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  heroBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  heroBtnText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary },
  seeAll: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  catScroll: { paddingLeft: SPACING.lg, paddingVertical: 15 },
  catItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  catIcon: {
    width: 55, height: 55,
    backgroundColor: COLORS.card,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  catText: { marginTop: 8, fontSize: 12, color: COLORS.text, fontWeight: '500' },
  destScroll: { paddingLeft: SPACING.lg, paddingBottom: 30, paddingTop: 10 },
  destCard: {
    width: 220,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  destImage: { width: '100%', height: 130 },
  destInfo: { padding: 12 },
  destName: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  destLoc: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  destLocText: { fontSize: 12, color: COLORS.textMuted },
  destFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  destPrice: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  destRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  destRatingText: { fontSize: 12, fontWeight: '600', color: COLORS.secondary },
});
