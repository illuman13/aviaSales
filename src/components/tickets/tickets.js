import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Loader from '../loader';
import * as actions from '../actions';
import S7Image from '../app/S7 Logo.png';

import ticket from './sort.module.scss';

const Tickets = ({ filter, firstArr, asyncAvia, loader }) => {
  const [next, setNext] = useState(5);
  const filterArr = () => {
    if (!filter.length) return null;
    let arrContainer = [];
    for (let i = 0; i < filter.length; i++) {
      let getFilters = firstArr.filter((item) => {
        if (item.segments[0].stops.length === Number(filter[i]) && item.segments[1].stops.length === Number(filter[i]))
          return item;
      });
      arrContainer.push(...getFilters);
    }
    return arrContainer;
  };
  useEffect(() => {
    filterArr();
  }, [filter]);
  useEffect(() => {
    asyncAvia();
  }, []);
  const getTimeFromMin = (min) => {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    if (minutes < 10) minutes = `0${minutes}`;
    return hours + 'ч ' + (minutes !== '00' ? minutes + 'м' : '');
  };
  const routeTime = (arr) => {
    const dateNow = `${new Date(arr.date).getHours()}:${new Date(arr.date).getMinutes()}`;
    const dateAfter = `${new Date(new Date(arr.date).getTime() + arr.duration * 6000).getHours()}:${new Date(
      new Date(arr.date).getTime() + arr.duration * 6000
    ).getMinutes()}`;
    return `${dateNow} - ${dateAfter}`;
  };
  const el = () => {
    if (!filterArr()) return <h2 className={ticket.notFound}>Рейсов, подходящих под заданные фильтры, не найдено</h2>;
    return filterArr()
      .slice(0, next)
      .map(({ segments, price }, index) => {
        return (
          <div key={index * 100}>
            <div className={ticket.tickets}>
              <div className={ticket.tickets__price}>
                <span className={ticket.price}>{`${price.toLocaleString()} P`}</span>
                <img className={ticket.s7} src={S7Image} alt="" />
              </div>
              <p className={ticket.tickets__description}>
                <span>
                  <span className={ticket.route}>
                    {segments[0].origin} - {segments[0].destination}
                  </span>
                  <br />
                  {routeTime(segments[0])}
                </span>
                <span>
                  <span className={ticket.route}>В ПУТИ</span>
                  <br />
                  {getTimeFromMin(segments[0].duration)}
                </span>
                <span>
                  <span className={ticket.route}>
                    {segments[0].stops.length ? `${segments[0].stops.length} пересадки` : 'без пересадок'}
                  </span>
                  <br />
                  {segments[0].stops.join(',')}
                </span>
              </p>
              <p className={ticket.tickets__description}>
                <span>
                  <span className={ticket.route}>
                    {segments[1].origin} - {segments[1].destination}
                  </span>
                  <br />
                  {routeTime(segments[0])}
                </span>
                <span>
                  <span className={ticket.route}>В ПУТИ</span>
                  <br />
                  {getTimeFromMin(segments[1].duration)}
                </span>
                <span>
                  <span className={ticket.route}>
                    {segments[1].stops.length ? `${segments[1].stops.length} пересадки` : 'без пересадок'}
                  </span>
                  <br />
                  {segments[1].stops.join(',')}
                </span>
              </p>
            </div>
            {index === next - 1 ? (
              <div className={ticket.more}>
                <button className={ticket.more__button} onClick={() => setNext((s) => s + 5)}>
                  ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
                </button>
              </div>
            ) : null}
          </div>
        );
      });
  };
  const loading = !loader ? <Loader /> : null;
  return (
    <>
      {loading}
      {el()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    filter: state.filterNumber,
    firstArr: state.arrF,
    loader: state.loader,
  };
};
export default connect(mapStateToProps, actions)(Tickets);
