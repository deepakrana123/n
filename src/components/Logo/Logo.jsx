import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
      <Link
      to={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      Algo Yodha
    </Link>
  )
}

export default Logo
