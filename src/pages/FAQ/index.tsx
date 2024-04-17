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

export function FAQ() {
    const [state, setState] = useState<"selecting" | "uploading" | "uploaded">("selecting");
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
	const [hamburgerOpen, setHamburgerOpen] = useState(false)

    useEffect(() => {
        gsap.fromTo('#gay', {
            translateX: '-=100',
        }, {
            translateX: '0', duration: .3, ease: 'back', stagger: .2,
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
        <div id={"gay"}>
            <h2 class="text-center font-bold text-3xl mb-2">FAQ</h2>
            <ul class="flex flex-col gap-5">
                <li>
                    <p class="text-xl font-medium mb-1">Who has the decryption key?</p>
                    <p class="font-light">Decryption key is given in the URL after uploading encrypted files. We don't store the key anywhere on our servers thus you need to take care of it beacuse we can't recover it.</p>
                </li>
                <li>
                    <p class="text-xl font-medium mb-1">What data do you collect?</p>
                    <p class="font-light">We do not store any data about you nor how you use the service. You can read more at <a class="link" href="/terms-of-service">terms of service</a>.</p>
                </li>
                <li>
                    <p class="text-xl font-medium mb-1">Someone uploaded illegal content</p>
                    <p class="font-light">If someone sent you a download link with illegal content, you are obligated to report it through <a class="link" href="/report-abuse">report abuse</a> form!</p>
                </li>
                <li>
                    <p class="text-xl font-medium mb-1">Why it takes so long to upload/download encrypted files?</p>
                    <p class="font-light">The main reason behind this is encryption and decryption, which can take long time with large files. Aswell as limited server resources.</p>
                </li>
            </ul>
        </div>
    );
};