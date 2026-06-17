import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        return (
            <section className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100 transform transition-all">

                    {/* Animated/Beautiful Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
                        <svg
                            className="h-8 w-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                        Payment Successful!
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Thank you for your order. Your transaction was completed successfully.
                    </p>

                    <hr className="border-slate-100 my-6" />

                    {/* Dynamic Details Box */}
                    <div className="bg-slate-50 rounded-xl p-4 text-left mb-8 space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <span>Sent to</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-700 break-all">
                            {customerEmail}
                        </p>
                        <p className="text-xs text-slate-500 pt-1">
                            A confirmation email with your receipt has been dispatched.
                        </p>
                    </div>

                    {/* Support & Next Steps */}
                    <p className="text-xs text-slate-400 mb-8">
                        Have questions or issues? Contact us at{' '}
                        <a
                            href="mailto:orders@example.com"
                            className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors"
                        >
                            orders@example.com
                        </a>
                    </p>

                    {/* Action Button */}
                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors shadow-sm"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </section>
        )
    }
}