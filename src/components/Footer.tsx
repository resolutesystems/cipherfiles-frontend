import { h } from 'preact';
import { gsap } from 'gsap';
import { useEffect } from 'preact/hooks';

export function Footer() {

    useEffect(() => {
        gsap.fromTo('#footer', {
            translateY: '+=50', autoAlpha: 0, scale: .8,
        }, {
            translateY: 0, autoAlpha: 1, scale: 1, duration: .4, ease: 'back', delay: .4, stagger: .1,
        })
    })

    return (
        <div id={"footer"}>
            <ul class="flex gap-3">
                <a class="text-neutral-500" href="/">home</a>
                <li><a class="text-neutral-500" href="/tos">tos</a></li>
                <li><a class="text-neutral-500" href="/report-abuse">report abuse</a></li>
                <li><a class="text-neutral-500" href="/faq">faq</a></li>
                <li><a class="text-neutral-500" href="https://t.me/cipherfiles" target="_blank" rel="noopener noreferrer">our community</a></li>
            </ul>
        </div>
    );
}