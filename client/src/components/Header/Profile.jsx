import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import userIcon from "../../assets/user icon.png";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
                <p className={styles.greeting}>Hi, User!</p>
                <p className={styles.email}>user@example.com</p>
              </div>
            </div>

            
          </div>

          <div className={styles.menuItems}>
            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2z" />
                </svg>
              </div>
              <span>Your Orders</span>
            </div>

            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10h16v2H4v-2zm0-4h16v2H4V6zm0 8h16v2H4v-2zm0 4h10v2H4v-2z" />
                </svg>
              </div>
              <span>Listings</span>
            </div>

            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <span>Profile Settings</span>
            </div>

            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </div>
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
