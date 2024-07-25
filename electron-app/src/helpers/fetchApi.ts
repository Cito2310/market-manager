import { VARIABLES } from '../VARIABLES';

import axios from 'axios';
interface props {
    method: "get" | "put" | "delete" | "post";
    body?: unknown;
    path: string;
    token?: string;
}

export const fetchApi = async({ method, path, body, token }: props) => {
    const { baseUrl } = VARIABLES;

    const { data } = await axios({
        method: method,
        url: baseUrl + path,
        data: body,
        headers: { token }
    })

    return data;
}