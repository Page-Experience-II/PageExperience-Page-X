import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import isEmpty from "lodash/isEmpty";

import Attachment from "../components/generic/Attachment";
import {
  getUserPublications,
  clearUserPublication,
  postedPublication
} from "../actions/userPublicationAction";

import {
  ERROR_OCCUR,
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
  FETCHING_LIKED_USERS,
  FETCHING_PROMOTED_USERS,
  FETCHED_LIKED_USERS,
  FETCHED_PROMOTED_USERS,
  NO_MORE_PROMOTED_USERS,
  NO_MORE_LIKED_USERS,
  FETCH_PROMOTED_USERS,
  FETCH_LIKED_USERS,
  FETCHING_OTHER_USER_PUBLICATIONS,
  GET_OTHER_USER_PUBLICATIONS,
  NO_MORE_OTHER_USER_PUBLICATIONS,
  FETCHED_OTHER_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS_ON_SCROLLING,
  FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING
} from "../actions/types";

// posting user publication saga
function* postPublication(action) {
  try {
    const {
      attachment,
      text,
      workType,
      accessType,
      publicationType,
      subject,
      update,
      works,
      isManuscript
    } = action.data;
    const isImage = attachment && Attachment.isImage(attachment);
    const isVideo = attachment && !isImage && Attachment.isVideo(attachment);
    const isDocument = attachment && !isImage && !isVideo;

    const params = {
      post: attachment,
      publication_img: isImage ? "1" : "0",
      publication_vid: isVideo ? "1" : "0",
      publication_doc: isDocument ? "1" : "0",
      publication_text: text,
      publication_subject: subject,
      work_type: workType ? workType.id : null,
      access: accessType ? accessType.id : 1,
      publication_type: isManuscript ? 3 :
        (workType ? ((workType.worktype === "Piece" || workType.worktype === "Opinion") ? 1 :
          (publicationType === "work" ? 2 : 1)) :
          (publicationType === "work" ? 2 : 1))
    };

    let post = params;
    if (params.post) {
      // if there's an attachment - send form-data request
      post = new FormData();
      Object.keys(params).forEach(param => post.append(param, params[param]));
    }

    yield axios.post("/api/publish", post);
    if (isManuscript) {
      document.getElementById("divalert").innerText = "Manuscript saved!";
      document.getElementById("divalert").style.display = "block";
      setTimeout(() => {
        document.getElementById("divalert").style.display = "none";
      }, 3000);
    }

    yield put(postedPublication());
    yield put(clearUserPublication());
    yield put(getUserPublications());
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_USER_PUBLICATIONS });
    const pubResponse = yield axios.get("/api/userspublications", {
      params: action.query
    });

    //for testing

    // const pubResponse = {
    //   data: [{"id":37,"publication_text":"\u003cp\u003edoc post\u003c/p\u003e","publication_img":"0","publication_vid":"0","publication_subject":"","post":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBRUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--74a56b29384e4cee18e21721ec59e0686d9ff76e/Agro%20Mercado%20features.docx","user_id":1,"created_at":"2019-10-19T03:32:39.648Z","updated_at":"2019-10-19T03:32:39.655Z","first_name":"Evin","last_name":"Luiz","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg","likes":0,"promote":0,"access":"1","publication_type":"2","work_type":"undefined","liked":1,"promoted":1,"currentuser":1},{"id":36,"publication_text":"\u003cp\u003eimg post\u003c/p\u003e","publication_img":"1","publication_vid":"0","publication_subject":"","post":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBRQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6b96ad6dca54ad970343cd2be059d86766992a13/30d.png","user_id":1,"created_at":"2019-10-19T03:31:59.672Z","updated_at":"2019-10-19T03:31:59.681Z","first_name":"Evin","last_name":"Luiz","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg","likes":0,"promote":0,"access":"1","publication_type":"2","work_type":"undefined","liked":1,"promoted":1,"currentuser":1},{"id":35,"publication_text":"\u003cp\u003evideo post\u003c/p\u003e","publication_img":"0","publication_vid":"1","publication_subject":"","post":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBQdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e3139b2430a82fb362c9bbd87785d01ef4eff329/mov_bbb.mp4","user_id":1,"created_at":"2019-10-19T03:29:37.919Z","updated_at":"2019-10-19T03:29:37.933Z","first_name":"Evin","last_name":"Luiz","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg","likes":0,"promote":0,"access":"1","publication_type":"2","work_type":"undefined","liked":1,"promoted":1,"currentuser":1},{"id":34,"publication_text":"\u003cp\u003ehi\u003c/p\u003e","publication_img":"0","publication_vid":"0","publication_subject":"","post":null,"user_id":1,"created_at":"2019-10-18T05:14:41.301Z","updated_at":"2019-10-18T05:14:41.301Z","first_name":"Evin","last_name":"Luiz","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg","likes":0,"promote":0,"access":"1","publication_type":"3","work_type":null,"liked":1,"promoted":1,"currentuser":1},{"id":33,"publication_text":"\u003cp\u003etest test\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e","publication_img":"0","publication_vid":"0","publication_subject":"","post":null,"user_id":3,"created_at":"2019-10-15T21:29:30.602Z","updated_at":"2019-10-15T21:29:30.602Z","first_name":"J. K. Rowling","last_name":"two","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg","likes":0,"promote":0,"access":"1","publication_type":"2","work_type":null,"liked":1,"promoted":1,"currentuser":1},{"id":32,"publication_text":"\u003cp\u003e\u003cbr\u003e\u003c/p\u003e","publication_img":"0","publication_vid":"0","publication_subject":"","post":null,"user_id":3,"created_at":"2019-10-15T09:27:20.701Z","updated_at":"2019-10-15T09:27:20.701Z","first_name":"J. K. Rowling","last_name":"two","avatar":"http://thepagex.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg","likes":0,"promote":0,"access":"1","publication_type":"2","work_type":null,"liked":1,"promoted":1,"currentuser":1}]
    // };

    if (!isEmpty(pubResponse.data)) {
      if (action.query && action.query.page > 1) {
        yield put({
          type: FETCHED_USER_PUBLICATIONS_ON_SCROLLING,
          payload: pubResponse
        });
      } else {
        yield put({ type: FETCHED_USER_PUBLICATIONS, payload: pubResponse });
      }
    } else {
      yield put({ type: NO_MORE_USER_PUBLICATIONS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getLikedUsers(action) {
  try {
    yield put({ type: FETCHING_LIKED_USERS });
    const pubResponse = yield axios.get("/api/likedby/" + action.id, {
      params: action.query
    });

    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_LIKED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_LIKED_USERS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}
function* getPromotedUsers(action) {
  try {
    yield put({ type: FETCHING_PROMOTED_USERS });
    const pubResponse = yield axios.get("/api/promotedby/" + action.id, {
      params: action.query
    });

    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_PROMOTED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_PROMOTED_USERS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getOtherUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_OTHER_USER_PUBLICATIONS });
    const pubResponse = yield axios.get(
      "/api/otheruserpublications/" + action.id + "/",
      {
        params: action.query
      }
    );

    if (!isEmpty(pubResponse.data)) {
      if (action.query && action.query.page > 1) {
        yield put({
          type: FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING,
          payload: pubResponse
        });
      } else {
        yield put({
          type: FETCHED_OTHER_USER_PUBLICATIONS,
          payload: pubResponse
        });
      }
    } else {
      yield put({ type: NO_MORE_OTHER_USER_PUBLICATIONS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

export function* PublishPostWatcher() {
  yield takeLatest(POST_PUBLICATION, postPublication);
}

export function* UserPublicationWatcher() {
  yield takeLatest(GET_USER_PUBLICATIONS, getUserPublicationsWorker);
}

export function* getLikedUserWatcher() {
  yield takeLatest(FETCH_LIKED_USERS, getLikedUsers);
}
export function* getPromotedUserWatcher() {
  yield takeLatest(FETCH_PROMOTED_USERS, getPromotedUsers);
}
export function* otherUserPublicationWatcher() {
  yield takeLatest(GET_OTHER_USER_PUBLICATIONS, getOtherUserPublicationsWorker);
}
