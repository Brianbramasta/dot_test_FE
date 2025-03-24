'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      
      {user && (
        <div className={styles.content}>
          <p className={styles.welcome}>Welcome {user.email}</p>
          
          <div className={styles.buttonGroup}>
            <Link href="/task_management" className={styles.link}>
              <CustomButton variant="primary">
                Task Management
              </CustomButton>
            </Link>
            
            <Link href="/toko_online" className={styles.link}>
              <CustomButton variant="primary">
                Toko Online
              </CustomButton>
            </Link>
            
            
          </div>
          <div className={styles.buttonGroup} style={{marginTop:'20px'}}>
            <CustomButton 
                onClick={logout} 
                variant="secondary"
            >
                Logout
            </CustomButton>
            </div>
          
          
        </div>
      )}
      
    
      
    </div>
  );
}