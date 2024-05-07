import { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    if (!value) {
      setEmailError('Email is required');
    } else if (!isValidEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);
    if (!value) {
      setPasswordError('Password is required');
    } else if (!isValidPassword(value)) {
      setPasswordError('Invalid password format');
    } else {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return false; // Email is empty
    }
    if (!emailRegex.test(email)) {
      return false; // Invalid email format
    }
    return true;
  };
  
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password.trim()) {
      return false; // Password is empty
    }
    if (password.trim().length < 8) {
      return false; // Password is less than 8 characters
    }
    if (!passwordRegex.test(password)) {
      return false; // Password doesn't meet complexity requirements
    }
    return true;
  };

  return (
    <form>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        {emailError && <span>{emailError}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
        {passwordError && <span>{passwordError}</span>}
      </div>
      <button type="submit" disabled={!isValidEmail(email) || !isValidPassword(password)}>
        Log In
      </button>
    </form>
  );
};

export default Login;