import React, { FC } from 'react';
import styles from './FilterSummaryCard.module.css';

interface FilterSummaryCardProps {}

const FilterSummaryCard: FC<FilterSummaryCardProps> = () => (
  <div className={styles.FilterSummaryCard} data-testid="FilterSummaryCard">
    FilterSummaryCard Component
  </div>
);

export default FilterSummaryCard;
