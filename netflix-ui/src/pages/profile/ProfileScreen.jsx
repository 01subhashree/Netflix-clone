import style from "./ProfileScreen.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlicer";
import Navbar from "../../component/navbar/Navbar";
import { auth } from "../../utility/firebase";

export default function ProfileScreen() {
  const user = useSelector(selectUser);

  console.log(user);
  return (
    <div className={style.ProfileScreen}>
      <Navbar />
      <div className={style.ProfileScreen_body}>
        <h1>Edit Profile</h1>
        <div className={style.ProfileScreen_info}>
          <img
            src="https://icon-library.com/images/username-icon-png/username-icon-png-27.jpg"
            alt="avatar"
          />
          <div className={style.ProfileScreen__details}>
            <h2>{user && user.email} </h2>
            <div className={style.ProfileScreen__plans}>
              <button
                className={style.ProfileScreen__signout}
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
