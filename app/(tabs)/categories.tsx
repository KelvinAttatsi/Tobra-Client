import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { Search, ChevronRight } from 'lucide-react-native';
import { mockCategories } from '@/data/mockData';
import { SafeContainer } from '@/components/SafeContainer';

export default function CategoriesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(mockCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const styles = createStyles(colors);

  const handleSubcategoryPress = (subcategory: any) => {
    router.push(`/filtered-products`);
  };

  return (
    <SafeContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.content}>
        {/* Categories Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {mockCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor:
                      selectedCategory.id === category.id ? colors.primary + '20' : 'transparent',
                  },
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: selectedCategory.id === category.id ? colors.primary : colors.text,
                    },
                  ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Content */}
        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* See All Products */}
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => router.push(`/filtered-products`)}>
              <Text style={styles.seeAllText}>See All {selectedCategory.name}</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>

            {/* Subcategories */}
            <View style={styles.subcategoriesContainer}>
              <Text style={styles.sectionTitle}>Subcategories</Text>

              <View style={styles.subcategoriesGrid}>
                {selectedCategory.subcategories.map((subcategory) => (
                  <TouchableOpacity
                    key={subcategory.id}
                    style={styles.subcategoryItem}
                    onPress={() => handleSubcategoryPress(subcategory)}>
                    <Image source={{ uri: subcategory.image }} style={styles.subcategoryImage} />
                    <Text style={styles.subcategoryText} numberOfLines={2}>
                      {subcategory.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular in Category */}
            <View style={styles.popularSection}>
              <Text style={styles.sectionTitle}>Popular in {selectedCategory.name}</Text>

              <View style={styles.popularTags}>
                {selectedCategory.popularTags?.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.popularTag}
                    onPress={() => router.push(`/filtered-products`)}>
                    <Text style={styles.popularTagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
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
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
    },
    content: {
      flex: 1,
      flexDirection: 'row',
    },
    sidebar: {
      width: 120,
      backgroundColor: colors.surface,
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    categoryItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
    },
    mainContent: {
      flex: 1,
      backgroundColor: colors.background,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    seeAllText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
    subcategoriesContainer: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    subcategoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -8,
    },
    subcategoryItem: {
      width: '33.333%',
      paddingHorizontal: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    subcategoryImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginBottom: 8,
    },
    subcategoryText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      textAlign: 'center',
    },
    popularSection: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    popularTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -4,
    },
    popularTag: {
      backgroundColor: colors.primary + '20',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      margin: 4,
    },
    popularTagText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.primary,
    },
  });
