import { atom } from "recoil";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const userState = atom<any>({
  key: "userState",
  default: null,
});

export const driverState = atom<any>({
  key: "driverState",
  default: null,
});

export const searchRideState = atom<any>({
  key: "searchRideState",
  default: null,
});

export const isDriverState = atom<boolean>({
  key: "isDriverState",
  default: false,
});

export const selectedRideState = atom({
  key: "selectedRideState",
  default: null,
});

export const reservationState = atom({
  key: "reservationState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
