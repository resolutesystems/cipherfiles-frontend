import { gsap } from 'gsap'
import { useEffect } from 'preact/hooks';
import { ABUSE_EMAIL } from '../../components/helpers';

export function ReportAbuse() {
    const [username, domain] = ABUSE_EMAIL.split('@');
    const [domainName, tld] = domain.split('.');

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
                <a class="text-accent">
                {username} <b>[at]</b> {domainName} <b>[dot]</b> {tld}
                </a>
                <div class="my-3 mx-28"></div>
            </p>
            Remember to include as much information as possible, including the full download URL (with decryption key) and a description of the content.
        </div>
    );
};