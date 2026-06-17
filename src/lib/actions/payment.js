
"use server"

import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const subscriptions = async (data) => {
    const { data: token } = await authClient.token();
    console.log(token);
    const res = await fetch(`${baseUrl}/subscription`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(data)
    });

    const resData = await res.json();

    return resData;
}