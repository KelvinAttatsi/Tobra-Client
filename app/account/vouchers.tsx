import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

const dummyVouchers = [
  {
    id: '1',
    code: 'GHMALL10',
    description: 'Get 10% off your first order',
    expiry: 'Expires July 31, 2025',
  },
  {
    id: '2',
    code: 'FREESHIP',
    description: 'Free shipping on orders over GHS 100',
    expiry: 'Expires Aug 15, 2025',
  },
  {
    id: '3',
    code: 'WELCOME5',
    description: 'GHS 5 off for new users',
    expiry: 'Expires July 20, 2025',
  },
];

const Vouchers = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

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
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Vouchers</Text>
        </View>
      </View>

      {/* Voucher List */}
      <FlatList
        data={dummyVouchers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: colors.primary }}>
              {item.code}
            </Text>
            <Text style={{ color: colors.text, marginTop: 4 }}>{item.description}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{item.expiry}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Vouchers;
