import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 w-full  h-[50px] flex justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-2">
        <div>
        <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.10, delay: 0.10 }}
              className="text-xl font-semibold text-black m-3"
            >
              AlgoYodhas
            </motion.div>
          </div>
          <div>
        <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.10, delay: 0.10 }}
              className="text-xl font-semibold text-black m-3"
            >
              <Button className=" h-8" onClick={()=>("")}>Undo</Button>
            </motion.div>
          </div>
            
      </header>
    </React.Fragment>
  );
};

export default Header;
