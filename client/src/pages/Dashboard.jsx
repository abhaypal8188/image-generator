import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, History as HistoryIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Here is an overview of your account.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 px-6 py-3 rounded-xl font-bold flex items-center shadow-inner">
          <Sparkles className="w-5 h-5 mr-2" />
          {user?.credits} Credits Available
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/generate">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-2xl glass-panel flex flex-col items-center justify-center text-center space-y-4 h-full border-2 border-transparent hover:border-indigo-500 transition-colors"
          >
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Generate New Image</h2>
            <p className="text-slate-600 dark:text-slate-400">Use your credits to create stunning new AI art.</p>
          </motion.div>
        </Link>

        <Link to="/history">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-2xl glass-panel flex flex-col items-center justify-center text-center space-y-4 h-full border-2 border-transparent hover:border-slate-500 transition-colors"
          >
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400">
              <HistoryIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">View History</h2>
            <p className="text-slate-600 dark:text-slate-400">Access and download your previously generated images.</p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
