import { atom } from 'recoil';

export const tokenState = atom<string | null>({
    key: 'tokenState',
    default: null,
});

export const userState = atom<any>({
    key: 'userState',
    default: null,
});


export const driverState = atom<any>({
    key: 'driverState',
    default: null,
});