import  { useState } from 'react';
import './App.css'; 

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const checkStrength = (password) => {
    let score = 0;

    // Criteria for password strength
    if (password.length >= 8) score += 1; // Minimum length of 8
    if (/[A-Z]/.test(password)) score += 1; // Contains uppercase letter
    if (/[a-z]/.test(password)) score += 1; // Contains lowercase letter
    if (/[0-9]/.test(password)) score += 1; // Contains number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Contains special character

    // Determine strength based on score
    if (score <= 2) {
      setStrength('Weak ☹️');
    } else if (score === 3 || score === 4) {
      setStrength('Medium 🙂');
    } else if (score === 5) {
      setStrength('Strong 😃');
    } else {
      setStrength('');
    }
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkStrength(newPassword);
  };

  return (
    <div className="container mx-auto flex flex-col items-center my-auto">
    <div className="text-center max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-5">Password Strength Checker</h2>
      
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter password"
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
      />
      
      <div className="mb-4">
        <strong className="block mb-1">Password Strength:</strong>
        <span className={`text-lg font-semibold ${
          strength === 'Weak' ? 'text-red-500' : 
          strength === 'Medium' ? 'text-yellow-500' : 
          'text-green-500'
        }`}>
          {strength}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-300 rounded">
        <div
          className={`h-full rounded transition-width duration-300 ${
            strength === 'Weak' ? 'bg-red-500 w-1/3' :
            strength === 'Medium' ? 'bg-yellow-500 w-2/3' :
            strength === 'Strong' ? 'bg-green-500 w-full' : 'w-0'
          }`}
        ></div>
      </div>
    </div>
  </div>
  );
};

export default PasswordChecker;
