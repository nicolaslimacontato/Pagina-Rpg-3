import React from 'react';

type SavingThrows = Record<string, boolean>;
type Skills = Record<string, boolean>;

type Attributes = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type Props = {
  attributes: Attributes;
  savingThrows: SavingThrows;
  skills: Skills;
  toggleSavingThrow: (attr: keyof SavingThrows) => void;
  toggleSkill: (skill: keyof Skills) => void;
  proficiencyBonus: number;
  toggleInspiration: () => void;
  inspiration: boolean;
};

// Função de cálculo do modificador movida para fora do componente para evitar recriação
const calculateModifier = (value: number): number => Math.floor((value - 10) / 2);

const LeftSection: React.FC<Props> = ({
  attributes,
  savingThrows,
  skills,
  toggleSavingThrow,
  toggleSkill,
  proficiencyBonus,
  toggleInspiration,
  inspiration,
}) => {
  // Mapeamento de aptidões para os atributos correspondentes
  const skillToAttributeMap: Record<string, keyof Attributes> = {
    acrobatics: 'dexterity',
    animalHandling: 'wisdom',
    arcana: 'intelligence',
    athletics: 'strength',
    deception: 'charisma',
    history: 'intelligence',
    insight: 'wisdom',
    intimidation: 'charisma',
    investigation: 'intelligence',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    performance: 'charisma',
    persuasion: 'charisma',
    religion: 'intelligence',
    sleightOfHand: 'dexterity',
    stealth: 'dexterity',
    survival: 'wisdom',
  };

  // Cálculo do modificador da habilidade
  const getSkillModifier = (skill: keyof Skills): number => {
    const attribute = skillToAttributeMap[skill] || 'dexterity';
    const baseModifier = calculateModifier(attributes[attribute]);
    return skills[skill] ? baseModifier + proficiencyBonus : baseModifier;
  };

  // Cálculo do modificador de teste de resistência
  const getSavingThrowModifier = (attr: keyof Attributes): number => {
    const baseModifier = calculateModifier(attributes[attr]);
    return savingThrows[attr] ? baseModifier + proficiencyBonus : baseModifier;
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Bônus de Proficiência e Inspiração */}
      <div className="flex gap-5 justify-center items-center">
        <div className="p-3 rounded-lg flex items-center justify-evenly bg-gray-100 border-2 border-black" style={{ boxShadow: '0 0 0 4px white, 0 0 0 7px black' }}>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
              <span className="text-xl font-bold">{proficiencyBonus}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 mt-2">Bônus de Proficiência</span>
          </div>
        </div>
        <div
          className={`p-3 rounded-lg flex items-center justify-evenly bg-gray-100 border-2 border-black cursor-pointer ${inspiration ? 'bg-gray-200' : ''}`}
          style={{ boxShadow: '0 0 0 4px white, 0 0 0 7px black' }}
          onClick={toggleInspiration}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
              <span className="text-xl font-bold">
                {inspiration ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  "-"
                )}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700 mt-2">Inspiração</span>
          </div>
        </div>
      </div>

      {/* Testes de Resistência */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 border-2 border-black" style={{ boxShadow: '0 0 0 4px white, 0 0 0 7px black' }}>
        <span className="text-sm font-semibold text-gray-700">TESTES DE RESISTÊNCIA</span>
        <div className="flex flex-col mt-2 space-y-2">
          {Object.keys(attributes).map((attr) => {
            const modifier = getSavingThrowModifier(attr as keyof Attributes);
            return (
              <div className="flex items-center" key={attr}>
                <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex justify-center items-center mr-2">
                  <span className="text-lg font-bold">{modifier >= 0 ? `+${modifier}` : modifier}</span>
                </div>
                <input
                  type="checkbox"
                  id={`res_${attr}`}
                  checked={savingThrows[attr as keyof SavingThrows]}
                  onChange={() => toggleSavingThrow(attr as keyof SavingThrows)}
                  className="mr-2"
                />
                <label htmlFor={`res_${attr}`} className="text-sm text-gray-700">
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aptidões */}
      <div className="p-4 rounded-lg flex flex-col bg-gray-100 border-2 border-black" style={{ boxShadow: '0 0 0 4px white, 0 0 0 7px black' }}>
        <span className="text-sm font-semibold text-gray-700">APTIDÕES</span>
        <div className="flex flex-col mt-2 space-y-2">
          {Object.keys(skills).map((skill) => {
            const modifier = getSkillModifier(skill as keyof Skills);
            return (
              <div className="flex items-center" key={skill}>
                <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex justify-center items-center mr-2">
                  <span className="text-lg font-bold">{modifier >= 0 ? `+${modifier}` : modifier}</span>
                </div>
                <input
                  type="checkbox"
                  id={`skill_${skill}`}
                  checked={skills[skill as keyof Skills]}
                  onChange={() => toggleSkill(skill as keyof Skills)}
                  className="mr-2"
                />
                <label htmlFor={`skill_${skill}`} className="text-sm text-gray-700">
                  {skill.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
