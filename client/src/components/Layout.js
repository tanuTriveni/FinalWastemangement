import React from 'react'
import '../styles/LayoutStyles.css'
import { SidebarMenu, UsersMenu, adminMenu } from '../Data/data'
import { useSelector } from 'react-redux'
import
{ Badge }
from
"antd"
;
import { message } from 'antd'
import { Link , useLocation, useNavigate} from 'react-router-dom'


const Layout = ({children}) => {
  const {user}=useSelector(state => state.user)
  const location =useLocation();
//rendering menu list
const Navigate=useNavigate();


const handlelogout=()=>{
  localStorage.clear()
  message.success('Logout successfully')
  Navigate("/login")
};

 const CollectorMenu =[
  {
      name:"Home",
      path:'/',
      icon:"fa-solid fa-house",
  },
  {
      name:"Total Request",
      path:"/totalrequest",
      icon:'fa-solid fa-list'
  }
  ,
  
  ,{
      name:'Profile',
      path:`/collector/profile/${user?._id}`,
      icon:'fa-solid fa-user',
  },
 
]

const SidebarMenu=user?.isAdmin?adminMenu:user?.isCollector?CollectorMenu:UsersMenu
  return (
    <>
<div className="main">

    <div className="layout">
<div className="sidebar">

    <div className="logo">
    <h1 style={{ marginLeft: '10px' , fontWeight:'bold', fontFamily:'sans-serif'}}>E-Waste Management</h1>
      <hr></hr>
    </div>
    <div className="menu">
      {SidebarMenu.map(menu =>{
        return(
          <>
          <div className='menu-item' style={  {'overflow-y': 'auto'}}>
          <i className={menu.icon}></i>
          <Link to={menu.path} className='menu-link'>{menu.name}</Link></div>
          </>
        )
      })}
         <div className='menu-item' onClick={handlelogout}>
          <i className='fa-solid fa-right-from-bracket'></i>
          <Link to='/login' className='menu-link'>Logout</Link></div>
    </div>

</div>

<div className="content">

<div className="header">
<div className="header-content" style={{cursor:"pointer"}}>

<Badge count={user && user.notification.length}
onClick={()=>{Navigate('/notification')}}

>
<i class="fa-solid fa-bell"></i>
    </Badge>
  <Link to="/profile">{user?.name}</Link>
</div>
</div>
<div className="body" style={  {'overflow-y': 'auto'}}>{children}</div>

</div>
    </div>
</div>


    </>
  )
}

export default Layout