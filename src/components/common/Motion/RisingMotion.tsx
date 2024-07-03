import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RisingMotionProps {
  children: ReactNode;
}

const RisingMotion = ({ children }: RisingMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
        y: { duration: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default RisingMotion;
