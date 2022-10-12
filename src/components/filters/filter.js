import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import filter from './filter.module.scss';
const Filter = ({
  transitOne,
  transitTwo,
  transitThree,
  transitFour,
  checkOne,
  checkTwo,
  checkThree,
  checkFour,
  checkAll,
}) => {
  const checkedAll = transitOne && transitTwo && transitThree && transitFour;
  return (
    <div className={filter.filter}>
      <div className={filter.filter__list}>
        <p className={filter.filter__label}>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
        <input type="checkbox" checked={checkedAll} onChange={checkAll} id="cb1" /> <label htmlFor="cb1">Все</label>
        <input type="checkbox" checked={transitOne} onChange={checkOne} id="cb2" />
        <label htmlFor="cb2">Без пересадок</label>
        <input type="checkbox" checked={transitTwo} onChange={checkTwo} id="cb3" />
        <label htmlFor="cb3">1 пересадка</label>
        <input type="checkbox" checked={transitThree} onChange={checkThree} id="cb4" />
        <label htmlFor="cb4">2 пересадки</label>
        <input type="checkbox" checked={transitFour} onChange={checkFour} id="cb5" />
        <label htmlFor="cb5">3 пересадки</label>
      </div>
      <div className={filter.contain} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    transitOne: state.transitOne,
    transitTwo: state.transitTwo,
    transitThree: state.transitThree,
    transitFour: state.transitFour,
    all: state.all,
  };
};
export default connect(mapStateToProps, actions)(Filter);
