import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import buttons from './tabs.module.scss';

const Tabs = ({ filterPrice, filterFast, fastState, priceState }) => {
  return (
    <ul className={buttons.tabs__list}>
      <li className={buttons.tabs__item}>
        <button
          className={priceState ? `${buttons.tabs__button} ${buttons.tabs__button__active}` : buttons.tabs__button}
          onClick={filterPrice}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
      </li>
      <li className={buttons.tabs__item}>
        <button
          className={fastState ? `${buttons.tabs__button} ${buttons.tabs__button__active}` : buttons.tabs__button}
          onClick={filterFast}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </li>
      <li className={buttons.tabs__item}>
        <button className={buttons.tabs__button} disabled>
          ОПТИМАЛЬНЫЙ
        </button>
      </li>
    </ul>
  );
};
const mapStateToProps = (state) => {
  return {
    fastState: state.fastState,
    priceState: state.priceState,
  };
};
export default connect(mapStateToProps, actions)(Tabs);
