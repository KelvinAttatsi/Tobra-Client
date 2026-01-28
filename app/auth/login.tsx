import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { router } from 'expo-router';

const Login = () => {
  const { colors } = useTheme();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill all fields', 'warning');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.replace('/auth/verify');
    } else {
      showToast('Login failed. Try again.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        {/* Logo + Brand */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={[styles.brandText, { color: colors.text }]}>Tobra</Text>
        </View>

        {/* Welcome text */}
        <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome back</Text>
        <Text style={[styles.subText, { color: colors.textSecondary }]}>
          Sign in to your Tobra account
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={() => router.push('/auth/forgot-password')}
          style={styles.forgotContainer}>
          <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Register link */}
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Don’t have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    backgroundColor: '#222',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  brandText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Login;
