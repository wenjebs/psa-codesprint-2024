import * as React from "react";
import { Menu } from "@headlessui/react";

export const DropdownMenu = ({ children }) => (
  <Menu as="div" className="relative inline-block text-left">
    {children}
  </Menu>
);

export const DropdownMenuTrigger = ({ children }) => (
  <Menu.Button>{children}</Menu.Button>
);

export const DropdownMenuContent = ({ children }) => (
  <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    {children}
  </Menu.Items>
);

export const DropdownMenuItem = ({ children }) => (
  <Menu.Item>
    {({ active }) => (
      <div className={`${
        active ? "bg-gray-100" : ""
      } block w-full text-left px-4 py-2 text-sm`}>
        {children}
      </div>
    )}
  </Menu.Item>
);
