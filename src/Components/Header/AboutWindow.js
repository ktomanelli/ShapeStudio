import React from 'react'

const AboutWindow = (props)=>{

    return(
        <div id='about' className='modal'>
            <img src={require('./logo.png')} alt='logo'></img>
            <p>
                Shape Studio is a passion project I've wanted to build for a number of years, 
                but it wasnt until the last year that I actually had the skills to make it a reality. 
                Shape Studio is a tool for creation, use it to m

                what is it

                why i made it

                for FI
            </p>
            <img src='./kyle.svg'/>
        </div>
    )

}

export default AboutWindow