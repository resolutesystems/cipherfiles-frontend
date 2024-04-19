import { gsap } from 'gsap'
import { useEffect } from 'preact/hooks';
import { ABUSE_EMAIL } from '../../components/helpers';
import { useTranslations } from '../../components/i18n';

export function ReportAbuse() {
    const { translatedText } = useTranslations();

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
            <h2 class="text-center font-bold text-3xl mb-2">{translatedText('Report Abuse')}</h2>
            <p class="p-footer" style="translate: none; rotate: none; scale: none; opacity: 1; visibility: inherit; transform: translate(0px);">
                {translatedText('If you want to report illegal or copyrighted content, please email us at')}{' '}
                <a class="text-accent">
                <br/>
                {username} <b>[at]</b> {domainName} <b>[dot]</b> {tld}
                </a>
                <div class="my-3 mx-28"></div>
            </p>
            {translatedText('Remember to include as much information as possible, including the full download URL (with decryption key) and a description of the content.')}
        </div>
    );
};