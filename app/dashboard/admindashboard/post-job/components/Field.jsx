const labelColors = ["#00c389"];
import { motion } from "motion/react";
export const Field = ({ label,  error, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-1"
  >
    <label
      className="font-medium"
      style={{ color: labelColors }}
    >
      {label}
    </label>

    {children}

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </motion.div>
);