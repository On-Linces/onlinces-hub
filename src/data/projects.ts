// src/data/projects.ts
import hackOnLincesImg from '../assets/images/hackonlinces.png'
import scriptOnLincesImg from '../assets/images/scriptonlinces.png'
import adventLeadboardImg from '../assets/images/adventleadboard.png'

export interface Project {
  id: string
  title: string
  description: string    // descripción larga para el modal
  image: string
  link: string           // URL externa
  linkLabel?: string     // texto del botón (por defecto "Visitar sitio")
}

export const PROJECTS: Project[] = [
  {
    id: 'hack-onlinces',
    title: 'Hack OnLinces',
    description:
      'HackOnLinces es un evento de trabajo continuo durante 28 horas, en el que equipos de estudiantes se reúnen para desarrollar una solución tecnológica ante una problemática real planteada por una empresa. Durante el evento, los participantes ponen en práctica sus conocimientos de programación, diseño, innovación y trabajo en equipo, pasando por diferentes etapas como la ideación, desarrollo, validación y presentación de su propuesta. Más que una competencia, es un espacio para aprender, colaborar y enfrentarse a retos similares a los del entorno profesional.',
    image: hackOnLincesImg,
    link: 'https://hackathon.onlinces.net/',
    linkLabel: 'Visitar Hack OnLinces'
  },
  {
    id: 'script-estudiantil',
    title: 'Script Estudiantil',
    description:
      'Script Estudiantil es un blog estudiantil creado para compartir breves reseñas y experiencias desde la perspectiva de los propios estudiantes. A través de publicaciones, se recopilan vivencias relacionadas con eventos, proyectos y momentos destacados del semestre. Este proyecto combina la participación de estudiantes de programación con integrantes del grupo de Linces Esports, creando un espacio donde distintas comunidades estudiantiles pueden compartir lo que viven dentro y fuera del aula de clases.',
    image: scriptOnLincesImg,
    link: 'https://script.onlinces.net',
    linkLabel: 'Visitar Script Estudiantil'
  },
  {
    id: 'advent-of-code',
    title: 'Advent of Code Leaderboard',
    description:
      'Advent of Code es un evento de retos diarios de programación que se lleva a cabo durante el mes de diciembre. Cada día se presenta un nuevo desafío que los participantes deben resolver utilizando lógica, pensamiento algorítmico y sus conocimientos de programación. El proyecto busca fortalecer la capacidad para analizar problemas, desarrollar soluciones y mejorar progresivamente las habilidades de programación mediante retos cortos y constantes a lo largo del mes.',
    image: adventLeadboardImg,
    link: 'https://leaderboard.onlinces.net/',
    linkLabel: 'Ver Leaderboard'
  }
  // Próximamente: on.mindssss ohyeahh
]