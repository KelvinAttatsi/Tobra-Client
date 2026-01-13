import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

const dummySearches = [
  'Laptop',
  'Sneakers',
  'Wireless Earbuds',
  'GHS Deals',
  'Samsung Galaxy',
  'Wrist Watches',
  'Local Shops',
  'Air Fryer',
];

const RecentlySearched = () => {
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
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
            Recently Searched
          </Text>
        </View>
      </View>

      {/* Recently Searched Terms */}
      <FlatList
        data={dummySearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: colors.surface,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
            <Text style={{ fontSize: 16, color: colors.text }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default RecentlySearched;
