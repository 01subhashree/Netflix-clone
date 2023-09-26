import { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { ImSearch, ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // console.log(showSearch);

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={show ? style.nav_black : style.nav}>
      <div className={style.nav_contains}>
        <img
          onClick={() => navigate("/")}
          className={style.nav_logo}
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        {isopen ? (
          <ImCross
            onClick={() => setIsOpen(false)}
            className={style.navContainer_icon}
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => setIsOpen(true)}
            className={style.navContainer_icon}
          />
        )}
        <div
          className={isopen ? style.mobilenav_container : style.nav_container}
        >
          <p onClick={() => navigate("/")}>Home</p>
          <p>Tv shows</p>
          <p>Movies</p>
          <p onClick={() => navigate("/mylist")}>My List</p>
        </div>
        <div
          className={
            showSearch ? style.shownav_formContainer : style.nav_formContainer
          }
        >
          <input
            placeholder="Search"
            onBlur={() => {
              setShowSearch(false);
              setInputHover(false);
            }}
            onMouseEnter={() => setInputHover(true)}
            onMouseLeave={() => setInputHover(false)}
          />
          <div
            tabIndex={0}
            onFocus={() => setShowSearch(true)}
            onBlur={() => {
              if (!inputHover) {
                setShowSearch(false);
              }
            }}
          >
            <ImSearch className={style.navFormContainer_icon} />
          </div>
        </div>

        <img
          onClick={() => navigate("/profile")}
          className={style.nav_avatar}
          src="http://getdrawings.com/free-icon/cool-avatar-icons-67.png"
          alt=""
        />
      </div>
    </div>
  );
}
