import React from 'react'
import MenuBar from './MenuBar'
import QuickAccessBar from './QuickAccessBar'

const Header=(props)=>{

    return(
        <div id='header' className='horizontal'>
            <div id='logoContainer'>
                <img id='logo' src={require('./logo beta.png')} alt='Shape.Studio' />
            </div>
            <div>
                <MenuBar logo={props.logo} userScenes={props.userScenes} setUserScenes={props.setUserScenes} setUser={props.setUser} loaded={props.loaded} setLoaded={props.setLoaded} camera={props.camera} setCamera={props.setCamera} scene={props.scene} setScene={props.setScene}/>
                <QuickAccessBar newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>
            </div>
        </div>
    )
}

export default Header