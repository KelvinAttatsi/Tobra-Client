import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={{ display: 'flex', flex: 1 }}>{children}</SafeAreaView>;
};
