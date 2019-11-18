import axios from "axios";

import { LOGIN, LOGOUT } from "./types";

export const loginAction = data => ({ type: LOGIN, data });

export const signUp = data => axios.post("/api/signup/", data);

export const logout = () => ({ type: LOGOUT });
