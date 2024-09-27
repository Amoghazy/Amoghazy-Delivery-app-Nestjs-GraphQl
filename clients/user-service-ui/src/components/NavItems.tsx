// "use client";
import Link from "next/link";

export default function NavItems() {
  const navItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About us",
      url: "/about",
    },
    {
      title: "Restaurants",
      url: "/restaurants",
    },
    {
      title: "Popular Foods",
      url: "/foods",
    },
    {
      title: "Contact us",
      url: "/contact",
    },
  ];

  return (
    <div>
      <div className=" ">
        {navItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className={`px-5 text-[18px] font-nunito font-[600]
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
