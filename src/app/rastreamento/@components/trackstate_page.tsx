'use client';

import { useMap } from "../../hooks/useMap";
import { socket } from "../../utils/socket-io";
import { useEffect, useRef, useState } from "react";

interface TrackStatePageProps {
    route?: Route | null;
    packageTrack: PackageTrack;
}

export interface Route {
    destination: {
        name: string;
        location: {
            lat: number;
            lng: number;
        };
    };
    directions: any;
    duration: number;
    id: string;
    name: string;
    source: {
        name: string;
        location: {
            lat: number;
            lng: number;
        };
    };
    status: string;
}

export interface PackageTrack {
    id_Motorista: string;
    id_Pacote: string;
    id_Rota: string;
    status: string;
    dataHoraCriacao: string;
    dataHoraAtualizacao: string;
    dataHoraEntrega: string;
    destino: string;
}

const TrackStatePage: React.FC<TrackStatePageProps> = ({ route, packageTrack }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [legs, setLegs] = useState<any[]>([]);
    const map = useMap(mapContainerRef);

    useEffect(() => {
        if (mapContainerRef.current) {
            console.log("mapContainerRef is not null");
        } else {
            console.log("mapContainerRef is null");
        }
    }, [mapContainerRef]);

    useEffect(() => {
        if (packageTrack.status !== 'ENTREGUE' && route) {
            const packageLocation = packageTrack.destino;
            const packageLocationJson = JSON.parse(packageLocation);
            const newLegs = route.directions.routes[0].legs.reduce((acc: any, leg: any) => {
                const matchesLocation = (coord1: number, coord2: number) => parseFloat(coord1.toFixed(2)) === parseFloat(coord2.toFixed(2));
                if (acc.length === 0 || !matchesLocation(acc[acc.length - 1].end_location.lat, packageLocationJson.latitude) || !matchesLocation(acc[acc.length - 1].end_location.lng, packageLocationJson.longitude)) {
                    acc.push(leg);
                }
                if (matchesLocation(leg.end_location.lat, packageLocationJson.latitude) && matchesLocation(leg.end_location.lng, packageLocationJson.longitude)) {
                    return acc;
                }
                return acc;
            }, []);
            setLegs(newLegs);

            socket?.connect();
            socket?.on("new-points/" + packageTrack.id_Motorista, async (data: { route_id: string; lat: number; lng: number }) => {
                if (data?.route_id && !map?.hasRoute(data?.route_id)) {
                    await map?.addRouteWithLegs({
                        routeId: data?.route_id,
                        legs: newLegs.map((leg: any) => ({
                            startLocation: leg.start_location,
                            endLocation: leg.end_location,
                        })),
                        carMarkerOptions: {
                            position: newLegs[0].startLocation,
                        },
                        directionsService: new google.maps.DirectionsService(),
                    });
                }
                data?.route_id && map?.moveCar(data.route_id, { lat: data.lat, lng: data.lng });
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [map, socket, packageTrack.status, route]);



    const getStatusIndicator = (status: string) => {
        const currentStatus = ['ESPERANDO_RETIRADA', 'A_CAMINHO', 'ENTREGUE'];
        const statusIcons: { [key: string]: string } = {
            'ESPERANDO_RETIRADA': '/box_track.svg',
            'A_CAMINHO': '/truck_track.svg',
            'ENTREGUE': '/finish_track.svg'
        };
        const statusLabels: { [key: string]: string } = {
            'ESPERANDO_RETIRADA': "Recebido",
            'A_CAMINHO': "Em trânsito",
            'ENTREGUE': "Entregue"
        };
        const currentIndex = currentStatus.indexOf(status);
        return (
            <div className="flex w-full mt-4 p-4 bg-[#F3F3F5] rounded-lg">
                {currentStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-center" style={{ flex: index === currentStatus.length - 1 ? '0 1 auto' : '1 1 auto' }}>
                        <div className="flex flex-col items-center justify-center px-2">
                            <img
                                src={statusIcons[item]}
                                alt={`${statusLabels[item]} icon`}
                                className={`w-6 h-6 ${index <= currentIndex ? 'filter-none' : 'filter grayscale'}`}
                            />
                            <div className={`text-sm font-bold ${index <= currentIndex ? 'text-primary' : 'text-[#2B2B30]'}`}>{statusLabels[item]}</div>
                        </div>
                        {index !== currentStatus.length - 1 && (
                            <div className={`flex-1 h-2 rounded mx-2 transition-colors duration-300 ${index < currentIndex ? 'bg-primary' : 'bg-[#B2B2BA]'}`} style={{ minWidth: '2px' }}></div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    function formatDateTime(dateString: string) {
        const options: any = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    }



    return (
        <div className="flex flex-col lg:flex-row lg:space-x-10 px-4 lg:px-16 bg-white md:min-h-[calc(100vh-13.3rem)] sm:min-h-auto">
            <div className="w-full lg:w-1/3">
                <div className="py-4 h-full flex flex-col bg-white">
                    <h2 className="text-lg font-semibold">Histórico</h2>
                    <div className="mt-4 flex-grow overflow-auto">
                        <ul className="space-y-2">
                            <li className="bg-white p-4 shadow rounded-lg flex items-center justify-between border-primary border-solid border-2">
                                <div>
                                    <h3 className="text-md font-semibold text-primary">Saiu de:</h3>
                                    <p className="text-sm text-gray-600">{route?.source.name || 'Aguardando Coleta'}</p>
                                </div>
                                <div>
                                    <span className="text-blue-500">{'>'}</span>
                                </div>
                            </li>
                            <li className="bg-white p-4 shadow rounded-lg flex items-center justify-between border-primary border-solid border-2">
                                <div>
                                    <h3 className="text-md font-semibold text-primary">Destino em:</h3>
                                    <p className="text-sm text-gray-600">{route && legs?.length !== 0 ? legs[legs?.length - 1].end_address : 'Aguardando Coleta'}</p>
                                </div>
                                <div>
                                    <span className="text-blue-500">{'>'}</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-4 p-4 bg-white rounded-lg">
                            <h2 className="text-lg font-semibold">Dados</h2>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm text-gray-600 font-semibold">Duração estimada:
                                    <span className="font-normal"> {route ? `${route.duration} minutos` : 'Aguardando Coleta'}</span>
                                </p>
                                <p className="text-sm text-gray-600 font-semibold">Data da coleta:
                                    <span className="font-normal"> {formatDateTime(packageTrack.dataHoraCriacao)}</span>
                                </p>
                                <p className="text-sm text-gray-600 font-semibold">Data de atualização:
                                    <span className="font-normal"> {formatDateTime(packageTrack.dataHoraAtualizacao)}</span>
                                </p>
                                {packageTrack.dataHoraEntrega && (
                                    <p className="text-sm text-gray-600 font-semibold">Data de entrega:
                                        <span className="font-normal"> {formatDateTime(packageTrack.dataHoraEntrega)}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-2/3">
                <div className="p-4 flex flex-col h-full md:min-h-14">
                    <h2 className="text-lg font-semibold">Status</h2>
                    {getStatusIndicator(packageTrack.status)}
                    {packageTrack.status === 'ENTREGUE' ? (
                        <div className="flex-grow bg-white mt-4 md:min-h-44 min-h-96 flex flex-col items-center justify-center">
                            <img src="/finish_track.svg" alt="Concluída" className="w-16 h-16 mb-4" />
                            <p className="text-lg font-semibold text-center">Sua encomenda foi entregue em {formatDateTime(packageTrack.dataHoraEntrega)}, aproveite.</p>
                        </div>
                    ) : (

                        packageTrack.status === 'ESPERANDO_RETIRADA' ? (
                            <div className="flex-grow bg-white mt-4 md:min-h-44 min-h-96 flex flex-col items-center justify-center">
                                <img src="/box_track.svg" alt="Aguardando Coleta" className="w-16 h-16 mb-4" />
                                <p className="text-lg font-semibold text-center">Sua encomenda está aguardando coleta.</p>
                            </div>
                        ) : <div id="map" ref={mapContainerRef} className="flex-grow bg-blue-200 mt-4 md:min-h-44 min-h-96" style={{ height: '400px' }}></div>

                    )}

                </div>
            </div>
        </div >
    );
};

export default TrackStatePage;
