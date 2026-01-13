import React from "react";  
import { PaystackProvider } from 'react-native-paystack-webview';
import { CheckoutComponent } from "./Checkout";

export default function Checkout(){
     return (
    <PaystackProvider publicKey="pk_test_d2b29b341053f591f409889e71e0811823b8195d">
      <CheckoutComponent />
    </PaystackProvider>
  );
}