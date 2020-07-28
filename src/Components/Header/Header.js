import React from 'react'
import MenuBar from './MenuBar'
import QuickAccessBar from './QuickAccessBar'

const Header=(props)=>{

    return(
        <div id='header'>
        <MenuBar logo={props.logo} userScenes={props.userScenes} setUserScenes={props.setUserScenes} setLoaded={props.setLoaded} camera={props.camera} setCamera={props.setCamera} scene={props.scene} setScene={props.setScene}/>
        <QuickAccessBar newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>
        </div>
    )
}

export default Header