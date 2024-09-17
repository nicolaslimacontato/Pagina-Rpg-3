'use client';

import React, { useState } from 'react';
import '../styles/CharacterForm.css';
import { classesData } from '../data/classesData';
import AttributesSection from './AttributesSection';
import LeftSection from './LeftSection'; 

const CharacterForm: React.FC = () => {
    const [characterName, setCharacterName] = useState<string>('');
    const [race, setRace] = useState<string>('');
    const [charClass, setCharClass] = useState<string>('');
    const [level, setLevel] = useState<number>(1); // Agora usando número
    const [background, setBackground] = useState<string>('');
    const [alignment, setAlignment] = useState<string>('');
    const [xp, setXp] = useState<string>('');
    const [deathSaves, setDeathSaves] = useState({ success: 0, fail: 0 });
    const [maxHp, setMaxHp] = useState(100);
    const [currentHp, setCurrentHp] = useState(73);
    const [tempHp, setTempHp] = useState(10);
    const [movement, setMovement] = useState<number>(30);
    const [successes, setSuccesses] = useState([false, false, false]);
    const [failures, setFailures] = useState([false, false, false]);
    const [habilidades, setHabilidades] = useState({
        habilidade1: false,
        habilidade2: false,
        habilidade3: false,
        habilidade4: false,
    });

    // Função para alternar os sucessos
    const toggleSuccess = (index: number) => {
        const newSuccesses = successes.map((success, i) =>
            i === index ? !success : success
        );
        setSuccesses(newSuccesses);
    };

    // Função para alternar as falhas
    const toggleFail = (index: number) => {
        const newFailures = failures.map((fail, i) => (i === index ? !fail : fail));
        setFailures(newFailures);
    };

    const toggleDetails = (key: string) => {
        setHabilidades((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Estado para Inventário
    const [inventory, setInventory] = useState([
        { item: 'Poção de Cura', quantidade: 3, peso: 0.5 }
    ]);

    // Função para atualizar o inventário
    const addItemToInventory = (newItem: any) => {
        setInventory([...inventory, newItem]);
    };

    const calculateProficiencyBonus = (level: number): number => {
        if (level >= 1 && level <= 4) return 2;
        if (level >= 5 && level <= 8) return 3;
        if (level >= 9 && level <= 13) return 4;
        if (level >= 14 && level <= 16) return 5;
        if (level >= 17) return 6;
        return 2; // Valor padrão para níveis inválidos
    };

    const proficiencyBonus = calculateProficiencyBonus(level);

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = parseInt(e.target.value, 10) || 1;
        setLevel(newLevel);
    };

    // Estado para Atributos
    const [attributes, setAttributes] = useState({
        strength: 10,
        dexterity: 10, // Destreza
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    });

    // Função para ajustar os atributos
    const adjustAttribute = (attribute: string, value: number) => {
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attribute]: prevAttributes[attribute] + value,
        }));
    };

    const dexModifier = Math.floor((attributes.dexterity - 10) / 2); // Calcula o modificador de Destreza

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
            <h1 className='text-6xl my-8 text-red-500'>Ficha</h1>
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

                        {/* Campo de entrada para o nível */}
                        <input
                            type="number"
                            className="bg-[#f5f5f5] p-1 text-center text-xs h-7"
                            placeholder="Nível"
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value, 10) || 1)}
                            min={1}
                            max={20} // O nível máximo é 20
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
            <AttributesSection attributes={attributes} adjustAttribute={adjustAttribute} />
            <div className="mt-8 flex flex-col lg:flex-row gap-6 p-2 max-w-full">
                {/* Esquerda */}
                <div className="flex-1 space-y-6">
                    <LeftSection
                        attributes={attributes}
                        savingThrows={savingThrows}
                        skills={skills}
                        toggleSavingThrow={toggleSavingThrow}
                        toggleSkill={toggleSkill}
                        proficiencyBonus={proficiencyBonus}
                        inspiration={inspiration}
                        toggleInspiration={toggleInspiration}
                    />
                </div>
                {/* Meio */}
                <div className="h-max p-4 rounded-lg space-y-3 bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
                    {/* Classe de Armadura, Iniciativa, Deslocamento */}
                    <div className="flex justify-evenly items-center">
                        {/* Classe de Armadura */}
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <span className="text-lg font-bold">{10 + dexModifier}</span> {/* CA = 10 + modificador de Destreza */}
                            <span className="text-xs text-gray-500">Classe de Armadura</span>
                        </div>

                        {/* Iniciativa */}
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <span className="text-lg font-bold">{dexModifier}</span> {/* Iniciativa = modificador de Destreza */}
                            <span className="text-xs text-gray-500">Iniciativa</span>
                        </div>

                        {/* Deslocamento */}
                        <div className="bg-white p-2 rounded-lg text-center border-2 w-max h-max flex flex-col border-gray-300">
                            <input
                                type="number"
                                className="w-12 text-center p-1 border-2 border-gray-300 rounded-lg bg-white"
                                value={movement}
                                onChange={(e) => setMovement(Number(e.target.value))}
                            />
                            <span className="text-xs text-gray-500">Deslocamento</span>
                        </div>
                    </div>

                    {/* Pontos de Vida */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        <div className="flex flex-col gap-2">
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Vida Máxima</span>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        value={maxHp}
                                        onChange={(e) => setMaxHp(parseInt(e.target.value))}
                                        className="text-2xl font-bold text-center w-20"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Pontos de Vida</span>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        value={currentHp}
                                        onChange={(e) => setCurrentHp(parseInt(e.target.value))}
                                        className="text-2xl font-bold text-center w-20"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Pontos de Vida Temporários</span>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        value={tempHp}
                                        onChange={(e) => setTempHp(parseInt(e.target.value))}
                                        className="text-2xl font-bold text-green-600 text-center w-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white pt-2 pb-2 rounded-lg flex justify-evenly items-center h-max border-2 border-gray-300">
                        {/* Dados de Vida */}
                        <div className="flex flex-col items-center w-max h-max space-y-2">
                            {/* Total (Nível do Personagem) */}
                            <div className="text-center">
                                <div>
                                    <span className="text-xs text-gray-500 mr-1">Total</span>
                                    <span className="text-lg font-bold">3</span>
                                </div>
                            </div>

                            {/* Nível do Dado de Vida (Input Numérico) */}
                            <div className="flex justify-center items-center">
                                <input
                                    type="number"
                                    value="2"
                                    className="w-12 text-center p-1 border-2 border-gray-300 rounded-lg bg-white"
                                />
                            </div>

                            {/* Tipo de Dado de Vida */}
                            <div className="text-center">
                                <span className="text-xs text-gray-500">DADO DE VIDA (D12)</span>
                            </div>
                        </div>

                        {/* Salvação contra a Morte */}
                        <div className="flex flex-col justify-evenly items-center">
                            <span className="text-sm font-semibold text-gray-700">Salvação contra a morte</span>

                            {/* Sucessos */}
                            <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center justify-center gap-2">
                                    <span>Sucesso</span>
                                    {[0, 1, 2].map((index) => (
                                        <div
                                            key={index}
                                            onClick={() => toggleSuccess(index)}
                                            className={`w-4 h-4 border-2 rounded-full cursor-pointer ${successes[index] ? 'bg-green-500' : 'bg-white'
                                                } border-gray-300`}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Falhas */}
                            <div className="flex items-center space-x-4 mt-4">
                                <div className="flex items-center space-x-2 ml-[19px]">
                                    <span>Falha</span>
                                    {[0, 1, 2].map((index) => (
                                        <div
                                            key={index}
                                            onClick={() => toggleFail(index)}
                                            className={`w-4 h-4 border-2 rounded-full cursor-pointer ${failures[index] ? 'bg-red-500' : 'bg-white'
                                                } border-gray-300`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventário */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                        <span className="text-sm font-semibold text-gray-700">Inventário</span>
                        <div id="lista-inventario" className="space-y-3 mt-3">
                            {inventory.map((inventario, index) => (
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
                <div className="space-y-5">
                    <div className="space-y-4 mx-auto">
                        {/* Características */}
                        <div className="p-5 rounded-lg bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
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
                    <div className="p-5 rounded-lg space-y-4 w-full bg-gray-100 border-2 border-black " style={{ boxShadow: "0 0 0 4px white, 0 0 0 7px black" }}>
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
