import { useState, useEffect } from 'preact/hooks';
import { formatBytes } from './helpers';
import DocumentIcon from "../assets/icons/DocumentIcon";
import XIcon from "../assets/icons/XIcon";
import PenIcon from "../assets/icons/PenIcon"; 
import CheckIcon from "../assets/icons/CheckIcon";

interface Props {
    name: string;
    progress: number | null;
    size: number;
    canRemove: boolean;
    canEdit: boolean;
    onRemove: () => void;
    isPastedText?: boolean;
    setFileName: (name: string) => void;
    addPastedTextAsFile: (event: Event) => void;
}

export function FileComponent({ name, progress, size, canRemove, setFileName, canEdit, onRemove, isPastedText = false, addPastedTextAsFile }: Props) {
    const lastDotIndex = name.lastIndexOf('.');
    let fileNameWithoutExtension = name;
    let fileExtension = '';

    if (lastDotIndex !== -1 && lastDotIndex < name.length - 2) {
        fileNameWithoutExtension = name.slice(0, lastDotIndex);
        fileExtension = name.slice(lastDotIndex + 1);
    }

    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(fileNameWithoutExtension);
    const [showPenIcon, setShowPenIcon] = useState(true);

    let formattedName = newName;
    const maxNameLength = 20;
    if (newName.length > maxNameLength) {
        const remainingChars = maxNameLength - 5;
        formattedName = `${newName.slice(0, remainingChars)}....`;
    }

    const handleNameChange = (event: any) => {
        const newName = event.target.value;
        const trimmedName = newName.trim();
        let updatedName = trimmedName;

        if (trimmedName.endsWith('.txt')) {
            updatedName = trimmedName.slice(0, -4);
        }
    
        setNewName(updatedName);
        setFileName(updatedName);
    };
    
    const handleEditClick = () => {
        setEditingName(true);
        setShowPenIcon(false);
    };
    
    const handleCheckClick = (event: any) => {
        if (!newName) return;
        setEditingName(false);
        setShowPenIcon(true);
        setFileName(`${newName}.txt`);
    
        addPastedTextAsFile(event);
    };

    useEffect(() => {
        const lastDotIndex = name.lastIndexOf('.');
        const nameWithoutExtension = lastDotIndex !== -1 ? name.slice(0, lastDotIndex) : name;
        setNewName(nameWithoutExtension);
    }, [name]);

    return (
        <div class="flex flex-col px-3 py-3 font-light gap-3 rounded-lg border border-white whiteshadow">
            <div class="flex items-center gap-2">
                <div class="flex items-center bg-white p-2 rounded-[20%]">
                    <DocumentIcon />
                </div>
                {editingName ? (
                    <>
                        <input
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                            autoFocus
                            required
                            class="bg-transparent border border-white rounded-md pl-1 pr-1 w-[70%]"
                        />
                        <button onClick={handleCheckClick}>
                            <CheckIcon />
                        </button>
                    </>
                ) : (
                    <p class="flex items-center gap-1">
                        <span>{formattedName}{fileExtension && `.${fileExtension}`}</span>
                        {canEdit && showPenIcon && (
                            <button onClick={handleEditClick}>
                                <PenIcon />
                            </button>
                        )}
                    </p>
                )}
                <p class="ml-auto text-neutral-400 whitespace-nowrap">{formatBytes(size)}</p>
                {canRemove && (
                    <button onClick={onRemove}>
                        <XIcon />
                    </button>
                )}
            </div>
            {progress !== null && (
                <progress class="progressbar" value={progress} max={size}></progress>
            )}
        </div>
    );
}
