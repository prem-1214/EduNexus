import { googleLogout } from '@react-oauth/google'

const LogOutButton = ( ) =>{

    const logout = () =>{
        googleLogout()
        console.log("logged out...")
    }

    return (
        <>
       <button onClick={() => logout()}>logout</button>
        </>
    )
}

export default LogOutButton