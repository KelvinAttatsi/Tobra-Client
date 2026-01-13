import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

const dummyReviews = [
  {
    id: '1',
    name: 'John Doe',
    rating: 4,
    comment: 'Really good quality! Fast delivery too.',
    date: 'July 1, 2025',
  },
  {
    id: '2',
    name: 'Ama Kwabena',
    rating: 5,
    comment: 'Exactly what I needed. Excellent service!',
    date: 'June 28, 2025',
  },
  {
    id: '3',
    name: 'Kojo Mensah',
    rating: 3,
    comment: 'Product is okay but packaging could be better.',
    date: 'June 22, 2025',
  },
];

const Reviews = () => {
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
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Reviews</Text>
        </View>
      </View>

      {/* Review List */}
      <FlatList
        data={dummyReviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 12 }} />
        )}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: '600', color: colors.text }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary }}>{item.date}</Text>
            <Text style={{ marginVertical: 4, color: colors.text }}>
              {'⭐'.repeat(item.rating)}
            </Text>
            <Text style={{ color: colors.text }}>{item.comment}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Reviews;
