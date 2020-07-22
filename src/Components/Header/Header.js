import React from 'react'
import MenuBar from './MenuBar'
import QuickAccessBar from './QuickAccessBar'

const Header=(props)=>{

    return(
        <div id='header'>
        <MenuBar scene={props.scene}/>
        <QuickAccessBar newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>
        </div>
    )
}

export default Header