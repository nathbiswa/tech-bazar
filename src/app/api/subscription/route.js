import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth';
import { metadata } from '@/app/layout';
import { email } from 'better-auth';
import { use } from 'react';
import { stripe } from '@/lib/stripe';

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userSession = await auth.api.getSession({
            headers: await headers()
        })
        const user = userSession?.user;
        const PRICE_ID = 'price_1TjBxaP7aA1D1GSJ77LEHivr'
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                priceId: PRICE_ID,
                userId: user.id,
                email: user.email
            },
            mode: 'subscription',
            success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}