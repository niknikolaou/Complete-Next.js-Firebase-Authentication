import React, { useState, useContext, useRef, } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useRouter } from "next/router"
import { useAuth } from "@/context/AuthContext"
import { LayoutContext } from '../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import Image from 'next/image'


const SignupPage = () => {
  const methods = useForm({ mode: "onBlur" })
  const [errorMessage, setErrorMessage] = useState(null)
  const { signUp, ProviderSignIn } = useAuth()
  const router = useRouter()
  const { layoutConfig } = useContext(LayoutContext)
  const toast = useRef()
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' })

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 })}

  const showError = () => {
      toast.current.show({ severity: 'error', summary: 'Error Wolf', detail: errorMessage, life: 5000 })}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const password = useWatch({
    control: methods.control,
    name: "password",
  })
  const confirmPassword = useWatch({
    control: methods.control,
    name: "confirmPassword",
  })

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password)
      showSuccess()
      router.push("/")
    } catch (error) {
      console.log(error)
      const cleanErrorMessage = error.message.split('/')[1].replace(/[^a-zA-Z ]/g, " ")
      setErrorMessage(cleanErrorMessage)
      showError()
    }
  }

  const handleButtonClick = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
    } else {
      handleSubmit(onSubmit)()
    }
  }


  const handleGoogleSignUp = async () => {
    try {
      await ProviderSignIn()
      showSuccess()
      router.push("/")
    } catch (error) {
      const cleanErrorMessage = error.message.split('/')[1].replace(/[^a-zA-Z ]/g, " ")
      setErrorMessage(cleanErrorMessage)
      showError()
    }
  }

  return (
    <><Toast ref={toast} />
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <Image src="/layout/images/UW_Logo.png" alt="UW logo" width={300} height={100} className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-3 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Unchain your Wolf</div>
                            <span className="text-600 font-medium">Sign Up</span>
                        </div>
                        <div>
                          <FormProvider {...methods}>
        <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
            </div>
            <input type="email"{...register("email", { required: "Email is required" })}
              className="w-full md:w-30rem" style={{ padding: '1rem' }}  />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block text-900 text-xl font-medium mb-2">
                Password
              </label>
            </div>
            <input
              type="password"  {...register("password", { required: "Password is required" })}
              className='w-full md:w-30rem' style={{ padding: '1rem' }}  />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="block text-900 text-xl font-medium mb-2">
                Confirm Password
              </label>
            </div>

            <input type="password" {...register("confirmPassword", {equired: "Verify your password", })}
              className='w-full md:w-30rem' style={{ padding: '1rem' }}  />
            {errors.confirmPassword && (
              <p className="text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          {errorMessage && ( <div className="mt-5"> <p className="text-red-400">{errorMessage}</p>
            </div>
          )}
          <div className="flex justify-center pt-5">
            <Button   onClick={handleButtonClick} className="w-full p-3 text-xl" label="Register"/>
          </div>
          <div className="flex justify-center pt-4">
            <Button  onClick={handleGoogleSignUp}  className="w-full p-3 text-xl" label="Sign Up with Google"/>
          </div>
        </form>
      </FormProvider>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


SignupPage.getLayout = function getLayout(page) {
  return (
      <React.Fragment>
        
          {page}
         {/* <AppConfig simple />*/ }
      </React.Fragment>
  )
}

export default SignupPage