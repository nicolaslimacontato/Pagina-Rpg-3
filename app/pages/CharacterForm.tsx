'use client';

import React, { useState } from 'react';
import '../styles/CharacterForm.css';
import { classesData } from '../data/classesData'; // Importa o classesData

const CharacterForm: React.FC = () => {
    const [characterName, setCharacterName] = useState<string>('');
    const [race, setRace] = useState<string>('');
    const [charClass, setCharClass] = useState<string>(''); // Atualizado para lidar com a seleção de classes
    const [level, setLevel] = useState<string>('');
    const [background, setBackground] = useState<string>('');
    const [alignment, setAlignment] = useState<string>('');
    const [xp, setXp] = useState<string>('');

    // Atributos do personagem
    const [attributes, setAttributes] = useState({
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
    });

    // Função para ajustar atributos
    const adjustAttribute = (attr: keyof typeof attributes, amount: number) => {
        setAttributes((prevAttributes) => {
            const newValue = Math.max(1, Math.min(20, prevAttributes[attr] + amount)); // Limitar entre 1 e 20
            return { ...prevAttributes, [attr]: newValue };
        });
    };

    return (
        <div className="p-3 flex flex-col items-center box-content">
            {/* Cabeça */}
            <div className="header bg-no-repeat bg-cover flex items-center">
                <div className="nomebox">
                    <input
                        type="text"
                        className="w-10/12 h-7 bg-[#f5f5f5] p-3 text-center mt-8"
                        placeholder="Nome do Personagem"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                    />
                </div>
                <div className="char-box bg-cover flex items-center">
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 w-full">
                        <input
                            type="text"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="Raça"
                            value={race}
                            onChange={(e) => setRace(e.target.value)}
                        />

                        {/* Campo de seleção para as classes */}
                        <select
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            value={charClass}
                            onChange={(e) => setCharClass(e.target.value)}
                        >
                            <option value="">Selecione uma Classe</option>
                            {classesData.map((classe, index) => (
                                <option key={index} value={classe.nome}>
                                    {classe.nome}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="Nível"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="Antecedente"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="Alinhamento"
                            value={alignment}
                            onChange={(e) => setAlignment(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="XP"
                            value={xp}
                            onChange={(e) => setXp(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Seção de Atributos */}
            <div className="w-full mt-8 mx-auto">
                <div className="bg-gray-200 border-2 border-black p-4 rounded-lg" style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                    <div className="flex flex-wrap justify-around gap-4">
                        {Object.keys(attributes).map((attrKey, index) => {
                            const attr = attrKey as keyof typeof attributes;
                            return (
                                <div className="text-center w-full sm:w-auto flex-1" key={index}>
                                    <span className="text-sm font-semibold text-gray-700 mb-1 block">
                                        {attr.toUpperCase()}
                                    </span>
                                    <div className="relative w-20 h-20 mx-auto flex flex-col justify-center items-center bg-white rounded-full border-2 border-gray-300">
                                        <span className="text-xl font-bold">
                                            {attributes[attr]}
                                        </span>
                                        <div className="flex justify-center items-center">
                                            <input
                                                type="number"
                                                className="ml-3 text-center bg-transparent text-lg w-full"
                                                value={attributes[attr]}
                                                onChange={(e) =>
                                                    adjustAttribute(attr, parseInt(e.target.value) - attributes[attr])
                                                }
                                                min="1"
                                                max="20"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => adjustAttribute(attr, -1)}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            -
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => adjustAttribute(attr, 1)}
                                            className="px-2 py-1 bg-green-500 text-white rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterForm;
