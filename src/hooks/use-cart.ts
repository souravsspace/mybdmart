import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type ClientProductType } from "@/types/client-product";

export interface Product extends ClientProductType {
  colorId: string;
  sizeId: string;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.product.colorId === product.colorId &&
              item.product.sizeId === product.sizeId,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item === existingItem &&
                item.product.colorId === product.colorId &&
                item.product.sizeId === product.sizeId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (product) =>
        set((state) => {
          const itemToRemove = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.product.colorId === product.colorId &&
              item.product.sizeId === product.sizeId,
          );

          if (itemToRemove && itemToRemove.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item === itemToRemove
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            };
          } else {
            return {
              items: state.items.filter(
                (item) => item.product.id !== product.id,
              ),
            };
          }
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
