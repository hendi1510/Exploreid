import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, Sliders, MapPin, Star, Heart } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/constants';
import { DESTINATIONS, CATEGORIES } from '../data/mock';

export default function Explore({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = DESTINATIONS.filter(d => 
    (activeCat === 'all' || d.category === activeCat) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cari Destinasi</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color={COLORS.textMuted} />
            <TextInput 
              style={styles.input}
              placeholder="Pantai, Gunung, Museum..."
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Sliders size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          <TouchableOpacity 
            style={[styles.catBtn, activeCat === 'all' && styles.catBtnActive]}
            onPress={() => setActiveCat('all')}
          >
            <Text style={[styles.catText, activeCat === 'all' && styles.catTextActive]}>Semua</Text>
          </TouchableOpacity>
          {CATEGORIES.map(c => (
            <TouchableOpacity 
              key={c.id} 
              style={[styles.catBtn, activeCat === c.name && styles.catBtnActive]}
              onPress={() => setActiveCat(c.name)}
            >
              <Text style={[styles.catText, activeCat === c.name && styles.catTextActive]}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity style={styles.wishBtn}>
              <Heart size={18} color="white" />
            </TouchableOpacity>
            <View style={styles.info}>
              <View style={styles.infoTop}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.rating}>
                  <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.locRow}>
                <MapPin size={12} color={COLORS.textMuted} />
                <Text style={styles.locText}>{item.location}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.price}>Rp {item.price.toLocaleString()}<Text style={styles.perPerson}> /org</Text></Text>
                <View style={styles.badge}><Text style={styles.badgeText}>{item.category}</Text></View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Destinasi tidak ditemukan</Text>
          </View>
        }
      />
    </View>
  );
}

// Need to import ScrollView for categories
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SPACING.lg, backgroundColor: COLORS.white, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
  searchRow: { flexDirection: 'row', gap: 10 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 48,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: COLORS.text },
  filterBtn: { 
    width: 48, height: 48, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  catScroll: { paddingHorizontal: SPACING.lg, paddingVertical: 15 },
  catBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: COLORS.background,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  catTextActive: { color: 'white' },
  listContainer: { padding: SPACING.lg, paddingBottom: 100 },
  card: { 
    backgroundColor: COLORS.card, 
    borderRadius: 20, 
    marginBottom: 20, 
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: '100%', height: 180 },
  wishBtn: {
    position: 'absolute',
    top: 15, right: 15,
    width: 36, height: 36,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { padding: 15 },
  infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: 'bold', color: COLORS.secondary },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locText: { fontSize: 13, color: COLORS.textMuted },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  price: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  perPerson: { fontSize: 12, color: COLORS.textMuted, fontWeight: '400' },
  badge: { backgroundColor: COLORS.background, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, color: COLORS.primary, fontWeight: 'bold' },
  empty: { marginTop: 50, alignItems: 'center' },
  emptyText: { color: COLORS.textMuted, fontSize: 15 },
});
