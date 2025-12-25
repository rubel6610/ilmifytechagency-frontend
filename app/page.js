import React from 'react';

const Home = () => {
  return (
    <div>
      <a href='/about' className='text-primary text-2xl'>
        about
      </a>

      <p className='text-secondary'>jfldkas</p>

      {/* Example for borders */}
      <div className="border-primary p-4">
        This div has a primary border color.
      </div>
    </div>
  );
};

export default Home;
