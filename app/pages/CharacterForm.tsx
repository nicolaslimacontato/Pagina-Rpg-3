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
    const [deathSaves, setDeathSaves] = useState({ success: 0, fail: 0 });
    const [habilidades, setHabilidades] = useState({
        habilidade1: false,
        habilidade2: false,
        habilidade3: false,
        habilidade4: false
    });

    const toggleDetails = (key: string) => {
        setHabilidades((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleSuccess = (index: number) => {
        setDeathSaves((prev) => ({
            ...prev,
            success: prev.success === index ? 0 : index
        }));
    };

    const toggleFail = (index: number) => {
        setDeathSaves((prev) => ({
            ...prev,
            fail: prev.fail === index ? 0 : index
        }));
    };

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
            const newValue = Math.max(1, Math.min(20, prevAttributes[attr] + amount));
            return { ...prevAttributes, [attr]: newValue };
        });
    };

    // Função para calcular o modificador
    const calculateModifier = (attributeValue: number) => {
        return Math.floor((attributeValue - 10) / 2);
    };

    const [proficiencyBonus, setProficiencyBonus] = useState<number>(3);
    const [inspiration, setInspiration] = useState<boolean>(false);
    const [savingThrows, setSavingThrows] = useState({
        str: false,
        dex: false,
        con: false,
        int: false,
        wis: false,
        cha: false,
    });

    const [skills, setSkills] = useState({
        acrobatics: false,
        animalHandling: false,
        arcana: false,
        athletics: false,
        deception: false,
        history: false,
        insight: false,
        intimidation: false,
        investigation: false,
        medicine: false,
        nature: false,
        perception: false,
        performance: false,
        persuasion: false,
        religion: false,
        sleightOfHand: false,
        stealth: false,
        survival: false,
    });

    const toggleInspiration = () => setInspiration(!inspiration);

    const toggleSavingThrow = (attr: keyof typeof savingThrows) => {
        setSavingThrows((prev) => ({ ...prev, [attr]: !prev[attr] }));
    };

    const toggleSkill = (skill: keyof typeof skills) => {
        setSkills((prev) => ({ ...prev, [skill]: !prev[skill] }));
    };

    return (
        <div className="p-3 flex flex-col items-center box-content">
            <h1 className='text-6xl my-8 text-red-500'>FIcha</h1>
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
            <div className="w-full mt-8 mx-auto container">
                <div className="bg-gray-100 border-2 border-black p-4 rounded-lg" style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                    <div className="flex flex-wrap justify-around gap-4">
                        {Object.keys(attributes).map((attrKey, index) => {
                            const attr = attrKey as keyof typeof attributes;
                            const attributeValue = attributes[attr];
                            const modifier = calculateModifier(attributeValue);
                            return (
                                <div className="text-center w-full sm:w-auto flex-1" key={index}>
                                    <span className="text-sm font-semibold text-gray-700 mb-1 block">
                                        {attr.toUpperCase()}
                                    </span>
                                    <div className="relative w-20 h-20 mx-auto flex flex-col justify-center items-center bg-white rounded-full border-2 border-gray-300">
                                        <span className="text-xl font-bold">
                                            {modifier >= 0 ? `+${modifier}` : modifier}
                                        </span>
                                        <div className="flex justify-center items-center">
                                            <input
                                                type="number"
                                                className="ml-3 text-center bg-transparent text-lg w-full"
                                                value={attributeValue}
                                                onChange={(e) =>
                                                    adjustAttribute(attr, parseInt(e.target.value) - attributeValue)
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
            <div className="mt-8 flex flex-col lg:flex-row gap-6 p-2 max-w-full">
                {/* Esquerda */}
                <div className="flex-1 space-y-6">
                    {/* Bônus de Proficiência e Inspiração */}
                    <div className="flex gap-5 justify-center items-center">
                        <div className="p-3 rounded-lg flex items-center justify-evenly bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                            <div className="flex flex-col justify-center items-center">
                                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-300">
                                    <span className="text-xl font-bold">{proficiencyBonus}</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-700 mt-2">Bônus de Proficiência</span>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg flex items-center justify-evenlybg-gray-200 bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
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
                            <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={toggleInspiration}>
                                {inspiration ? "Remover" : "Ativar"}
                            </button>
                        </div>
                    </div>

                    {/* Testes de Resistência */}
                    <div className="p-4 rounded-lg flex flex-col bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                        <span className="text-sm font-semibold text-gray-700">TESTES DE RESISTÊNCIA</span>
                        <div className="flex flex-col mt-2 space-y-2">
                            {Object.keys(savingThrows).map((attr) => (
                                <div className="flex items-center" key={attr}>
                                    <input
                                        type="checkbox"
                                        id={`res_${attr}`}
                                        checked={savingThrows[attr as keyof typeof savingThrows]}
                                        onChange={() => toggleSavingThrow(attr as keyof typeof savingThrows)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`res_${attr}`} className="text-sm text-gray-700">
                                        {attr.charAt(0).toUpperCase() + attr.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Aptidões */}
                    <div className="p-4 rounded-lg flex flex-col bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                        <span className="text-sm font-semibold text-gray-700">APTIDÕES</span>
                        <div className="flex flex-col mt-2 space-y-2">
                            {Object.keys(skills).map((skill) => (
                                <div className="flex items-center" key={skill}>
                                    <input
                                        type="checkbox"
                                        id={`skill_${skill}`}
                                        checked={skills[skill as keyof typeof skills]}
                                        onChange={() => toggleSkill(skill as keyof typeof skills)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`skill_${skill}`} className="text-sm text-gray-700">
                                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Meio */}
                <div className="h-max p-4 rounded-lg space-y-3 bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                    {/* Classe de Armadura, Iniciativa, Deslocamento */}
                    <div className="flex justify-evenly items-center">
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <span className="text-lg font-bold">17</span>
                            <span className="text-xs text-gray-500">Classe de Armadura</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <span className="text-lg font-bold">4.18</span>
                            <span className="text-xs text-gray-500">Iniciativa</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <span className="text-lg font-bold">30</span>
                            <span className="text-xs text-gray-500">Deslocamento</span>
                        </div>
                    </div>

                    {/* Pontos de Vida */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Vida Máxima</span>
                                <div className="mt-1">
                                    <span className="text-xl font-bold">100</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Pontos de Vida</span>
                                <div className="mt-1">
                                    <span className="text-2xl font-bold">73</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Pontos de Vida Temporários</span>
                                <div className="mt-1 flex justify-center">
                                    <span className="text-2xl font-bold text-green-600">+10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dados de Vida e Salvação contra a Morte */}
                    <div className="bg-white pt-2 pb-2 rounded-lg flex justify-evenly items-center h-max border-2 border-gray-300">
                        <div className="flex flex-col items-center w-max h-max space-y-2">
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Total</span>
                                <span className="text-lg font-bold">3</span>
                            </div>
                            <div className="flex justify-center items-center">
                                <input
                                    type="number"
                                    value="2"
                                    className="w-12 text-center p-1 border-2 border-gray-300 rounded-lg bg-white"
                                />
                            </div>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">DADO DE VIDA (D12)</span>
                            </div>
                        </div>

                        {/* Salvação contra a Morte */}
                        <div className="flex flex-col justify-evenly items-center">
                            <span className="text-sm font-semibold text-gray-700">Salvação contra a Morte</span>
                            <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center justify-center gap-2">
                                    <span>Sucesso</span>
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            onClick={() => toggleSuccess(i)}
                                            className={`w-4 h-4 bg-white border-2 border-gray-300 rounded-full cursor-pointer ${deathSaves.success >= i ? 'bg-green-500' : ''
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <div className="flex items-center space-x-2 ml-[18px]">
                                    <span>Falha</span>
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            onClick={() => toggleFail(i)}
                                            className={`w-4 h-4 bg-white border-2 border-gray-300 rounded-full cursor-pointer ${deathSaves.fail >= i ? 'bg-red-500' : ''
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ataques & Conjuração */}
                    <div className="bg-gray-200 h-max p-4 rounded-lg space-y-3">
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                            <span className="text-sm font-semibold text-gray-700 text-center flex justify-center">
                                Ataques & Conjuração
                            </span>
                            <div id="lista-ataques" className="space-y-3 mt-3">
                                {[
                                    { nome: 'Longbow', ataque: '+3', dano: '1d8+1 Piercing' },
                                    { nome: 'LongSword', ataque: '+3', dano: '1d8+1 Piercing' }
                                ].map((ataque, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-2">
                                        <div className="text-center">
                                            <span className="text-xs text-gray-500">Nome</span>
                                            <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                                <span className="text-sm font-bold">{ataque.nome}</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xs text-gray-500">ATQ</span>
                                            <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                                <span className="text-sm font-bold">{ataque.ataque}</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xs text-gray-500">Dano/Tipo</span>
                                            <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                                <span className="text-sm font-bold">{ataque.dano}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Modificadores de Dano */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        <span className="text-sm font-semibold text-gray-700">Modificadores de Dano</span>
                        <div className="space-y-3 mt-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <span className="text-xs text-gray-500">Dano Extra</span>
                                    <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                        <span className="text-sm font-bold">+2 Fogo</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-xs text-gray-500">Redução de Dano</span>
                                    <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                        <span className="text-sm font-bold">-1 Gelo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventário */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        <span className="text-sm font-semibold text-gray-700">Inventário</span>
                        <div id="lista-inventario" className="space-y-3 mt-3">
                            {[
                                { item: 'Poção de Cura', quantidade: 3, peso: 0.5 }
                            ].map((inventario, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2">
                                    <div className="text-center">
                                        <span className="text-xs text-gray-500">Item</span>
                                        <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                            <span className="text-sm font-bold">{inventario.item}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs text-gray-500">Quantidade</span>
                                        <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                            <span className="text-sm font-bold">{inventario.quantidade}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs text-gray-500">Peso</span>
                                        <div className="mt-1 bg-gray-200 rounded-xl w-max flex mx-auto p-2">
                                            <span className="text-sm font-bold">{inventario.peso}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Direita */}
                <div className="space-y-4">
                    <div className="space-y-4 mx-auto">
                        {/* Características */}
                        <div className="bg-gray-200 p-5 rounded-lg">
                            <span className="text-lg font-semibold text-gray-700 text-center flex justify-center">
                                Características
                            </span>

                            {/* Traços de Personalidade */}
                            <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300">
                                <textarea
                                    className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                                    rows={3}
                                    defaultValue="I see omens in every event and action. The gods try to speak to us, we just need to listen.
Nothing can shake my optimistic attitude."
                                />
                                <span className="text-xs font-semibold text-gray-500 mt-2 flex justify-center">
                                    TRAÇOS DE PERSONALIDADE
                                </span>
                            </div>

                            {/* Ideais */}
                            <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300">
                                <textarea
                                    className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                                    rows={3}
                                    defaultValue="Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)"
                                />
                                <span className="text-xs font-semibold text-gray-500 mt-2 flex justify-center">
                                    IDEAIS
                                </span>
                            </div>

                            {/* Vínculos */}
                            <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300">
                                <textarea
                                    className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                                    rows={2}
                                    defaultValue="I will do anything to protect the temple where I served."
                                />
                                <span className="text-xs font-semibold text-gray-500 flex justify-center mt-2">
                                    VÍNCULOS
                                </span>
                            </div>

                            {/* Defeitos */}
                            <div className="mt-4 bg-white p-4 rounded-lg border-2 border-gray-300">
                                <textarea
                                    className="w-full bg-transparent text-center text-gray-700 resize-none border-none outline-none"
                                    rows={2}
                                    defaultValue="My piety sometimes leads me to blindly trust those that profess faith in my god."
                                />
                                <span className="text-xs font-semibold text-gray-500 flex justify-center mt-2">
                                    DEFEITOS
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Habilidades */}
                    <div className="bg-gray-200 p-5 rounded-lg space-y-4 w-full">
                        <span className="text-lg font-semibold text-gray-700 text-center flex justify-center">
                            Habilidades
                        </span>

                        {/* Habilidade 1 */}
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                            <div
                                className="w-full text-left flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDetails('habilidade1')}
                            >
                                <span className="text-sm font-bold">Cunning Action</span>
                                <span
                                    id="icon-habilidade1"
                                    className={`transform transition-transform duration-300 ${habilidades.habilidade1 ? 'rotate-180' : ''
                                        }`}
                                >
                                    &#x25BC;
                                </span>
                            </div>
                            <div
                                id="habilidade1"
                                className={`${habilidades.habilidade1 ? 'block' : 'hidden'
                                    } mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out`}
                            >
                                Bonus to dash, disengage, or hide.
                            </div>
                        </div>

                        {/* Habilidade 2 */}
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                            <div
                                className="w-full text-left flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDetails('habilidade2')}
                            >
                                <span className="text-sm font-bold">Uncanny Dodge</span>
                                <span
                                    id="icon-habilidade2"
                                    className={`transform transition-transform duration-300 ${habilidades.habilidade2 ? 'rotate-180' : ''
                                        }`}
                                >
                                    &#x25BC;
                                </span>
                            </div>
                            <div
                                id="habilidade2"
                                className={`${habilidades.habilidade2 ? 'block' : 'hidden'
                                    } mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out`}
                            >
                                Reaction to halve damage from attack.
                            </div>
                        </div>

                        {/* Habilidade 3 */}
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                            <div
                                className="w-full text-left flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDetails('habilidade3')}
                            >
                                <span className="text-sm font-bold">Evasion</span>
                                <span
                                    id="icon-habilidade3"
                                    className={`transform transition-transform duration-300 ${habilidades.habilidade3 ? 'rotate-180' : ''
                                        }`}
                                >
                                    &#x25BC;
                                </span>
                            </div>
                            <div
                                id="habilidade3"
                                className={`${habilidades.habilidade3 ? 'block' : 'hidden'
                                    } mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out`}
                            >
                                Dex saves no damage, half on no save.
                            </div>
                        </div>

                        {/* Habilidade 4 */}
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                            <div
                                className="w-full text-left flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDetails('habilidade4')}
                            >
                                <span className="text-sm font-bold">Fast Hands</span>
                                <span
                                    id="icon-habilidade4"
                                    className={`transform transition-transform duration-300 ${habilidades.habilidade4 ? 'rotate-180' : ''
                                        }`}
                                >
                                    &#x25BC;
                                </span>
                            </div>
                            <div
                                id="habilidade4"
                                className={`${habilidades.habilidade4 ? 'block' : 'hidden'
                                    } mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out`}
                            >
                                Bonus action to use an object.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterForm;
