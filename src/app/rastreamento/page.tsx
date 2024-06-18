'use client'

import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import TrackBackPage from './@components/trackback_page';
import axios from 'axios';
import { LoadingOverlay } from '../components/loading';
import TrackStatePage, { PackageTrack, Route } from './@components/trackstate_page';

const Rastreamento: NextPage = () => {
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [route, setRoute] = useState<Route | null>(null);
    const [packageTrack, setPackageTrack] = useState<PackageTrack | null>(null);

    const onConfirm = async (cpf: string, trackcode: string) => {
        try {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.get(`${url}/package/track-code/${trackcode}/cpf/${cpf}`);
            const data = response.data;
            setPackageTrack(data);

            if (data?.id_Motorista !== null) {
                const routeResponse = await axios.get(`${url}/routes/active/${data?.id_Motorista}`);
                setRoute(routeResponse.data);
            }

            setLoading(false);
        } catch (error: any) {
            if (error?.response?.status === 404) {
                setIsError(true);
            }
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full h-24 bg-[#E8E8EA] py-4 px-4 lg:px-16 mt-16">
                <div className='inline-flex h-full p-1'>
                    <div className='w-2 h-full flex-shrink-0 self-stretch rounded-lg bg-primary'></div>
                    <div className="max-w-7xl mx-auto justify-between items-center ml-3">
                        <nav aria-label="breadcrumb">
                            <ol className="list-none p-0 inline-flex text-sm">
                                <li className="flex items-center">
                                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                                        Início
                                    </Link>
                                    <span className="mx-2">{'>'}</span>
                                </li>
                                <li className="text-gray-500" aria-current="page">
                                    Rastreamento
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-lg font-semibold text-gray-900">Rastreamento</h1>
                    </div>
                </div>
            </div>
            <LoadingOverlay isLoading={loading} />
            {
                packageTrack
                    ? <TrackStatePage route={route} packageTrack={packageTrack} />
                    : <TrackBackPage isError={isError} onConfirm={(cpf, trackcode) => onConfirm(cpf, trackcode)} />
            }
        </>
    );
};

export default Rastreamento;
