
import { auth } from "@/lib/auth";
import { Bars, Bell, CloudGear, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";


export async function DashboardSibebar() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;
    // console.log("user", user);
    // const role = session?.role;
    // console.log('role', role)

    const dashboardItems = {
        buyer: [
            { icon: House, label: "Buyer", link: "/dashboard/buyer" },
            { icon: Magnifier, label: "Buy Information", link: "/dashboard/produclist" },
            { icon: Bell, label: "Buyer Reasiction", link: '/dashboard/transiction' },
        ],
        seller: [
            { icon: House, label: "Seller", link: "/dashboard/seller" },
            { icon: Magnifier, label: "Products", link: '/dashboard/products' },
            { icon: Bell, label: "Notifications" },
            { icon: Envelope, label: "Messages" },
            { icon: Person, label: "Profile" },
            { icon: Gear, label: "Settings" },
        ],
        admin: [
            { icon: House, label: "Admin", link: "/dashboard/admin" },
            { icon: Magnifier, label: "Search" },
            { icon: Bell, label: "Notifications" },
            { icon: Envelope, label: "Messages" },
            { icon: Person, label: "Profile" },
            { icon: Gear, label: "Settings" },
        ]
    };

    const navItems = dashboardItems[user?.role];

    // const navItems = [
    //     { icon: House, label: "Home" },
    //     { icon: Magnifier, label: "Search" },
    //     { icon: Bell, label: "Notifications" },
    //     { icon: Envelope, label: "Messages" },
    //     { icon: Person, label: "Profile" },
    //     { icon: Gear, label: "Settings" },
    // ];

    return (
        <Drawer>
            <Button variant="secondary" className='block md:hidden'>
                <Bars />
                Menu
            </Button>
            <nav className="flex flex-col gap-1 w-[300px] border border-right-2">

                <Image
                    src={'/logo-xl.png'} alt="Logo"
                    width={50}
                    height={50}
                    className=" h-10 w-full"
                />

                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        type="button"
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                        type="button"
                                    >
                                        <item.icon className="size-5 text-muted" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}