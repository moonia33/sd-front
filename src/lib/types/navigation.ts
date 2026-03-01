export type NavLink = {
	id: string;
	title: string;
	href: string | null;
	description?: string | null;
	iconName?: string | null;
	children: NavLink[];
};
