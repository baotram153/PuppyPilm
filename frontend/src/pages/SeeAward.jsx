import { Sidebar } from '../components/SideBar';
import RatingTable from '../components/RatingTable';

export default function SeeAward() {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <RatingTable/>
            </div>
        </div>
    );
}
