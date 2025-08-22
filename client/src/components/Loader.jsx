// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        style={{ borderTopColor: '#fff' }}
      />
    </div>
  );
};

export default Loader;
