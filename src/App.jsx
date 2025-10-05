import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSystem from "./pages/AuthSystem"
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import SuperAdminProtectedRoute from "./auth/SuperAdminProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import UserProtectedRoute from "./auth/UserProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundPage from "./pages/NotFound";
import PairBotPage from "./pages/UserPairBot";
import AdminManagement from "./pages/SuperAdminList";
import FrontPage from "./pages/FrontPage/FrontPage";
import EditBotInfo from "./pages/EditInfo";
//import './utils/fetchIntercepter';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/auth" element = { <AuthSystem />}/>
      <Route path="/" element = { <FrontPage/>}/>
      <Route path = "/super-admin/dashboard" element = {
        <SuperAdminProtectedRoute>
          <SuperAdminDashboard />
        </SuperAdminProtectedRoute>
        } />
      <Route path = "/super-admin/admins" element = {
        <SuperAdminProtectedRoute>
          <AdminManagement />
        </SuperAdminProtectedRoute>
        } />
      <Route path="/dashboard" element = {
        <UserProtectedRoute>
        <UserDashboard />
        </UserProtectedRoute>
        } />
        <Route path="/edit-info" element ={
          <UserProtectedRoute>
            <EditBotInfo/>
          </UserProtectedRoute>
        }/>
      <Route path="/admin/dashboard" element = {
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
        } />
        <Route path="/pair-bot" element = {
         <UserProtectedRoute>
           <PairBotPage/>
         </UserProtectedRoute>
        }/>
       <Route path = "*" element = {<NotFoundPage/>}/>
    </Routes>
  </Router>
  )
}

export default App;
