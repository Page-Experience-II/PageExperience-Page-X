import axios from "axios";

export function peopleSearch(params) {
  return axios({
    method: "get",
    url: "/api/searchusers",
    params: params
  });
}
export function publicationSearch(params) {
  return axios({
    method: "get",
    url: "/api/searchpublications",
    params: params
  });
}
