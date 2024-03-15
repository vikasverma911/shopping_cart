"use client"
import React from 'react'
import styles from '@/styles/navbar.module.css'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const Router = useRouter()
  const Logo = 'https://groww.in/groww-logo-270.png'
  return (
    <div className={styles.navbar}>
      <h1
        onClick={() => Router.push('/')}
      >GROWW</h1>

      <div className={styles.logo}>
        <div>
          <img onClick={() => Router.push('/')} src={Logo} alt="GROWW" className="h-12" />
        </div>
      </div>
    </div>
  )
}

export default Navbar