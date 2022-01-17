import React,{useEffect,useState} from 'react'
import { Button } from '@material-ui/core'
import BACKEND_URL from '../../config'
import { Notice } from '../../Types/Notice'

const Notices = (props: any) => {
    const [notice,setNotice] = useState({} as Notice);
    useEffect(()=>{
        fetch(`${BACKEND_URL}/notices`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(r=>r.json()).then(data=>{
            if(data.notice)setNotice(data.notice)
        })
    },[])
    const handleClick=()=>{
        props.setOpenModal({open:false,body:null})
    }
    const handleDontShow=()=>{
        fetch(`${BACKEND_URL}/notices/hide`,{
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
                    <h1>{notice.title}</h1>
                    <div dangerouslySetInnerHTML={{__html:notice.body}}/>
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

export default Notices