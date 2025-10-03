import { ArrowRight, BookOpen, Code, Heart } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img
              src="/anvi sg.jpg"
              alt="Anvi"
              className="w-40 h-40 rounded-full object-cover border-4 border-pink shadow-2xl hover-lift"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-beige mb-6 leading-heading">
            Hi, I'm <span className="text-pink">Anvi</span>
          </h1>

          <p className="text-xl md:text-2xl text-beige/80 mb-8 leading-body max-w-3xl mx-auto">
            Welcome to my digital space where I share my journey through tech, life, and
            everything in between. This is my digital diary, portfolio, and experiment lab.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate('blogs')}
              className="group flex items-center gap-2 px-8 py-4 bg-pink text-white rounded-lg hover:bg-pink-dark transition-smooth hover-lift font-medium text-lg"
            >
              <BookOpen size={24} />
              Read My Blogs
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="group flex items-center gap-2 px-8 py-4 bg-beige text-navy rounded-lg hover:bg-beige-light transition-smooth hover-lift font-medium text-lg"
            >
              <Code size={24} />
              View Projects
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="group flex items-center gap-2 px-8 py-4 border-2 border-pink text-pink rounded-lg hover:bg-pink hover:text-white transition-smooth font-medium text-lg"
            >
              <Heart size={24} />
              Contact Me
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-grey rounded-xl p-6 hover-lift cursor-pointer" onClick={() => onNavigate('blogs')}>
              <div className="w-12 h-12 bg-pink/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-pink" />
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">Blogs</h3>
              <p className="text-beige/70 leading-body">
                Thoughts on tech, life, and personal experiments
              </p>
            </div>

            <div className="bg-grey rounded-xl p-6 hover-lift cursor-pointer" onClick={() => onNavigate('projects')}>
              <div className="w-12 h-12 bg-pink/20 rounded-lg flex items-center justify-center mb-4">
                <Code size={24} className="text-pink" />
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">Projects</h3>
              <p className="text-beige/70 leading-body">
                Showcase of my work and coding experiments
              </p>
            </div>

            <div className="bg-grey rounded-xl p-6 hover-lift cursor-pointer" onClick={() => onNavigate('journals')}>
              <div className="w-12 h-12 bg-pink/20 rounded-lg flex items-center justify-center mb-4">
                <Heart size={24} className="text-pink" />
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">Journals</h3>
              <p className="text-beige/70 leading-body">
                Daily thoughts and personal reflections
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
