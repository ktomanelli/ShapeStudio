import React,{useState} from 'react'
import { Button } from '@material-ui/core';
import Menu from './Menu'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Modal from '@material-ui/core/Modal';
import SaveWindow from './SaveWindow';
import OpenWindow from './OpenWindow';

const MenuBar=(props)=>{
    const anchorRef = React.useRef(null);
    const [openModal,setOpenModal] = useState({open:false,body:null})
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
      const handleMenuClose = (event) => {
        setOpen(false);
      };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
    const handleLogout=()=>{
        localStorage.clear()
        props.setUser({    
            user:{
                id:null,
                email:'',
                scenes:[],
                assets:[]
            },
            token:''
        })
      }

      const handleSave=()=>{
          handleToggle()
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
        handleToggle()
        setOpenModal({open:true,body:'save'})
      }
      const handleOpen=()=>{
        handleToggle()
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

    return(
        <div>
            <div id="menuContainer" className="horizontal">
                <ul id="menu" className="horizontal">
                    <li>
                        <div className=''>
                            <Button 
                            ref={anchorRef} 
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            >
                                File
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleMenuClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={handleOpen}>Open</MenuItem>
                                            <MenuItem onClick={handleSave}>Save</MenuItem>
                                            <MenuItem onClick={handleSaveAs}>Save As</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                                </Grow>
                            )}
                            </Popper>
                    </div>
                </li>
                <li><Button>Edit</Button></li>
                <li><Button>View</Button></li>
                <li><Button>Shape</Button></li>
                <li><Button>Tools</Button></li>
                <li><Button>Help</Button></li>
            </ul>
            <Button onClick={handleLogout}>Logout</Button>
            </div>
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

export default MenuBar