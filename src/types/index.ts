// Types for ZestyBites

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  distance: number;
  priceForTwo: number;
  isFeatured?: boolean;
  offer?: string;
  menu: MenuItem[];
  address: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}
