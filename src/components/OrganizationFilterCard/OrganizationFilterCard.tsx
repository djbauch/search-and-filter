import React, { FC } from 'react';
import styles from './OrganizationFilterCard.module.css';

interface OrganizationFilterCardProps {}

const OrganizationFilterCard: FC<OrganizationFilterCardProps> = () => (
  <div className={styles.OrganizationFilterCard} data-testid="OrganizationFilterCard">
    OrganizationFilterCard Component
  </div>
);

export default OrganizationFilterCard;
