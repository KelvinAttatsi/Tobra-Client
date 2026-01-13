import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import ShopCard from '@/components/ShopCard';
import { mockShops } from '@/data/mockData';
import { SafeContainer } from '@/components/SafeContainer';

export default function ShopsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [filteredShops, setFilteredShops] = useState(mockShops);

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Bakery',
    'Beverages',
    'Snacks',
    'Frozen Foods',
    'Pantry Staples',
    'Household Essentials',
  ];

  const styles = createStyles(colors);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockShops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  const handleCategoryToggle = (category: string) => {
    if (selected === category) {
      setSelected(null);
      setSearchQuery('');
      setFilteredShops(mockShops);
    } else {
      setSelected(category);
      setSearchQuery(category);
      const filtered = mockShops.filter((shop) =>
        shop.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredShops(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelected(null);
    setFilteredShops(mockShops);
  };

  const renderShop = ({ item }: { item: (typeof mockShops)[0] }) => (
    <ShopCard shop={item} style={styles.shopItem} onPress={() => router.push(`/shop/${item.id}`)} />
  );

  return (
    <SafeContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shops</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {(searchQuery.length > 0 || selected) && (
          <TouchableOpacity onPress={clearSearch}>
            <X size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {categories.map((cat) => {
            const isSelected = selected === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterPill, isSelected && styles.selectedFilterPill]}
                onPress={() => handleCategoryToggle(cat)}>
                <Text style={[styles.filterText, isSelected && styles.selectedFilterText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Shops List */}
      <FlatList
        data={filteredShops}
        renderItem={renderShop}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.shopsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shops found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />
    </SafeContainer>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: 12,
      paddingBottom: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    headerTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      margin: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: 8,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
    },
    filtersContainer: {
      paddingTop: 0,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filters: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterPill: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.primary + '20',
      borderRadius: 20,
      marginRight: 8,
    },
    selectedFilterPill: {
      backgroundColor: colors.primary,
    },
    filterText: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
    },
    selectedFilterText: {
      color: colors.white,
    },
    shopsList: {
      padding: 16,
      paddingBottom: 30,
    },
    shopItem: {
      marginBottom: 16,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 48,
    },
    emptyText: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
  });
