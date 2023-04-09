import React from "react"
import LoginPage from "."

export function AccessDenied() {
  return (
    <>
    <div >
      <label className="text-center block text-900 text-xl font-medium">Access Denied</label>
      <label className="text-center block text-900 text-xl font-medium">You must be logged in to view this page</label>
      <LoginPage/>
    </div>
    </>
  )
}

AccessDenied.getLayout = function getLayout(page) {
  return (
      <React.Fragment>
        
          {page}
         {/* <AppConfig simple />*/ }
      </React.Fragment>
  )
}

export default AccessDenied
