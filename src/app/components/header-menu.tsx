'use client'

import { useState } from 'react';
import Link from 'next/link';

export function HeaderMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full font-bold">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-bold">
                            Track<span className="text-blue-500">&</span>Trace
                        </h1>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5m-16.5 6h16.5m-16.5 6h16.5" />
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex flex-row items-center space-x-4">
                            <li><Link href="/#inicio" onClick={handleCloseMenu} className="py-0 text-gray-800 hover:text-gray-600">Início</Link></li>
                            <li><Link href="/#sobre" onClick={handleCloseMenu} className="py-0 text-gray-800 hover:text-gray-600">Sobre nós</Link></li>
                            <li><Link href="/#contato" onClick={handleCloseMenu} className="py-0 text-gray-800 hover:text-gray-600">Contato</Link></li>
                            <li><Link href="/rastreamento" className="py-0 text-gray-800 hover:text-gray-600">Rastreamento</Link></li>
                        </ul>
                    </nav>
                    <nav className={`absolute w-full mt-64 bg-white right-0 shadow-md transform ${isOpen ? "scale-y-100" : "scale-y-0"} transition-transform duration-300 ease-in-out md:hidden`}>
                        <ul className="flex flex-col items-center space-y-2 py-2">
                            <li><Link href="/#inicio" onClick={handleCloseMenu} className="block text-center text-gray-800 hover:text-gray-600 px-4 py-2">Início</Link></li>
                            <li><Link href="/#sobre" onClick={handleCloseMenu} className="block text-center text-gray-800 hover:text-gray-600 px-4 py-2">Sobre nós</Link></li>
                            <li><Link href="/#contato" onClick={handleCloseMenu} className="block text-center text-gray-800 hover:text-gray-600 px-4 py-2">Contato</Link></li>
                            <li><Link href="/rastrear" className="block text-center text-gray-800 hover:text-gray-600 px-4 py-2">Rastreamento</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
}


