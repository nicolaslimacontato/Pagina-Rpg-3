"use client"; // Adicione isso na primeira linha

import React, { useState } from 'react';
import ClassCard from './ClassCard';

const classesData = [
  {
    className: "Alquimista",
    iconSrc: "./assets/img/iconesalchemist.png",
    source: "Valdas Spire of Secrets (2021)",
    description: "O Alquimista é um especialista em manipular elementos químicos para criar explosões, curas e efeitos variados, utilizando suas habilidades intelectuais para maximizar a eficácia de seus recursos.",
    hitDie: "d8",
    mainStats: "Inteligência e Sabedoria",
    resistances: "Constituição e Inteligência",
    backgroundImage: "./assets/img/alchemist.png",
    learnMoreLink: "https://v-l-d-s.tumblr.com/post/713642536593473536/alchemist"
  },
  {
    className: "Artesão",
    iconSrc: "./assets/img/iconesartesao.png",
    source: "Valdas Spire of Secrets (2021)",
    description: "O Arteão é um perito em construção e manutenção de equipamentos, capaz de criar e reparar itens de forma eficiente. Ele utiliza suas habilidades manuais e conhecimento técnico para beneficiar o grupo, seja melhorando armas, armaduras ou criando dispositivos úteis.",
    hitDie: "d10",
    mainStats: "Qualquer",
    resistances: "Constituição e Inteligência",
    backgroundImage: "./assets/img/artesao.png",
    learnMoreLink: "https://v-l-d-s.tumblr.com/post/713699317204025344/craftsman"
  },
  {
    className: "Bárbaro",
    iconSrc: "./assets/img/iconesbarbaro.png",
    source: "Basic Rules",
    description: "O Bárbaro é um guerreiro feroz, conhecido por sua força bruta e resistência. Ele entra em fúria durante o combate, aumentando sua capacidade de causar e suportar danos.",
    hitDie: "d12",
    mainStats: "Força e Constituição",
    resistances: "Constituição e Força",
    backgroundImage: "./assets/img/barbaro.png",
    learnMoreLink: "https://www.dndbeyond.com/classes/9-barbarian"
  },
  {
    "className": "Bardo",
    "iconSrc": "./assets/img/iconesbardo.png",
    "source": "Basic Rules",
    "description": "O Bardo é um mestre da música e da magia, capaz de encantar aliados e confundir inimigos com suas habilidades artísticas e conhecimento arcano. Ele usa suas canções e contos para inspirar, curar e manipular o ambiente ao seu favor.",
    "hitDie": "d8",
    "mainStats": "Carisma",
    "resistances": "Destreza e Carisma",
    "backgroundImage": "./assets/img/bardo.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/1-bard"
  },
  {
    "className": "Bruxa",
    "iconSrc": "./assets/img/iconesbruxa.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "A Bruxa é uma conjuradora de feitiçaria sombria e ritualística, que utiliza seus poderes para manipular o destino e invocar entidades sobrenaturais. Ela é capaz de lançar feitiços poderosos e criar poções e maldições que influenciam o mundo ao seu redor.",
    "hitDie": "d6",
    "mainStats": "Sabedoria",
    "resistances": "Constituição e Sabedoria",
    "backgroundImage": "./assets/img/bruxa.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713865285821775872/witch"
  },
  {
    "className": "Warlock(Bruxo)",
    "iconSrc": "./assets/img/iconesbruxo.png",
    "source": "Basic Rules",
    "description": "O bruxo(ou warlock) é um conjurador que fez um pacto com uma entidade sobrenatural para obter poderes arcanos. Ele utiliza esses poderes para lançar feitiços, invocar seres do além e manipular forças cósmicas em troca de serviços ou favores para sua patrona.",
    "hitDie": "d8",
    "mainStats": "Carisma",
    "resistances": "Constituição e Carisma",
    "backgroundImage": "./assets/img/bruxo.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/7-warlock"
  },
  {
    "className": "Capitão",
    "iconSrc": "./assets/img/iconescapitao.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Capitão é um líder estratégico e habilidoso em combate, especializado em táticas militares e gestão de tropas. Ele usa sua autoridade e experiência para inspirar seus aliados, coordenar ataques e manter a ordem no campo de batalha.",
    "hitDie": "d10",
    "mainStats": "Destreza",
    "resistances": "Constituição e Sabedoria",
    "backgroundImage": "./assets/img/capitao.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713688686586363904/captain"
  },
  {
    "className": "Clérigo",
    "iconSrc": "./assets/img/iconesclerigo.png",
    "source": "Basic Rules",
    "description": "O Clérigo é um sacerdote devoto que canaliza o poder divino para realizar milagres e proteger seus aliados. Ele usa seus dons para curar, abençoar e invocar a força de sua divindade para enfrentar as forças das trevas e trazer justiça ao mundo.",
    "hitDie": "d8",
    "mainStats": "Sabedoria",
    "resistances": "Sabedoria e Carisma",
    "backgroundImage": "./assets/img/clerigo.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/2-cleric"
  },
  {
    className: "Druida",
    iconSrc: "./assets/img/iconesdruida.png",
    source: "Basic Rules",
    description: "O Druida é um guardião da natureza, capaz de se transformar em animais e usar a magia da terra para curar e proteger. Ele mantém o equilíbrio entre a civilização e o mundo natural.",
    hitDie: "d8",
    mainStats: "Sabedoria",
    resistances: "Constituição e Sabedoria",
    backgroundImage: "./assets/img/druida.png",
    learnMoreLink: "https://www.dndbeyond.com/classes/3-druid"
  },
  {
    "className": "Feiticeiro",
    "iconSrc": "./assets/img/iconesfeiticeiro.png",
    "source": "Basic Rules",
    "description": "O Feiticeiro é um conjurador que possui um poder mágico inato, resultado de uma linhagem mágica ou de uma bênção sobrenatural. Ele manipula a magia através de sua força de vontade e potencial inato, lançando feitiços poderosos e moldando a magia conforme suas necessidades.",
    "hitDie": "d6",
    "mainStats": "Carisma",
    "resistances": "Constituição e Carisma",
    "backgroundImage": "./assets/img/feiticeiro.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/6-sorcerer"
  },
  {
    "className": "Guardião",
    "iconSrc": "./assets/img/iconesguardiao.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Guardião é um defensor imponente, especializado em proteger aliados e controlar o campo de batalha com sua presença. Ele utiliza técnicas de combate defensivo e habilidades protetoras para assegurar que seus companheiros estejam seguros e que os inimigos sejam mantidos à distância.",
    "hitDie": "d12",
    "mainStats": "Constituição",
    "resistances": "Força e Constituição",
    "backgroundImage": "./assets/img/guardiao.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713788902741344256/warden"
  },
  {
    "className": "Guerreiro",
    "iconSrc": "./assets/img/iconesguerreiro.png",
    "source": "Basic Rules",
    "description": "O Guerreiro é um combatente experiente e versátil, treinado em uma ampla gama de armas e armaduras. Ele se destaca no combate corpo a corpo e na estratégia militar, capaz de suportar grandes quantidades de dano e desferir ataques poderosos com precisão.",
    "hitDie": "d10",
    "mainStats": "Força ou Destreza",
    "resistances": "Constituição e Força",
    "backgroundImage": "./assets/img/Guerreiro.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/fighter"
  },
  {
    "className": "Investigador",
    "iconSrc": "./assets/img/iconesinvestigador.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Investigador é um perito em desvendar mistérios e resolver enigmas. Com habilidades de dedução e investigação, ele utiliza seu conhecimento e suas técnicas para descobrir segredos, resolver crimes e superar desafios complexos.",
    "hitDie": "d8",
    "mainStats": "Inteligência",
    "resistances": "Destreza e Inteligência",
    "backgroundImage": "./assets/img/investigador.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713771983762030593/investigator"
  },
  {
    "className": "Ladino",
    "iconSrc": "./assets/img/iconesladino.png",
    "source": "Basic Rules",
    "description": "O Ladino é um mestre da furtividade e da astúcia, especializado em técnicas de infiltração, roubo e desarme de armadilhas. Ele usa sua habilidade para se mover nas sombras e executar ataques precisos, além de possuir uma variedade de truques e habilidades úteis.",
    "hitDie": "d8",
    "mainStats": "Destreza",
    "resistances": "Destreza e Inteligência",
    "backgroundImage": "./assets/img/ladino.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/rogue"
  },
  {
    "className": "Lutador",
    "iconSrc": "./assets/img/iconeslutador.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Lutador é um combatente desarmado que se especializa em técnicas de luta e artes marciais. Ao invés de confiar em magia ou habilidades sobrenaturais, ele aperfeiçoa sua habilidade física e brutalidade através de intensos treinos e combate. Seu estilo é baseado na força bruta e na ferocidade, utilizando golpes e estratégias para dominar seus adversários em combate corpo a corpo.",
    "hitDie": "d10",
    "mainStats": "Força ou Destreza",
    "resistances": "Constituição e Força",
    "backgroundImage": "./assets/img/lutador.png",
    "learnMoreLink": "https://www.dmsguild.com/product/472734/Classe-O-Lutador-5E"  // Este link foi colocado como referência; ajuste se necessário.
  },
  {
    "className": "Mago",
    "iconSrc": "./assets/img/iconesmago.png",
    "source": "Basic Rules",
    "description": "O Mago é um conjurador de magia arcana, especializado em lançar feitiços poderosos e manipular a essência mágica do universo. Ele estuda os segredos da magia e usa seu conhecimento para enfrentar inimigos e resolver problemas através de poderosos encantamentos.",
    "hitDie": "d6",
    "mainStats": "Inteligência",
    "resistances": "Constituição e Inteligência",
    "backgroundImage": "./assets/img/mago.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/wizard"
  },
  {
    "className": "Mago de Guerra",
    "iconSrc": "./assets/img/iconesmagodeguerra.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Mago de Guerra combina o conhecimento arcano com habilidades militares, especializando-se em feitiçaria ofensiva e táticas de combate. Ele lança feitiços devastadores e usa sua magia para dominar o campo de batalha e proteger seus aliados.",
    "hitDie": "d8",
    "mainStats": "Inteligência",
    "resistances": "Constituição e Inteligência",
    "backgroundImage": "./assets/img/magodeguerra.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713862229208006656/warmage"
  },
  {
    "className": "Martir",
    "iconSrc": "./assets/img/iconesmartir.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Martir é um guerreiro destemido que se sacrifica pelo bem maior. Ele usa sua resistência e habilidades defensivas para proteger seus aliados e enfrentar perigos imensos, muitas vezes colocando sua própria vida em risco para garantir a segurança dos outros.",
    "hitDie": "d10",
    "mainStats": "Constituição",
    "resistances": "Força e Constituição",
    "backgroundImage": "./assets/img/martir.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713774819465969664/martyr"
  },
  {
    "className": "Monge",
    "iconSrc": "./assets/img/iconesmonge.png",
    "source": "Basic Rules",
    "description": "O Monge é um combatente ágil e focado, treinado em artes marciais e técnicas espirituais. Ele utiliza sua disciplina e habilidades físicas para realizar ataques rápidos, desviar de ataques e canalizar energia interna para criar efeitos sobrenaturais.",
    "hitDie": "d8",
    "mainStats": "Destreza ou Sabedoria",
    "resistances": "Destreza e Sabedoria",
    "backgroundImage": "./assets/img/monge.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/monk"
  },
  {
    "className": "Necromante",
    "iconSrc": "./assets/img/iconesnecromante.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Necromante é um mestre das artes sombrias, especializado em manipular a vida e a morte. Ele utiliza suas habilidades para invocar mortos-vivos, drenar a vitalidade de seus inimigos e controlar forças necromânticas para seus próprios fins.",
    "hitDie": "d8",
    "mainStats": "Inteligência",
    "resistances": "Constituição e Inteligência",
    "backgroundImage": "./assets/img/necromante.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713781629682860032/necromancer"
  },
  {
    "className": "Paladino",
    "iconSrc": "./assets/img/iconespaladino.png",
    "source": "Basic Rules",
    "description": "O Paladino é um guerreiro sagrado, dedicado a uma causa divina e imbuído de poderes de cura e proteção. Ele combate o mal com fervor, usando sua fé para curar aliados, proteger os inocentes e exorcizar as forças das trevas.",
    "hitDie": "d10",
    "mainStats": "Força ou Carisma",
    "resistances": "Força e Carisma",
    "backgroundImage": "./assets/img/paladino.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/paladin"
  },
  {
    "className": "Patrulheiro",
    "iconSrc": "./assets/img/iconespatrulheiro.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Patrulheiro é um explorador e combatente especializado em rastreamento e sobrevivência na natureza. Ele usa suas habilidades de caça e conhecimento do ambiente para proteger seus aliados e enfrentar inimigos com precisão e astúcia.",
    "hitDie": "d10",
    "mainStats": "Destreza",
    "resistances": "Destreza e Sabedoria",
    "backgroundImage": "./assets/img/patrulheiro.png",
    "learnMoreLink": "https://www.dndbeyond.com/classes/ranger"
  },
  {
    "className": "Perseguidor",
    "iconSrc": "./assets/img/iconesperseguidor.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Perseguidor é um combatente implacável que enfrenta desafios com uma determinação inabalável. Ele vive para a batalha e para superar adversidades, dedicando-se a uma vida de constante superação. Seu verdadeiro poder reside na mente e no espírito inquebrantáveis, sempre pronto para enfrentar o impossível e alcançar a grandeza.",
    "hitDie": "d10",
    "mainStats": "Qualquer",
    "resistances": "Constituição e Força",
    "backgroundImage": "./assets/img/perseguidor.png",
    "learnMoreLink": "https://www.dmsguild.com/product/475830/Classe-O-Perseguidor-5E"
  },
  {
    "className": "Pistoleiro",
    "iconSrc": "./assets/img/iconespistoleiro.png",
    "source": "Valdas Spire of Secrets (2021)",
    "description": "O Pistoleiro é um especialista em armas de fogo, conhecido por sua precisão e habilidade em combate à distância. Ele usa pistolas e outras armas de fogo para desferir ataques rápidos e letais, mantendo-se ágil e focado em suas vítimas.",
    "hitDie": "d8",
    "mainStats": "Destreza",
    "resistances": "Destreza e Inteligência",
    "backgroundImage": "./assets/img/pistoleiro.png",
    "learnMoreLink": "https://v-l-d-s.tumblr.com/post/713712493813497857/gunslinger"
  }
];

function ClassesGrid() {
  const [campoDeBusca, atualizaCampoDeBusca] = useState('');

  // Filtra as classes conforme o termo de pesquisa
  const filteredClasses = classesData.filter((classData) =>
    classData.className.toLowerCase().includes(campoDeBusca.toLowerCase())
  );

  return (
    <section id="classes" className="p-4 container mx-auto">
      {/* Barra de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar classes..."
          className="w-full p-2 rounded border border-gray-300"
          value={campoDeBusca}
          onChange={(e) => atualizaCampoDeBusca(e.target.value)}
        />
      </div>

      {/* Grid de classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classData, index) => (
            <ClassCard key={index} {...classData} />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma classe encontrada.</p>
        )}
      </div>
    </section>
  );
}
export default ClassesGrid;
