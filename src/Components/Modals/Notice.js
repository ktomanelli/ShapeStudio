import React,{useEffect,useState} from 'react'
import { Button } from '@material-ui/core'

const Notice = props =>{
    const [notice,setNotice] = useState(null)
    useEffect(()=>{
        fetch(`${process.env.BACKEND_URL}/notices`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(r=>r.json()).then(data=>{
            if(data.notice)setNotice(data)
        })
    },[])
    const handleClick=(e)=>{
        props.setOpenModal({open:false,body:null})
    }
    const handleDontShow=e=>{
        fetch(`${process.env.BACKEND_URL}/notices/hide`,{
            method:'PATCH',
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(r=>r.json()).then(data=>{
            handleClick()
        })
    }
    return(
        <>
        {notice && 
            <div className='modal'>
                <div className='xicon' onClick={handleClick}>𝗫</div>
                <div id='notice'>
                    <h1>{notice.notice.title}</h1>
                    <div dangerouslySetInnerHTML={{__html:notice.notice.body}}/>
                <div className='dontShowButton'>
                <Button onClick={handleDontShow}>
                    Don't show this again.
                </Button>
                </div>
                </div>
            </div>
        }
        </>
    )
}

export default Notice