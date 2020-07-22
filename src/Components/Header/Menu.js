import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {useLoader} from 'react-three-fiber'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Menu = (props)=>{

  const classes = useStyles();
  const handleClose = (event) => {
    if (props.ref && props.ref.contains(event.target)) {
      return;
    }

    props.setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      props.setOpen(false);
    }
  }

  const handleSave=()=>{
    // console.log(props.scene.toJSON())
    // const sceneString = Buffer.from(JSON.stringify(props.scene.toJSON())).toString('base64')
    fetch('http://localhost:3000/scene/save',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        accept:'application/json'
      },
      body:JSON.stringify({scene:JSON.stringify(props.scene.toJSON())})
    })
  }
const handleLoad=()=>{
  // fetch('http://localhost:3000/scene/load')
  // .then(r=>r.json())
  // .then(data=>{
  //   const loadedScene = loader.parse(data)
  //   console.log(loadedScene)
  // })
}
return (
  <div className='menuDropdown'>
    <Popper open={props.open} anchorEl={props.ref} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
                  <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleSave}>Save</MenuItem>
              <MenuItem onClick={handleLoad}>Open</MenuItem>
            </MenuList>
          </ClickAwayListener>
          </Paper>
          </Grow>
    )}
  </Popper>
  </div>
)

}

export default Menu