// src/memberApp/layouts/MemberLayout.jsx
import React from 'react';
import './MemberLayout.css';

const MemberLayout = ({ children }) => {
    return (
      <div className="member-layout">
        <main className="member-content">{children}</main>
      </div>
    );
  };
  
  export default MemberLayout;
  
