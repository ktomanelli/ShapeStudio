import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BACKEND_URL from '../../config'

const BugWindow = (props)=>{
    const [disabled,setDisabled] = useState(false)
    const [bugText,setBugText] = useState({title:'',body:''})
    const [error,setError] = useState(null)
    const handleBugSubmit=(e)=>{
        e.preventDefault();
        setDisabled(true)
        fetch(`${BACKEND_URL}/issues`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                accept:'application/json',
                Authorization:`Bearer ${localStorage.token}`
            },
            body:JSON.stringify({
                title:bugText.title,
                body:bugText.body,
            })
        }).then(r=>r.json()).then(data=>{
            if(data.status===200){
                setDisabled(false)
                props.setOpenModal({open:false,body:null})
            }else{
                setDisabled(false)
                setError(data.error)
            }
        })
    }
    const handleChange = (e)=>{
        const newState = {...bugText}
        newState[e.target.name] = e.target.value
        setBugText(newState)
    }
    const handleClick=()=>{
        props.setOpenModal({open:false,body:null})
    }
    return(
        <div className='modal'>
            <div className='xicon' onClick={handleClick}>𝗫</div>

            {disabled&&<div className='loading'>
                <img src={require('../../Assets/loading.svg')} alt='loading img'/>
            </div>}
            {error&&<p className='error'>{error}</p>}
            <div className='bug'>
                <h1>Submit A Bug 🐛</h1>
            <form className='vertical' autoComplete='off' onSubmit={handleBugSubmit}>
            <TextField 
                required
                disabled={disabled}
                id="outlined-basic" 
                variant="outlined"
                label="Title" 
                placeholder="A descriptive title..."
                onChange={handleChange}
                name='title' 
                value={bugText.title}/>
            <TextField
                required
                disabled={disabled}
                id="outlined-multiline-static"
                label="Description"
                placeholder="Describe the issue..." 
                onChange={handleChange}
                multiline
                rows={4}
                name='body'
                variant="outlined"
            />
            <Button disabled={disabled} type='submit' variant="contained">Submit Bug Report</Button>
            </form>
            </div>
        </div>
    )
}

export default BugWindow