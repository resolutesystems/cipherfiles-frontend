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
	const [hamburgerOpen, setHamburgerOpen] = useState(false)

    useEffect(() => {
			gsap.fromTo(
				'#home',
				{
					translateX: '-=100',
					autoAlpha: 0,
					scale: .8,
				},
				{
					translateX: 0,
					autoAlpha: 1,
					scale: 1,
					duration: .4,
					ease: 'back',
				})
    })

    const copyDownloadUrl = () => {
        if (downloadUrl) {
            navigator.clipboard.writeText(downloadUrl);
            alert("Copied download url to clipboard!");
        }
    };

    const startUpload = () => {
        // Implementacja logiki przesyłania plików
    };

    return (
        <div>
            {state === "selecting" || state === "uploading" ? (
                <div>
                    <h1 class="text-center text-3xl font-bold mb-1">Upload your files</h1>
                    <p class="text-center text-neutral-300 mb-5 font-light">Max size <strong>1 GB</strong></p>
                    <form class="flex flex-col" method="post" enctype="multipart/form-data">
                        {files && files.length > 0 && (
							<div class="flex flex-col gap-2 mb-5">
								{Array.from(files).map((file, index) => (
									<File name={file.name} size={file.size} progress={null} key={index} canRemove={state === "selecting"} />
								))}
							</div>
						)}
                        {state === "selecting" && (
                            <label class="flex flex-col items-center py-6 rounded-lg border border-white cursor-pointer transition-colors whiteshadow">
                                <input onChange={(e) => setFiles(e.currentTarget.files)} class="hidden" type="file" name="files" multiple required />
                                <p>Click to select files or drag and drop here</p>
                            </label>
                        )}
                        {/* <div class="h-[2px] bg-neutral-800 my-5 mx-28"></div> */}
                        <div class="my-3 mx-28"></div>
                        <Button text={state === "uploading" ? "Upload in progress" : "Start upload"} disabled={state === "uploading"} onClick={startUpload} />
                    </form>
					{/* <Link className={styles.link}
									activeClassName={styles.linkActive}
									href={'/'}
									onClick={() => {
										setHamburgerOpen(false)
									}}>
							Home
						</Link> */}
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