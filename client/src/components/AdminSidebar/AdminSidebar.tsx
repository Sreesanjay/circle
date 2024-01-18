import { Sidebar } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import "./AdminSidebar.css"
import { useNavigate } from "react-router-dom";
//admin sidebar
export default function AdminSidebar() {
    const navigate = useNavigate()
  return (
    <div className="h-screen fixed">
      <Sidebar className="admin-sidebar" aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#" img="https://lh3.google.com/u/0/d/1C1DLE7l-yDr2HQ6md3Sd21dcebNHpGdZ" imgAlt="" className="sidebar-logo flex items-center mb-10">
        <div className="sidebarLogo-text">
        <h1>Circle</h1>
        </div>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie} className="cursor-pointer" onClick={()=> navigate('/admin')}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox} className="cursor-pointer" onClick={()=> navigate('/admin/interest')}>
           {/* <Link to='/admin/interest'>Interest</Link>  */}
           Interest
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" icon={HiViewBoards}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer"  icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  )
}
