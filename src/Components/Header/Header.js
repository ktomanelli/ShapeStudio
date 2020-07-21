import React from 'react'
import MenuBar from './MenuBar'
import QuickAccessBar from './QuickAccessBar'

const Header=()=>{

    return(
        <div id='header'>
        <MenuBar/>
        <QuickAccessBar />
        </div>
    )
}

export default Header