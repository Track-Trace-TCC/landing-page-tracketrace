'use client'

import { useState } from "react";


interface TrackBackPageProps {
    onConfirm: (cpf: string, trackCode: string) => void;
}

const TrackBackPage: React.FC<TrackBackPageProps> = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [trackcode, setTrackcode] = useState('');

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(name, trackcode);
    }

    return (
        <>
            <div className="flex-grow flex items-center justify-center w-full bg-white" style={{ minHeight: 'calc(100vh - 13.3rem)' }}>
                <div className="max-w-4xl w-full px-16 overflow-hidden sm:rounded-lg bg-white">
                    <div className="text-left mb-6 items-center inline-flex h-10 ">
                        <div className='w-2 h-full flex-shrink-0 self-stretch rounded-lg bg-primary'></div>
                        <h3 className="text-xl font-bold text-gray-900 ml-4">
                            Identificação
                        </h3>
                    </div>
                    <form className="">
                        <label htmlFor="name" className="block">CPF</label>
                        <input
                            type="text"
                            maxLength={11}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="12345678900"
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        <label htmlFor="trackcode" className="block mt-4">Código de rastreio</label>
                        <input
                            type="text"
                            onChange={(e) => setTrackcode(e.target.value)}
                            value={trackcode}
                            placeholder="Código de Rastreamento"
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                        />

                        <div className='w-full flex justify-end'>
                            <button
                                type="submit"
                                onClick={handleConfirm}
                                className="px-4 mt-2 py-2 text-white bg-primary  rounded-md focus:outline-none hover:bg-blue-700"
                            >
                                Buscar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default TrackBackPage;