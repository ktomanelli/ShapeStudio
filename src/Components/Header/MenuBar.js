import React,{useRef} from 'react'
import { Button } from '@material-ui/core';

import Menu from './Menu'
const MenuBar=(props)=>{
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    return(
        <div className="horizontal">
            <div>
                <img src='' alt='Shape.Studio' />
                </div>
            <ul id="menu" className="horizontal">
                <li>
                    <div className=''>
                    <Button ref={anchorRef} onClick={handleToggle} color="Primary">File</Button>
                    <Menu setLoaded={props.setLoaded} camera={props.camera} setCamera={props.setCamera} scene={props.scene} setScene={props.setScene} open={open} setOpen={setOpen} ref={anchorRef.current}/>
                    </div>
                </li>
                <li><Button color="Primary">Edit</Button></li>
                <li><Button color="Primary">View</Button></li>
                <li><Button color="Primary">Shape</Button></li>
                <li><Button color="Primary">Tools</Button></li>
                <li><Button color="Primary">Help</Button></li>
            </ul>
        </div>
    )

}

export default MenuBar