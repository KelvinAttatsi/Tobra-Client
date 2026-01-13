import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import { mockProducts } from '@/data/mockData';

const RecentlyViewed = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  // Use 6 random products as recently viewed
  const recentlyViewed = mockProducts.slice(0, 6);

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
            Recently Viewed
          </Text>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={recentlyViewed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.surface,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
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
              <Text style={{ fontSize: 15, fontWeight: '500', color: colors.text }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: colors.primary }}>
                GHS {item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default RecentlyViewed;
