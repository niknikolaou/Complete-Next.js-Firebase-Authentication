import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";



const LoginPage = () => {
  const methods = useForm({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState(null);
  const { logIn, ProviderSignIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      const cleanErrorMessage = error.message.split('/')[1].replace(/[^a-zA-Z ]/g, " ");
      setErrorMessage(cleanErrorMessage);
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
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Log In</h2>
      <FormProvider {...methods}>
        <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>
           <button type="button" onClick={() => router.push('/forgot-password')}  className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
               Forgot Password?
            </button>
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">Login</p>
            </button>

          </div>

          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={`h-12 text-center w-2/3 bg-blue-500 border-2 rounded-md hover:shadow-lg
              hover:bg-blue-400 text-lg transition mt-6`}
              >
                <p className="capitlize text-white font-normal">Log in With Google</p>
              </button>
          </div>
        </form>
      </FormProvider>
    </div>
    </>
  );
};

export default LoginPage;