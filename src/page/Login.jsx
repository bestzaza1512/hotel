import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // เรียกใช้งาน useNavigate

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      alert("ล็อกอินสำเร็จ!");
      navigate("/home"); // เมื่อล็อกอินสำเร็จ, ใช้ useNavigate เพื่อเปลี่ยนหน้าไปยัง "/home" โดยอัตโนมัติ
    } else {
      alert("ล็อกอินไม่สำเร็จ กรุณาตรวจสอบข้อมูลเข้าสู่ระบบ");
    }
  };

  return (
    <div className="login-container"> {/* เพิ่มคลาสเนม "login-container" */}
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">ชื่อผู้ใช้:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin} className="login-button">เข้าสู่ระบบ</button> {/* เพิ่มคลาสเนม "login-button" */}
      </form>
    </div>
  );
}

export default Login;
