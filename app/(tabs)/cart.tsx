import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/contexts/ToastContext';
import { SafeContainer } from '@/components/SafeContainer';

export default function CartScreen() {
  const { colors } = useTheme();
  const { items, total, updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const styles = createStyles(colors);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      showToast('Item removed from cart', 'success');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    showToast('Item removed from cart', 'success');
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.shopName}>{item.shopName}</Text>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>₵{item.price.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
              <Minus size={16} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
              <Plus size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
        <Trash2 size={18} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Cart Items */}
        {items.length === 0 ? (
          <View style={{ marginVertical: 16 }}>
            <View style={styles.emptyContainer}>
              <ShoppingBag size={64} color={colors.textSecondary} />
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySubtitle}>Browse and discover what you want</Text>
            </View>

            <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/')}>
              <Text style={styles.shopButtonText}>Browse Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>

            <View style={styles.checkoutBar}>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => router.push('/checkout')}>
                <Text style={styles.checkoutButtonText}>Checkout (₵{total.toFixed(2)})</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {/* Recently Viewed */}
        <View style={styles.section}>
          <SectionTitle title="Saved Items" subtitle="Get back to your precious items" />
          <View style={{ marginTop: 12, flex: 1 }}></View>
          <FlatList
            data={mockProducts.slice(0, 5)}
            renderItem={({ item }) => <ProductCard product={item} style={{ marginRight: 12 }} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        {/* Recommended */}
        <View style={styles.section}>
          <SectionTitle title="Recommended for You" subtitle="Based on your cart" />
          <View style={{ marginTop: 12, flex: 1 }}></View>
          <FlatList
            data={mockProducts.slice(5, 10)}
            renderItem={({ item }) => <ProductCard product={item} style={{ marginRight: 12 }} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
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
    header: {
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    content: {
      flex: 1,
    },
    section: {
      marginVertical: 8,
    },
    cartItem: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
    },
    itemName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    shopName: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemPrice: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quantityButton: {
      padding: 8,
    },
    quantityText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      minWidth: 32,
      textAlign: 'center',
    },
    removeButton: {
      padding: 8,
    },
    horizontalList: {
      paddingHorizontal: 16,
    },
    checkoutBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      // height:
    },
    totalContainer: {
      flex: 1,
    },
    totalLabel: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    totalAmount: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    checkoutButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkoutButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.white,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
    },
    shopButton: {
      marginHorizontal: 16,
      backgroundColor: colors.primary,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
      flex: 1,
    },
    shopButtonText: {
      fontSize: 15,
      fontFamily: 'Inter-Bold',
      color: colors.white,
      textAlign: 'center',
    },
  });
