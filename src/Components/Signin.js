import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Signin=(props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [signup,setSignup]=useState(false)
    const [error,setError]=useState({message:''})
    // handles response of post methods

    const handleResponse=(data)=>{
        if(data.message){
            alert(data.message)
        } else{
            localStorage.token = data.token
            props.setUser(data)
        }
    };
    const handleSubmit=(e)=>{
        setError({message:''})
        e.preventDefault()
        const user = {
            email,password
        }
        if(signup){
            if(password===confPassword){
                fetch('http://localhost:3000/users',{
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
            fetch('http://localhost:3000/users/login',{
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
        <img src={require('./Header/logo.png')} alt='Shape Studio' />
        {error.message?<p>{error.message}</p>:''}
        <form id='emailpass' className='vertical' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" type='email' label="Email" variant="filled" onInput={ e=>setEmail(e.target.value)}/>
            <TextField id="outlined-basic" type='password' label="Password" variant="filled" onInput={ e=>setPassword(e.target.value)}/>
            {signup?<TextField id="outlined-basic" type='password' label="Confirm Password" variant="filled" onInput={ e=>setConfPassword(e.target.value)}/>:''}
            <Button className='signinup' varient='contained' name='signin' type="submit">{signup?'Sign Up':'Sign In'}</Button>
        </form>
        <p className="signin_signup" onClick={()=>setSignup(!signup)}>{signup? "Already have an account? Click here to Sign in!":"Don't have an account? Click here to Sign up!"}</p>
    </div>
    )

}

export default Signin