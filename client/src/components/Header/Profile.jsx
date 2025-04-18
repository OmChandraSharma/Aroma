import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import userIcon from "../../assets/user icon.png";
import { getToken, removeToken, getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData({
        name: user.name || "User",
        email: user.email || "",
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className={styles.profile} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.profileIcon}>
        <img src={userIcon} alt="Profile" className={styles.userImage} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <div className={styles.profileImageContainer}>
                <img
                  src={userIcon}
                  alt="User"
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.userDetails}>
                <p className={styles.greeting}>Hi, {userData.name}!</p>
                <p className={styles.email}>{userData.email}</p>
              </div>
            </div>
          </div>

          <div className={styles.menuItems}>
            <div className={styles.menuItem}>
              <span>Your Orders</span>
            </div>
            <div className={styles.menuItem}>
              <span>Listings</span>
            </div>
            <div className={styles.menuItem}>
              <span>Profile Settings</span>
            </div>
            <div className={styles.menuItem} onClick={handleLogout}>
              <span>Logout</span>
            </div>
          </div>

          <div className={styles.footer}>
            <span className={styles.footerLink}>Privacy Policy</span>
            <span className={styles.separator}>•</span>
            <span className={styles.footerLink}>Terms of Service</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
