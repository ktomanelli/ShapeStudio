import React from 'react'
import { Button } from '@material-ui/core';
import Menu from './Menu'
const MenuBar=(props)=>{
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    const handleLogout=()=>{
        localStorage.clear()
        props.setUser({    
            user:{
                id:null,
                email:'',
                scenes:[],
                assets:[]
            },
            token:''
        })
      }
    return(
        <div>
            <div id="menuContainer" className="horizontal">
            <ul id="menu" className="horizontal">
                <li>
                    <div className=''>
                    <Button ref={anchorRef} onClick={handleToggle}>File</Button>
                    <Menu ref={anchorRef} userScenes={props.userScenes} setUserScenes={props.setUserScenes} loaded={props.loaded} setLoaded={props.setLoaded} camera={props.camera} setCamera={props.setCamera} scene={props.scene} setScene={props.setScene} open={open} setOpen={setOpen} ref={anchorRef.current}/>
                    </div>
                </li>
                <li><Button>Edit</Button></li>
                <li><Button>View</Button></li>
                <li><Button>Shape</Button></li>
                <li><Button>Tools</Button></li>
                <li><Button>Help</Button></li>
            </ul>
            <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )

}

export default MenuBar