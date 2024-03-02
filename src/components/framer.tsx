import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
type FrammerProps = {
  children: ReactNode;
  delay?: number;
};

export const Framer: React.FC<FrammerProps> = ({ children, delay = 0.3 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  return (
    <section ref={sectionRef}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(1.5px)" }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            filter: "blur(0px)",
          }}
          transition={{ delay: delay, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
