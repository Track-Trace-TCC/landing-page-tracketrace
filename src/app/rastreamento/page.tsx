'use client'

import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import TrackBackPage from './@components/trackback_page';
import axios from 'axios';

const Rastreamento: NextPage = () => {

    const onConfirm = async (cpf: string, trackcode: string) => {
        if (cpf.length < 11) {

        }
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${url}/package/track-code/${trackcode}/cpf/${cpf}`)
        if (response.status != 200) {
            return alert("Faz direito porra")
        }

        const data = response.data

        const directions = await axios.get(`${url}/routes/active/${data?.id_Motorista}`)
        console.log(directions.data)
    }

    return (
        <>
            <div className="w-full h-24 bg-[#E8E8EA] py-4 px-16 mt-16">
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
            <TrackBackPage onConfirm={(cpf, trackcode) => onConfirm(cpf, trackcode)} />
        </>
    );
};

export default Rastreamento;
