import { useState } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import FilterButtons from '../FilterButtons';

// augšējā rīkjosla
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-5 right-5 z-50 h-12 w-12 rounded-lg bg-black/60 transition-colors duration-300 hover:bg-black/80 xl:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="relative block h-full w-full">
          <span
            className={`absolute top-1/2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'top-1/2 rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute top-1/2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute top-1/2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'top-1/2 -rotate-45' : 'translate-y-2'
            }`}
          />
        </span>
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-screen max-w-[320px] bg-[#1e1e27] shadow-[-8px_0_32px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-in-out xl:static xl:h-screen xl:w-[320px] xl:min-w-[320px] xl:translate-x-0 xl:rounded-r-[20px] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="flex h-full flex-col items-start justify-between overflow-y-auto p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:transition-colors hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-track]:bg-transparent"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.3) transparent',
          }}
        >
          <FilterButtons />
          <ImageUpload />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
