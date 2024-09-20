'use client';

import React, { useState, useEffect } from 'react';
import '../styles/CharacterForm.css';
import { classesData } from '../data/classesData';
import SecaoAtributos from './SecaoAtributos';
import SecaoEsquerda from './SecaoEsquerda';
import SecaoCentral from './SecaoCentral';
import SecaoDireita from './SecaoDireita'; // ajuste o caminho se necessário

// Definindo o tipo Modificadores no escopo global
type Modificadores = {
    for: number;
    des: number;
    con: number;
    int: number;
    sab: number;
    car: number;
};

type ItemInventario = {
    item: string;
    quantidade: number;
    peso: number;
};

type Pericias = {
    [chave: string]: boolean;
};

type TestesDeSalvaguarda = {
    for: boolean;
    des: boolean;
    con: boolean;
    int: boolean;
    sab: boolean;
    car: boolean;
};

const FormularioPersonagem: React.FC = () => {
    // Estado dos atributos
    const [atributos, setAtributos] = useState({
        forca: 10,
        destreza: 10,
        constituicao: 10,
        inteligencia: 10,
        sabedoria: 10,
        carisma: 10,
    });

    // Estado das informações do personagem
    const [nomePersonagem, setNomePersonagem] = useState<string>('');
    const [raca, setRaca] = useState<string>('');
    const [classe, setClasse] = useState<string>('');
    const [nivel, setNivel] = useState<number>(1);
    const [antecedente, setAntecedente] = useState<string>('');
    const [alinhamento, setAlinhamento] = useState<string>('');
    const [experiencia, setExperiencia] = useState<string>('');

    // Estado dos atributos e status
    const [movimento, setMovimento] = useState<number>(30);
    const [pvTemporarios, setPvTemporarios] = useState<number>(0);
    const [sucessos, setSucessos] = useState<boolean[]>([false, false, false]);
    const [falhas, setFalhas] = useState<boolean[]>([false, false, false]);
    const [inventario, setInventario] = useState<ItemInventario[]>([{ item: 'Espada', quantidade: 1, peso: 3 }]);
    const [pvMaximos, setPvMaximos] = useState<number>(10);
    const [pvIniciais, setPvIniciais] = useState<number>(10);
    const [pvAtuais, setPvAtuais] = useState<number>(10);
    const [habilidades, setHabilidades] = useState<{ [chave: string]: boolean }>({});
    const [inspiracao, setInspiracao] = useState<boolean>(false);
    const [testesDeSalvaguarda, setTestesDeSalvaguarda] = useState<TestesDeSalvaguarda>({
        for: false,
        des: false,
        con: false,
        int: false,
        sab: false,
        car: false,
    });
    const [pericias, setPericias] = useState<Pericias>({
        acrobacia: false,
        adestrarAnimais: false,
        arcanismo: false,
        atletismo: false,
        atuacao: false,
        enganacao: false,
        furtividade: false,
        historia: false,
        intimidacao: false,
        intuicao: false,
        investigacao: false,
        medicina: false,
        natureza: false,
        percepcao: false,
        persuasao: false,
        prestidigitacao: false,
        religiao: false,
        sobrevivencia: false,
    });

    // Funções para alterar os valores de PV
    const handleMudancaPvMaximos = (novosPvMaximos: number) => setPvMaximos(novosPvMaximos);
    const handleMudancaPvAtuais = (novosPvAtuais: number) => setPvAtuais(novosPvAtuais);
    const handleMudancaPvTemporarios = (novosPvTemporarios: number) => setPvTemporarios(novosPvTemporarios);

    const handleMudancaNivel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novoNivel = parseInt(e.target.value, 10) || 1;
        setNivel(novoNivel);
    };

    const handleAdicionarItem = () => {
        const novoItem = { item: 'Nova Arma', quantidade: 1, peso: 5 }; // Exemplo de novo item
        setInventario([...inventario, novoItem]);
    };

    const alternarSucesso = (index: number) => {
        setSucessos(prev => prev.map((sucesso, i) => (i === index ? !sucesso : sucesso)));
    };

    const alternarFalha = (index: number) => {
        setFalhas(prev => prev.map((falha, i) => (i === index ? !falha : falha)));
    };

    const alternarDetalhes = (chave: string) => {
        setHabilidades(prev => ({
            ...prev,
            [chave]: !prev[chave],
        }));
    };

    const alternarInspiracao = () => setInspiracao(!inspiracao);

    const alternarTesteDeSalvaguarda = (atributo: keyof TestesDeSalvaguarda) => {
        setTestesDeSalvaguarda(prev => ({ ...prev, [atributo]: !prev[atributo] }));
    };

    const alternarPericia = (pericia: keyof Pericias) => {
        setPericias(prev => ({ ...prev, [pericia]: !prev[pericia] }));
    };

    const ajustarAtributo = (atributo: string, valor: number) => {
        setAtributos(atributosAnteriores => ({
            ...atributosAnteriores,
            [atributo]: atributosAnteriores[atributo] + valor,
        }));
    };

    const adicionarItemAoInventario = (novoItem: ItemInventario) => {
        setInventario([...inventario, novoItem]);
    };

    const calcularBonusDeProficiencia = (nivel: number): number => {
        if (nivel >= 1 && nivel <= 4) return 2;
        if (nivel >= 5 && nivel <= 8) return 3;
        if (nivel >= 9 && nivel <= 13) return 4;
        if (nivel >= 14 && nivel <= 16) return 5;
        if (nivel >= 17) return 6;
        return 2;
    };

    const bonusDeProficiencia = calcularBonusDeProficiencia(nivel);

    // Calculando modificadores de atributos
    const modificadorDes = Math.floor((atributos.destreza - 10) / 2);
    const modificadorCon = Math.floor((atributos.constituicao - 10) / 2);
    const modificadorSab = Math.floor((atributos.sabedoria - 10) / 2);
    const modificadorFor = Math.floor((atributos.forca - 10) / 2);
    const modificadorInt = Math.floor((atributos.forca - 10) / 2);
    const modificadorCar = Math.floor((atributos.forca - 10) / 2);

    const classeEncontrada = classesData.find(classeItem => classeItem.nome === classe);

    // Função para rolar um dado com um número específico de lados
    const rolarDado = (lados: number): number => {
        return Math.floor(Math.random() * lados) + 1;
    };

    // Função para calcular o PV inicial e o PV por nível
    const calcularPv = () => {
        if (classeEncontrada) {
            // PV inicial
            const pvInicial = classeEncontrada.vidaInicial(modificadorCon);
            setPvIniciais(pvInicial);

            // PV máximo para nível 1
            if (nivel === 1) {
                setPvMaximos(pvInicial);
            } else {
                // PV máximo para níveis acima do 1
                let pvAtual = pvInicial;
                for (let i = 2; i <= nivel; i++) {
                    // Rolar o dado de vida e adicionar o modificador de Constituição
                    const pvRolado = rolarDado(parseInt(classeEncontrada.dadoDeVida.replace('d', ''), 10));
                    pvAtual += pvRolado + modificadorCon;
                }
                setPvMaximos(pvAtual);
            }
        }
    };

    useEffect(() => {
        calcularPv();
    }, [classe, nivel]);

    useEffect(() => {
        localStorage.setItem('nomePersonagem', nomePersonagem);
    }, [nomePersonagem]);
    
    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nomePersonagem');
        if (nomeSalvo) {
            setNomePersonagem(nomeSalvo);
        }
    }, []);

    const classeDeArmadura = classeEncontrada && typeof classeEncontrada.ca === 'function'
    ? classeEncontrada.ca({
        des: modificadorDes,
        con: modificadorCon,
        sab: modificadorSab,
        for: modificadorFor,
        int: modificadorInt,
        car: modificadorCar,
    })
    : 10 + modificadorDes; // Valor base caso não haja função de CA

const iniciativa = modificadorDes;


    return (
        <div className="p-3 flex flex-col items-center box-content">
            <h1 className='text-6xl my-8 text-[#be161d]'>Ficha</h1>
            {/* Cabeçalho */}
            <div className="header bg-no-repeat bg-cover flex items-center">
                <div className="nomebox">
                    <input
                        type="text"
                        className="w-10/12 h-7 bg-gray-200 dark:bg-[#353535] dark:text-white p-3 text-center mt-8"
                        placeholder="Nome do Personagem"
                        value={nomePersonagem}
                        onChange={(e) => setNomePersonagem(e.target.value)}
                    />
                </div>
                <div className="char-box bg-cover flex items-center">
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 w-full">
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Raça"
                            value={raca}
                            onChange={(e) => setRaca(e.target.value)}
                        />

                        {/* Campo de seleção para as classes */}
                        <select
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            value={classe}
                            onChange={(e) => setClasse(e.target.value)}
                        >
                            <option value="">Selecione uma Classe</option>
                            {classesData.map((classeItem, index) => (
                                <option key={index} value={classeItem.nome}>
                                    {classeItem.nome}
                                </option>
                            ))}
                        </select>

                        {/* Campo de entrada para o nível */}
                        <input
                            type="number"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Nível"
                            value={nivel}
                            onChange={(e) => setNivel(parseInt(e.target.value, 10) || 1)}
                            min={1}
                            max={20} // O nível máximo é 20
                        />

                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Antecedente"
                            value={antecedente}
                            onChange={(e) => setAntecedente(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="Alinhamento"
                            value={alinhamento}
                            onChange={(e) => setAlinhamento(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-gray-200 dark:bg-[#353535] dark:text-white p-1 text-center text-xs h-7"
                            placeholder="XP"
                            value={experiencia}
                            onChange={(e) => setExperiencia(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Seção de Atributos */}
            <SecaoAtributos atributos={atributos} ajustarAtributo={ajustarAtributo} />
            <div className="mt-8 flex flex-col lg:flex-row gap-6 p-2">
                {/* Esquerda */}
                <div className="flex-1 space-y-6">
                    <SecaoEsquerda
                        atributos={atributos}
                        testesDeResistencia={testesDeSalvaguarda}
                        aptidoes={pericias}
                        alternarTesteDeResistencia={alternarTesteDeSalvaguarda}
                        alternarAptidao={alternarPericia}
                        bonusDeProficiencia={bonusDeProficiencia}
                        inspiracao={inspiracao}
                        alternarInspiracao={alternarInspiracao}
                    />
                </div>

                {/* Meio */}
                <SecaoCentral
                    modificadorDes={modificadorDes}
                    movimento={movimento}
                    hpMaximo={pvMaximos}
                    hpInicial={pvIniciais}
                    hpAtual={pvAtuais}
                    hpTemporario={pvTemporarios}
                    sucessos={sucessos}
                    falhas={falhas}
                    inventario={inventario}
                    alternarSucesso={(index) => {
                        setSucessos(prev => {
                            const novosSucessos = [...prev];
                            novosSucessos[index] = !novosSucessos[index];
                            return novosSucessos;
                        });
                    }}
                    alternarFalha={(index) => {
                        setFalhas(prev => {
                            const novasFalhas = [...prev];
                            novasFalhas[index] = !novasFalhas[index];
                            return novasFalhas;
                        });
                    }}
                    aoAlterarMovimento={setMovimento}
                    aoAdicionarItem={handleAdicionarItem}
                    aoAlterarHpMaximo={handleMudancaPvMaximos}
                    aoAlterarHpAtual={handleMudancaPvAtuais}
                    aoAlterarHpTemporario={handleMudancaPvTemporarios}
                    classeDeArmadura={classeDeArmadura}
                    iniciativa={iniciativa}
                />

                {/* Direita */}
                <SecaoDireita className={classe} nivel={nivel} />
            </div>
        </div>
    );
};

export default FormularioPersonagem;