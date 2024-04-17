import { gsap } from 'gsap'
import { h, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { File } from '../../components/File';
import { Button } from '../../components/Button';
import { Link } from 'preact-router/match';
import styles from './header.module.scss'
// import File from '../../components/File'; // Popraw ścieżkę do komponentu File
// import Button from '../../components/Button'; // Popraw ścieżkę do komponentu Button
// Importuj funkcję enhance z odpowiedniego miejsca

export function Testing() {
    const [state, setState] = useState<"selecting" | "uploading" | "uploaded">("selecting");
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const copyDownloadUrl = () => {
        if (downloadUrl) {
            navigator.clipboard.writeText(downloadUrl);
            alert("Copied download url to clipboard!");
        }
    };

    const startUpload = () => {
        // Implementacja logiki przesyłania plików
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
    
        const fileSizeExceedsLimit = Array.from(files).some(file => file.size > 1024 * 1024 * 1024);
    
        if (fileSizeExceedsLimit) {
            alert("One or more files exceed the 1 GB size limit. Please upload files smaller than 1 GB.");
        } else {
            setFiles(files);
        }
    };

    useEffect(() => {
        const label = document.getElementById("drop-label");
        if (label) {
            label.addEventListener('dragenter', () => {
                label.classList.add('whiteshadow');
            });

            label.addEventListener('dragleave', () => {
                label.classList.remove('whiteshadow');
            });

            return () => {
                label.removeEventListener('dragenter', () => {
                    label.classList.add('whiteshadow');
                });
                label.removeEventListener('dragleave', () => {
                    label.classList.remove('whiteshadow');
                });
            };
        }
    }, []);
    

    return (
        <div id={"gay"}>
            {state === "selecting" || state === "uploading" ? (
                <div>
                    <h1 class="text-center text-1xl text-accent underline font-bold mb-1">TESTING</h1>
                    <h1 class="text-center text-3xl font-bold mb-1">Upload your files</h1>
                    <p class="text-center text-neutral-300 mb-5 font-light">Maximum upload file size: <strong>20 GB</strong></p>
                    <form class="flex flex-col" method="post" enctype="multipart/form-data">
                        {files && files.length > 0 && (
							<div class="flex flex-col gap-2 mb-5">
								{Array.from(files).map((file, index) => (
									<File name={file.name} size={file.size} progress={null} key={index} canRemove={state === "selecting"} />
								))}
							</div>
						)}
                        {state === "selecting" && (
                            <label class={`flex flex-col items-center py-6 rounded-lg border border-white cursor-pointer transition-colors whiteshadow ${isDragging ? styles.whiteshadow : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                                {/* <input onChange={(e) => setFiles(e.currentTarget.files)} class="hidden" type="file" name="files" multiple required /> */}
                                <input onChange={(e) => {
                                    const files = e.currentTarget.files;
                                    const fileSizeExceedsLimit = Array.from(files).some(file => file.size > 1024 * 1024 * 1024); // 1 GB w bajtach

                                    if (fileSizeExceedsLimit) {
                                        alert("One or more files exceed the 1 GB size limit. Please upload files smaller than 1 GB.");
                                        e.currentTarget.value = null;
                                    } else {
                                        setFiles(files);
                                    }
                                }} class="hidden" type="file" name="files" multiple required />

                                <p>Click to select files or drag and drop here</p>
                            </label>
                        )}
                        {files && files.length > 0 && (
                            <>
                                <div class="my-3 mx-28"></div>
                                <Button text={state === "uploading" ? "Upload in progress" : "Start upload"} disabled={state === "uploading"} onClick={startUpload} />
                            </>
                        )}
                    </form>
                </div>
            ) : (
                <div>
                    <h1 class="text-center text-3xl font-bold mb-6">Files uploaded</h1>
                    <button onClick={copyDownloadUrl} class="bg-neutral-800 px-3 py-3 rounded-md w-full text-left break-all">
                        {downloadUrl}
                    </button>
                    <div class="h-[2px] bg-neutral-800 my-5 mx-28"></div>
                </div>
            )}
        </div>
    );
};