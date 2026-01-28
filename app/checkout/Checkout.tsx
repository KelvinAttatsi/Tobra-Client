import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';

import { Button } from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';

const YourCheckoutComponent = () => {};

const DELIVERY_FEE = 10;

const dummyAddresses = [
  {
    id: '1',
    label: 'Home',
    details: '123 Ghana Street, Accra, GA-123-4567',
  },
  {
    id: '2',
    label: 'Work',
    details: 'Tech City, East Legon, GA-999-8888',
  },
];

export const CheckoutComponent = () => {
  const { colors } = useTheme();
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const { user } = useAuth();

  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0] || null);
  const { popup } = usePaystack();
  const { showToast } = useToast();

  const handlePayment = () => {
    if (!selectedAddress) {
      Alert.alert('Missing Address', 'Please add a delivery address first.');
      return;
    }

    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Add items before checking out.');
      return;
    }

    popup.checkout({
      reference: new Date().getTime().toString(),
      email: user ? user.email : 'tobra@gmail.com',
      amount: totalWithDelivery,
      onSuccess: () => onPaymentSuccess(),
      onCancel: () => showToast('Cancelled', 'success'),
    });
  };

  const onPaymentSuccess = () => {
    Alert.alert('Order Placed', 'Your order has been placed successfully!');
    clearCart();
    router.replace('/');
  };

  const styles = createStyles(colors);
  const totalWithDelivery = total + DELIVERY_FEE;

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* DELIVERY ADDRESS SECTION */}
        <View style={[styles.sectionBox, { backgroundColor: colors.surface }]}>
          <View style={styles.addressHeader}>
            <MapPin size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>

          {selectedAddress ? (
            <View style={styles.addressDetails}>
              <Text style={[styles.addressLabel, { color: colors.text }]}>
                {selectedAddress.label}
              </Text>
              <Text style={{ color: colors.textSecondary }}>{selectedAddress.details}</Text>
              <TouchableOpacity
                activeOpacity={100}
                onPress={() => {
                  const next = selectedAddress.id === '1' ? dummyAddresses[1] : dummyAddresses[0];
                  setSelectedAddress(next);
                }}>
                <Text style={[styles.changeAddressText, { color: colors.primary }]}>
                  Change Address
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => router.push('/account/address-book')}
              style={styles.addAddressBtn}>
              <Text style={{ color: colors.primary }}>+ Add Address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* CART SUMMARY */}
        {items.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Your cart is empty.
          </Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={[styles.cartItem, { backgroundColor: colors.surface }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text numberOfLines={2} style={[styles.itemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.textSecondary }}>Qty: {item.quantity}</Text>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>
                  ₵{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        )}

        {/* ORDER SUMMARY */}
        {items.length > 0 && (
          <View style={[styles.sectionBox, { backgroundColor: colors.surface }]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₵{total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₵{DELIVERY_FEE.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total</Text>
              <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>
                ₵{totalWithDelivery.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.placeOrderBtn, { backgroundColor: colors.primary }]}
              // onPress={handlePlaceOrder}
            >
              <Button title="Place Order" color={colors.white} onPress={handlePayment} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    content: {
      padding: 16,
    },
    sectionBox: {
      padding: 16,
      borderRadius: 10,
      marginBottom: 20,
    },
    addressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    addressDetails: {
      paddingLeft: 26,
    },
    addressLabel: {
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 4,
    },
    changeAddressText: {
      marginTop: 6,
      fontSize: 13,
    },
    addAddressBtn: {
      paddingLeft: 26,
      paddingVertical: 4,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 32,
    },
    cartItem: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 4,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    summaryLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    summaryValue: {
      fontSize: 15,
      color: colors.text,
    },
    placeOrderBtn: {
      marginTop: 16,
      paddingVertical: 4,
      borderRadius: 8,
      alignItems: 'center',
    },
  });

export default CheckoutComponent;
