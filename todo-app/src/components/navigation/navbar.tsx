import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MenubarContent, MenubarItem } from "@radix-ui/react-menubar";
import { GiHamburgerMenu } from "react-icons/gi";
export function Navbar() {
  return (
    <div>
      <Menubar className="static justify-center">
        <MenubarMenu>
          <MenubarTrigger>
            Menu &nbsp; <GiHamburgerMenu />
          </MenubarTrigger>
          <MenubarContent className="bg-orange-400 rounded-sm p-5 space-y-2">
            <MenubarItem>Register</MenubarItem>
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        .<div className="02"></div>
      </Menubar>
    </div>
  );
}
