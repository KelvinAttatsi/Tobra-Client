interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  firstName: string;
  lastName: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  shopId: string;
  shopName: string;
}

interface Store {
  id: number;
  name: string;
  image: string;
  rating: number;
  followers: number;
  category: number;
  location: number;
  verified: boolean;
  description: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  shopId: string;
  shopName: string;
  category: string;
}

interface Shop {
  id: string;
  name: string;
  image: string;
  rating: number;
  followers: number;
  category: string;
  location: string;
  verified: boolean;
}

interface Category {
  id: number;
  name: string;
  image: string;
  subcategories: [
    {
      id: number;
      name: string;
      image: string;
    }[],
  ];
  popularTags: string[];
}

interface Address {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  additionalPhoneNumber;
  additinalInformaton: string;
  region: string;
  city: string;
  defaultAdress: boolean;
}
