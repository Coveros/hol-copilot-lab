// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address;
}

// Address interface
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  id: string
  name: string
  price: number
  description?: string
  image?: string
  category?: string
}