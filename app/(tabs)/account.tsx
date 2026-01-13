import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  CircleHelp as HelpCircle,
  Star,
  Gift,
  Eye,
  Search,
  Bell,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  LogOut,
  LogIn,
} from 'lucide-react-native';
import { SafeContainer } from '@/components/SafeContainer';

export default function AccountScreen() {
  const { colors, theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const styles = createStyles(colors);

  const redirectOrLogin = (path: string) => {
    if (user) {
      router.push(path);
    } else {
      router.push('/auth/login');
    }
  };

  const menuSections = [
    {
      title: 'Need Assistance',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          onPress: () => redirectOrLogin('/account/support'),
        },
      ],
    },
    {
      title: 'My Tobra Account',
      items: [
        {
          icon: Package,
          label: 'Orders',
          onPress: () => redirectOrLogin('/account/orders'),
        },
        {
          icon: MapPin,
          label: 'Track Order',
          onPress: () => redirectOrLogin('/account/track-order'),
        },
        {
          icon: Bell,
          label: 'Inbox',
          onPress: () => redirectOrLogin('/account/inbox'),
        },
        {
          icon: Star,
          label: 'Ratings & Reviews',
          onPress: () => redirectOrLogin('/account/reviews'),
        },
        {
          icon: Gift,
          label: 'Vouchers',
          onPress: () => redirectOrLogin('/account/vouchers'),
        },
        {
          icon: Eye,
          label: 'Recently Viewed',
          onPress: () => redirectOrLogin('/account/recently-viewed'),
        },
        {
          icon: Search,
          label: 'Recently Searched',
          onPress: () => redirectOrLogin('/account/recently-searched'),
        },
      ],
    },
    {
      title: 'My Settings',
      items: [
        {
          icon: CreditCard,
          label: 'Payment Settings',
          onPress: () => redirectOrLogin('/account/payment-settings'),
        },
        {
          icon: MapPin,
          label: 'Address Book',
          onPress: () => redirectOrLogin('/account/address-book'),
        },
        {
          icon: Settings,
          label: 'Account Management',
          onPress: () => redirectOrLogin('/account/account-management'),
        },
      ],
    },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeContainer>
      {/* Fixed User Info */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={32} color={colors.white} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user ? `Welcome ${user.name}` : 'Welcome'}</Text>
            <Text style={styles.userEmail}>{user ? user.email : 'Login to continue'}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.themeContainer}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: theme === option.value ? colors.primary + '20' : 'transparent',
                  },
                ]}
                onPress={() => setTheme(option.value as any)}>
                <option.icon
                  size={20}
                  color={theme === option.value ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    {
                      color: theme === option.value ? colors.primary : colors.text,
                    },
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemLeft}>
                  <item.icon size={20} color={colors.textSecondary} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Login/Logout Button */}
        <View style={styles.section}>
          {user ? (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={colors.error} />
              <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.logoutButton, { borderColor: colors.primary }]}
              onPress={() => router.push('/auth/login')}>
              <LogIn size={20} color={colors.primary} />
              <Text style={[styles.logoutText, { color: colors.primary }]}>Login</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Tobra v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ in Ghana</Text>
        </View>
      </ScrollView>
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
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userDetails: {
      marginLeft: 16,
      flex: 1,
    },
    userName: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
      marginHorizontal: 16,
    },
    themeContainer: {
      flexDirection: 'row',
      marginHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 8,
    },
    themeOptionText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      marginLeft: 8,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: colors.surface,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuItemText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      marginLeft: 12,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      marginHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
    },
    logoutText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    footerText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 4,
    },
  });
