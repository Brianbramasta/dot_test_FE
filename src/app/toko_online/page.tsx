'use client';
import { useState } from 'react';
import { InputField } from '@/components/InputField/InputField';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './page.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function OnlineStore() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Kemeja Flanel',
      price: 249999,
      description: 'Kemeja flanel premium dengan berbagai pilihan warna',
      image: '/produk/kemeja.png'
    },
    {
      id: '2',
      name: 'Celana Jeans',
      price: 349999,
      description: 'Celana jeans slim fit tahan lama',
      image: '/produk/jeans.png'
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Toko Online</h1>
      
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product.id} className={styles.productItem} >
            <img 
              src={product.image} 
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>Rp {product.price.toLocaleString()}</p>
              <CustomButton 
                onClick={() => addToCart(product)}
                variant="primary"
                style={{marginRight:'12px'}}
              >
                Tambah ke Keranjang
              </CustomButton>
              <CustomButton 
                onClick={() => handleProductClick(product)}
                variant="secondary"
              >
                Detail
              </CustomButton>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>&times;</button>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className={styles.modalImage}
            />
            <h3>{selectedProduct.name}</h3>
            <p className={styles.price}>Rp {selectedProduct.price.toLocaleString()}</p>
            <p className={styles.description}>{selectedProduct.description}</p>
            <CustomButton
              onClick={() => {
                addToCart(selectedProduct);
                closeModal();
              }}
              variant="primary"
            >
              Tambah ke Keranjang
            </CustomButton>
          </div>
        </div>
      )}

      <div className={styles.cartSection}>
        <h2>Keranjang Belanja</h2>
        {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>Keranjang belanja kosong</p>
        ) : (
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <span>{item.name}</span>
                <div className={styles.cartControls}>
                  <span>Qty: {item.quantity}</span>
                  <CustomButton
                    onClick={() => removeFromCart(item.id)}
                    variant="secondary"
                  >
                    Hapus
                  </CustomButton>
                </div>
              </div>
            ))}
            <div className={styles.total}>
              Total: Rp {getTotal().toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}