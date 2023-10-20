import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import questlogLogo from "../assets/questlog-logo.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Anmeldung mit:", email, password);
  };

  return (
    <main className="d-flex align-items-center py-4 bg-body-tertiary">
      <div className="form-register w-100 m-auto">
        <form onSubmit={handleLogin}>
          <img
            className="mb-4"
            src={questlogLogo}
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 fw-normal">Jetzt einloggen</h1>

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
            <label htmlFor="floatingPassword">Passwort</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              name="remember-me"
              id="remember-me"
            />
            <label className="form-check-label" htmlFor="remember-me">
              Login merken
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Einloggen
          </button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2023 - tbuck software</p>
        </form>
      </div>
    </main>
  );
};

export default Login;
