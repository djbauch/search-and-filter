import React, { FC } from 'react';
import styles from './TopologicalFilterCard.module.css';

interface TopologicalFilterCardProps {}

const TopologicalFilterCard: FC<TopologicalFilterCardProps> = () => (
  <div className={styles.TopologicalFilterCard} data-testid="TopologicalFilterCard">
    TopologicalFilterCard Component
  </div>
);

export default TopologicalFilterCard;
