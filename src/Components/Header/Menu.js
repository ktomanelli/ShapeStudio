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
    if(props.loaded){
      console.log(props.loaded)
        fetch(`http://localhost:3000/scenes/${props.loaded.id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                accept:'application/json'
              },
            body:JSON.stringify({
                scene_string:JSON.stringify(props.scene.toJSON()),
            })
        }).then(r=>{
            setOpenModal({open:false,body:null})
            fetch('http://localhost:3000/scenes')
            .then(r=>r.json())
            .then(data=>props.setUserScenes(data))
        })
    
    }else{
      handleSaveAs()
    }
  }
  const handleSaveAs=()=>{
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
        return <OpenWindow userScenes={props.userScenes} setUserScenes={props.setUserScenes} setOpenModal={setOpenModal} setLoaded={props.setLoaded}/>
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
              <MenuItem onClick={handleOpen}>Open</MenuItem>
              <MenuItem onClick={handleSave}>Save</MenuItem>
              <MenuItem onClick={handleSaveAs}>Save As</MenuItem>
            </MenuList>
          </ClickAwayListener>
          </Paper>
          </Grow>
    )}
  </Popper>
    <Modal
      open={openModal.open}
      onClose={()=>setOpenModal({open:false,body:null})}
    >
      <div>
      {getBody()}
      </div>
    </Modal>
  </div>
)

}

export default Menu