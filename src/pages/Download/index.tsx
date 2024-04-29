import { useState, useEffect } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { useTranslations } from '../../components/i18n';
import { File } from '../../components/File';
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
                    fetch(`${API_URL}/preview/${uploadId}`)
                        .then(res => res.blob())
                        .then(res => {
                            const imageUrl = URL.createObjectURL(res);
                            setPreview(imageUrl);
                        })
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
                            <File
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
                            <img src={preview} class="w-full rounded-lg border border-white whiteshadow" onContextMenu={(e) => e.preventDefault()} draggable={false} />
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
