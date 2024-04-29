import { useState, useEffect } from 'preact/hooks';
import { File } from '../../components/File';
import { Button } from '../../components/Button';
import styles from './header.module.scss'
import { WEBSITE_URL, API_URL } from '../../components/helpers';
import { useTranslations } from '../../components/i18n';

export function Home() {
    const { translatedText } = useTranslations();
    const [state, setState] = useState<"selecting" | "uploading" | "uploaded">("selecting");
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [deleteUrl, setDeleteUrl] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [decryptionKey, setDecryptionKey] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [expiryOption, setExpiryOption] = useState<"hours" | "downloads" | null>(null);
    const [expiryValue, setExpiryValue] = useState<number | null>(null);
    const [addToHistory, setAddToHistory] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<{
        id: string;
        url: string;
        name: string;
        size: number;
        createdAt: string;
        expiresAt: string | null;
    }[]>([]);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            const parsedFiles = JSON.parse(storedFiles);
            if (Array.isArray(parsedFiles)) {
                setUploadedFiles(parsedFiles);
            }
        }
    }, []);

    const copyDownloadUrl = () => {
        let urlToCopy = downloadUrl;

        if (isEncrypted && decryptionKey) {
            urlToCopy += `?key=${decryptionKey}`;
        }

        if (urlToCopy) {
            navigator.clipboard.writeText(urlToCopy);
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
        setState('uploading');
    
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
    
            try {
                const xhr = new XMLHttpRequest();
                let url = `${API_URL}/upload`;
                const expiryParam = getExpiryParam();
    
                if (isEncrypted) {
                    url += `?encrypt=true${expiryParam}`;
                } else {
                    url += `?encrypt=false${expiryParam}`;
                }
    
                xhr.open('POST', url, true);
                xhr.withCredentials = true;
    
                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        updateProgressBar(percentComplete);
                    }
                });
    
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const responseData = JSON.parse(xhr.responseText);
                            const uploadInfo = {
                                id: responseData.id,
                                url: `${WEBSITE_URL}/download/${responseData.id}`,
                                name: files[0].name,
                                size: files[0].size,
                                createdAt: new Date().toISOString(),
                                expiresAt: expiryOption === "hours" ? calculateExpiryTime() : null,
                            };
    
                            if (expiryOption === "downloads") {
                                uploadInfo.expiresAt = `Expires after ${expiryValue} downloads`;
                            }
    
                            if (addToHistory) {
                                setUploadedFiles(prevUploadedFiles => [...prevUploadedFiles, uploadInfo]);
                                localStorage.setItem('uploadedFiles', JSON.stringify([...uploadedFiles, uploadInfo]));
                            }
    
                            setDownloadUrl(`${WEBSITE_URL}/download/${responseData.id}`);
                            setDeleteUrl(`${WEBSITE_URL}/delete/${responseData.id}?key=${responseData.deleteKey}`);
                            setState('uploaded');
                            if (isEncrypted && responseData.decryptionKey) {
                                setDecryptionKey(responseData.decryptionKey);
                            }
                        } else {
                            setErrorMessage("There was an error while uploading files");
                            setState('selecting');
                        }
                    }
                };
    
                xhr.send(formData);
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error);
                setState('selecting');
            }
        } else {
            console.error('No files selected for upload.');
            setErrorMessage('No files selected for upload.');
            setState('selecting');
        }
    };
    
    const getExpiryParam = () => {
        if (expiryOption && expiryValue !== null) {
            if (expiryOption === "hours") {
                return `&expiry_hours=${expiryValue}`;
            } else if (expiryOption === "downloads") {
                return `&expiry_downloads=${expiryValue}`;
            }
        }
        return "";
    };

    const calculateExpiryTime = () => {
        if (expiryOption === "hours" && expiryValue !== null) {
            const expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours() + expiryValue);
            return expiryTime.toISOString();
        }
        return null;
    };

    const updateProgressBar = (percentComplete: number) => {
        setUploadProgress(percentComplete);
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = percentComplete + '%';
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

    return (
        <div>
            {state === "selecting" || state === "uploading" ? (
                <div>
                    <h1 class="text-center text-3xl font-bold mb-1">
                        {state === "uploading" ? translatedText('Uploading your files') : translatedText('Upload your files')}
                    </h1>
                    <p class="text-center text-neutral-300 mb-5 font-light"
                        dangerouslySetInnerHTML={{ __html: state === "uploading" ?
                        `${uploadProgress < 100 ? Math.floor(uploadProgress) : uploadProgress.toFixed(2)}% ${translatedText('complete')}` :
                        translatedText('Maximum upload file size: <strong>1 GB</strong>') }}
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

                                <p class="px-3 text-center">{translatedText('Click to select files or drag and drop here')}</p>
                            </label>
                        )}
                        {files && files.length > 0 && (
                            <>
                                {state !== "uploading" && (
                                    <>
                                        <div class="my-3 mx-28"></div>
                                        <div class={styles.encrypted}>
                                            {translatedText('Wanna encrypt a file?')}
                                            <button 
                                                class={`${styles.encryptedButton} ${isEncrypted ? styles.encryptedButtonActive : ''}`} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsEncrypted(!isEncrypted);
                                                }}
                                                >
                                                &#x200B;
                                                <div class={styles.encryptedButtonDot}/>
                                            </button>
                                        </div>
                                        <div class="my-3">
                                        <div class={styles.encrypted}>
                                            {translatedText('Would you like this file to expire?')}
                                            <button 
                                                class={`${styles.encryptedButton} ${expiryOption ? styles.encryptedButtonActive : ''}`} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setExpiryOption(expiryOption ? null : 'hours');
                                                }}
                                            >
                                                &#x200B;
                                                <div class={styles.encryptedButtonDot}/>
                                            </button>
                                        </div>
                                        {/* <div class="my-3"></div> */}
                                        {expiryOption && (
                                            <div class="my-3 flex items-center">
                                                <span class="mr-2">
                                                    {expiryOption === "hours" ? translatedText('Expiry after') : translatedText('Expiry after')}
                                                </span>
                                                <input
                                                    class="mr-2 w-24 flex px-3 py-2 font-light rounded-lg border border-white whiteshadow bg-transparent text-center
                                                    [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                                    "
                                                    type="number"
                                                    value={expiryValue ?? ''}
                                                    min="0"
                                                    onChange={(e) => setExpiryValue(parseInt(e.currentTarget.value))}
                                                />
                                                <span class="mr-2">
                                                    <a onClick={() => setExpiryOption('hours')} style={{ textDecoration: expiryOption === 'hours' ? 'underline' : 'none' }}>{translatedText('hours')}</a> / <a onClick={() => setExpiryOption('downloads')} style={{ textDecoration: expiryOption === 'downloads' ? 'underline' : 'none' }}>{translatedText('downloads')}</a>
                                                </span>
                                            </div>
                                        )}
                                        </div>
                                        <div class={styles.encrypted}>
                                            {translatedText('Save this file in local history?')}
                                            <button 
                                                class={`${styles.encryptedButton} ${addToHistory ? styles.encryptedButtonActive : ''}`} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setAddToHistory(!addToHistory);
                                                }}
                                            >
                                                &#x200B;
                                                <div class={styles.encryptedButtonDot}/>
                                            </button>
                                        </div>
                                    </>
                                )}
                                {state === "uploading" && (
                                    <>
                                    <div class="border border-white whiteshadow px-3 py-3 rounded-md w-full relative overflow-hidden">
                                        <div id="progress-bar" class="absolute top-0 left-0 h-full bg-white"></div>
                                    </div>
                                    </>
                                )}
                                &#x200B;
                                {state !== "uploading" && (
                                    <Button text={translatedText('Upload')} onClick={startUpload} />
                                )}
                            </>
                        )}
                        {errorMessage && (
                            <>
                                {state === "uploading" && (
                                    <>
                                    <div class="my-2 mx-28"></div>
                                    <p class="text-md text-center text-red-500">{errorMessage}</p>
                                    </>
                                )}
                                {state !== "uploading" && (
                                    <>
                                    <div class="my-2 mx-28"></div>
                                    <p class="text-md text-center text-red-500">{errorMessage}</p>
                                    </>
                                )}
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
                        {`${downloadUrl}${isEncrypted && decryptionKey ? `?key=${decryptionKey}` : ''}`}
                    </button>
                    <div class="h-[1px] my-2 mx-28"></div>
                    <p class="text-white/50 text-md">{translatedText('Delete link')}</p>
                    <div class="h-[3px] mx-28"></div>
                    <button onClick={copyDeleteUrl} class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all">
                        {deleteUrl}
                    </button>
                    <div class="h-[1px] my-2 mx-28"></div>
                    <p class="text-center">
                    <a class="text-accent text-xl" onClick={() => window.location.href="/"}>{translatedText('Go back!')}</a>
                    </p>
                </div>
            )}
            {state !== "uploading" && !files && uploadedFiles.length > 0 && (
                <div class="mt-6 text-center text-accent">
                    <a href="/history">{translatedText('See history of your uploaded files')}</a>
                </div>
            )}
        </div>
    );
};
