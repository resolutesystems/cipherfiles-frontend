import { useState } from 'preact/hooks';
import './navbar.css';

export function Navbar() {
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredLink(index);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    return (
        <header class="flex justify-between text-white items-center px-4 py-2 mx-[5%] mt-5">
            <div class="flex items-center">
                {/* Nazwa strony */}
                <h1 class="text-lg font-semibold mr-8">Nazwa Strony</h1>

                {/* Menu */}
                <nav class="text-md flex ml-40 md:flex">
                    <a 
                        href="/security" 
                        class="menu-link"
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Security
                    </a>
                    <a 
                        href="/learn" 
                        class="menu-link"
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Learn
                    </a>
                    <a 
                        href="/explore" 
                        class="menu-link"
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Explore
                    </a>
                    <a 
                        href="https://help.phantom.app/hc/en-us" 
                        class="menu-link"
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Support
                    </a>
                    {hoveredLink !== null && (
                        <span class={`underline underline-${hoveredLink}`}></span>
                    )}
                </nav>
            </div>

            {/* Przycisk do pobierania */}
            <a href="/download" class="text-sm">Download</a>
        </header>
    );
}
