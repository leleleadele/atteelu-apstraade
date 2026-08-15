import { useState, useEffect } from 'react';

const GreetingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenGreeting = localStorage.getItem('hasSeenGreeting');
    if (!hasSeenGreeting) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenGreeting', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-mauve-800 p-8 shadow-2xl">
        <h1 className="mb-4 text-2xl font-bold text-white">Welcome!</h1>
        <div className="mb-6 space-y-3 text-gray-300">
          <p>
            This project was created as a university assignment to explore
            various image transformation algorithms and functions.
          </p>
          <p>
            The goal is to understand the process of manipulating individual
            pixels to achieve various visual effects and transformations,
            including:
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1">
            <li>Image resizing and scaling</li>
            <li>Blurring and sharpening</li>
            <li>Color alterations and corrections</li>
            <li>Edge detection</li>
            <li>Adaptive filtering</li>
            <li>Predictive coding and compression</li>
          </ul>
          <p>
            Explore the filters and see how different algorithms transform
            images! ;)
          </p>
        </div>
        <button
          onClick={handleClose}
          className="w-full cursor-pointer rounded-xl bg-[#f797cf] px-4 py-3 text-center font-mono font-semibold text-mauve-800 uppercase transition-colors hover:bg-white focus:ring-2 focus:ring-[#f797cf]/80 focus:outline-none"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
};

export default GreetingDialog;
