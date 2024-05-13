import React from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
const Header = () => {
  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 w-full h-[50px] border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mr-4 mt-4 hidden md:flex">
          <div className="container mx-auto flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold text-black"
            >
              AlgoYodhas
            </motion.h1>
          </div>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </a>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
