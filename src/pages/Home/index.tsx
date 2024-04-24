import { useState } from 'preact/hooks';
import { File } from '../../components/File';
import { Button } from '../../components/Button';
import { useEffect } from 'preact/hooks';
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
                xhr.open('POST', `${API_URL}/upload?encrypt=${isEncrypted}`, true);
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
                            setState('uploaded');
                            setDownloadUrl(`${WEBSITE_URL}/download/${responseData.id}`);
                            setDeleteUrl(`${WEBSITE_URL}/delete/${responseData.id}?key=${responseData.deleteKey}`);
                            if (isEncrypted && responseData.decryptionKey) {
                                setDecryptionKey(responseData.decryptionKey);
                            }
                        } else {
                            // console.error('There was an error while uploading files');
                            setErrorMessage("There was an error while uploading files");
                        }
                    }
                };

                xhr.send(formData);
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error);
            }
        } else {
            console.error('No files selected for upload.');
            setErrorMessage('No files selected for upload.');
        }
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
                                    <p class="text-md text-center text-red-500">{errorMessage}</p>
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
                </div>
            )}
        </div>
    );
};
