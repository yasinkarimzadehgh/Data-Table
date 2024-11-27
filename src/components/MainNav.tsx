import { ModeToggle } from "./mode-toggle";

function MainNav() {
  return (
    <div className="flex justify-between">
      <p>Test</p>

      <div className="flex items-center gap-5">
        <div>Logout</div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default MainNav;
