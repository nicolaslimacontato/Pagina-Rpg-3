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
        </div>
    );
};

export default CharacterForm;
