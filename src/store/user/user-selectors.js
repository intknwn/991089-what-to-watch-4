import NameSpace from '../namespace.js';

export const getAuthStatus = (state) => state[NameSpace.USER].authStatus;

export const getUser = (state) => state[NameSpace.USER].user;

