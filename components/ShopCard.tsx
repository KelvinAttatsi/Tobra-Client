import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';

interface ShopCardProps {
  shop: Shop;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function ShopCard({ shop, style, onPress }: ShopCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = createStyles(colors);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/shop/${shop.id}`);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: shop.image }} style={styles.image} />
        {shop.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {shop.name}
        </Text>

        <Text style={styles.category} numberOfLines={1}>
          {shop.category}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.ratingContainer}>
            <Star size={12} color={colors.warning} fill={colors.warning} />
            <Text style={styles.rating}>{shop.rating}</Text>
          </View>

          <Text style={styles.followers}>
            {shop.followers > 1000 ? `${(shop.followers / 1000).toFixed(1)}k` : shop.followers}{' '}
            followers
          </Text>
        </View>

        <View style={styles.locationContainer}>
          <MapPin size={12} color={colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}>
            {shop.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginVertical: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      height: 120,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    verifiedBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: colors.success,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verifiedText: {
      fontSize: 12,
      color: colors.white,
      fontFamily: 'Inter-Bold',
    },
    content: {
      padding: 12,
    },
    name: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginLeft: 4,
    },
    followers: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    location: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginLeft: 4,
      flex: 1,
    },
  });
