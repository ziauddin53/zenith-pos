import React from 'react';

interface GenericViewProps {
    title: string;
}

const GenericView: React.FC<GenericViewProps> = ({ title }) => {
    return (
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md text-center h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{title}</h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">This feature is under construction.</p>
            <div className="mt-6 text-6xl text-neutral-200 dark:text-neutral-700">
                🚧
            </div>
        </div>
    )
}

export default GenericView;
