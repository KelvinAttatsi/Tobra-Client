import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

const Register = () => {
  const { colors } = useTheme();
  const { signup, isLoading } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);

  // Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Step 2
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  // Step 3
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateStep = () => {
    if (step === 1) {
      if (!firstName || !lastName || !email) {
        showToast('Please fill in all fields', 'warning');
        return false;
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        showToast('Enter a valid email', 'warning');
        return false;
      }
    }
    if (step === 2) {
      if (!phone || !address || !city || !region) {
        showToast('Please complete all contact details', 'warning');
        return false;
      }
      if (!/^\+?[0-9]{10,15}$/.test(phone)) {
        showToast('Enter a valid phone number', 'warning');
        return false;
      }
    }
    if (step === 3) {
      if (!password || !confirmPassword) {
        showToast('Password fields cannot be empty', 'warning');
        return false;
      }
      if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'warning');
        return false;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleRegister = async () => {
    if (!validateStep()) return;

    const success = await signup(email, password, `${firstName} ${lastName}`);
    if (success) {
      showToast('Account created successfully', 'success');
      router.replace('/');
    } else {
      showToast('Signup failed. Try again.', 'error');
    }
  };

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.progressBar,
            { backgroundColor: step >= i ? colors.primary : colors.border },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Step {step} of 3</Text>

          {renderProgress()}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
              <TextInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                keyboardType="phone-pad"
              />
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
              <TextInput
                placeholder="City"
                value={city}
                onChangeText={setCity}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
              <TextInput
                placeholder="Region/State"
                value={region}
                onChangeText={setRegion}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              />
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                secureTextEntry
              />
            </>
          )}

          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={[styles.navButton, { borderColor: colors.primary }]}>
                <Text style={[styles.navButtonText, { color: colors.primary }]}>Previous</Text>
              </TouchableOpacity>
            )}

            {step < 3 ? (
              <TouchableOpacity
                onPress={handleNext}
                style={[styles.button, { backgroundColor: colors.primary }]}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={[styles.button, { backgroundColor: colors.primary }]}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={[styles.link, { color: colors.primary }]}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  inner: { width: '100%', maxWidth: 400, alignSelf: 'center' },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 6 },
  subText: { fontSize: 14, textAlign: 'center', marginBottom: 16 },
  progressContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  progressBar: { flex: 1, height: 4, marginHorizontal: 4, borderRadius: 2 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    
    borderWidth: 1,
    marginRight: 10,
  },
  navButtonText: { fontWeight: '600', fontSize: 16 },
  link: { marginTop: 20, textAlign: 'center', fontSize: 14 },
});

export default Register;
