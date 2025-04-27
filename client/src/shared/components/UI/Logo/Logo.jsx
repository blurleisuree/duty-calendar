import logoMini from "@assets/icons/LogoMini.svg";
import logoFull from "@assets/icons/logoFull.svg";

function Logo({ className, type = 'logoMini'}) {
  const logoMap = {
    mini: logoMini,
    full: logoFull,
  };
  
  const logoLink = logoMap[type] || logoMini;

  return <img className={`${className} min-w-10`} alt="Logo" src={logoLink} />;
}

export default Logo;
