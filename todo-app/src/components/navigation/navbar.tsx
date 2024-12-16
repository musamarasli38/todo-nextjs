import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MenubarContent, MenubarItem } from "@radix-ui/react-menubar";
import { Sidebar } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
export function Navbar() {
  return (
    <div>
      <Sidebar>
        <Menubar className="static justify-evenly">
          <MenubarMenu>
            <h1 className="text-3xl text-center">Todo App</h1>

            <MenubarTrigger>
              Menu &nbsp; <GiHamburgerMenu />
            </MenubarTrigger>
            <MenubarContent className="bg-orange-400 rounded-sm p-5 space-y-2">
              <MenubarItem>Register</MenubarItem>
              <MenubarItem>About</MenubarItem>
              <MenubarItem>Tasks</MenubarItem>
              <MenubarItem>Login</MenubarItem>
              <MenubarItem>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Sidebar>
    </div>
  );
}
