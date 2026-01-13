import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { mockProducts } from '@/data/mockData';

const trackingSteps = [
  { id: '1', label: 'Order Confirmed', time: '2025-07-02 10:30 AM' },
  { id: '2', label: 'Packed', time: '2025-07-02 1:45 PM' },
  { id: '3', label: 'Shipped', time: '2025-07-03 9:15 AM' },
  { id: '4', label: 'Out for Delivery', time: '2025-07-04 7:00 AM' },
  { id: '5', label: 'Delivered', time: '2025-07-04 2:30 PM' },
];

const TrackOrder = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [foundProduct, setFoundProduct] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const match = mockProducts.find((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundProduct(match || null);
    setSearched(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Track Order</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          margin: 16,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
        <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
        <TextInput
          placeholder="Enter product name..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={{
            flex: 1,
            marginLeft: 8,
            paddingVertical: 8,
            fontSize: 16,
            color: colors.text,
          }}
        />
        {searchQuery !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setFoundProduct(null);
              setSearched(false);
            }}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* No search yet */}
      {!searched && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
              marginBottom: 8,
              textAlign: 'center',
            }}>
            Start Tracking Your Order
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center',
            }}>
            Search by product name (e.g., Wireless Bluetooth, Samsung Galaxy)
          </Text>
        </View>
      )}

      {/* Not found */}
      {searched && !foundProduct && (
        <Text
          style={{
            textAlign: 'center',
            color: colors.textSecondary,
            marginTop: 20,
          }}>
          No product found.
        </Text>
      )}

      {/* Found */}
      {foundProduct && (
        <>
          {/* Order Info */}
          <View style={{ padding: 16, backgroundColor: colors.surface }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: foundProduct.image }}
                style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                  {foundProduct.name}
                </Text>
                <Text style={{ color: colors.primary, fontWeight: '500' }}>
                  GHS {foundProduct.price.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Tracking Steps */}
          <FlatList
            contentContainerStyle={{ padding: 16 }}
            data={trackingSteps}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20,
                  alignItems: 'flex-start',
                }}>
                <View style={{ alignItems: 'center', marginRight: 12 }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.primary,
                      marginTop: 4,
                    }}
                  />
                  {index !== trackingSteps.length - 1 && (
                    <View
                      style={{
                        width: 2,
                        height: 50,
                        backgroundColor: colors.primary,
                        marginTop: 4,
                      }}
                    />
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: '600', color: colors.text }}>{item.label}</Text>
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.time}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default TrackOrder;
