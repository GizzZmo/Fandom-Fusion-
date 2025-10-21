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
        <header className="bg-[#0D0D0D]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#7F00FF]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-shadow-cyan">Fandom-Fusion Prosjektdashbord</h1>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        {navItems.map(item => (
                             <a 
                                key={item.id}
                                href={`#${item.id}`} 
                                className={`transition-colors duration-200 text-[#9E9E9E] font-medium hover:text-[#00FFD1] ${activeSection === item.id ? 'text-[#00FFD1] text-shadow-cyan font-semibold' : ''}`}
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