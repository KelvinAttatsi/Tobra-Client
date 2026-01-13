import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const dummySections = [
  { id: '1', title: 'Profile Info', description: 'Update name, email, and phone number' },
  { id: '2', title: 'Security', description: 'Change password and secure account' },
  { id: '3', title: 'Login Activity', description: 'View devices and login history' },
  { id: '4', title: 'Deactivate Account', description: 'Temporarily disable your account' },
];

const AccountManagement = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>
          Account Management
        </Text>
        <FlatList
          data={dummySections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 12 }}
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
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                {item.title}
              </Text>
              <Text style={{ marginTop: 4, color: colors.textSecondary }}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountManagement;
