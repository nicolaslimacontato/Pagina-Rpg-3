import React from 'react';

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
    className: "Barbáro",
    iconSrc: "./assets/img/iconesbarbaro.png",
    source: "Valdas Spire of Secrets (2021)",
    description: "O Barbáro é um perito em construção e manutenção de equipamentos, capaz de criar e reparar itens de forma eficiente. Ele utiliza suas habilidades manuais e conhecimento técnico para beneficiar o grupo, seja melhorando armas, armaduras ou criando dispositivos úteis.",
    hitDie: "d10",
    mainStats: "Qualquer",
    resistances: "Constituição e Inteligência",
    backgroundImage: "./assets/img/barbaro.png",
    learnMoreLink: "https://v-l-d-s.tumblr.com/post/713699317204025344/craftsman"
  },
  {
    className: "SUS",
    iconSrc: "./assets/img/iconesbarbaro.png",
    source: "Valdas Spire of Secrets (2021)",
    description: "O Barbáro é um perito em construção e manutenção de equipamentos, capaz de criar e reparar itens de forma eficiente. Ele utiliza suas habilidades manuais e conhecimento técnico para beneficiar o grupo, seja melhorando armas, armaduras ou criando dispositivos úteis.",
    hitDie: "d10",
    mainStats: "Qualquer",
    resistances: "Constituição e Inteligência",
    backgroundImage: "./assets/img/barbaro.png",
    learnMoreLink: "https://v-l-d-s.tumblr.com/post/713699317204025344/craftsman"
  },
];

function ClassesGrid() {
  return (
    <section id="classes" className="p-4 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {classesData.map((classData, index) => (
          <ClassCard key={index} {...classData} />
        ))}
      </div>
    </section>
  );
}

export default ClassesGrid;
