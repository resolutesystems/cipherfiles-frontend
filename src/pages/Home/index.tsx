import { useState } from 'preact/hooks';
import { File } from '../../components/File';
import { Button } from '../../components/Button';
import { useEffect } from 'preact/hooks';
import styles from './header.module.scss'
import { WEBSITE_URL } from '../../components/helpers';
import { useTranslations } from '../../components/i18n';

export function Home() {
    const { translatedText } = useTranslations();
    const [state, setState] = useState<"selecting" | "uploading" | "uploaded">("selecting");
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [deleteUrl, setDeleteUrl] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const copyDownloadUrl = () => {
        if (downloadUrl) {
            navigator.clipboard.writeText(downloadUrl);
            alert(translatedText('Copied download url to clipboard!'));
        }
    };

    const copyDeleteUrl = () => {
        if (deleteUrl) {
            navigator.clipboard.writeText(deleteUrl);
            alert(translatedText('Copied delete url to clipboard!'));
        }
    };

    const startUpload = async (event: Event) => {
        event.preventDefault();
        const formData = new FormData();
        setState("uploading")
    
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
    
            try {
                const response = await fetch('http://127.0.0.1:3000/upload?encrypt=false', {
                    method: 'POST',
                    body: formData,
                    credentials: "include"
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                    setState("uploaded");
                    setDownloadUrl(`${WEBSITE_URL}/download/${responseData.id}`)
                    setDeleteUrl(`${WEBSITE_URL}/delete/${responseData.id}?key=${responseData.delete_key}`)
                } else {
                    console.error('There was an error while uploading files:', response.statusText);
                    setErrorMessage(response.statusText)
                }
            } catch (error) {
                console.error('Error:', error);
                // Additional error handling
            }
        } else {
            console.error('No files selected for upload.');
        }
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
    
        if (files.length > 1) {
            setErrorMessage(translatedText('You can only upload one file at a time.'));
        } else {
            const totalSize = Array.from(files).reduce((accumulator, file) => accumulator + file.size, 0);
            if (totalSize > 1024 * 1024 * 1024) {
                setErrorMessage(translatedText('Total files size exceeds the 1 GB limit. Please upload files smaller than 1 GB.'));
            } else {
                setFiles(files);
                setErrorMessage("");
            }
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = Array.from(files || []);
        updatedFiles.splice(index, 1);
    
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach(file => {
            dataTransfer.items.add(file);
        });
    
        setFiles(dataTransfer.files);
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
                    <h1 class="text-center text-3xl font-bold mb-1">{translatedText('Upload your files')}</h1>
                    <p class="text-center text-neutral-300 mb-5 font-light"
                    dangerouslySetInnerHTML={{ __html: translatedText('Maximum upload file size: <strong>1 GB</strong>') }}
                    />
                    <form class="flex flex-col" method="post" enctype="multipart/form-data">
                        {files && files.length > 0 && (
							<div id={"file"} class="flex flex-col gap-2 mb-5">
								{Array.from(files).map((file, index) => (
									<File name={file.name} size={file.size} progress={null} key={index} canRemove={state === "selecting"} onRemove={() => removeFile(index)} />
								))}
							</div>
						)}
                        {state === "selecting" && (
                            <label class={`flex flex-col items-center py-6 rounded-lg border border-white cursor-pointer transition-colors whiteshadow ${isDragging ? styles.whiteshadow : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                                <input onChange={(e) => {
                                    const files = e.currentTarget.files;
                                    
                                    const totalSize = Array.from(files).reduce((accumulator, file) => accumulator + file.size, 0);
                                    
                                    if (totalSize > 1024 * 1024 * 1024) {
                                        setErrorMessage(translatedText('Total files size exceeds the 1 GB limit. Please upload files smaller than 1 GB.'));
                                    } else {
                                        setFiles(files);
                                        setErrorMessage("");
                                    }
                                }} class="hidden" type="file" name="files" required />

                                <p>{translatedText('Click to select files or drag and drop here')}</p>
                            </label>
                        )}
                        {errorMessage && (
                            <>
                                <div class="my-2 mx-28"></div>
                                <p className="text-md text-center text-red-500">{errorMessage}</p>
                            </>
                        )}
                        {files && files.length > 0 && state !== "uploading" && (
                            <>
                                <div class="my-3 mx-28"></div>
                                <Button text="Upload" onClick={startUpload} />
                            </>
                        )}
                    </form>
                </div>
            ) : (
                <div>
                    <h1 class="text-center text-3xl font-bold mb-6">{translatedText('File uploaded')}</h1>
                    <p class="text-white/50 text-md">{translatedText('Download link')}</p>
                    <div class="h-[3px] mx-28"></div>
                    <button onClick={copyDownloadUrl} class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all">
                        {downloadUrl}
                    </button>
                    <div class="h-[1px] my-2 mx-28"></div>
                    <p class="text-white/50 text-md">{translatedText('Delete link')}</p>
                    <div class="h-[3px] mx-28"></div>
                    <button onClick={copyDeleteUrl} class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all">
                        {deleteUrl}
                    </button>
                </div>
            )}
        </div>
    );
};
