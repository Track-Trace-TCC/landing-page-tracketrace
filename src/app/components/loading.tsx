import React from 'react';

interface LoadingOverlayProps {
    isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce200"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce400"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce600"></div>
            </div>
        </div>
    );
};
