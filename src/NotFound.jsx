import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
          <p className="mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/" className='p-6'>Go to Home</Link>
        </div>
      </section>
    </>
  );
}

export default NotFound