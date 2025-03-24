'use client';
import { useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { InputField } from '@/components/InputField/InputField';
import styles from './page.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      setError('');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal melakukan login');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        
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

        <CustomButton
          type="submit"
          variant="primary"
          style={{ marginTop: '1rem', width:'100%' }}
        >
          Masuk
        </CustomButton>

        <Link href="/register" style={{ }}>
              <CustomButton variant="secondary" style={{marginTop:'12px' ,width:'100%'}}>
                Register
              </CustomButton>
        </Link>
      </form>
    </div>
  );
}