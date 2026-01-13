// ProductDetails.tsx
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import { Container } from '@/components/Container';
import { Ionicons } from '@expo/vector-icons';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'expo-router';
import { SafeContainer } from '@/components/SafeContainer';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';

const ProductDetails = () => {
  const { colors } = useTheme();
  const route = useRoute<any>();
  const { id } = route.params;
  const router = useRouter();
  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const { items, addItem, updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();

  const cartItem = items.find((item) => item.id === product?.id);

  if (!product) {
    return (
      <Container>
        <Text style={{ color: colors.text }}>Product not found.</Text>
      </Container>
    );
  }

  const increaseQty = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQty = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      } else {
        removeItem(product.id);
        showToast(`${product.name} removed from cart`, 'info');
      }
    } else {
      setQuantity((q) => (q > 1 ? q - 1 : 1));
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        shopId: product.shopId,
        shopName: product.shopName,
      });
    }
    showToast(`${product.name} x${quantity} added to cart`, 'success');
  };

  const productLink = `https://univyn.shop/product/${product.id}`;

  const handleShare = async (platform: string) => {
    try {
      let url = '';
      switch (platform) {
        case 'whatsapp':
          url = `whatsapp://send?text=Check this out: ${productLink}`;
          break;
        case 'instagram':
          url = `instagram://share?text=Check this out: ${productLink}`;
          break;
        case 'snapchat':
          url = `snapchat://share?text=Check this out: ${productLink}`;
          break;
        case 'copy':
          await Clipboard.setStringAsync(productLink);
          showToast('Link copied to clipboard!', 'success');
          setShareModalVisible(false);
          return;
      }

      if (url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          showToast(
            `${platform.charAt(0).toUpperCase() + platform.slice(1)} not installed`,
            'error'
          );
        }
      }
    } catch (error) {
      showToast('Unable to share right now', 'error');
    }
    setShareModalVisible(false);
  };

  const customerAlsoViewed = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <SafeContainer edges={['bottom', 'top']}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Top Nav */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            backgroundColor: colors.surface,
          }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
            }}>
            Details
          </Text>
          <TouchableOpacity onPress={() => router.push('/search/')}>
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/cart')}>
            <Ionicons name="cart" size={22} color={colors.text} style={{ marginLeft: 12 }} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: product.image }} style={{ width: '100%', height: 280 }} />

          <View style={{ padding: 16 }}>
            {/* Product Title + Price */}
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
              {product.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.primary,
                }}>
                GHS {product.price.toFixed(2)}
              </Text>
              {product.originalPrice && (
                <Text
                  style={{
                    marginLeft: 10,
                    color: colors.textSecondary,
                    textDecorationLine: 'line-through',
                  }}>
                  GHS {product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>

            {/* Description */}
            <Text
              style={{
                marginTop: 12,
                fontSize: 16,
                color: colors.textSecondary,
              }}>
              {product.description}
            </Text>

            {/* Action Row (Independent Buttons) */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              {/* Add to Favorites */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  backgroundColor: colors.surface,
                }}>
                <Ionicons name="heart-outline" size={20} color={colors.primary} />
                <Text style={{ marginLeft: 6, color: colors.primary, fontWeight: '600' }}>
                  Add to Favorites
                </Text>
              </TouchableOpacity>

              {/* Share */}
              <TouchableOpacity
                onPress={() => setShareModalVisible(true)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  marginLeft: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  backgroundColor: colors.surface,
                }}>
                <Ionicons name="share-social-outline" size={20} color={colors.primary} />
                <Text style={{ marginLeft: 6, color: colors.primary, fontWeight: '600' }}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>

            {/* Delivery Info */}
            <View style={{ marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 12,
                  color: colors.text,
                }}>
                Delivery Information
              </Text>

              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                }}>
                {[
                  {
                    icon: 'bicycle-outline',
                    title: 'Free Delivery',
                    subtitle: 'On Orders above GHS 100',
                  },
                  {
                    icon: 'shield-checkmark-outline',
                    title: 'Quality Guarantee',
                    subtitle: 'Fresh products guaranteed',
                  },
                  {
                    icon: 'refresh-outline',
                    title: 'Easy Returns',
                    subtitle: '2-day return policy',
                  },
                ].map((info, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: i !== 2 ? 12 : 0,
                    }}>
                    <Ionicons
                      name={info.icon as any}
                      size={22}
                      color={colors.primary}
                      style={{ marginRight: 12 }}
                    />
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                        {info.title}
                      </Text>
                      <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                        {info.subtitle}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Shop Info */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                Sold by: {product.shopName}
              </Text>
            </View>
          </View>

          {/* Customers Also Viewed */}
          {customerAlsoViewed.length > 0 && (
            <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 8,
                  color: colors.text,
                }}>
                Customers Also Viewed
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}>
                {customerAlsoViewed.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => router.push(`/product/${item.id}`)}
                    style={{
                      width: 140,
                      marginRight: 14,
                      backgroundColor: colors.surface,
                      borderRadius: 12,
                      overflow: 'hidden',
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 6,
                      elevation: 3,
                    }}>
                    <Image source={{ uri: item.image }} style={{ width: 140, height: 110 }} />
                    <View style={{ padding: 8 }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: colors.text,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: colors.primary,
                          marginTop: 4,
                        }}>
                        GHS {item.price.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>

        {/* Bottom Action Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            borderTopWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}>
          {/* Home Shortcut */}
          <TouchableOpacity
            onPress={() => router.push('/')}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              marginRight: 12,
            }}>
            <Ionicons name="home-outline" size={22} color={colors.primary} />
          </TouchableOpacity>

          {/* Cart Controls */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {cartItem ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={decreaseQty}
                  style={{
                    padding: 6,
                    borderWidth: 1,
                    borderColor: cartItem.quantity > 1 ? colors.border : colors.error,
                    borderRadius: 6,
                    marginRight: 8,
                  }}>
                  <Ionicons
                    name="remove"
                    size={18}
                    color={cartItem.quantity > 1 ? colors.text : colors.error}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: 16, color: colors.text }}>{cartItem.quantity}</Text>

                <TouchableOpacity
                  onPress={increaseQty}
                  style={{
                    padding: 6,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 6,
                    marginLeft: 8,
                  }}>
                  <Ionicons name="add" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleAddToCart}
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}>
                <Text style={{ color: colors.white, fontWeight: '600' }}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Checkout */}
          {cartItem && (
            <TouchableOpacity
              onPress={() => router.push('/checkout')}
              style={{
                marginLeft: 12,
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 28,
                borderRadius: 8,
              }}>
              <Text style={{ color: colors.white, fontWeight: '600' }}>Checkout</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Share Modal */}
        <Modal
          visible={shareModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setShareModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: colors.surface,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}>
              <Text
                style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, color: colors.text }}>
                Share Product
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                  onPress={() => handleShare('whatsapp')}
                  style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
                  <Text style={{ marginTop: 6 }}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleShare('instagram')}
                  style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-instagram" size={28} color="#E1306C" />
                  <Text style={{ marginTop: 6 }}>Instagram</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleShare('snapchat')}
                  style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-snapchat" size={28} color="#FFFC00" />
                  <Text style={{ marginTop: 6 }}>Snapchat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleShare('copy')}
                  style={{ alignItems: 'center' }}>
                  <Ionicons name="link-outline" size={28} color={colors.primary} />
                  <Text style={{ marginTop: 6 }}>Copy Link</Text>
                </TouchableOpacity>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setShareModalVisible(false)}
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  backgroundColor: colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeContainer>
  );
};

export default ProductDetails;
