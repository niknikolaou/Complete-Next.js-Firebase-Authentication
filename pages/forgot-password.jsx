import React, { useState, useContext } from "react";
import {auth }from "../firebase/config";
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '../layout/context/layoutcontext';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { layoutConfig } = useContext(LayoutContext);
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
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
        <>
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <Image src="/layout/images/UW_Logo.png" alt="UW logo" width={300} height={100} className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Forgot Password?</div>
                            <span className="text-600 font-medium">Reset to continue</span>
                        </div>

                        <div>
                        <form onSubmit={handleResetPassword}>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />
                            {successMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                             <p>{successMessage}</p>
                            </div>
                            )}{errorMessage && ( <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                           <p>{errorMessage}</p> </div> )}
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                            </div>
                            <Button label="Reset Password" className="w-full p-3 text-xl" type="submit"></Button>
                          </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page) {
  return (
      <React.Fragment>
          {page}
         {/* <AppConfig simple />*/ }
      </React.Fragment>
  );
};

export default ForgotPasswordPage;
