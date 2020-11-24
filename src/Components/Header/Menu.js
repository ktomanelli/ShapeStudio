import React,{useState,useRef} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Button } from '@material-ui/core'

const Menu = (props)=>{
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    const handleMenuClose = (event) => {
        setOpen(false);
      };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

  return(
      <>
    <Button 
        ref={anchorRef} 
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        >
        {props.name}
    </Button>
    {props.items && 
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
        {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            >
            <Paper>
                <ClickAwayListener onClickAway={handleMenuClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {props.items.map(item=><MenuItem key={item.name} onClick={()=>{item.function();handleToggle()}}>{item.name}</MenuItem>)}
                    </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
    </Popper>
    }
      </>
  )
}

export default Menu