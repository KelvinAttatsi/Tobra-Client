import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { SafeContainer } from '@/components/SafeContainer';

const Search = () => {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    Keyboard.dismiss();
    if (query.trim()) {
      router.push('/filtered-products');
    }
  };

  return (
    <SafeContainer>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: colors.surface,
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
          }}>
          Search
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={{ padding: 16 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products..."
          placeholderTextColor={colors.textSecondary}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
          }}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            marginTop: 16,
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}>
          <Text style={{ color: colors.white, fontWeight: '600' }}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeContainer>
  );
};

export default Search;
