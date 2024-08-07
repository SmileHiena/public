import { createSlice } from '@reduxjs/toolkit';

// Hàm để load giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (e) {
        console.warn('Lỗi khi tải giỏ hàng từ localStorage', e);
        return [];
    }
};

// Hàm để lưu giỏ hàng vào localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.warn('Lỗi khi lưu giỏ hàng vào localStorage', e);
    }
};

const initialState = {
    items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item._id === action.payload.item._id);

            if (existingItem) {
                existingItem.quantity = Number(existingItem.quantity) + Number(action.payload.quantity);
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }

            saveCartToLocalStorage(state.items); // Lưu giỏ hàng vào localStorage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
            saveCartToLocalStorage(state.items); // Lưu giỏ hàng vào localStorage
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload._id);

            if (item) {
                item.quantity = action.payload.quantity;
            }

            saveCartToLocalStorage(state.items); // Lưu giỏ hàng vào localStorage
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items); // Lưu giỏ hàng vào localStorage
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
