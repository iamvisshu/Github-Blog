import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * ScrollNav Component
 * Provides floating buttons to jump to the top or bottom of the page.
 * Respects user's reduced-motion settings and handles visibility based on scroll depth.
 */
const ScrollNav = ({ showOnMobile = false }) => {
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;

            // Show "Top" button after scrolling down 400px
            setShowTop(scrollY > 400);

            // Hide "Bottom" button when within 400px of the footer
            const isNearBottom = scrollY > (totalHeight - viewportHeight - 400);
            setShowBottom(!isNearBottom);
        };

        // Use a throttled or debounced listener for better performance
        let timeoutId = null;
        const throttledScroll = () => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    handleScroll();
                    timeoutId = null;
                }, 100);
            }
        };

        window.addEventListener('scroll', throttledScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', throttledScroll);
    }, []);

    const scrollTo = (position) => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
            top: position === 'top' ? 0 : document.documentElement.scrollHeight,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    };

    return (
        <div className={`fixed bottom-8 right-3 z-50 flex flex-col gap-3 pointer-events-none ${showOnMobile ? 'flex' : 'hidden md:flex'}`}>
            {/* Scroll to Top */}
            <button
                onClick={() => scrollTo('top')}
                aria-label="Scroll to Top"
                className={`scroll-nav-btn pointer-events-auto rounded-full glass-morphism text-teal-600 dark:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xl flex items-center justify-center ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <ArrowUp size={22} strokeWidth={2.5} />
            </button>

            {/* Scroll to Bottom */}
            <button
                onClick={() => scrollTo('bottom')}
                aria-label="Scroll to Bottom"
                className={`scroll-nav-btn pointer-events-auto rounded-full glass-morphism text-teal-600 dark:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xl flex items-center justify-center ${showBottom ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
            >
                <ArrowDown size={22} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ScrollNav;
