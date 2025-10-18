
import React from 'react';

interface HeaderProps {
    activeSection: string;
}

const navItems = [
    { id: 'oversikt', title: 'Oversikt' },
    { id: 'faser', title: 'Prosjektfaser' },
    { id: 'arkitektur', title: 'Arkitektur' },
    { id: 'demo', title: 'Generator Demo' },
    { id: 'fusion', title: 'Kreativ Fusion' },
];

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-800">Fandom-Fusion Prosjektdashbord</h1>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        {navItems.map(item => (
                             <a 
                                key={item.id}
                                href={`#${item.id}`} 
                                className={`transition-colors duration-200 text-gray-600 font-medium hover:text-blue-600 ${activeSection === item.id ? 'text-blue-600 font-semibold' : ''}`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
