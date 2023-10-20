import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import questlogLogo from "../assets/questlog-logo.svg";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein");
      return;
    }
    // Registrierungslogik
    console.log("Registrierung mit:", email, password);
  };

  return (
    <main className="d-flex align-items-center py-4 bg-body-tertiary">
      <div className="form-register w-100 m-auto">
        <form onSubmit={handleRegister}>
          <img
            className="mb-4"
            src={questlogLogo}
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 fw-normal">Jetzt registrieren</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">E-Mail Adresse</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Passwort</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              name="password_confirmation"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="password_confirmation">Passwort wiederholen</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Registrieren
          </button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2023 - tbuck software</p>
        </form>
      </div>
    </main>
  );
};

export default Register;
