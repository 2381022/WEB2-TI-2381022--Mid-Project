import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Product", to: "/product" },
  { name: "Recipes", to: "/recipes" },
  { name: "Todo", to: "/todo" },
  { name: "Post", to: "/posts" },
  { name: "Comments", to: "/comments" },
];

function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-[#403D94] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="hover:bg-[#444370] p-2 rounded-lg focus:bg-[#212142]">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </button>
            <div className="hidden sm:flex space-x-4">
              {navigation.map((item) => (
                <NavLink
                  to={item.to}
                  key={item.name}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? "bg-[#212142] text-white" : "text-gray-300 hover:bg-[#444370] hover:text-white",
                      "rounded-lg px-3 py-2 text-sm font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative rounded-lg bg-[#444370] p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white">
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-lg bg-[#444370] text-sm focus:ring-2 focus:ring-white">
                <img
                  alt="Profile"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;