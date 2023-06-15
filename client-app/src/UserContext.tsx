import React, { createContext, useState } from 'react';
import { User, UserFormValues } from './models/User';
import agent from './api/agent';
import { router } from './router/Routes';

interface IUserContext {
  login:any,
  logout:any,
  submitting:boolean,
  token:string | null,
  user:User | null,
  getCurrentUser:any
  }


  const UserContext = createContext<IUserContext>({} as IUserContext);
  const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
    const login = async(creds:UserFormValues)=>{
      setSubmitting(true);
      try{
        const user:any = await agent.Account.login(creds);
        saveToken(user.token);
        // localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user);
        setSubmitting(false);
        router.navigate("/activities");
      } catch(error){
        setSubmitting(false);
          throw error;
      }
      setSubmitting(false);
    }

    const logout=()=>{
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      router.navigate('/');
    }

    const saveToken =(token:string)=>{
     if(token) localStorage.setItem('jwt', token);
     setToken(token); 
    }

    const getCurrentUser=async()=>{
      try{
        const currentUser = await agent.Account.current();
        console.log(user);
      } catch(error){
        throw error;
      }
    }
  
    const UserContextValue = {
      login,
      logout,
      submitting,
      token,
      user,
      getCurrentUser
    }
  

    return(
    <UserContext.Provider value={UserContextValue}>
      {children}
    </UserContext.Provider>
    )
  }

  export { UserProvider, UserContext };
