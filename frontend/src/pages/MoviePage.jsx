import HomeTable from '../components/HomeTable';
import { Sidebar } from '../components/SideBar';

export default function MoviePage() {
    return (
        <div className='flex'>
            <Sidebar />
            <HomeTable className="flex-1"/>
        </div>
    )  
}
