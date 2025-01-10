import MovieTable from '../components/MovieTable';
import EditForm from '../components/EditForm';
import { useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSideBar';

export default function AddMovie() {
    return (
        <div className='flex'>
            <AdminSidebar />
            <MovieTable />
        </div>
    );
}
