import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { Home, Store, ShoppingCart, Grid3x3 as Grid3X3, User } from 'lucide-react-native';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { colors } = useTheme();
  const { itemCount } = useCart();
  const insets = useSafeAreaInsets();

  const BASE_TAB_BAR_CONTENT_HEIGHT = 60;

  const HapticTabButton = (props) => {
    return (
      <Pressable
        {...props}
        onPress={(e) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          props.onPress?.(e);
        }}
        android_ripple={{ color: 'transparent' }}
        style={({ pressed }) => [props.style, Platform.OS === 'android' && { opacity: 1 }]}>
        {props.children}
      </Pressable>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: BASE_TAB_BAR_CONTENT_HEIGHT + insets.bottom,
          paddingTop: 2,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarItemStyle: {
          flexGrow: 1,
          flexBasis: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconWrapper}>
              <Home size={size} color={color} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, { color }]}>
                Home
              </Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => <HapticTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconWrapper}>
              <Store size={size} color={color} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, { color }]}>
                Shops
              </Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => <HapticTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ size, color }) => (
            <View style={[styles.iconWrapper, { position: 'relative' }]}>
              <ShoppingCart size={size} color={color} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, { color }]}>
                Cart
              </Text>
              {itemCount > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.error }]}>
                  <Text style={[styles.badgeText, { color: colors.white }]}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => <HapticTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconWrapper}>
              <Grid3X3 size={size} color={color} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, { color }]}>
                Categories
              </Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => <HapticTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconWrapper}>
              <User size={size} color={color} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, { color }]}>
                Account
              </Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => <HapticTabButton {...props} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: 3,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
});
