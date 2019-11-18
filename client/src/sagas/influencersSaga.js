import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
  GET_INFLUENTIAL_MEMBERS,
  FETCHED_INFLUENTIAL_MEMBERS
} from "../actions/types";

function callUserInfluencer() {
  return axios.get("/api/influencers");
}
function* GetInfluencers() {
  try {
    const influencersRes = yield call(callUserInfluencer);
    yield put({ type: FETCHED_INFLUENTIAL_MEMBERS, payload: influencersRes });
  } catch (error) {
    console.warn(error);
  }
}

export function* InfluencersWatcher() {
  yield takeLatest(GET_INFLUENTIAL_MEMBERS, GetInfluencers);
}
