import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import userIcon from "../../assets/user icon.png"; // Import the profile icon

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

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
        <img
          src={userIcon}
          alt="Profile"
          style={{ width: "100%", height: "100%" }}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li>Email / Username</li>
            <li>Order History</li>
            <li>Logout</li>
            <li>Profile Settings</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
