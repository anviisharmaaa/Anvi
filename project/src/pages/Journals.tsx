import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Image, Music, Video } from 'lucide-react';
import { supabase, Journal } from '../lib/supabase';

export function Journals() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('is_public', true)
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={20} className="text-pink" />;
      case 'video':
        return <Video size={20} className="text-pink" />;
      case 'audio':
        return <Music size={20} className="text-pink" />;
      default:
        return <CalendarIcon size={20} className="text-pink" />;
    }
  };

  const getMoodEmoji = (mood: string | null) => {
    if (!mood) return '📝';
    const moods: { [key: string]: string } = {
      happy: '😊',
      excited: '🤩',
      calm: '😌',
      thoughtful: '🤔',
      grateful: '🙏',
      creative: '🎨',
    };
    return moods[mood.toLowerCase()] || '📝';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink border-r-transparent mb-4"></div>
          <p className="text-beige text-lg">Loading journals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-beige mb-4 leading-heading">
            Daily <span className="text-pink">Journals</span>
          </h1>
          <p className="text-xl text-beige/80 leading-body">
            My personal reflections and daily thoughts
          </p>
        </div>

        {journals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-beige/60 text-xl">No journal entries yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {journals.map((journal) => (
              <article
                key={journal.id}
                className="bg-grey rounded-xl p-6 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-pink/20 rounded-lg flex items-center justify-center text-3xl">
                    {getMoodEmoji(journal.mood)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-beige leading-heading">
                        {journal.title}
                      </h2>
                      {getMediaIcon(journal.media_type)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-beige/60 mb-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        {formatDate(journal.entry_date)}
                      </div>
                      {journal.mood && (
                        <span className="px-3 py-1 bg-pink/20 text-pink text-xs rounded-full">
                          {journal.mood}
                        </span>
                      )}
                    </div>

                    <p className="text-beige/80 leading-body whitespace-pre-line">
                      {journal.content}
                    </p>

                    {journal.media_url && journal.media_type === 'image' && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <img
                          src={journal.media_url}
                          alt={journal.title}
                          className="w-full max-h-96 object-cover"
                        />
                      </div>
                    )}

                    {journal.media_url && journal.media_type === 'video' && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <video controls className="w-full max-h-96">
                          <source src={journal.media_url} />
                        </video>
                      </div>
                    )}

                    {journal.media_url && journal.media_type === 'audio' && (
                      <div className="mt-4">
                        <audio controls className="w-full">
                          <source src={journal.media_url} />
                        </audio>
                      </div>
                    )}
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
