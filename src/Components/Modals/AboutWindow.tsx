import React from 'react'
import kyle from '../../Assets/kyle.svg'

const AboutWindow = (props)=>{
    const handleClick=()=>{
        props.setOpenModal({open:false,body:null})
    }
    return(
        <div className='modal'>
            <div className='xicon' onClick={handleClick}>𝗫</div>
            <div id='about'>
            <img src={require('../../Assets/logo.png')} alt='logo'></img>
            <em>V 0.1</em>
            <p>Hey there! Thanks for clicking on the About page!</p>
            <p>My name is Kyle.</p>
            <img id='kyle' src={kyle}/> 
            <p>I'm a software engineer from NYC and I designed and developed Shape Studio!</p>
            <p>
                Shape Studio is a full 3D modeling application built for the browser so there's no need to install anything or buy expensive hardware to run it. 
                Shape Studio is built with Rails, React, and Three.JS. 
                It started as my final project at Flatiron School's Software Engineering Bootcamp but has since become more of a passion project. 
                I hope to continue to build out the app and add new features including: in-app asset management, cloud storage, 
                more in-depth shape creation, as well as a in-app store where you can show off your creations and allow others to use them in their work as well!
                I'm looking forward to continuing this journey and I hope you'll come along with me!
            </p>
            <p>If you have a question or just want to chat, feel free to reach out!</p>
            <div id='contactIcons' className='horizontal'>
                <a href='https://twitter.com/kyletomanelli' target='_blank'>
                    <img className='contactIcon' src={require('../../Assets/twitter.webp')}/>
                </a>
                <a href='mailto:kyle@shape.studio' target='_blank'>
                    <img className='contactIcon' src={require('../../Assets/email.webp')}/>
                </a>
            </div>
            <p>
            © 2020 <u>Shape Studio</u>
            </p>

            </div>
        </div>
    )

}

export default AboutWindow