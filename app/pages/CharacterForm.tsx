'use client';

import React, { useState, useEffect } from 'react';
import '../styles/CharacterForm.css';
import { classesData } from '../data/classesData';
import AttributesSection from './AttributesSection';
import LeftSection from './LeftSection';
import MidSection from './MidSection';
import RightSection from './RightSection'; // ajuste o caminho se necessário

// Definindo o tipo Modifiers no escopo global
type Modifiers = {
    dex: number;
    con: number;
    wis: number;
    str: number;
};

type InventoryItem = {
    item: string;
    quantidade: number;
    peso: number;
};

type Skills = {
    [key: string]: boolean;
};

type SavingThrows = {
    str: boolean;
    dex: boolean;
    con: boolean;
    int: boolean;
    wis: boolean;
    cha: boolean;
};

const CharacterForm: React.FC = () => {
    // Estado dos atributos
    const [attributes, setAttributes] = useState({
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    });

    // Estado das informações do personagem
    const [characterName, setCharacterName] = useState<string>('');
    const [race, setRace] = useState<string>('');
    const [charClass, setCharClass] = useState<string>('');
    const [level, setLevel] = useState<number>(1);
    const [background, setBackground] = useState<string>('');
    const [alignment, setAlignment] = useState<string>('');
    const [xp, setXp] = useState<string>('');

    // Estado dos atributos e status
    const [movement, setMovement] = useState<number>(30);
    const [tempHp, setTempHp] = useState<number>(0);
    const [successes, setSuccesses] = useState<boolean[]>([false, false, false]);
    const [failures, setFailures] = useState<boolean[]>([false, false, false]);
    const [inventory, setInventory] = useState<InventoryItem[]>([{ item: 'Espada', quantidade: 1, peso: 3 }]);
    const [maxHp, setMaxHp] = useState<number>(10);
    const [initialHp, setInitialHp] = useState<number>(10);
    const [currentHp, setCurrentHp] = useState<number>(10);
    const [habilidades, setHabilidades] = useState<{ [key: string]: boolean }>({});
    const [inspiration, setInspiration] = useState<boolean>(false);
    const [savingThrows, setSavingThrows] = useState<SavingThrows>({
        str: false,
        dex: false,
        con: false,
        int: false,
        wis: false,
        cha: false,
    });
    const [skills, setSkills] = useState<Skills>({
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

    // Funções para alterar os valores de HP
    const handleMaxHpChange = (newMaxHp: number) => setMaxHp(newMaxHp);
    const handleCurrentHpChange = (newCurrentHp: number) => setCurrentHp(newCurrentHp);
    const handleTempHpChange = (newTempHp: number) => setTempHp(newTempHp);

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = parseInt(e.target.value, 10) || 1;
        setLevel(newLevel);
    };

    const handleAddItem = () => {
        const newItem = { item: 'Nova Arma', quantidade: 1, peso: 5 }; // Exemplo de novo item
        setInventory([...inventory, newItem]);
    };

    const toggleSuccess = (index: number) => {
        setSuccesses(prev => prev.map((success, i) => (i === index ? !success : success)));
    };

    const toggleFail = (index: number) => {
        setFailures(prev => prev.map((failure, i) => (i === index ? !failure : failure)));
    };

    const toggleDetails = (key: string) => {
        setHabilidades(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleInspiration = () => setInspiration(!inspiration);

    const toggleSavingThrow = (attr: keyof SavingThrows) => {
        setSavingThrows(prev => ({ ...prev, [attr]: !prev[attr] }));
    };

    const toggleSkill = (skill: keyof Skills) => {
        setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
    };

    const adjustAttribute = (attribute: string, value: number) => {
        setAttributes(prevAttributes => ({
            ...prevAttributes,
            [attribute]: prevAttributes[attribute] + value,
        }));
    };

    const addItemToInventory = (newItem: InventoryItem) => {
        setInventory([...inventory, newItem]);
    };

    const calculateProficiencyBonus = (level: number): number => {
        if (level >= 1 && level <= 4) return 2;
        if (level >= 5 && level <= 8) return 3;
        if (level >= 9 && level <= 13) return 4;
        if (level >= 14 && level <= 16) return 5;
        if (level >= 17) return 6;
        return 2;
    };

    const proficiencyBonus = calculateProficiencyBonus(level);

    // Calculando modificadores de atributos
    const dexModifier = Math.floor((attributes.dexterity - 10) / 2);
    const conModifier = Math.floor((attributes.constitution - 10) / 2);
    const wisModifier = Math.floor((attributes.wisdom - 10) / 2);
    const strModifier = Math.floor((attributes.strength - 10) / 2);

    const foundClass = classesData.find(classe => classe.nome === charClass);

    // Função para rolar um dado com um número específico de lados
    const rollDice = (sides: number): number => {
        return Math.floor(Math.random() * sides) + 1;
    };

    // Função para calcular o HP inicial e o HP por nível
    const calculateHp = () => {
        if (foundClass) {
            // HP inicial
            const initialHp = foundClass.vidaInicial(conModifier);
            setInitialHp(initialHp);

            // HP máximo para nível 1
            if (level === 1) {
                setMaxHp(initialHp);
            } else {
                // HP máximo para níveis acima do 1
                let currentHp = initialHp;
                for (let i = 2; i <= level; i++) {
                    // Rolar o dado de vida e adicionar o modificador de Constituição
                    const rolledHp = rollDice(parseInt(foundClass.dadoDeVida.replace('d', ''), 10));
                    currentHp += rolledHp + conModifier;
                }
                setMaxHp(currentHp);
            }
        }
    };


    useEffect(() => {
        calculateHp();
    }, [charClass, level]);

    const armorClass = foundClass && foundClass.ca
        ? foundClass.ca({
            dex: dexModifier,
            con: conModifier,
            wis: wisModifier,
            str: strModifier,
        })
        : 10 + dexModifier;

    const initiative = dexModifier;


    return (
        <div className="p-3 flex flex-col items-center box-content">
            <h1 className='text-6xl my-8 text-[#be161d]'>Ficha</h1>
            {/* Cabeça */}
            <div className="header bg-no-repeat bg-cover flex items-center">
                <div className="nomebox">
                    <input
                        type="text"
                        className="w-10/12 h-7 bg-gray-200 dark:bg-[#353535] dark:text-white p-3 text-center mt-8"
                        placeholder="Nome do Personagem"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                    />
                </div>
                <div className="char-box bg-cover flex items-center">
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 w-full">
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Raça"
                            value={race}
                            onChange={(e) => setRace(e.target.value)}
                        />

                        {/* Campo de seleção para as classes */}
                        <select
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
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
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Nível"
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value, 10) || 1)}
                            min={1}
                            max={20} // O nível máximo é 20
                        />

                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Antecedente"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Alinhamento"
                            value={alignment}
                            onChange={(e) => setAlignment(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="XP"
                            value={xp}
                            onChange={(e) => setXp(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Seção de Atributos */}
            <AttributesSection attributes={attributes} adjustAttribute={adjustAttribute} />
            <div className="mt-8 flex flex-col lg:flex-row gap-6 p-2">
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
                <MidSection
                    dexModifier={dexModifier}
                    movement={movement}
                    maxHp={maxHp}
                    initialHp={initialHp}
                    currentHp={currentHp}
                    tempHp={tempHp}
                    successes={successes}
                    failures={failures}
                    inventory={inventory}
                    toggleSuccess={(index) => {
                        setSuccesses(prev => {
                            const newSuccesses = [...prev];
                            newSuccesses[index] = !newSuccesses[index];
                            return newSuccesses;
                        });
                    }}
                    toggleFail={(index) => {
                        setFailures(prev => {
                            const newFailures = [...prev];
                            newFailures[index] = !newFailures[index];
                            return newFailures;
                        });
                    }}
                    onMovementChange={setMovement}
                    onAddItem={handleAddItem}
                    onMaxHpChange={handleMaxHpChange}
                    onCurrentHpChange={handleCurrentHpChange}
                    onTempHpChange={handleTempHpChange}
                    armorClass={armorClass}
                    initiative={initiative}
                />

                {/* Direita */}
                <RightSection className={charClass} level={level} />


            </div>
        </div>
    );
};

export default CharacterForm;
