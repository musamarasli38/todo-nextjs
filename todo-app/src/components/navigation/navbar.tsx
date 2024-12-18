import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { GiHamburgerMenu } from "react-icons/gi";

export function Navbar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <Menubar className="flex flex-col gap-4">
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2 text-white hover:bg-slate-600 p-2 rounded-lg">
            <GiHamburgerMenu /> Menu
          </MenubarTrigger>
          <MenubarContent className="bg-slate-700 rounded-md text-white">
            <MenubarItem className="hover:bg-slate-600 p-2 rounded-md">
              Register
            </MenubarItem>
            <MenubarItem className="hover:bg-slate-600 p-2 rounded-md">
              About
            </MenubarItem>
            <MenubarItem className="hover:bg-slate-600 p-2 rounded-md">
              Tasks
            </MenubarItem>
            <MenubarItem className="hover:bg-slate-600 p-2 rounded-md">
              Login
            </MenubarItem>
            <MenubarItem className="hover:bg-slate-600 p-2 rounded-md">
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
