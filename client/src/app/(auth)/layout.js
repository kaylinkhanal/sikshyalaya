import Image from 'next/image'
import React from 'react'

const AuthPagesLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Sikshyalaya Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">SIKSHYALAYA</h1>
            <p className="text-lg text-gray-400">Smart Schooling Solution</p>
          </div>
            {children}
            </div>
            </div>
</div>
  )
}

export default AuthPagesLayout