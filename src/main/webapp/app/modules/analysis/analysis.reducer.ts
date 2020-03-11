import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import _ from 'lodash';
const apiUrl = 'api/datasets';

export const ACTION_TYPES = {
  // UPLOAD: 'datasets/UPLOAD',
  GET_METAPATHS: 'datasets/GET_METAPATHS'
};

const initialState = {
  error: null as string,
  metapaths: null as any
};

export type AnalysisState = Readonly<typeof initialState>;

// Reducer
export default (state: AnalysisState = initialState, action): AnalysisState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_METAPATHS):
      return state;
    case FAILURE(ACTION_TYPES.GET_METAPATHS): {
      const errorMsg = 'An unexpected error occurred while fetching metapths';
      return {
        ...state,
        error: errorMsg
      };
    }
    case SUCCESS(ACTION_TYPES.GET_METAPATHS): {
      const metapaths = action.payload.data['metapaths'];

      return {
        ...state,
        metapaths
      };
    }

    default:
      return state;
  }
};

// Actions
export const getMetapaths = dataset => ({
  type: ACTION_TYPES.GET_METAPATHS,
  payload: axios.get(`${apiUrl}/metapaths`, {
    params: {
      dataset
    }
  })
});
