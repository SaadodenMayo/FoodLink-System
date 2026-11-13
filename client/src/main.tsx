import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import {ShieldCheck} from 'lucide-react';
import {AppProvider,useApp} from './context/AppContext';
import {Layout} from './components/Layout';
import Chat from './components/Chat';
import {Login,PortalLogin,PortalIntro,Register} from './pages/Auth';
import {CustomerHome,RoleDashboard,OrdersPage} from './pages/Dashboard';
import {FoodsPage,NotificationsPage,WalletPage,ProfilePage,UsersPage} from './pages/Pages';
import LiveLocation from './pages/LiveLocation';
import './styles.css';
function Guard({children}:{children:React.ReactNode}){const {user}=useApp();return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace/>;}
function Home(){const {user,logout}=useApp();const nav=useNavigate();const [showPortal,setShowPortal]=useState(()=>sessionStorage.getItem('foodlink_portal_selected')!=='1');if(showPortal)return <PortalIntro onChoose={(path)=>{sessionStorage.setItem('foodlink_portal_selected','1');if(user)logout();nav(path)}}/>;return user?<Layout>{user.role==='customer'?<CustomerHome/>:<RoleDashboard/>}</Layout>:<PortalIntro onChoose={(path)=>{sessionStorage.setItem('foodlink_portal_selected','1');nav(path)}}/>;}
function App(){const {user}=useApp();return <Routes>
<Route path="/login" element={user ? <Navigate to="/"/> : <Navigate to="/" replace/>}/>
<Route path="/customer-login" element={user ? <Navigate to="/"/> : <Login/>}/>
<Route path="/portal-login" element={user ? <Navigate to="/"/> : <PortalLogin/>}/>
<Route path="/portal-intro" element={user ? <Navigate to="/"/> : <PortalIntro/>}/>
<Route path="/pending" element={<div className="pending-page"><div className="panel"><ShieldCheck/><h1>Application submitted</h1><p>Your owner/rider account is waiting for admin verification. You can sign in after it has been approved.</p><a href="/portal-login">Go to staff login</a></div></div>}/>
<Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
<Route path="/" element={<Home/>}/>
<Route path="/foods" element={<Guard><FoodsPage/></Guard>}/>
<Route path="/orders" element={<Guard><OrdersPage/></Guard>}/>
<Route path="/deliveries" element={<Guard><OrdersPage/></Guard>}/>
<Route path="/messages" element={<Guard><Chat/></Guard>}/>
<Route path="/notifications" element={<Guard><NotificationsPage/></Guard>}/>
<Route path="/wallet" element={<Guard><WalletPage/></Guard>}/>
<Route path="/profile" element={<Guard><ProfilePage/></Guard>}/>
<Route path="/settings" element={<Guard><ProfilePage/></Guard>}/>
<Route path="/users" element={<Guard><UsersPage/></Guard>}/>
<Route path="/track/:id" element={<Guard><LiveLocation/></Guard>}/>
<Route path="*" element={<Navigate to="/"/>}/>
</Routes>;}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AppProvider><BrowserRouter><App/></BrowserRouter></AppProvider></React.StrictMode>);
