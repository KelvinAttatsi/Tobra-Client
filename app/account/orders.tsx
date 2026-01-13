import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { mockProducts } from '@/data/mockData';

const Orders = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const dummyOrders = mockProducts.slice(0, 5).map((product, index) => ({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: (index % 3) + 1,
    status: index % 2 === 0 ? 'Delivered' : 'Processing',
    date: `2025-07-0${index + 1}`,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
            }}>
            Orders
          </Text>
        </View>
      </View>

      {/* Order List */}
      <View style={{ padding: 16, flex: 1 }}>
        <FlatList
          data={dummyOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.surface,
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 12,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: colors.text }}>{item.name}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Status: {item.status} • {item.date}
                </Text>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>
                  GHS {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
