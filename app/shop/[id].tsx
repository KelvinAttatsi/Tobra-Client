import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockShops, mockProducts } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react-native';


export default function ShopScreen() {
  const { id } = useLocalSearchParams();
  const shopId = Array.isArray(id) ? id[0] : id;
  const { colors } = useTheme();
  const router = useRouter();

  const shop = mockShops.find((shop) => shop.id === shopId);
  const shopProducts = mockProducts.filter((product) => product.shopId === shopId);

  const styles = createStyles(colors);

  if (!shop) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.notFoundText}>Shop not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: colors.primary, marginTop: 8 }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{shop.name}</Text>
        </View>

        {/* Shop Banner */}
        <Image source={{ uri: shop.image }} style={styles.banner} />

        {/* Shop Info */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{shop.name}</Text>
          <Text style={styles.category}>{shop.category}</Text>
          <Text style={styles.description}>{shop.description}</Text>
        </View>

        {/* Product List */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Products</Text>
          <FlatList
            data={shopProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} style={styles.productGridItem} />}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.rowWrapper}
            contentContainerStyle={styles.gridContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    banner: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    infoSection: {
      padding: 16,
    },
    name: {
      fontSize: 22,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.primary,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    productsContainer: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    rowWrapper: {
      justifyContent: 'space-between',
    },
    productGridItem: {
      width: '48%',
      marginBottom: 16,
    },
    gridContent: {
      paddingBottom: 32,
    },
    notFoundText: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
  });
