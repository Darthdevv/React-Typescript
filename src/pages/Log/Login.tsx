import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState<{ email: string; password: string }>({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError({ email: "", password: "" });

    if (!email.includes("@")) {
      setError({ ...errors, email: "Email must include @" });
      return;
    }

    if (password.length < 8) {
      setError({ ...errors, password: "Password must be at least 8 chars" });
      return;
    }

    console.log('Form Submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div className="text-red-500">{errors.email}</div>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div className="text-red-500">{errors.password}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Login