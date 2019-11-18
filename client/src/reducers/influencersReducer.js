import { FETCHED_INFLUENTIAL_MEMBERS } from "../actions/types";

const initialState = {
  influencers: []
};

const influencer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_INFLUENTIAL_MEMBERS:
      return {
        influencers: action.payload.data
      };
    default:
      return state;
  }
};

export default influencer;
