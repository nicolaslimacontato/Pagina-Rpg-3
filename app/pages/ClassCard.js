// CardClasse.js
import React from 'react';

function ClassCard({ className, iconSrc, source, description, hitDie, mainStats, resistances, backgroundImage, learnMoreLink }) {
  return (
    <div className="relative rounded-lg shadow-xl p-4 flex flex-col overflow-hidden bg-white min-w-[300px] max-w-xl mx-auto flex-grow"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}>
      <div className="flex flex-col flex-grow">
        <div className="flex items-start mb-4">
          <img className="w-12 h-12 mr-3 rounded" src={iconSrc} alt={className} />
          <div className="flex-1 max-w-52">
            <h3 className="text-xl font-bold">{className}</h3>
            <div className="text-sm text-gray-600 border-b-red-500 border-b-2">{source}</div>
          </div>
        </div>
        <div className="flex-grow text-sm mb-4 bg-white/70 rounded-lg p-1 border-gray-100 border-2 text-neutral-950 font-semibold mt-3 justify-center flex flex-col">
          <p className="mb-2">{description}</p>
          <p>
            <strong>Dado de Vida:</strong> {hitDie}<br />
            <strong>Principais:</strong> {mainStats}<br />
            <strong>Resistências:</strong> {resistances}
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <a href={learnMoreLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">
          Saiba Mais
        </a>
      </div>
    </div>
  );
}



export default ClassCard;
