import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';

const TwoFactorAuth = () => {
  const { colors } = useTheme();
  const { showToast } = useToast();

  const [code, setCode] = useState(Array(6).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move forward
      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      // Auto verify on last digit
      if (index === 5 && newCode.join('').length === 6) {
        verifyCode(newCode.join(''));
      }
    }
  };

  const verifyCode = (enteredCode: string) => {
    if (enteredCode === '123456') {
      showToast('Verification successful!', 'success');
      router.replace('/');
    } else {
      showToast('Invalid code. Try again.', 'error');
      setCode(Array(6).fill(''));
      inputs.current[0]?.focus();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={[styles.brandText, { color: colors.text }]}>Tobra</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Two-Factor Authentication</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter the 6-digit code sent to your email
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.otpInput, { borderColor: colors.border, color: colors.text }]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={() => verifyCode(code.join(''))}
          style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    width: 48,
    height: 56,
    fontSize: 20,
    textAlign: 'center',
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
});

export default TwoFactorAuth;
