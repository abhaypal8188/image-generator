import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Unleash your creativity with <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">PixelPrompt AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
          Transform your text into stunning visual masterpieces in seconds. Powered by state-of-the-art artificial intelligence.
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center">
            Start Generating <Sparkles className="ml-2 w-5 h-5" />
          </Link>
          <Link to="/login" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3 rounded-full font-semibold text-lg transition-all">
            Login
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 max-w-5xl w-full pt-16"
      >
        <div className="p-6 rounded-2xl glass-panel text-left space-y-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
            <Sparkles className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold">Any Style</h3>
          <p className="text-slate-600 dark:text-slate-400">From hyper-realistic photos to anime and digital art, create whatever you can imagine.</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel text-left space-y-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
            <Zap className="text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold">Lightning Fast</h3>
          <p className="text-slate-600 dark:text-slate-400">Get your results in seconds. Our optimized infrastructure ensures rapid generation.</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel text-left space-y-4">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-xl flex items-center justify-center">
            <ImageIcon className="text-pink-600 dark:text-pink-400" />
          </div>
          <h3 className="text-xl font-bold">High Quality</h3>
          <p className="text-slate-600 dark:text-slate-400">Download your creations in stunning high resolution up to 1024x1024 pixels.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
