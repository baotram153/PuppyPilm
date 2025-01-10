import { Sidebar } from "../components/SideBar";

export default function UserLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}