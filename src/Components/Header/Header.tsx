import React from 'react'
import MenuBar from './MenuBar'
import QuickAccessBar from './QuickAccessBar'

const Header=()=>{

    return(
        <div id='header' className='horizontal'>
            <div id='logoContainer'>
                <img id='logo' src={require('../../Assets/logo beta.png')} alt='Shape.Studio' />
            </div>
            <div>
                <MenuBar/>
                <QuickAccessBar/>
            </div>
        </div>
    )
}

export default Header