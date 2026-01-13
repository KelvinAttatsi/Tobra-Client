import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Support = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & Help</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Support Options */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>Chat with Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="mail-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="document-text-outline" size={22} color={colors.primary} />
          <Text style={styles.optionText}>FAQs & Help Center</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Support;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    options: {
      marginTop: 24,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    optionText: {
      marginLeft: 12,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
  });
