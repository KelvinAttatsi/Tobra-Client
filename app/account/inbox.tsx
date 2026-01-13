import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

const dummyMessages = [
  {
    id: '1',
    sender: 'Shoprite',
    subject: 'Your Order is Ready!',
    time: 'Just now',
  },
  {
    id: '2',
    sender: 'Mall Admin',
    subject: 'New Promotions on Electronics 🎉',
    time: '2h ago',
  },
  {
    id: '3',
    sender: 'PayNow',
    subject: 'Payment Successful for Order #1242',
    time: 'Yesterday',
  },
];

const Inbox = () => {
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
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Inbox</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={dummyMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 12 }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingVertical: 8,
            }}>
            <Text style={{ fontWeight: '600', color: colors.text }}>{item.sender}</Text>
            <Text style={{ color: colors.textSecondary }}>{item.subject}</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Inbox;
