import { BlackLogo } from "../Logos/BlackLogo";

export const Footer = () => {
  return (
    <footer className="p-6 footer h-22 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-content footer-center">
      <div>
        <div className="grid grid-flow-col gap-4">
          <BlackLogo />
        </div>
        <a href="https://www.vozo.app/privacy"><p className="text-blue">Politique de confidentialité</p></a>
      </div>
    </footer>
  );
};