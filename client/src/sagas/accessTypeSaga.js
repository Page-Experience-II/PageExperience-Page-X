import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { GET_ACCESS_TYPES } from "../actions/types";
import { fetchedAccessTypes } from "../actions/accessTypeAction";

function* GetAccessTypes() {
  try {
    const response = yield axios.get(`/api/accesstypes`);

    //for testing

    //const response = { data: [{ "id": 1, "accesstype": "Public" }, { "id": 2, "accesstype": "Restricted" }] };
    yield put(fetchedAccessTypes(response.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* GetAccessTypesWatcher() {
  yield takeLatest(GET_ACCESS_TYPES, GetAccessTypes);
}
