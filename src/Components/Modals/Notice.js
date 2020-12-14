import React,{useEffect,useState} from 'react'
import { Button } from '@material-ui/core'

const Notice = props =>{
    const [notice,setNotice] = useState(null)
    useEffect(()=>{
        fetch('http://localhost:3000/notices',{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(r=>r.json()).then(data=>setNotice(data))
    },[])
    return(
        <>
        {notice && 
            <div className='modal'>
                <img src={require('../../Assets/xIcon.webp')} alt='x icon'/>
                <div>
                    <h1>{notice.notice.title}</h1>
                    <p>{notice.notice.body}</p>
                    <Button className='button'>
                    Don't show this again.
                    </Button>
                </div>
            </div>
        }
        </>
    )
}

export default Notice