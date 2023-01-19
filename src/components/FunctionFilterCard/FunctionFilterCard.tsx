import React, { FC } from 'react';
import styles from './FunctionFilterCard.module.css';

interface FunctionFilterCardProps {}

const FunctionFilterCard: FC<FunctionFilterCardProps> = () => (
  <div className={styles.FunctionFilterCard} data-testid="FunctionFilterCard">
    FunctionFilterCard Component
  </div>
);

export default FunctionFilterCard;
