import { DashboardSibebar } from "@/components/dashboard/DashboardSibebar";


export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 overflow-hidden">

                <div><DashboardSibebar /></div>
                <div className="flex-1 overflow-y-hidden">
                    <div className="w-full border border-red-500">Navabr</div>
                    <main className="m-4">

                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
