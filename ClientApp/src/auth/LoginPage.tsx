import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (await login(username, password)) {
      navigate("/");
    } else {
      setError("Username or password incorrect.");
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <p>Log in with your username and password.</p>
      <p>when you have an account you can partake with tastings or organise one, ordering beans etc.</p>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}