import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { Search, MapPin } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import ShopCard from '@/components/ShopCard';
import SectionTitle from '@/components/SectionTitle';
import { mockProducts, mockShops, mockBanners } from '@/data/mockData';
import { SafeContainer } from '@/components/SafeContainer';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % mockBanners.length;
      setCurrentBannerIndex(nextIndex);
      bannerScrollRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const styles = createStyles(colors);

  const renderBanner = ({ item }: { item: (typeof mockBanners)[0] }) => (
    <TouchableOpacity style={styles.bannerItem}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeContainer>
      {/* Sticky Search Bar */}
      <View style={styles.stickySearchBar}>
        <View style={styles.locationContainer}>
          <MapPin size={16} color={colors.primary} />
          <Text style={styles.locationText}>Accra, Ghana</Text>
        </View>
        <TouchableOpacity style={styles.searchContainer} onPress={() => router.push('/search')}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search what you need...</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Banner Carousel */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={bannerScrollRef}
            data={mockBanners}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentBannerIndex(index);
            }}
          />
          <View style={styles.bannerIndicators}>
            {mockBanners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentBannerIndex ? colors.primary : colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Flash Sales */}
        <View style={styles.section}>
          <SectionTitle
            title="Flash Sales"
            subtitle="Limited time offers"
            onSeeAll={() => router.push('/filtered-products')}
          />
          <FlatList
            data={mockProducts.slice(0, 6)}
            renderItem={({ item }) => <ProductCard product={item} style={{ marginRight: 12 }} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured Shops */}
        <View style={styles.section}>
          <SectionTitle
            title="Featured Shops"
            subtitle="Top rated stores"
            onSeeAll={() => router.push('/shops')}
          />
          <View style={styles.gridContainer}>
            {mockShops.slice(0, 8).map((shop) => (
              <View key={shop.id} style={styles.gridItem}>
                <ShopCard shop={shop} />
              </View>
            ))}
          </View>
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <SectionTitle
            title="Best Sellers"
            subtitle="Most popular items"
            onSeeAll={() => router.push('/filtered-products')}
          />
          <View style={styles.gridContainer}>
            {mockProducts.slice(6, 10).map((product) => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>

        {/* Just For You */}
        <View style={styles.section}>
          <SectionTitle
            title="Just For You"
            subtitle="Personalized recommendations"
            onSeeAll={() => router.push('/filtered-products')}
          />
          <View style={styles.gridContainer}>
            {mockProducts.slice(10, 16).map((product) => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeContainer>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    stickySearchBar: {
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 12,
      zIndex: 10,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationText: {
      marginLeft: 4,
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      height: 45,
    },
    searchPlaceholder: {
      marginLeft: 8,
      fontSize: 16,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
    },
    bannerContainer: {
      height: 200,
      position: 'relative',
    },
    bannerItem: {
      width,
      height: 200,
      position: 'relative',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    bannerOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 16,
    },
    bannerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    bannerSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: '#FFFFFF',
    },
    bannerIndicators: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      flexDirection: 'row',
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 4,
    },
    section: {
      marginVertical: 8,
    },
    horizontalList: {
      paddingHorizontal: 16,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    gridItem: {
      width: '48%',
      marginBottom: 12,
    },
  });
