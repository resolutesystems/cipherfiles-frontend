import { useState, useEffect } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { useTranslations } from '../../components/i18n';
import { FileComponent } from '../../components/File';
import { API_URL } from '../../components/helpers';

export function DownloadPage() {
    const { translatedText } = useTranslations();
    const { params } = useRoute();
    const defaultUploadId = params.upload_id || '';

    const queryParams = new URLSearchParams(window.location.search);
    const defaultDeleteKey = queryParams.get('key') || '';

    const [uploadId, setUploadId] = useState(defaultUploadId);
    const [decryptionKey, setDecryptionKey] = useState(defaultDeleteKey);
    const [fileInfo, setFileInfo] = useState(null);
    const [showDecryptionKeyInput, setShowDecryptionKeyInput] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [preview, setPreview] = useState(undefined);
    const [contentType, setContentType] = useState('');

    useEffect(() => {
        setUploadId(defaultUploadId);
        setFileInfo(null);
        setShowForm(true);
    }, [defaultUploadId, defaultDeleteKey]);

    const handleUploadIdChange = (e) => {
        setUploadId(e.target.value);
        setFileInfo(null);
        setShowDecryptionKeyInput(false);
        setShowForm(true);
        setErrorMessage('');
    };

    const handleDecryptionKeyChange = (e) => {
        setDecryptionKey(e.target.value);
    };

    // const fetchPreview = async (uploadId) => {
    //     try {
    //         const previewResponse = await fetch(`${API_URL}/preview/${uploadId}`);
    //         if (previewResponse.ok) {
    //             const contentType = previewResponse.headers.get('Content-Type');
    //             if (contentType.includes('embedded=1')) {
    //                 if (contentType.startsWith('image/') || contentType.startsWith('video/')) {
    //                     const blob = await previewResponse.blob();
    //                     const previewUrl = URL.createObjectURL(blob);
    //                     setMetaTags(previewUrl, contentType);
    //                 }
    //             }
    //         } else {
    //             const errorData = await previewResponse.json();
    //             if (errorData.errorCode === 'preview-not-supported') {
    //                 console.error('Preview not supported');
    //             } else {
    //                 console.error('Error fetching file preview:', errorData);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching file preview:', error.message);
    //     }
    // };
    
    // const setMetaTags = (previewUrl, contentType) => {
    //     const head = document.head;

    //     const existingOgImage = document.querySelector('meta[property="og:image"]');
    //     if (existingOgImage) head.removeChild(existingOgImage);
    
    //     const existingOgVideo = document.querySelector('meta[property="og:video"]');
    //     if (existingOgVideo) head.removeChild(existingOgVideo);
    
    //     const metaTag = document.createElement('meta');
    //     if (contentType.startsWith('image/')) {
    //         metaTag.setAttribute('property', 'og:image');
    //     } else if (contentType.startsWith('video/')) {
    //         metaTag.setAttribute('property', 'og:video');
    //     }
    //     metaTag.setAttribute('content', previewUrl);
    //     head.appendChild(metaTag);
    // };

    // useEffect(() => {
    //     fetchPreview(defaultUploadId);
    // }, []);

    // todo: fix embedded info request 123124214

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = `${API_URL}/info/${uploadId}`;
            if (showDecryptionKeyInput && decryptionKey) {
                url += `?key=${decryptionKey}`;
            }
    
            const response = await fetch(url);
            const data = await response.json();
    
            if (!response.ok) {
                if (data.errorCode === "missing-key") {
                    setShowDecryptionKeyInput(true);
                    setErrorMessage('');
                } else {
                    throw new Error(data.error);
                }
            } else {
                setFileInfo(data);
                setShowDecryptionKeyInput(false);
                setShowForm(false);
                setErrorMessage('');
    
                if (data.bytes <= 104857600) {
                    const previewResponse = await fetch(`${API_URL}/preview/${uploadId}`);
                    if (previewResponse.ok) {
                        const contentType = previewResponse.headers.get('Content-Type');
                        setContentType(contentType);
                        if (contentType && (contentType.startsWith('image/') || contentType.startsWith('video/'))) {
                            const blob = await previewResponse.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setPreview(imageUrl);
                        } else {
                            setPreview(undefined);
                        }
                    } else {
                        const errorData = await previewResponse.json();
                        if (errorData.errorCode === 'preview-not-supported') {
                            setPreview(undefined);
                        } else {
                            console.error('Error fetching file preview:', errorData);
                        }
                    }
                }
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error fetching file info:', error.message);
        }
    };    

    const handleDownload = async () => {
        try {
            if (!fileInfo) {
                throw new Error("Please submit the form to fetch file info before providing the decryption key.");
            }

            let url = `${API_URL}/download/${uploadId}`;
            if (decryptionKey) {
                url += `?key=${decryptionKey}`;
            }
            window.location.href = url;
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error downloading file:', error.message);
        }
    };

    return (
        <div>
            <h1 class="text-center text-3xl font-bold mb-1">{translatedText('Download your files')}</h1>
            <div class="my-6 mx-28"></div>
            {showForm && (
                <form onSubmit={handleSubmit} class="mb-6">
                    <div class="mb-4">
                        <label for="uploadId" class="text-white/50 text-md">{translatedText('Upload ID')}</label>
                        <input
                            id="uploadId"
                            type="text"
                            value={uploadId}
                            onChange={handleUploadIdChange}
                            class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white"
                            required
                        />
                    </div>
                    {showDecryptionKeyInput && (
                        <div class="mb-4">
                            <label for="decryptionKey" class="text-white/50 text-md">{translatedText('Decryption Key')}</label>
                            <input
                                id="decryptionKey"
                                type="text"
                                value={decryptionKey}
                                onChange={handleDecryptionKeyChange}
                                class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white"
                                required
                            />
                        </div>
                    )}
                    <button type="submit" class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-center break-all">
                        {translatedText('Confirm')}
                    </button>
                </form>
            )}
            {fileInfo && (
                <>
                    <div>
                        <div class="my-3 mx-28"></div>
                            <FileComponent
                                name={fileInfo.fileName}
                                size={fileInfo.bytes}
                                progress={null}
                                canRemove={false}
                                onRemove={() => {}}
                            />
                        </div>
                    <div>
                    {preview !== undefined && (
                            <div>
                                <div class="my-3 mx-28"></div>
                                {contentType.startsWith('image/') ? (
                                    <img src={preview} class="w-full rounded-lg border border-white whiteshadow" onContextMenu={(e) => e.preventDefault()} draggable={false} />
                                ) : contentType.startsWith('video/') ? (
                                    <video src={preview} class="w-full rounded-lg border border-white whiteshadow" controls />
                                ) : (
                                    setPreview(undefined)
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            {errorMessage && (
                <>
                <div class="my-2 mx-28"></div>
                <p class="text-md text-center text-red-500">{errorMessage}</p>
                </>
            )}
            {fileInfo && !showDecryptionKeyInput && !showForm && (
                <>
                    <div class="my-3 mx-28"></div>
                    <button onClick={handleDownload} class="border border-white whiteshadow px-3 py-3 rounded-md w-full text-center break-all">
                        {translatedText('Download')}
                    </button>
                    <div class="my-3 mx-28"></div>
                    <p class="text-white/50 text-md text-right">{translatedText('Downloads')}: {fileInfo.downloads}</p>
                </>
            )}
        </div>
    );
}
