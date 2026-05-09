import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, Download, Copy, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const styles = ['Realistic', 'Anime', 'Cartoon', 'Fantasy', 'Cyberpunk', 'Watercolor'];
const sizes = ['1024x1024', '512x512', '256x256'];

const Generate = () => {
  const { user, updateCredits } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [size, setSize] = useState('1024x1024');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (user.credits <= 0) {
      toast.error('Insufficient credits!');
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const res = await axios.post('/api/generate', { prompt, style, size });
      setGeneratedImage(res.data.image);
      updateCredits(res.data.credits);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Generate AI Image</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 rounded-2xl space-y-6"
        >
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea 
                required
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="A futuristic city with neon lights..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 outline-none"
                >
                  {styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 outline-none"
                >
                  {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/30"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              <span>{loading ? 'Generating...' : `Generate (Cost: 1 Credit)`}</span>
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center justify-center min-h-[400px] glass-panel rounded-2xl overflow-hidden relative"
        >
          {loading ? (
            <div className="space-y-4 flex flex-col items-center">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
              <p className="text-slate-500 font-medium animate-pulse">Creating your masterpiece...</p>
            </div>
          ) : generatedImage ? (
            <div className="w-full h-full group relative">
              <img 
                src={generatedImage.imageUrl} 
                alt={generatedImage.prompt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 backdrop-blur-sm">
                <a 
                  href={generatedImage.imageUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-slate-900 p-3 rounded-full hover:scale-110 transition-transform"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button 
                  onClick={copyPrompt}
                  className="bg-white text-slate-900 p-3 rounded-full hover:scale-110 transition-transform"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 space-y-2">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-slate-500">Your generated image will appear here</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Generate;
