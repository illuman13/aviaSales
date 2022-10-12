const initialState = {
  transitOne: true,
  transitTwo: true,
  transitThree: true,
  transitFour: true,
  loader: true,
  all: true,
  filterNumber: ['0', '1', '2', '3'],
  arrF: [],
  priceState: true,
  fastState: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ONE':
      return {
        ...state,
        all: false,
        transitOne: !state.transitOne,
        filterNumber: !state.transitOne
          ? [...state.filterNumber, '0']
          : state.filterNumber.filter((item) => (item !== '0' ? item : null)),
      };
    case 'TWO':
      return {
        ...state,
        all: false,
        transitTwo: !state.transitTwo,
        filterNumber: !state.transitTwo
          ? [...state.filterNumber, '1']
          : state.filterNumber.filter((item) => (item !== '1' ? item : null)),
      };
    case 'THREE':
      return {
        ...state,
        all: false,
        transitThree: !state.transitThree,
        filterNumber: !state.transitThree
          ? [...state.filterNumber, '2']
          : state.filterNumber.filter((item) => (item !== '2' ? item : null)),
      };
    case 'FOUR': {
      return {
        ...state,
        all: false,
        transitFour: !state.transitFour,
        filterNumber: !state.transitFour
          ? [...state.filterNumber, '3']
          : state.filterNumber.filter((item) => (item !== '3' ? item : null)),
      };
    }

    case 'ALL':
      if (state.transitOne && state.transitTwo && state.transitThree && state.transitFour) state.all = true;
      if (!state.all) {
        return {
          ...state,
          transitOne: true,
          transitTwo: true,
          transitThree: true,
          transitFour: true,
          all: true,
          filterNumber: ['0', '1', '2', '3'],
        };
      } else {
        return {
          ...state,
          transitOne: false,
          transitTwo: false,
          transitThree: false,
          transitFour: false,
          all: false,
          filterNumber: [],
        };
      }
    case 'ASYNC':
      return {
        ...state,
        loader: action.bol,
        arrF: action.arr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
      };
    case 'FAST':
      return {
        ...state,
        fastState: true,
        priceState: false,
        arrF: [
          ...state.arrF.sort(
            (a, b) =>
              parseFloat(a.segments[0].duration + a.segments[1].duration) -
              parseFloat(b.segments[0].duration + b.segments[1].duration)
          ),
        ],
      };
    case 'PRICE':
      return {
        ...state,
        priceState: true,
        fastState: false,
        arrF: [...state.arrF.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))],
      };
    default:
      return state;
  }
};
export default reducer;
