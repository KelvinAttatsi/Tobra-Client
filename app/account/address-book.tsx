import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

interface Address {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const AddressBook = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Accra Street, East Legon, Accra',
      phone: '024 123 4567',
    },
    {
      id: '2',
      name: 'Work',
      address: '45 Kwame Nkrumah Ave, Ridge, Accra',
      phone: '020 987 6543',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleAdd = () => {
    if (!newName || !newAddress || !newPhone) return;

    const newEntry: Address = {
      id: Date.now().toString(),
      name: newName,
      address: newAddress,
      phone: newPhone,
    };

    setAddresses((prev) => [...prev, newEntry]);
    setModalVisible(false);
    setNewName('');
    setNewAddress('');
    setNewPhone('');
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
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Address Book</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.surface,
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{item.name}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{item.address}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 2 }}>📞 {item.phone}</Text>
          </View>
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: colors.primary,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
        }}>
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>

      {/* Modal for New Address */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: colors.surface,
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12 }}>
              Add New Address
            </Text>

            <TextInput
              placeholder="Label (e.g. Home)"
              placeholderTextColor={colors.textSecondary}
              value={newName}
              onChangeText={setNewName}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 6,
                padding: 12,
                color: colors.text,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor={colors.textSecondary}
              value={newAddress}
              onChangeText={setNewAddress}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 6,
                padding: 12,
                color: colors.text,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor={colors.textSecondary}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 6,
                padding: 12,
                color: colors.text,
                marginBottom: 20,
              }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 20 }}>
                <Text style={{ color: colors.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddressBook;
