interface MenuItem {
  title: string;
  href: string;
  external: boolean;
}

export const menuItems: MenuItem[] = [
  // { title: "About", href: "/about", external: false },
  { title: "Posts", href: "/posts", external: false },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/hye-k", external: true },
];
