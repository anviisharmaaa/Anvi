import { GraduationCap, Heart, Sparkles } from 'lucide-react';

export function About() {
  const timeline = [
    {
      year: '2024',
      title: 'Started My Journey',
      description: 'Began exploring web development and building projects',
    },
    {
      year: '2023',
      title: 'Learning & Growing',
      description: 'Dove deep into programming and technology',
    },
  ];

  const hobbies = [
    { name: 'Coding', icon: '💻' },
    { name: 'Reading', icon: '📚' },
    { name: 'Photography', icon: '📷' },
    { name: 'Music', icon: '🎵' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Art', icon: '🎨' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-beige mb-4 leading-heading">
            About <span className="text-pink">Me</span>
          </h1>
          <p className="text-xl text-beige/80 leading-body">
            Get to know more about who I am and what I do
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center items-center">
            <img
              src="/anvi sg.jpg"
              alt="Anvi"
              className="w-full max-w-sm rounded-2xl shadow-2xl hover-lift border-4 border-pink/20"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-pink mb-6">Hi, I'm Anvi</h2>
            <p className="text-beige/90 mb-4 leading-body">
              I'm a passionate developer and lifelong learner who loves exploring the
              intersection of technology and creativity. This website is my personal space
              to document my journey, share my thoughts, and showcase the projects I'm
              working on.
            </p>
            <p className="text-beige/90 mb-4 leading-body">
              When I'm not coding, you can find me reading, taking photos, or exploring new
              places. I believe in continuous learning and pushing the boundaries of what's
              possible with technology.
            </p>
            <p className="text-beige/90 leading-body">
              I created this site as a digital diary and portfolio to track my growth,
              share my experiences, and connect with like-minded individuals. Feel free to
              explore my work and reach out if you'd like to connect!
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={32} className="text-pink" />
            <h2 className="text-3xl font-bold text-beige">My Journey</h2>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="bg-grey rounded-xl p-6 hover-lift border-l-4 border-pink"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-pink/20 text-pink font-bold text-lg px-4 py-2 rounded-lg">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-beige mb-2">{item.title}</h3>
                    <p className="text-beige/80 leading-body">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Heart size={32} className="text-pink" />
            <h2 className="text-3xl font-bold text-beige">Hobbies & Interests</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-grey rounded-xl p-6 hover-lift text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-semibold text-beige">{hobby.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-pink/10 to-pink/5 rounded-2xl p-8 text-center">
          <Sparkles size={48} className="text-pink mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-beige mb-4">Let's Connect!</h3>
          <p className="text-beige/80 mb-6 leading-body max-w-2xl mx-auto">
            I'm always excited to meet new people, collaborate on projects, or just have a
            chat about technology and life. Feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
}
