import React, { FC } from 'react';
import styles from './FunctionFilterCard.module.css';
import { UncontrolledTooltip, Button, Card, Container, Col, Form, Label, Row, CardBody } from 'reactstrap'
import JEMSIAFCardHeader from '../../components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CardDropdown from '../../components/CardDropdown/CardDropdown'
import { getFunctionalOpts } from 'services/filter'
//import 'react-widgets/styles.css'
import { FuncItemType, FuncStateType } from 'typings/sharedTypes'

import { MDBSwitch } from 'mdb-react-ui-kit'
import FalconCloseButton from '../../components/common/FalconCloseButton'

export const filterId = 'func'
export const funcEventAdd = 'funcEventAdd'
export const funcEventRemove = 'funcEventRemove'
export const funcEventDropdown = 'funcEventDropdown'
export const funcEventFilterSwitch = 'funcEventFilterSwitch'
interface FunctionFilterCardProps {}

const FunctionFilterCard: FC<FunctionFilterCardProps> = () => (
  <div className={styles.FunctionFilterCard} data-testid="FunctionFilterCard">
    FunctionFilterCard Component
  </div>
);

export default FunctionFilterCard;
