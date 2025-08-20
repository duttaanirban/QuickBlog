import { useState } from 'react'
import { blogCategories } from '../assets/assets.js'
import { motion } from "framer-motion"


const Bloglist = () => {

    const [menu, setMenu] = useState("All")
  
    return (
    <div>
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
            {blogCategories.map((item) => (
                <div key={item} className='relative'>
                    <button onClick={() => setMenu(item)}
                    className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                        {item}
                        {menu === item && (
                            <motion.div
                                layoutId='underline'
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full'
                            />
                        )}
                        
                    </button>
                </div>
            ))}
        </div>
        <div>
            {/* blog cards */}
        </div>
    </div>
  )
}

export default Bloglist;