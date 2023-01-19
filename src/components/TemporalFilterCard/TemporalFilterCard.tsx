import React, { FC } from 'react';
import styles from './TemporalFilterCard.module.css';

interface TemporalFilterCardProps {}

const TemporalFilterCard: FC<TemporalFilterCardProps> = () => (
  <div className={styles.TemporalFilterCard} data-testid="TemporalFilterCard">
    TemporalFilterCard Component
  </div>
);

export default TemporalFilterCard;
