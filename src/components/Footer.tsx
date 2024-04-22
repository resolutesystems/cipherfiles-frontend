import { gsap } from 'gsap';
import { useEffect } from 'preact/hooks';
import { COMMUNITY_URL, FOOTER_QUOTE } from './helpers';
import { useTranslations } from './i18n';

export function Footer() {
    const { translatedText } = useTranslations();

    useEffect(() => {
        gsap.fromTo('#footer', {
            translateY: '+=50', autoAlpha: 0, scale: .8,
        }, {
            translateY: 0, autoAlpha: 1, scale: 1, duration: .4, ease: 'back', delay: .4, stagger: .1,
        })
    })

    return (
        <div id="footer" style={{ width: '690px', maxWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ul class="flex gap-3" style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
                <a class="text-neutral-500" href="/">{translatedText('home')}</a>
                <li><a class="text-neutral-500" href="/tos">{translatedText('tos')}</a></li>
                <li><a class="text-neutral-500" href="/report-abuse">{translatedText('report abuse')}</a></li>
                <li><a class="text-neutral-500" href="/faq">{translatedText('faq')}</a></li>
                <li><a class="text-neutral-500" href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">{translatedText('our community')}</a></li>
            </ul>
            <p class="text-neutral-500 text-sm">{FOOTER_QUOTE}</p>
        </div>
    );
    
}