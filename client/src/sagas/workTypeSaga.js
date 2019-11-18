import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { GET_WORK_TYPES } from "../actions/types";
import { fetchedWorkTypes } from "../actions/workTypeAction";

function* GetWorkTypes() {
  try {
    const response = yield axios.get(`/api/worktypes`);

    //for testing
    //const response = { data: [{ "id": 1, "worktype": "Poem" }, { "id": 2, "worktype": "Lyrics" }, { "id": 3, "worktype": "Essay" }] };
    
    yield put(fetchedWorkTypes(response.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* GetWorkTypesWatcher() {
  yield takeLatest(GET_WORK_TYPES, GetWorkTypes);
}
