import { fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();

const initialState = {
  user: userInfo,
};

export { initialState };
