import { useEffect } from 'preact/hooks';
import { gsap } from 'gsap';
import styles from './faq.module.scss';

export function FAQ() {
    useEffect(() => {
        gsap.fromTo('#gay', {
            translateX: '-=100',
        }, {
            translateX: '0', duration: .3, ease: 'back', stagger: .2,
        })
    })

    useEffect(() => {
        const faqItems = document.querySelectorAll(`.${styles.step}`);

        faqItems.forEach(item => {
            const whitebar = item.querySelector(`.white-bar`);

            const handleMouseEnter = () => {
                item.setAttribute('data-open', 'true');
                if (whitebar) {
                    whitebar.classList.add(styles.stepLine);
                }
            };

            const handleMouseLeave = () => {
                item.setAttribute('data-open', 'false');
                if (whitebar) {
                    whitebar.classList.remove(styles.stepLine);
                }
            };

            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <div id={"gay"}>
            <h2 class="text-center font-bold text-3xl mb-2">FAQ</h2>
            <div class={styles.interview}>
                {faqItemsData.map((item, index) => (
                    <FAQItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

const faqItemsData = [
    {
        title: 'Who has the decryption key?',
        description: `Decryption key is given in the URL after uploading encrypted files. We don't store the key anywhere on our servers thus you need to take care of it because we can't recover it.`,
    },
    {
        title: 'What data do you collect?',
        description: `We do not store any data about you nor how you use the service. You can read more at <a class="text-accent link" href="/terms-of-service">terms of service</a>.`,
    },
    {
        title: 'Someone uploaded illegal content',
        description: 'If someone sent you a download link with illegal content, you are obligated to report it through <a class="text-accent link" href="/report-abuse">report abuse</a> form!',
    },
    {
        title: 'Why it takes so long to upload/download encrypted files?',
        description: 'The main reason behind this is encryption and decryption, which can take long time with large files. As well as limited server resources.',
    },
];

function FAQItem({ title, description }) {
    return (
        <div itemprop="mainEntity" itemtype="https://schema.org/Question" data-open="false" class={styles.step}>
            <div itemprop="name" class={styles.stepTitle}>
                <h3>{title}</h3>
                <div class="white-bar"></div>
            </div>
            <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" class={styles.description} dangerouslySetInnerHTML={{ __html: description }} >
                <p>{description}</p>
            </div>
        </div>
    );
}
