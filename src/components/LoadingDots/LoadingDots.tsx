import React, { FC } from 'react';
import styles from './LoadingDots.module.css';

interface LoadingDotsProps {}

const LoadingDots: FC<LoadingDotsProps> = () => (
  <div className={styles.LoadingDots} data-testid="LoadingDots">
    LoadingDots Component
  </div>
);

export default LoadingDots;
