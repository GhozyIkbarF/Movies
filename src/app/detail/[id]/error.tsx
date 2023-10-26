"use client"
import React from 'react'

export default function Error() {
  return (
    <div className='w-full text-white p-5 text-xl md:pl-40 md:pt-10 first:font-bold first:text-3xl'>
        <h1 className='font-bold text-3xl'>Oops! We can't find the page you're looking for</h1>
        <p className='text-xl'>You tried to request a page that doesn't exist. If you believe this to be in error, let us know on the forums.</p>
    </div>
  )
}
