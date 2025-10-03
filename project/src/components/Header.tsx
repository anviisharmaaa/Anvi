import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'projects', label: 'Projects' },
    { id: 'journals', label: 'Journals' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? 'bg-grey-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/logo-horizontal-transparent.png"
              alt="Anvi Logo"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-smooth ${
                  currentPage === item.id
                    ? 'text-pink'
                    : 'text-beige hover:text-pink'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-dark transition-smooth font-medium"
            >
              Admin
            </button>
          </div>

          <button
            className="md:hidden text-beige hover:text-pink transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-grey/95 backdrop-blur-sm rounded-lg mt-2 mb-4 py-4 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 text-base font-medium transition-smooth ${
                  currentPage === item.id
                    ? 'text-pink bg-pink/10'
                    : 'text-beige hover:text-pink hover:bg-pink/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 mt-2 text-base font-medium text-white bg-pink rounded-lg mx-4 hover:bg-pink-dark transition-smooth"
            >
              Admin
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
