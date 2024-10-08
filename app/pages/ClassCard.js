// ClassCard.js
import React from 'react';

const ClassCard = ({
  className,
  iconSrc,
  source,
  description,
  hitDie,
  mainStats,
  resistances,
  backgroundImage,
  learnMoreLink,
}) => {
  return (
    <div
      className="relative rounded-lg shadow-xl p-4 flex flex-col overflow-hidden bg-white dark:bg-neutral-900 min-w-[300px] max-w-xl mx-auto flex-grow md:max-w-none"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col flex-grow">
        <div className="flex items-start mb-4">
          <img
            className="w-12 h-12 mr-3 rounded"
            src={iconSrc}
            alt={`Icon for ${className} class`}
          />
          <div className="flex-1 max-w-52">
            <h3 className="text-xl font-bold">{className}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 border-b-[#be161d] border-b-2">
              {source}
            </div>
          </div>
        </div>
        <div className="flex-grow text-sm mb-4 bg-white/70 dark:bg-zinc-900/70 rounded-lg p-1 border-zinc-300 dark:border-zinc-700 border-2 text-neutral-950 dark:text-neutral-100 font-semibold mt-3 justify-center flex flex-col transition duration-300 ease-in-out">
          <p className="mb-2">{description}</p>
          <p>
            <strong>Dado de Vida:</strong> {hitDie}
            <br />
            <strong>Principais:</strong> {mainStats}
            <br />
            <strong>Resistências:</strong> {resistances}
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <a
          href={learnMoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#be161d] text-white py-2 px-4 rounded-full hover:bg-red-800 transition duration-300"
        >
          Saiba Mais
        </a>
      </div>
    </div>
  );
};

export default ClassCard;