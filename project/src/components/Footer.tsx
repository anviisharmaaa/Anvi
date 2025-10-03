import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-grey text-beige py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/logo-horizontal-transparent.png"
              alt="Anvi Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-beige/80 text-sm leading-body">
              A digital diary, portfolio, and experiment lab where I share my journey
              through tech, life, and everything in between.
            </p>
          </div>

          <div>
            <h3 className="text-pink font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-beige/80 hover:text-pink transition-smooth text-sm">
                  About Me
                </a>
              </li>
              <li>
                <a href="#blogs" className="text-beige/80 hover:text-pink transition-smooth text-sm">
                  Blog Posts
                </a>
              </li>
              <li>
                <a href="#projects" className="text-beige/80 hover:text-pink transition-smooth text-sm">
                  My Projects
                </a>
              </li>
              <li>
                <a href="#journals" className="text-beige/80 hover:text-pink transition-smooth text-sm">
                  Daily Journals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-pink font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-light p-3 rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-light p-3 rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="bg-grey-light p-3 rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-grey-light pt-8">
          <p className="text-center text-beige/60 text-sm flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-pink fill-pink" /> by Anvi
            <span className="mx-2">•</span>
            {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
