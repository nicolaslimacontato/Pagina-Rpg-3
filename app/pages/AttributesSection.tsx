import React from 'react';

type AttributesSectionProps = {
  attributes: { [key: string]: number };
  adjustAttribute: (attr: string, value: number) => void;
};

const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};

const AttributeControl: React.FC<{
  attr: string;
  attributeValue: number;
  modifier: number;
  onDecrease: () => void;
  onIncrease: () => void;
  handleInputChange: (newValue: string) => void;
}> = ({ attr, attributeValue, modifier, onDecrease, onIncrease, handleInputChange }) => (
  <div className="text-center w-full sm:w-auto flex-1">
    <span className="text-sm font-semibold text-gray-700 mb-1 block">
      {attr.toUpperCase()}
    </span>
    <div className="relative w-20 h-20 mx-auto flex flex-col justify-center items-center bg-white rounded-full border-2 border-gray-300">
      <span className="text-xl font-bold">
        {modifier >= 0 ? `+${modifier}` : modifier}
      </span>
      <input
        type="number"
        className="ml-3 text-center bg-transparent text-lg w-full"
        value={attributeValue}
        onChange={(e) => handleInputChange(e.target.value)}
        min="1"
        max="20"
      />
    </div>
    <div className="mt-2 flex justify-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        -
      </button>
      <button
        type="button"
        onClick={onIncrease}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  </div>
);

const AttributesSection: React.FC<AttributesSectionProps> = ({ attributes, adjustAttribute }) => {
  const handleInputChange = (attr: string, newValue: string) => {
    const parsedValue = parseInt(newValue);
    if (!isNaN(parsedValue)) {
      adjustAttribute(attr, Math.min(Math.max(parsedValue, 1), 20) - attributes[attr]);
    }
  };

  return (
    <div className="w-full mt-8 mx-auto container">
      <div
        className="bg-gray-100 border-2 border-black p-4 rounded-lg"
        style={{ boxShadow: '0 0 0 4px white, 0 0 0 7px black' }}
      >
        <div className="flex flex-wrap justify-around gap-4">
          {Object.entries(attributes).map(([attr, attributeValue]) => {
            const modifier = calculateModifier(attributeValue);

            return (
              <AttributeControl
                key={attr}
                attr={attr}
                attributeValue={attributeValue}
                modifier={modifier}
                handleInputChange={(newValue) => handleInputChange(attr, newValue)}
                onDecrease={() => adjustAttribute(attr, Math.max(attributeValue - 1, 1) - attributeValue)}
                onIncrease={() => adjustAttribute(attr, Math.min(attributeValue + 1, 20) - attributeValue)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttributesSection;
