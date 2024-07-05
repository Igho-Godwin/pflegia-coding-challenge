import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="text-gray-600 font-body vw-100">
      <div className="px-16 py-6 md:col-span-2 ">
        <header className="flex flex-col">
          <h2 className="text-gray-700 text-6xl font-semibold">Pizzaria</h2>
          <h3 className="text-2xl font-semibold">
            {'How to make your Pizza with love:'}
          </h3>
        </header>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
