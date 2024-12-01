"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import {
	ChevronsLeftRightEllipsisIcon,
	CircleSlash2Icon,
	Home,
	Inbox,
	Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Layout({ children }) {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean);
	const adminItems = [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: Home,
		},
		{
			title: "Students",
			url: "/admin/students",
			icon: Inbox,
		},
		{
			title: "Class",
			url: "/admin/class",
			icon: CircleSlash2Icon,
		},
		{
			title: "Approval",
			url: "approval",
			icon: ChevronsLeftRightEllipsisIcon,
		},
		{
			title: "Settings",
			url: "settings",
			icon: Settings,
		},
	];
	return (
		<SidebarProvider className="dark w-full">
			<AppSidebar items={adminItems} />

			<main className="w-[100%]">
				<SidebarTrigger />

				{/* breadcrumbs here */}
				<nav
					aria-label="breadcrumb"
					className="m-4 bg-gray-900 text-white">
					<ol className="flex space-x-2 text-sm text-gray-500">
						<>
							{pathSegments.map((segment, index) => {
								const isLast = index === pathSegments.length - 1;
								const url = "/" + pathSegments.slice(0, index + 1).join("/");
								return (
									<li key={url}>
										{isLast ? (
											<span className="text-white hover:text-gray-300 ">
												{segment}
											</span>
										) : (
											<Link
												href="/admin/dashboard"
												className="text-white hover:text-gray-300">
												{segment.replace("-", "")}
											</Link>
										)}
										{!isLast && (
											<span className="mx-2 text-white hover:text-gray-300">
												/
											</span>
										)}
									</li>
								);
							})}
						</>
					</ol>
				</nav>

				<div className="m-12">{children}</div>
			</main>
		</SidebarProvider>
	);
}
