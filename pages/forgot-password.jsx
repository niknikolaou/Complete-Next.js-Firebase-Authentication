import { useState } from 'react';
import {auth }from "../firebase/config";
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth,email);
      setSuccessMessage('Password reset email sent successfully');
    } catch (error) {
      console.log(error.message);
      setErrorMessage('An error occurred while sending the password reset email');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-8">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Forgot Password</h2>
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-blue-900 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
