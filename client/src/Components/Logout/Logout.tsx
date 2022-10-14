import React, { useEffect } from 'react'
import { UserApi } from '../../services/user-service';

export default function Logout() {
    
  useEffect(()=>{
        (async function logout(){
           const user=await UserApi.getUser();
           console.log(await UserApi.deleteUser(user.userId));
           navigate("/api/")
        })(); 
  },[]);

  return (
    <div>Loading...</div>
  )
}