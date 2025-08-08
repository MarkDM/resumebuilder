import React from 'react'
import ResumeBuilder from './pages/ResumeBuilder'
import 'react-quill-new/dist/quill.snow.css';
import 'react-tooltip/dist/react-tooltip.css'


function App() {
  return (
    <div className='flex justify-center p-0 md:p-3'>
      <ResumeBuilder/>
    </div>
  )
}

export default App
