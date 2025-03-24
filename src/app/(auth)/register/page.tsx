'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { InputField } from '@/components/InputField/InputField';
import styles from './page.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error('Password tidak sesuai');
      }
      await auth.register(email, password);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Registrasi</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}

        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          style={{marginBottom:'12px'}}
          required
        />
        
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={{marginBottom:'12px'}}
          required
        />

        <InputField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Konfirmasi Password"
          type="password"
          style={{marginBottom:'12px'}}
          required
        />

        <CustomButton
          type="submit"
          variant="primary"
          style={{ marginTop: '1rem', width:'100%' }}
        >
          Daftar
        </CustomButton>

        <Link href="/login" >
        <CustomButton variant="secondary" style={{marginTop:'12px' ,width:'100%'}}>
                Login
              </CustomButton>
        </Link>
      </form>
    </div>
  );
}