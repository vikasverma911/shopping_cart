"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/cart.module.css'
import Link from 'next/link';
import Image from 'next/image'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface PaymentMethod {
  method: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
      const data = await response.json();
      setProducts(data.products);
      setPaymentMethods(data.paymentMethods.map((method: string) => ({ method })));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    const paymentOption = JSON.stringify(paymentMethods); // Replace with the actual payment option

    // Redirect to the order confirmation page with order details, total amount, and payment option
    window.location.href = `/orderconfirmation?totalAmount=${totalAmount}&paymentOption=${paymentOption}`;
  };


  const incremntCartItem = (index: number) => {
    let tempCartItems = products.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  const decrementCartItem = (index: number) => {
    let tempCartItems = products.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
  const removeCartItem = (index: number) => {
    let tempCartItems = [...products];
    tempCartItems.splice(index, 1);
  }

  return (
    <div>
      <h1 className={styles.cartHead}>Cart</h1>
      {
        products.length === 0 ? <h1 className={styles.emptyCart}>Cart is empty</h1> : null
      }

      <div>
        {products.map(product => (
          <div key={product.id} className={styles.cartCard}>

            <div className={styles.s1}>
              <Image src={product.image} alt={product.title} width={200} height={200} />
              <h3>{product.title}</h3>
            </div>

            <div className={styles.s1}>
              <h2>${product.price * product.quantity}</h2>
              <div className={styles.incredecre}>
                <button
                  onClick={() => {
                    decrementCartItem(product.id)
                  }}
                >-</button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => {
                    incremntCartItem(product.id)
                  }}
                >+</button>
              </div>
              <svg
                onClick={() => {
                  removeCartItem(product.id)
                }}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>


      <div className={styles.home}>
        {
          products.length > 0 && (
            <div>
              <h1>Order Summary</h1>
              <div className={styles.amt}>Total: ${calculateTotal()}</div>
              <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          )
        }
      </div>

      
    </div>
  );
};

export default ProductList;
