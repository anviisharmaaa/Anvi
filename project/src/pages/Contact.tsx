import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-beige mb-4 leading-heading">
            Get In <span className="text-pink">Touch</span>
          </h1>
          <p className="text-xl text-beige/80 leading-body">
            I'd love to hear from you. Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-beige mb-6">Send Me a Message</h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-pink/20 border border-pink rounded-lg flex items-center gap-3">
                <CheckCircle className="text-pink" size={24} />
                <p className="text-pink font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-beige mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-grey border border-grey-light rounded-lg text-beige placeholder-beige/50 focus:outline-none focus:border-pink transition-smooth"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-beige mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-grey border border-grey-light rounded-lg text-beige placeholder-beige/50 focus:outline-none focus:border-pink transition-smooth"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-beige mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-grey border border-grey-light rounded-lg text-beige placeholder-beige/50 focus:outline-none focus:border-pink transition-smooth"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-beige mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-grey border border-grey-light rounded-lg text-beige placeholder-beige/50 focus:outline-none focus:border-pink transition-smooth resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink text-white rounded-lg hover:bg-pink-dark transition-smooth font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-beige mb-6">Connect With Me</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-grey rounded-lg">
                <Mail className="text-pink flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-beige font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:contact@example.com"
                    className="text-beige/80 hover:text-pink transition-smooth"
                  >
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-grey rounded-lg">
                <MapPin className="text-pink flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-beige font-semibold mb-1">Location</h3>
                  <p className="text-beige/80">Available for remote opportunities</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-beige mb-4">Social Links</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-grey rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Github size={24} className="text-beige" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-grey rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Linkedin size={24} className="text-beige" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex items-center justify-center w-14 h-14 bg-grey rounded-lg hover:bg-pink transition-smooth hover-lift"
              >
                <Mail size={24} className="text-beige" />
              </a>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-pink/10 to-pink/5 rounded-xl border border-pink/20">
              <h3 className="text-lg font-bold text-beige mb-2">Quick Response</h3>
              <p className="text-beige/80 leading-body">
                I typically respond to messages within 24-48 hours. Looking forward to
                connecting with you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
