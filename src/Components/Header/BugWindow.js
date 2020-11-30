import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const BugWindow = (props)=>{
    const [disabled,setDisabled] = useState(false)
    const [bugText,setBugText] = useState({title:'',body:''})
    const handleBugSubmit=(e)=>{
        e.preventDefault();
        setDisabled(true)
        fetch('http://localhost:3000/issues',{
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
            console.log(data)        
            setDisabled(false)
            props.setOpenModal({open:false,body:null})
        })
    }
    const handleChange = (e)=>{
        const newState = {...bugText}
        newState[e.target.name] = e.target.value
        setBugText(newState)
    }
    return(
        <div className='modal'>
            {disabled&&<div className='loading'>
                <img src={require('./loading.svg')} alt='loading img'/>
            </div>}
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