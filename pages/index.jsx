import React, { useState, useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { LayoutContext } from '../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast'
import Image from 'next/image';




const LoginPage = () => {
  const toast = useRef();
  const methods = useForm({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState(null);
  const { logIn, ProviderSignIn } = useAuth();
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error Wolf', detail: 'Wrong Email or Password!', life: 5000 });
};
  ///
  const [password, setPassword] = useState('');
  //
  const {
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      showError()
      const cleanErrorMessage = error.message.split('/')[1].replace(/[^a-zA-Z ]/g, " ");
      setErrorMessage(cleanErrorMessage)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await ProviderSignIn();
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      const cleanErrorMessage = error.message.split('/')[1].replace(/[^a-zA-Z ]/g, " ");
      setErrorMessage(cleanErrorMessage);
    }
  };

  return (
    <>
    <Toast ref={toast} />
  <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <Image src="/layout/images/UW_Logo.png" alt="UW logo" width={300} height={100} className="mb-3 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Wolf!</div>
                            <span className="text-600 font-medium">Sign in to continue or</span>
                            <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/signup')}>
                              Sign Up Here
                            </a>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                  {/*
                                    <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                    */}
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/forgot-password')}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={onSubmit}></Button>
                            <Button  label="Sign In with Google" className="w-full p-3 text-xl mt-4"  onClick={handleGoogleSignIn}></Button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
      <React.Fragment>
        
          {page}
         {/* <AppConfig simple />*/ }
      </React.Fragment>
  );
};
export default LoginPage;