import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  GET_USER_INFO,
  FETCHED_USER_INFO,
  FETCHED_USER_PARTNERS,
  GET_USER_FOLLOWERS,
  FETCHED_USER_FOLLOWERS,
  ERROR_OCCUR,
  FETHCED_OTHER_USER_INFO,
  GET_OTHER_USER_INFO
} from "../actions/types";

function callUserInfoApi() {
  return axios.get("/api/user");
}

function* getUserInfo() {
  try {
    const infoResponse = yield call(callUserInfoApi);

    //for testing

    // const infoResponse = {
    //   data: [{
    //     "id": 1, "first_name": "Evin", "last_name": "Luiz", "email": "evin@eycon.com", "phone": "619-394-1367", "last_login": null, "school": "San Diego State Univrsity", "location": "San Diego", "profession": "Artist", "updated_at": "2019-09-26T01:07:28.317Z", "dob": null, "currentuser": 1, "bio": "Artist living in san diego", "followed": 0, "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "coverpic": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--100619f119c33a6eb5965c1ad8690cdf7ef17ff5/images%20(1).jfif"
    //   }]
    // };

    yield put({ type: FETCHED_USER_INFO, payload: infoResponse });
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

export function* userInfoWatcher() {
  yield takeLatest(GET_USER_INFO, getUserInfo);
}

// User followers saga
function callUserFollowersApi() {
  return axios.get("/api/influencers");  
  
  //for testing
  // return {
  //   data: [{ "id": 1, "first_name": "Evin", "last_name": "Luiz", "email": "evin@eycon.com", "phone": "619-394-1367", "last_login": null, "school": "San Diego State Univrsity", "location": "San Diego", "profession": "Artist", "updated_at": "2019-09-26T01:07:28.317Z", "dob": null, "currentuser": 1, "bio": "Artist living in san diego", "followed": 0, "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "coverpic": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--100619f119c33a6eb5965c1ad8690cdf7ef17ff5/images%20(1).jfif" }, { "id": 2, "first_name": "Test1", "last_name": "one", "email": "test1@eycon.com", "phone": "619-394-1366", "last_login": null, "school": "San Jose State university", "location": "San Jose", "profession": "Artist", "updated_at": "2019-08-25T17:42:42.315Z", "dob": null, "currentuser": 0, "bio": "Artist living in san jose", "followed": 0, "avatar": null, "coverpic": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--89794f31d7dab3197c84b4e3fc28c6625b322919/ef47afc50eb7dd1469035a9ea3c7f850-644x351.jpg" }, { "id": 3, "first_name": "J. K. Rowling", "last_name": "two", "email": "test2@eycon.com", "phone": "", "last_login": null, "school": "", "location": "London", "profession": "Artist", "updated_at": "2019-09-20T19:31:19.080Z", "dob": null, "currentuser": 0, "bio": "Writer and Playwright ", "followed": 0, "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg", "coverpic": null }, { "id": 4, "first_name": "Sandesh", "last_name": "Nataraj", "email": "snataraj@eycon.com", "phone": "6193941366", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-08-28T15:16:25.221Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75fbba2c3150f1086e891913dea010b855265f7a/John%20Green%20.jpg", "coverpic": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0339b80224404d8b4165e54cefa2feef33013c0c/elements-of-art-6.jpg" }, { "id": 5, "first_name": null, "last_name": null, "email": "t@eycon.com", "phone": "1234", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-08-28T15:23:37.831Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }, { "id": 6, "first_name": null, "last_name": null, "email": "tt@eycon.com", "phone": "1234", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-08-28T15:30:35.267Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }, { "id": 7, "first_name": null, "last_name": null, "email": "ts@eycon.com", "phone": "123", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-08-28T15:41:59.691Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }, { "id": 8, "first_name": null, "last_name": null, "email": "hegen@smart-mail.top", "phone": "9961991753", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-08-28T15:54:27.796Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }, { "id": 9, "first_name": null, "last_name": null, "email": "sandeshb.nataraj@gmail.com", "phone": "6193941366", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-09-11T04:20:35.291Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }, { "id": 10, "first_name": null, "last_name": null, "email": "sand@eycon.com", "phone": "6193941366", "last_login": null, "school": null, "location": null, "profession": null, "updated_at": "2019-09-11T04:39:10.104Z", "dob": null, "currentuser": 0, "bio": null, "followed": 0, "avatar": null, "coverpic": null }]
  // };
}
function* getUserFollowers() {
  try {
    const followersResponse = yield call(callUserFollowersApi);

    yield put({ type: FETCHED_USER_FOLLOWERS, payload: followersResponse });
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}
export function* userFollowerWatcher() {
  yield takeLatest(GET_USER_FOLLOWERS, getUserFollowers);
}

// User partners saga
function callUserPartnersApi() {
  return axios.get("/api/partners");

}
function* getPartners() {
  try {
    const partnersResponse = yield call(callUserPartnersApi);
    yield put({ type: FETCHED_USER_PARTNERS, payload: partnersResponse });
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}
export function* userPartnerWatcher() {
  yield takeLatest("callUserPartnersApi", getPartners);
}

function* getOtherUserInfo(action) {
  try {
    const infoResponse = yield axios.get(
      "/api/otheruser/" + action.user_id + "/"
    );
    yield put({ type: FETHCED_OTHER_USER_INFO, payload: infoResponse });
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

export function* otherUserInfoWatcher() {
  yield takeLatest(GET_OTHER_USER_INFO, getOtherUserInfo);
}
