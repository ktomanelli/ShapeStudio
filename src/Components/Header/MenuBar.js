import React from 'react'
import { Button } from '@material-ui/core';
const MenuBar=()=>{

    return(
        <div className="horizontal">
            <div>
                <img src='' alt='Shape.Studio' />
                </div>
            <ul id="menu" className="horizontal">
                <li><Button color="Primary">File</Button></li>
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