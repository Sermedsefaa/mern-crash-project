import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),
  createProduct: async (newProduct) => {
    console.log('🚀 Creating product:', newProduct);
    
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      console.log('❌ Validation failed: Missing fields');
      return {success: false, message: 'Please fill in all fields'};
    }
    
    try {
      console.log('📡 Sending API request...');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
      });
      
      console.log('📡 API Response status:', res.status);
      const data = await res.json();
      console.log('📡 API Response data:', data);
      
      if (res.ok) {
        set((state) => ({products: [...state.products, data.data]}));
        console.log('✅ Product created successfully');
        return {success: true, message: 'Product created successfully!'};
      } else {
        console.log('❌ API Error:', data.message);
        return {success: false, message: data.message || 'Failed to create product'};
      }
    } catch (error) {
      console.error('💥 Network error:', error);
      return {success: false, message: 'Connection error'};
    }
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data.data});
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, { 
    method: 'DELETE' 
});
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message};
    // update the ui immediately, without a refetch 
    set((state) => ({ products: state.products.filter((p) => p._id !== pid) }));
    return { success: true, message: data.message };
    
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"    
    },
    body: JSON.stringify(updateProduct)
});
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message};
    // update the ui immediately, without a refetch
    set((state) => ({
        products:state.products.map ((product) => product._id === pid ? data.data : product),
    }));
    return { success: true, message: data.message };
  },
}));
