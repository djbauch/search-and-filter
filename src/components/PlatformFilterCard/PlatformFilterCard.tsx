import React, { FC } from 'react';
import styles from './PlatformFilterCard.module.css';

interface PlatformFilterCardProps {}

const PlatformFilterCard: FC<PlatformFilterCardProps> = () => (
  <div className={styles.PlatformFilterCard} data-testid="PlatformFilterCard">
    PlatformFilterCard Component
  </div>
);

export default PlatformFilterCard;
