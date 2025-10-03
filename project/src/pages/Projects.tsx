import { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Star } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink border-r-transparent mb-4"></div>
          <p className="text-beige text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-beige mb-4 leading-heading">
            My <span className="text-pink">Projects</span>
          </h1>
          <p className="text-xl text-beige/80 leading-body">
            A showcase of my work and coding experiments
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-beige/60 text-xl">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`bg-grey rounded-2xl overflow-hidden hover-lift ${
                  project.is_featured ? 'border-2 border-pink' : ''
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-grey-light rounded-xl flex items-center justify-center">
                        <span className="text-beige/50 text-4xl">🚀</span>
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                    {project.is_featured && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star size={20} className="text-pink fill-pink" />
                        <span className="text-pink font-semibold">Featured Project</span>
                      </div>
                    )}

                    <h2 className="text-3xl font-bold text-beige mb-4 leading-heading">
                      {project.title}
                    </h2>

                    <p className="text-beige/80 mb-6 leading-body">
                      {project.description}
                    </p>

                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink/20 text-pink text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-beige/60 text-sm">
                        <Eye size={16} />
                        {project.view_count} views
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-grey-light text-beige rounded-lg hover:bg-pink hover:text-white transition-smooth font-medium"
                        >
                          <Github size={20} />
                          View Code
                        </a>
                      )}
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-pink text-white rounded-lg hover:bg-pink-dark transition-smooth font-medium"
                        >
                          <ExternalLink size={20} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
