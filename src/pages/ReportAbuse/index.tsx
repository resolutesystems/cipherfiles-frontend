import { gsap } from 'gsap'
import { useEffect } from 'preact/hooks';

export function ReportAbuse() {

    useEffect(() => {
        gsap.fromTo('#gay', {
            translateX: '-=100',
        }, {
            translateX: '0', duration: .3, ease: 'back', stagger: .2,
        })
    })

    return (
        <div id={"gay"}>
            <h2 class="text-center font-bold text-3xl mb-2">Report Abuse</h2>
            <p class="p-footer" style="translate: none; rotate: none; scale: none; opacity: 1; visibility: inherit; transform: translate(0px);">
                If you want to report illegal or copyrighted content, please email us at{' '}
                <a class="text-accent">abuse <b>[at]</b> cipherfiles <b>[dot]</b> com</a>.
                <div class="my-3 mx-28"></div>
            </p>
            Remember to include as much information as possible, including the full download URL (with decryption key) and a description of the content.
        </div>
    );
};