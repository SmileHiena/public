import { configureStore } from '@reduxjs/toolkit';
import userSlice, { setUserFromLocalStorage } from './slices/userSlices'; // Thêm import setUserFromLocalStorage
import cartSlice from './slices/cartSlice';

// Tạo store mà không cần preloadedState
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

// Đăng ký cập nhật trạng thái vào localStorage chỉ trên client-side
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  });

  // Nếu có dữ liệu người dùng trong localStorage, thiết lập trạng thái người dùng
  const user = localStorage.getItem('user');
  if (user) {
    store.dispatch(setUserFromLocalStorage(JSON.parse(user)));
  }
}