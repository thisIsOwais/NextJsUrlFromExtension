// pages/page.tsx
"use client";
// pages/page.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiLink } from 'react-icons/fi'; // Import an icon from react-icons package
import styles from './page.module.css'

const Page: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://chromeextension-firebase-api.onrender.com/read/test')
      .then(response => {
        setData(response.data.filter((item: string | null) => item && item.startsWith('http')));
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Links</h1>
      <ul className={styles.list}>
        {data.map((url, index) => (
          <li key={index} className={styles.listItem}>
            <div className={styles.linkContainer}>
              <FiLink className={styles.linkIcon} />
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {url}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;