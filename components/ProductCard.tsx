import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import { Plus, Minus } from 'lucide-react-native';
import { useToast } from '@/contexts/ToastContext';

const screenWidth = Dimensions.get('window').width;
const cardSpacing = 16;
const cardWidth = (screenWidth - cardSpacing * 3) / 2; // Two columns with spacing



interface ProductCardProps {
  product: Product;
  style?: ViewStyle;
}

export default function ProductCard({ product, style }: ProductCardProps) {
  const { colors } = useTheme();
  const { items, addItem, updateQuantity } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const styles = createStyles(colors);

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        shopId: product.shopId,
        shopName: product.shopName,
      });
      showToast('Added to cart', 'success');
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
      if (quantity === 1) {
        showToast('Removed from cart', 'success');
      }
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => router.push(`/product/${product.id}`)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₵{product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>₵{product.originalPrice.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.reviews}>({product.reviews})</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.shopName} numberOfLines={1}>
            {product.shopName}
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Plus size={16} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
                <Minus size={14} color={colors.primary} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity style={styles.quantityButton} onPress={handleAddToCart}>
                <Plus size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
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
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: cardWidth,
      marginBottom: 16,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 140,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      resizeMode: 'cover',
    },
    discountBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: colors.error,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    discountText: {
      fontSize: 10,
      fontFamily: 'Inter-Bold',
      color: colors.white,
    },
    content: {
      padding: 12,
    },
    name: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
      lineHeight: 18,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    price: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
    },
    originalPrice: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textDecorationLine: 'line-through',
      marginLeft: 6,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    rating: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    reviews: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginLeft: 4,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    shopName: {
      flex: 1,
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    addButton: {
      backgroundColor: colors.primary,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    quantityButton: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityText: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
      minWidth: 20,
      textAlign: 'center',
    },
  });
