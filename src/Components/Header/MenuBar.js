import React from 'react'
import { Button } from '@material-ui/core';
import Menu from './Menu'
const MenuBar=(props)=>{
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    return(
        <div>
            <ul id="menu" className="horizontal">
                <li>
                    <div className=''>
                    <Button ref={anchorRef} onClick={handleToggle} color="white">File</Button>
                    <Menu ref={anchorRef} userScenes={props.userScenes} setUserScenes={props.setUserScenes} setLoaded={props.setLoaded} camera={props.camera} setCamera={props.setCamera} scene={props.scene} setScene={props.setScene} open={open} setOpen={setOpen} ref={anchorRef.current}/>
                    </div>
                </li>
                <li><Button color="white">Edit</Button></li>
                <li><Button color="white">View</Button></li>
                <li><Button color="white">Shape</Button></li>
                <li><Button color="white">Tools</Button></li>
                <li><Button color="white">Help</Button></li>
            </ul>
        </div>
    )

}

export default MenuBar