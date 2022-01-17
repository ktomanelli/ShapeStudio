import React,{FormEvent, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {userStore} from '../zustand'
import BACKEND_URL from '../config'
import { SignInResponse } from '../Types/HttpResponseTypes';

const Signin=()=>{
    const {setUser} = userStore()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [signup,setSignup]=useState(false)
    const [error,setError]=useState({message:''})
    // handles response of post methods

    const handleResponse=(data: SignInResponse)=>{
        if(data.message){
            alert(data.message)
        } else{
            localStorage.token = data.token
            setUser(data.user)
        }
    };
    const handleSubmit=(e: FormEvent)=>{
        setError({message:''})
        e.preventDefault()
        const user = {
            email,password
        }
        if(signup){
            if(password===confPassword){
                fetch(`${BACKEND_URL}/users`,{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                        accept:'application/json'
                    },
                    body:JSON.stringify(user)
                }).then(r=>r.json()).then(handleResponse)
            }else{
                setError({message:'Passwords must match.'})
            }
        }else{
            fetch(`${BACKEND_URL}/users/login`,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    accept:'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(r=>r.json())
            .then(handleResponse)
            // console.log( 'Email:', email, 'Password: ', password); 
        }
    }
    return(
    <div id='signin'>
        <img src={require('../Assets/logo beta.png')} alt='Shape Studio' />
        {error.message?<p>{error.message}</p>:''}
        <form id='emailpass' className='vertical' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" type='email' label="Email" variant="filled" onInput={ (e)=>setEmail((e.target as HTMLTextAreaElement).value)}/>
            <TextField id="outlined-basic" type='password' label="Password" variant="filled" onInput={ e=>setPassword((e.target as HTMLTextAreaElement).value)}/>
            {signup?<TextField id="outlined-basic" type='password' label="Confirm Password" variant="filled" onInput={ e=>setConfPassword((e.target as HTMLTextAreaElement).value)}/>:''}
            <Button className='signinup' variant='contained' name='signin' type="submit">{signup?'Sign Up':'Sign In'}</Button>
        </form>
        <p className="signin_signup" onClick={()=>setSignup(!signup)}>{signup? "Already have an account? Click here to Sign in!":"Don't have an account? Click here to Sign up!"}</p>
    </div>
    )

}

export default Signin