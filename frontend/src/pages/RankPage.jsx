import { AdminSidebar }  from '../components/AdminSideBar';
import RankingTable from '../components/RankingTable';

export default function RankPage() {
    return (
        <div className='flex'>
            <AdminSidebar/>
            <RankingTable className="flex-1"/>
        </div>
    );
}
