
import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addProducts = async (products) => {
    const { data: token } = await authClient.token();
    const res = await fetch(`${baseUrl}/seller/products`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(products)
    });

    const data = await res.json();
    return data;
}