import { getBeURL, getLocalRefreshToken, networkHandler } from '@/utils';
import axios, { AxiosResponse } from 'axios';

function login(payload: any) {
    return networkHandler.post<unknown, AxiosResponse<any>, unknown>(getBeURL('/authentication/oauth/token'), { ...payload })?.then((rp) => rp.data);
}

function refreshToken(token?: string) {
    return axios.get(getBeURL(`/authentication/refresh-token`), {
        headers: { Authorization: 'Bearer ' + (token ?? getLocalRefreshToken()) },
    });
}

function getUserByToken() {
    return networkHandler.get<unknown, AxiosResponse<any>, unknown>(getBeURL('/account/me')).then((rp) => rp.data);
}

function resetPassword(payload: any) {
    return networkHandler.put<unknown, AxiosResponse<any>, unknown>(getBeURL('/account/password/reset'), { ...payload }).then((rp) => rp.data);
}

const api = { login, refreshToken, getUserByToken, resetPassword };

export default api;
