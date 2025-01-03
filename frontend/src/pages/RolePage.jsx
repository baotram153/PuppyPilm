import RoleCard from "../components/RoleCard";
import { User, Shield } from 'lucide-react';
import backgroundRole from "../assets/img/background5.jpg";

function RoleSelection() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('${backgroundRole}` }}>
            <div className="w-full max-w-4xl p-8 rounded-lg bg-black bg-opacity-70">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Choose Your Role</h1>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
                    <RoleCard
                        title="User"
                        icon={<User className="h-12 w-12 mb-4" />}
                        onClick={() => console.log('User selected')}
                    />
                    <RoleCard
                        title="Admin"
                        icon={<Shield className="h-12 w-12 mb-4" />}
                        onClick={() => console.log('Admin selected')}
                    />
                </div>
            </div>
        </div>
    );
};

export { RoleSelection };