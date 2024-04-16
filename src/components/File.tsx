import { h } from 'preact';
import { formatBytes } from './helpers';
// import DocumentIcon from '$lib/icons/DocumentIcon'; // Popraw ścieżkę do komponentu DocumentIcon
// import XIcon from '$lib/icons/XIcon'; // Popraw ścieżkę do komponentu XIcon
import DocumentIcon from "../assets/icons/DocumentIcon";
import XIcon from "../assets/icons/XIcon";

interface Props {
    name: string;
    progress: number | null;
    size: number;
    canRemove: boolean;
}

export function File({ name, progress, size, canRemove }: Props) {
    const handleClick = () => {
        // Obsługa kliknięcia przycisku usuwania
    };

    return (
        <div class="flex flex-col px-3 py-3 font-light bg-neutral-800/50 gap-3 rounded-lg border-2 border-neutral-700/30">
            <div class="flex items-center gap-2">
                <div class="flex items-center bg-neutral-700 p-2 rounded-full">
                    <DocumentIcon/>
                </div>
                <p>{name}</p>
                <p class="ml-auto text-neutral-400 whitespace-nowrap">{formatBytes(size)}</p>
                {canRemove && (
                    <button onClick={handleClick}>
                        <XIcon/>
                    </button>
                )}
            </div>
            {progress !== null && (
                <progress class="progressbar" value={progress} max={size}></progress>
            )}
        </div>
    );
};
