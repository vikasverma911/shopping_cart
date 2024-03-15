"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/styles/orderconfirm.module.css'

interface PaymentOption {
    method: string;
}

const OrderConfirmation = () => {
    const [totalAmount, setTotalAmount] = useState<string>('');
    const [paymentOption, setPaymentOption] = useState<PaymentOption[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const totalAmountParam = searchParams.get('totalAmount') || '';
        const paymentOptionParam = searchParams.get('paymentOption') || '[]';

        setTotalAmount(totalAmountParam);
        setPaymentOption(JSON.parse(paymentOptionParam) as PaymentOption[]);
    }, []);

    const handleSelectPayment = (method: string) => {
        console.log('Selected payment method:', method);
        // You can perform further actions here, such as setting the selected payment method in state
    };

    return (
        <div className={styles.home}>
            <h1 className={styles.cartHead}>Order Confirmation</h1>

            {paymentOption.map((method, index) => (
                <div key={index} className={styles.cartCard}>

                    <div className={styles.s1}>
                        <h3>{method.method}</h3>
                    </div>

                    <div className={styles.s1}>
                        <svg
                            onClick={() => {
                                handleSelectPayment(method.method)
                            }}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>

                </div>
            ))}

            <div className={styles.amt}>Total Amount: ${totalAmount}</div>
            <button >Pay</button>
        </div>
    );
};

export default OrderConfirmation;
    