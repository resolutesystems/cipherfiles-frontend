import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { useTranslations } from '../../components/i18n';
import { API_URL } from '../../components/helpers';

export function DeletePage() {
    const { translatedText } = useTranslations();

    const { params } = useRoute();
    const defaultUploadId = params.upload_id || '';

    const queryParams = new URLSearchParams(window.location.search);
    const defaultDeleteKey = queryParams.get('key') || '';

    const [uploadId, setUploadId] = useState(defaultUploadId);
    const [deleteKey, setDeleteKey] = useState(defaultDeleteKey);

    const [deleting, setDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUploadId(defaultUploadId);
        setDeleteKey(defaultDeleteKey);
    }, [defaultUploadId, defaultDeleteKey]);

    const handleUploadIdChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (target && target.value) {
            setUploadId(target.value);
        }
    };

    const handleDeleteKeyChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (target && target.value) {
            setDeleteKey(target.value);
        }
    };

    const handleConfirm = async (e: Event) => {
        e.preventDefault();
        try {
        const response = await fetch(`${API_URL}/delete/${uploadId}?key=${deleteKey}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setDeleting(true);
            
            setTimeout(() => {
                setDeleteSuccess(true);
            }, 5000);
        } else {
            const data = await response.json();
            setErrorMessage(data);
        }
        } catch (error) {
            setErrorMessage(translatedText('An error occurred while deleting the file.'));
            console.error('Error occurred:', error);
        }
    };

    return (
        <div>
            {!deleteSuccess ? (
                <>
                    <h1 class="text-center text-3xl font-bold mb-1">{translatedText('Remove your files')}</h1>
                    <form onSubmit={handleConfirm} style={{ cursor: deleting ? 'not-allowed' : 'auto' }}>
                    <div class="mb-4">
                        <label htmlFor="uploadId" class="text-white/50 text-md">{translatedText('Upload ID')}</label>
                        <input
                            id="uploadId"
                            type="text"
                            value={uploadId}
                            onChange={handleUploadIdChange}
                            class={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white ${deleting ? 'cursor-not-allowed' : ''}`}
                            required
                            disabled={deleting}
                        />
                    </div>
                    <div class="mb-4">
                        <label htmlFor="deleteKey" class="text-white/50 text-md">{translatedText('Delete key')}</label>
                        <input
                            id="deleteKey"
                            type="text"
                            value={deleteKey}
                            onChange={handleDeleteKeyChange}
                            class={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white ${deleting ? 'cursor-not-allowed' : ''}`}
                            required
                            disabled={deleting}
                        />
                    </div>
                        <div class="mb-6">
                            <button type="submit" class={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-center break-all ${deleting ? 'cursor-not-allowed' : ''}`} disabled={deleting}>
                                {deleting ? translatedText('Deleting...') : translatedText('Confirm')}
                            </button>
                        </div>
                    </form>


                    {errorMessage && (
                        <>
                            <div class="my-2 mx-28"></div>
                            <p class="text-md text-center text-red-500">{errorMessage}</p>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h1 class="text-center text-3xl font-bold mb-1">{translatedText('Successfully deleted')}</h1>
                    <p class="text-center text-white/50"><a href="/">{translatedText('Return to the home page')}</a></p>
                </>
            )}
        </div>
    );
}
