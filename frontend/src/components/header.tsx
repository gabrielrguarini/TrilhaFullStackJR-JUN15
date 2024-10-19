import Logo from "./logo-svg";

export const Header = () => {
  return (
    <header className="flex items-center p-4 shadow-sm shadow-primary">
      <Logo width={42} />
      LOGO
    </header>
  );
};
