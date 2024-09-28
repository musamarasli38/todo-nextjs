import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
export function Navbar() {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
