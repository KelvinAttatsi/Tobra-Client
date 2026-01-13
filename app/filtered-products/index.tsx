import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react-native';

const FilteredProducts = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Search Results</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* Product Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} style={styles.productGridItem} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilteredProducts;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  productGridItem: {
    width: '48%',
    marginBottom: 16,
  },
});
