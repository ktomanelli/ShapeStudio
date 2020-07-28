import React,{useState} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Modal from '@material-ui/core/Modal';
import SaveWindow from './SaveWindow';
import OpenWindow from './OpenWindow';

const Menu = (props)=>{
  const [openModal,setOpenModal] = useState({open:false,body:null})

  const handleMenuClose = (event) => {
    props.setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      props.setOpen(false);
    }
  }

  const handleSave=()=>{
    setOpenModal({open:true,body:'save'})
  }
  const handleOpen=()=>{
    setOpenModal({open:true,body:'open'})
  }

  const getBody=()=>{
    switch(openModal.body){
      case 'save':
        return <SaveWindow userScenes={props.userScenes} setUserScenes={props.setUserScenes} setOpenModal={setOpenModal} scene={props.scene} camera={props.camera}/>
      case 'open':
        return <OpenWindow userScenes={props.userScenes} setOpenModal={setOpenModal} setLoaded={props.setLoaded}/>
      default:
        break;
    }
  }
return (
  <div className='menuDropdown'>
    <Popper open={props.open} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
                  <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleSave}>Save</MenuItem>
              <MenuItem onClick={handleOpen}>Open</MenuItem>
            </MenuList>
          </ClickAwayListener>
          </Paper>
          </Grow>
    )}
  </Popper>
  <Modal
        open={openModal.open}
        onClose={()=>setOpenModal({open:false,body:null})}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {getBody()}
      </Modal>
  </div>
)

}

export default Menu