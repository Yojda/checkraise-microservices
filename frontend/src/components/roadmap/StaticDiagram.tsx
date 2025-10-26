'use client';

import Roadmap from './Roadmap';

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FaYoutube, FaGlobe, FaLongArrowAltRight, FaBookOpen} from "react-icons/fa";
import Header from "@packages/ui-kit/Header";
import {getRelatedProblems} from "../../../../../src/features/roadmap/actions/roadmapActions";
import Footer from "@packages/ui-kit/Footer";

type DetailsMap = {
  [key: string]: {
    description: string;
    links: { label: string; url: string; type: string, author: string }[];
  };
};

const detailsMap : DetailsMap = {
  Bases: {
    description:
      "Les bases du poker couvrent les règles mais aussi plusieurs concepts fondamentaux qui sont essentiels pour débuter dans le jeu.",
    links: [
      { label: "The Basics", url: "https://www.pokerstars.com/poker/learn/course/the-basics/", type: "website", author: "Pokerstars" },
      { label: "Mission Poker #1 – Les Bases du Poker", url: "https://www.youtube.com/watch?v=XIU4SQ_VTEI", type: "video", author: "zChance44" },
      { label: "LES BASES DU POKER", url: "https://www.youtube.com/watch?v=c_IkyvOZj7I", type: "video", author: "Kill Tilt" }
    ]
  },
  "Règles": {
    description:
      "Les règles du poker sont essentielles pour comprendre comment jouer. Seule la variante du Texas Hold'em est abordée ici, car c'est la plus populaire et la plus jouée.",
    links: [
      { label: "Règles du Texas Hold'em", url: "https://www.pokerstars.fr/poker/learn/lesson/regles-du-texas-holdem/", type: "website", author: "Pokerstars" },
      { label: "Comment jouer au poker par Benny", url: "https://www.youtube.com/watch?v=fbb49FaKze0", type: "video", author: "Pokerstars" }
    ]
  },
  "Combinaisons": {
    description:
      "Dans le No Limit Hold'em, le joueur au showdown qui a la meilleure combinaison de 5 cartes gagne. Voici les combinaisons possibles dans l'ordre",
    links: [
      { label: "Classement des mains", url: "https://www.pokerstars.fr/poker/learn/lesson/classement-des-mains-au-poker/", type: "website", author: "Pokerstars" },
    ]
  },
  "Positions": {
    description:
      "Au poker, chaque position compte. Elles sont différentes selon la taille de la table (Full ring, 8-max, 6-max, Heads UP). Voici les positions à savoir",
    links: [
      { label: "Comment BIEN JOUER en fonction des POSITIONS", url: "https://www.youtube.com/watch?v=5W5crqlQoBc&pp=ygUPcG9zaXRpb25zIHBva2Vy0gcJCa0JAYcqIYzv", type: "video", author: "Yoh Viral Poker" },
    ]
  },
  "Raisons de miser": {
    description:
      "Il existe 3 raisons de miser au poker : en protection, en value ou en bluff.",
    links: [
      { label: "POKER QUAND MISER / POURQUOI MISER AU POKER", url: "https://youtu.be/JB6Caye8iSc", type: "video", author: "Yoh Viral Poker" },
      { label: "LES BASES DU POKER #7 - Les 2 raisons de miser au Poker", url: "https://www.youtube.com/watch?v=qJgGcRZLYa0&pp=ygUWcmFpc29ucyBkZSBtaXNlciBwb2tlcg%3D%3D", type: "video", author: "Kill Tilt" },
      { label: "Les fondamentaux au poker : pourquoi miser ?", url: "https://www.poker-academie.com/apprendre-poker/strategie-poker/strategie-generale/4768-les-fondamentaux-au-poker-pourquoi-miser.html", type: "website", author: "Poker Académie" },
    ]
  },
  "Sizings": {
    "description": "Choisir le bon sizing est important, voici les clés pour choisir le bon sizing dans toute situation.",
    "links": [
      {
        "label": "Comment CHOISIR LE MEILLEUR SIZING ?",
        "url": "https://youtu.be/LbLR_k5De0k",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Quel sizing d'open au POKER ???",
        "url": "https://www.youtube.com/watch?v=v6Kh3UPfMIw",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "Combien miser au Poker en No Limit Hold'em ?",
        "url": "https://tolkers.com/montant-mise-poker/",
        "type": "website",
        "author": "Tolkers Poker"
      }
    ]
  },
  "Types de mains": {
    "description": "Les mains de départ sont peuvent être classées en plusieurs catégories. Voici les principales catégories de mains de départ au poker.",
    "links": [
      {
        "label": "Les différents types de mains au Poker",
        "url": "https://www.youtube.com/shorts/qDebwiVw4sw",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Tableau et classement des mains de départ au poker : optimisez votre jeu préflop",
        "url": "https://joueurdepoker.fr/mains-de-depart/",
        "type": "website",
        "author": "Joueur de poker.fr"
      }
    ]
  },
  "Gestion": {
    "description": "La gestion est un aspect essentiel du poker, que ce soit la gestion de votre bankroll, de vos émotions ou de votre temps.",
    "links": []
  },
  "Bankroll Management": {
    "description": "Le bankroll management est la gestion de l'argent que vous avez alloué pour jouer au poker. C'est un aspect crucial pour assurer la longévité de votre jeu et éviter la faillite.",
    "links": [
      {
        "label": "Le Bankroll Management au Poker",
        "url": "https://www.youtube.com/watch?v=eW8yhEe7QLo&pp=ygUTYmFua3JvbGwgbWFuYWdlbWVudNIHCQmtCQGHKiGM7w%3D%3D",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "LES BASES DU POKER #5 - Le Bankroll Management (théorie avancée)",
        "url": "https://www.youtube.com/watch?v=MIXRsjfXkQE&pp=ygUTYmFua3JvbGwgbWFuYWdlbWVudA%3D%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Le guide complet du Bankroll Management",
        "url": "https://www.poker-academie.com/apprendre-poker/strategie-poker/strategie-generale/6279-le-guide-complet-du-bankroll-management.html",
        "type": "website",
        "author": "Poker Académie"
      },
      {
        "label": "Comment bien débuter en tournoi de Poker : Variance et Gestion de bankroll",
        "url": "https://www.youtube.com/watch?v=BUe_hJD5WE4&pp=ygUNZ2VzdGlvbiBwb2tlcg%3D%3D",
        "type": "video",
        "author": "SpinElite Poker"
      }
    ]
  },
  "Objectifs": {
    "description": "Les objectifs au poker sont essentiels pour progresser et rester motivé.",
    "links": [
      {
        "label": "Objectifs et gestion de la bankroll au poker",
        "url": "https://www.youtube.com/watch?v=60oKtU2dBzk",
        "type": "video",
        "author": "L'alchimiste- Poker & mental"
      },
      {
        "label": "Se fixer et atteindre des objectifs (1) : de la vision aux objectifs concrets",
        "url": "https://fr.pokerstrategy.com/strategy/poker-psychology/visions-objectifs-concrets/",
        "type": "website",
        "author": "PokerStrategy.com"
      }
    ]
  },
  "Mental": {
    "description": "Le mental est un aspect crucial du poker. Il englobe la gestion des émotions, la concentration, la discipline et la résilience.",
    "links": [
      {
        "label": "MENTAL AU POKER",
        "url": "https://www.youtube.com/watch?v=o_nsJp0RltI&list=PL2glQ7uU7gNeJ-44wNDWWDODWItJTghpE",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Format": {
    "description": "Il y a 3 formats principaux au poker : les tournois, les cash games et les spins. Chacun a ses propres caractéristiques et stratégies.",
    "links": []
  },
  "Cash Game": {
    "description": "Le cash game est le format de poker le plus courant. Il permet de jouer avec de l'argent réel et de miser des sommes fixes.",
    "links": [
      {
        "label": "LES BASES DU CASH GAME",
        "url": "https://www.youtube.com/watch?v=nCb6HiyMpCo&list=PL2glQ7uU7gNfE2XPiNmGMtqUzOE2VVzEm&pp=0gcJCWUEOCosWNin",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Tournoi (MTT)": {
    "description": "Les tournois de poker (MTT) sont des compétitions où les joueurs s'affrontent pour remporter un prix en argent. Ils peuvent être de différentes tailles et structures.",
    "links": [
      {
        "label": "Les 5 stratégies clés pour gagner des Tournois de Poker en microlimites",
        "url": "https://www.youtube.com/watch?v=9xIEfkq9o3Y&pp=ygUNZ2VzdGlvbiBwb2tlcg%3D%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "LES BASES DU TOURNOI",
        "url": "https://www.youtube.com/watch?v=AzQ76fljTak&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&pp=0gcJCWUEOCosWNin",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Spins / Expressos": {
    "description": "Les Spins sont des tournois à structure rapide où les joueurs s'affrontent pour remporter un prix en argent. Ils sont généralement joués en heads-up ou en sit-and-go.",
    "links": [
      {
        "label": "Stratégie débutant en Spin & Go",
        "url": "https://fr.pokerstrategy.com/strategy/sit-and-go/spin-n-go-strategie-debutant/",
        "type": "website",
        "author": "PokerStrategy.com"
      }
    ]
  },
  "Ranges": {
    "description": "Les ranges sont des ensembles de mains de départ que les joueurs choisissent de jouer dans différentes situations. Elles sont essentielles pour comprendre la stratégie préflop et postflop.",
    "links": [
      {
        "label": "LES BASES DU POKER #6 - Le concept de Range",
        "url": "https://www.youtube.com/watch?v=AfnDewnQVwk&pp=ygUMcmFuZ2VzIHBva2Vy0gcJCa0JAYcqIYzv",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Ranges Préflop": {
    "description": "Voici quelques ressources pour vous aider à maîtriser vos ranges préflop.",
    "links": [
      {
        "label": "[Blog] Make Your Ranges Great",
        "url": "https://www.winamax.fr/blog_team_blog-make-your-ranges-great-47943",
        "type": "website",
        "author": "Winamax"
      },
      {
        "label": "Preflop Charts",
        "url": "https://pokercoaching.com/preflop-charts",
        "type": "website",
        "author": "Pokercoaching.com"
      },
      {
        "label": "Etudier",
        "url": "https://app.gtowizard.com/solutions?custree_id=&cussol_id=&solution_type=&soltab=strategy",
        "type": "website",
        "author": "GTO Wizard"
      }
    ]
  },
  "Mathématiques": {
    "description": "Des connaissances mathématiques de base sont nécessaires pour comprendre plus profondément le poker. Voici quelques concepts mathématiques importants.",
    "links": [
      {
        "label": "Mathématiques du poker : comprendre les cotes, les probabilités et les stratégies gagnantes",
        "url": "https://www.pokerstars.fr/poker/learn/strategies/mathematiques-poker/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Les mathématiques dans le poker",
        "url": "https://app.pokerpro.fr/blog/les-mathematiques-dans-le-poker",
        "type": "website",
        "author": "PokerPro"
      }
    ]
  },
  "Outs": {
    "description": "Les outs sont les cartes qui peuvent améliorer votre main. Savoir les calculer est essentiel pour prendre des décisions éclairées.",
    "links": [
      {
        "label": "Outs et probabilités d'amélioration au poker Texas Hold'em",
        "url": "https://fr.pokernews.com/strategie/poker-calcul-outs-probabilite-amelioration-3855.htm",
        "type": "website",
        "author": "Pokernews"
      },
      {
        "label": "Calcul out poker – Comment compter les cartes au poker",
        "url": "https://fr.pokerlistings.com/strategies-du-poker/mathematiques/compter-outs",
        "type": "website",
        "author": "PokerListings"
      },
      {
        "label": "Odds & Outs",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/odds-outs/",
        "type": "website",
        "author": "Pokerstars"
      }
    ]
  },
  "EV": {
    "description": "L'EV (Expected Value) est un concept mathématique qui vous aide à évaluer la rentabilité de vos décisions au poker. Il est utilisé pour prendre des décisions stratégiques sur la façon de jouer vos mains.",
    "links": [
      {
        "label": "Les Bases de l'EV au Poker (Concept incontournable!!)",
        "url": "https://www.youtube.com/watch?v=2_VRJVnmtVQ&pp=ygUIcG9rZXIgRVY%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "L'EV POUR LES NULS",
        "url": "https://www.clubpoker.net/ev-pour-nuls/p-331",
        "type": "website",
        "author": "Club Poker"
      },
      {
        "label": "Mathématiques : à quoi sert l'espérance de gain (EV) ?",
        "url": "https://fr.pokerstrategy.com/strategy/fixed-limit/mathematiques-connaitre-esperance-de-gains/",
        "type": "website",
        "author": "PokerStrategy.com"
      }
    ]
  },
  "SPR": {
    "description": "Le SPR (Stack-to-Pot Ratio) est un concept mathématique qui vous aide à évaluer la profondeur de votre tapis par rapport à la taille du pot. Il est utilisé pour prendre des décisions stratégiques sur la façon de jouer vos mains.",
    "links": [
      {
        "label": "Mastering Poker Math: Preflop All-ins & SPR - Jonathan Little",
        "url": "https://www.youtube.com/watch?v=duBModBp-Zw&pp=ygUJcG9rZXIgc3By",
        "type": "video",
        "author": "Poker Coaching"
      },
      {
        "label": "Le Stack to Pot Ratio",
        "url": "https://www.poker-academie.com/apprendre-poker/strategie-poker/strategie-generale/3772-le-stack-to-pot-ratio.html",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "Côtes du pot": {
    "description": "Les cotes du pot sont un concept mathématique qui vous aide à décider si vous devez suivre une mise ou non. Elles sont calculées en comparant la taille du pot à la taille de la mise que vous devez suivre.",
    "links": [
      {
        "label": "Le Concept de Cotes au Poker (et comment les calculer)",
        "url": "https://www.youtube.com/watch?v=mtO3rw92Cuc&pp=ygULcG9rZXIgbWF0aHM%3Dr",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Stack effectif": {
    "description": "Le stack effectif est la taille du plus petit tapis entre les joueurs impliqués dans un pot. Il est important de le connaître pour prendre des décisions stratégiques.",
    "links": [
      {
        "label": "QU'EST CE QUE LE STACK EFFECTIF",
        "url": "https://www.youtube.com/watch?v=Msb4A2cjepE&pp=ygUUcG9rZXIgc3RhY2sgZWZmZWN0aWY%3D",
        "type": "video",
        "author": "YoH ViraL Poker"
      },
      {
        "label": "Qu’est-ce que le stack effectif ?",
        "url": "https://www.pokerpro.fr/quest-ce-que-le-stack-effectif/",
        "type": "video",
        "author": "PokerPro"
      }
    ]
  },
  "Sizing géométrique": {
    "description": "Le sizing géométrique est une approche mathématique pour déterminer la taille optimale de vos mises en fonction de la taille du pot et de la profondeur des tapis. Il est utilisé pour maximiser l'efficacité de vos mises.",
    "links": [
      {
        "label": "MISE GÉOMÉTRIQUE: La Théorie du Sizing que 100% des pros utilisent",
        "url": "https://www.youtube.com/watch?v=sprpc0V3K_I&pp=ygUTc2l6aW5nIGdlb23DqXRyaXF1ZQ%3D%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "What Is Pot Geometry In Poker ?",
        "url": "https://www.youtube.com/watch?v=FY-pBaYjZWs&t=917s&pp=ygUTc2l6aW5nIGdlb23DqXRyaXF1ZQ%3D%3D",
        "type": "video",
        "author": "GTOWizard"
      }
    ]
  },
  "Exploitation": {
    "description": "L'exploitation est une approche stratégique qui consiste à exploiter les faiblesses de vos adversaires pour maximiser vos gains. Elle est souvent utilisée en opposition à la stratégie GTO.",
    "links": [
      {
        "label": "The Key To Exploitative Poker",
        "url": "https://www.youtube.com/watch?v=5pU3RbX-BFg&pp=ygUSZXhwbG9pdGF0aW9uIHBva2Vy",
        "type": "video",
        "author": "GTOWizard"
      },
      {
        "label": "La clé de l'exploitation au Poker",
        "url": "https://www.youtube.com/shorts/ZoPHswasqqI",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "L'exploitation du joueur Récréatif : La clé pour gagner au Poker",
        "url": "https://www.youtube.com/shorts/pbGna6O5c5Q",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "GTO": {
    "description": "La GTO (Game Theory Optimal) est une approche stratégique qui vise à jouer de manière optimale en équilibrant vos ranges et en rendant vos décisions indétectables par vos adversaires. Elle est souvent utilisée pour contrer les stratégies exploitatives.",
    "links": [
      {
        "label": "The Fundamentals of GTO Poker",
        "url": "https://www.youtube.com/watch?v=WQJBmH2KG84&pp=ygUJZ3RvIHBva2Vy",
        "type": "video",
        "author": "GTOWizard"
      },
      {
        "label": "Qu’est-ce que le GTO au Poker?",
        "url": "https://app.pokerpro.fr/blog/quest-ce-que-le-gto-au-poker",
        "type": "website",
        "author": "PokerPro"
      },
      {
        "label": "Introduction à la Stratégie GTO",
        "url": "https://www.pokerstars.fr/poker/learn/strategies/introduction-a-la-strategie-gto/",
        "type": "website",
        "author": "Pokerstars"
      }
    ]
  },
  "Profiling": {
    "description": "Le profiling est une technique qui consiste à analyser le style de jeu de vos adversaires pour adapter votre stratégie en conséquence.",
    "links": [
      {
        "label": "LES BASES DU POKER #3 : POSITION, PROFILING, ÉQUITÉ",
        "url": "https://www.youtube.com/watch?v=Y68SCLgKntw&pp=ygUPcHJvZmlsaW5nIHBva2Vy",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Identifier le profil des joueurs de Poker et s’adapter en fonction",
        "url": "https://tolkers.com/4-profils-type-poker/",
        "type": "website",
        "author": "Tolkers Poker"
      },
      {
        "label": "Les différents profils de joueurs au poker",
        "url": "https://www.poker-academie.com/apprendre-poker/strategie-poker/strategie-generale/les-differents-profils-de-joueurs-au-poker.html",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "Adaptation": {
    "description": "Capacité à ajuster sa stratégie selon les adversaires et la dynamique de table, via observation, remise en question et flexibilité dans le jeu.",
    "links": [
      {
        "label": "L’adaptation, LA SOLUTION pour RÉUSSIR au POKER ?",
        "url": "https://www.youtube.com/watch?v=hOJnha0tjRM&embeds_referring_euri=https%3A%2F%2Fwww.kill-tilt.fr%2F&source_ve_path=Mjg2NjY",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "ICM": {
    "description": "Modèle mathématique qui traduit la valeur des jetons en équité monétaire dans un tournoi, en fonction des tapis, de la structure des gains et de la distribution des places.",
    "links": [
      {
        "label": "Bien comprendre l'ICM avec FLAVIEN GUENAN",
        "url": "https://www.youtube.com/watch?v=dChTsrjsGnA&pp=ygUJaWNtIHBva2Vy",
        "type": "video",
        "author": "ChoveKiPeu Poker"
      },
      {
        "label": "Mission Poker #7 – L'ICM, Risk Premium, Comment aller plus loin...",
        "url": "https://www.youtube.com/watch?v=J0Fvk8-ytbg&pp=ygUJaWNtIHBva2Vy",
        "type": "video",
        "author": "zChance44"
      }
    ]
  },
  "Concepts de mise": {
    "description": "Il existe plusieurs concepts de mise au poker, chacun ayant ses propres objectifs et stratégies. Voici quelques-uns des plus courants.",
    "links": []
  },
  "Bluff": {
    "description": "Miser ou relancer avec une main faible pour faire folder un adversaire plus fort, exploiter la perception du jeu et la fréquence.",
    "links": [
      {
        "label": "Leçon n°6 : Bluffer",
        "url": "https://www.clubpoker.net/lecon-n-6-bluffer/p-104",
        "type": "website",
        "author": "Club Poker"
      }
    ]
  },
  "Value bet": {
    "description": "Miser avec une main forte pour que des mains plus faibles payent, en optimisant la taille pour extraire de la valeur sans effrayer.",
    "links": [
      {
        "label": "Le value bet",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/le-value-bet/",
        "type": "website",
        "author": "Pokerstars"
      }
    ]
  },
  "3-bet": {
    "description": "Relance (pré-flop) après une ouverture et une relance – souvent pour value ou pour bluff, en s’appuyant sur pression ou profil adversaire.",
    "links": [
      {
        "label": "Mastering The Fundamentals: 3-Bet Pots",
        "url": "https://www.youtube.com/watch?v=3HtVVTSDRug&t=1139s&pp=ygUKcG9rZXIgM2JldA%3D%3D",
        "type": "video",
        "author": "Jonathan Little - Poker Coaching"
      },
      {
        "label": "♠♥♦♣ Jouer les 3-BET hors de position Avec _WINDA",
        "url": "https://www.youtube.com/watch?v=uG_E6H5q-lY&t=13s&pp=ygUKcG9rZXIgM2JldA%3D%3D",
        "type": "video",
        "author": "Winamax"
      }
    ]
  },
  "Squeeze": {
    "description": "Relance (3-bet) préflop après une ouverture et un ou plusieurs calls, visant à voler le pot ou mettre la pression aux adversaires.",
    "links": [
      {
        "label": "La Question que Chaque Joueur se Pose: Spot de Squeeze ou Pas?",
        "url": "https://www.youtube.com/watch?v=Iyqi5eOWhj0&pp=ygUNc3F1ZWV6ZSBwb2tlcg%3D%3D",
        "type": "video",
        "author": "L'Art du Poker EP48 – ALL IN : Baki & Hugo v2"
      },
      {
        "label": "Top Tips for Squeezing In Poker",
        "url": "https://pokercoaching.com/blog/squeezing-in-poker/",
        "type": "website",
        "author": "PokerCoaching"
      }
    ]
  },
  "C-bet": {
    "description": "Mise sur le flop par le relanceur préflop pour continuer à appliquer de l’agression, soit en value, soit en bluff, selon la texture du board.",
    "links": [
      {
        "label": "Mission Poker #4 – Comment jouer au FLOP ?",
        "url": "https://www.youtube.com/watch?v=TSvNU6LGY4M&t=831s&pp=ygUKY2JldCBwb2tlcg%3D%3D",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "LE CONTINUATION BET au Poker : Tout ce qu'il faut savoir sur le CBET",
        "url": "https://www.youtube.com/watch?v=Aiwi4Np_LOY&pp=ygUKY2JldCBwb2tlcg%3D%3D",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Blocking bet": {
    "description": "Petit bet hors position visant à empêcher l’adversaire de miser plus cher, pour contrôler le pot et éviter de se faire miser trop cher.",
    "links": [
      {
        "label": "What Is a Block Bet & When Should You Do It?",
        "url": "https://upswingpoker.com/block-bet/",
        "type": "website",
        "author": "Upswing Poker"
      },
      {
        "label": "Mastering Block Betting in Poker",
        "url": "https://www.youtube.com/watch?v=iYSYNk7JMq0&pp=ygUSYmxvY2tpbmcgYmV0IHBva2Vy",
        "type": "video",
        "author": "GTOWizard"
      }
    ]
  },
  "Phases de tournois": {
    "description": "Les MTT se découpent en grandes phases qui exigent des ajustements : early game (stacks profonds, faible pression ICM), milieu (antes/pression croissante), bulle (paliers), ITM/post-bulle (accélération), table finale (ICM maximal).",
    "links": [
      {
        "label": "Les tournois multi-tables",
        "url": "https://www.pokerstars.fr/poker/learn/course/cours-mtt/",
        "type": "website",
        "author": "Pokerstars"
      }
    ]
  },
  "Début de tournoi": {
    "description": "Stacks profonds : privilégier position, bons sizings d’open, ranges disciplinées et pots contrôlés contre profils faibles. Objectif : construire un stack sans variance inutile.",
    "links": [
      {
        "label": "Début & milieu de tournoi",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/debut-et-milieu-de-tournoi/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Le Jeu en Début de Tournoi - Les bases du Tournoi #2",
        "url": "https://www.youtube.com/watch?v=vAnRjHhPTNQ&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=2&pp=iAQB",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Milieu de tournoi": {
    "description": "Antes et pression montent : resserrer les ranges hors de position, voler plus souvent en position, 3-bet light vs. joueurs qui abusent des open, gérer les stacks moyens.",
    "links": [
      {
        "label": "Début & milieu de tournoi - ajustements",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/debut-et-milieu-de-tournoi/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Le jeu en milieu de tournoi - Les bases du Tournoi #4",
        "url": "https://www.youtube.com/watch?v=ULRaGiQGyto&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=4&pp=iAQB",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Bulle": {
    "description": "Phase critique avant les places payées : la pression ICM est maximale. Gros stacks agressent, stacks moyens évitent les confrontations marginales, shorts cherchent des spots EV+.",
    "links": [
      {
        "label": "La bulle – principes & erreurs courantes",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/la-bulle/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Le jeu en milieu de tournoi 2 - Les bases du Tournoi #5",
        "url": "https://www.youtube.com/watch?v=P-Axrj1QXOM&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=6",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Post bulle": {
    "description": "Juste après l’ITM, le field s’emballe : excellent moment pour voler et mettre la pression sur les joueurs qui viennent de ‘locker’ l’ITM, tout en respectant les paliers à venir.",
    "links": [
      {
        "label": "Après la bulle",
        "url": "https://fr.pokernews.com/strategie/strategie-mtt-jouer-apres-la-bulle-jusqu-a-la-table-finale-11987.htm",
        "type": "website",
        "author": "Pokernews"
      },
      {
        "label": "Le jeu en milieu de tournoi 2 - Les bases du Tournoi #5",
        "url": "https://www.youtube.com/watch?v=P-Axrj1QXOM&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=6",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Table Finale": {
    "description": "ICM au maximum : sélectionner ses spots, pression sur stacks moyens/courts, adaptation aux paliers, réflexion deal ICM, plans de push/fold précis.",
    "links": [
      {
        "label": "La table finale",
        "url": "https://www.pokerstars.fr/poker/learn/lesson/la-table-finale/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Le jeu en fin de tournoi - Les bases du Tournoi #6",
        "url": "https://www.youtube.com/watch?v=eJGF5D7NLZo&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=7",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "Jeu Shortstack": {
    "description": "Sous ~20 BB : privilégier push/fold, 3-bet shove vs. opens trop loose, value serrée hors position ; connaître ses tableaux de shove/call est indispensable.",
    "links": [
      {
        "label": "Le jeu en fin de tournoi",
        "url": "https://www.youtube.com/watch?v=eJGF5D7NLZo&list=PL2glQ7uU7gNecMEMTl2gsD1PrA8MrYRiD&index=7",
        "type": "video",
        "author": "Les bases du Tournoi #6"
      },
      {
        "label": "Les 10 Coups Essentiels du Texas Hold’em : Le Stop and Go",
        "url": "https://fr.pokerlistings.com/strategies-du-poker/holdem/stop-et-go",
        "type": "website",
        "author": "PokerListings"
      }
    ]
  },
  "Modes de tournois": {
    "description": "Panorama des formats : Freezeout, Rebuy/Re-entry, KO/PKO/Mystery, Satellites, Turbo/Hyper, 6-Max/Full Ring, etc.",
    "links": [
      {
        "label": "Types de tournois",
        "url": "https://www.pokerstars.fr/poker/tournaments/types/",
        "type": "website",
        "author": "PokerStars"
      },
      {
        "label": "Types de tournois",
        "url": "https://www.winamax.fr/les-tournois_tous-les-tournois?LICENSE=FR",
        "type": "website",
        "author": "Winamax"
      }
    ]
  },
  "Freezeout": {
    "description": "Format classique sans recave ni add-on : élimination = fin du tournoi. Récompense la gestion de tapis et la discipline préflop/postflop.",
    "links": [
      {
        "label": "Freezeout",
        "url": "https://www.clubpoker.net/freezeout/definition-212",
        "type": "website",
        "author": "Club Poker"
      }
    ]
  },
  "KO": {
    "description": "Chaque joueur porte une prime fixe (‘bounty’) versée à l’éliminateur. Objectif : maximiser l’EV en intégrant la valeur de la prime dans vos décisions.",
    "links": [
      {
        "label": "Mission Poker #6 – Les tournois KO ! (SpaceKO, PKO, Mystery !)",
        "url": "https://www.youtube.com/watch?v=k6H6w1aH2CE&pp=ygUOc3BhY2Uga28gcG9rZXI%3D",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "Fondamentaux des tournois Bounty",
        "url": "https://www.unibet.fr/poker/les-fondamentaux-des-tournois-bounty-200276306.html",
        "type": "website",
        "author": "Unibet"
      }
    ]
  },
  "PKO": {
    "description": "Prime progressive : à chaque élimination, vous encaissez une partie de la prime et l’autre moitié s’ajoute à votre propre bounty. Changements majeurs d’EV post-flop et préflop.",
    "links": [
      {
        "label": "Maths des KO progressifs (cours)",
        "url": "https://www.pokerstars.fr/poker/learn/strategies/tournois-ko-progressifs-les-mathematiques-des-bounties/",
        "type": "website",
        "author": "PokerStars"
      },
      {
        "label": "Différence KO / PKO / TKO",
        "url": "https://www.pokerstars.fr/poker/learn/news/quelle-est-la-difference-entre-le-ko-le-pko-et-le-tko/",
        "type": "website",
        "author": "PokerStars"
      },
      {
        "label": "Mission Poker #6 – Les tournois KO ! (SpaceKO, PKO, Mystery !)",
        "url": "https://www.youtube.com/watch?v=k6H6w1aH2CE&pp=ygUOc3BhY2Uga28gcG9rZXI%3D",
        "type": "video",
        "author": "zChance44"
      }
    ]
  },
  "Space KO": {
    "description": "Format Winamax où la valeur de bounty évolue selon des ‘niveaux d’espace’ (mécaniques spécifiques et ludiques). Bien lire les règles avant de jouer.",
    "links": [
      {
        "label": "Présentation officielle Space KO",
        "url": "https://www.winamax.fr/tournois_space-ko",
        "type": "website",
        "author": "Winamax"
      },
      {
        "label": "Mission Poker #6 – Les tournois KO ! (SpaceKO, PKO, Mystery !)",
        "url": "https://www.youtube.com/watch?v=k6H6w1aH2CE&pp=ygUOc3BhY2Uga28gcG9rZXI%3D",
        "type": "video",
        "author": "zChance44"
      }
    ]
  },
  "Mystery KO": {
    "description": "Variante bounty où chaque élimination révèle une prime aléatoire (petite ou énorme). Les stratégies d’ICM et de call/all-in s’en trouvent modifiées.",
    "links": [
      {
        "label": "Mission Poker #6 – Les tournois KO ! (SpaceKO, PKO, Mystery !)",
        "url": "https://www.youtube.com/watch?v=k6H6w1aH2CE&pp=ygUOc3BhY2Uga28gcG9rZXI%3D",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "Mystery KO",
        "url": "https://www.winamax.fr/tournois_mystery-ko",
        "type": "website",
        "author": "Winamax"
      },
      {
        "label": "Mystery Bounty : guide",
        "url": "https://www.pokerstars.fr/poker/learn/news/comment-remporter-un-tournoi-mystery-bounty-63243/",
        "type": "website",
        "author": "Pokerstars"
      },
      {
        "label": "Mystery Bounty : tactiques essentielles",
        "url": "https://www.pokerstars.com/fr/poker/learn/news/comment-crusher-les-tournois-mystery-bounty-62525/",
        "type": "website",
        "author": "Pokerstars"
      }
    ]
  },
  "Outils": {
    "description": "Les outils poker regroupent les logiciels et applications qui aident à analyser son jeu, calculer les équités, travailler les ranges et optimiser la prise de décision. Ils se divisent en catégories comme les trackers, calculateurs d’équité et simulateurs postflop.",
    "links": [
      {
        "label": "Top outils pour progresser au poker",
        "url": "https://www.kill-tilt.fr/forums/topic/logiciels-pour-progresser/",
        "type": "website",
        "author": "Kill Tilt"
      },
      {
        "label": "Logiciels et applications utiles",
        "url": "https://www.clubpoker.net/logiciels-poker",
        "type": "website",
        "author": "Club Poker"
      }
    ]
  },
  "Trackers": {
    "description": "Logiciels qui collectent et analysent vos mains jouées pour produire des statistiques (HUD) et rapports, permettant de repérer vos leaks et mieux profiler vos adversaires.",
    "links": [
      {
        "label": "Qu’est-ce qu’un tracker ?",
        "url": "https://www.kill-tilt.fr/forums/topic/tracker-au-poker-cest-quoi/",
        "type": "website",
        "author": "Kill Tilt"
      },
      {
        "label": "Tutoriel trackers pour débutants",
        "url": "https://www.poker-academie.com/apprendre-poker/strategie-poker/outils/les-trackers-au-poker.html",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "HM3": {
    "description": "Hold’em Manager 3 est un tracker avancé pour cash game et tournois. Il offre un HUD personnalisable, des filtres de review puissants et une analyse approfondie de votre jeu.",
    "links": [
      {
        "label": "Hold'em Manager 3",
        "url": "https://www.holdemmanager.com/hm3/",
        "type": "website",
        "author": "Hold'em Manager"
      },
      {
        "label": "TUTO HOLDEM MANAGER 3 : Tout ce qu'il faut savoir sur le nouveau Tracker!",
        "url": "https://youtu.be/NGZCN-WTM8Y",
        "type": "video",
        "author": "Kill Tilt"
      }
    ]
  },
  "PT4": {
    "description": "PokerTracker 4 est un tracker concurrent de HM3, réputé pour sa stabilité, sa personnalisation avancée et ses rapports statistiques détaillés. Compatible cash game, MTT et SNG.",
    "links": [
      {
        "label": "Pokertracker",
        "url": "https://www.pokertracker.com/",
        "type": "website",
        "author": "PokerTracker"
      },
      {
        "label": "Poker Tracker 4 : Avis et Présentation complète",
        "url": "https://tolkers.com/poker-tracker-4/",
        "type": "website",
        "author": "Tolkers Poker"
      }
    ]
  },
  "Xeester": {
    "description": "Tracker français compatible avec Winamax, PokerStars, PMU… Il combine HUD, analyse de mains et gestion de bankroll dans une interface intuitive.",
    "links": [
      {
        "label": "Xeester",
        "url": "https://www.xeester.com/fr/",
        "type": "website",
        "author": "Xeester"
      },
      {
        "label": "Xeester - Le tracker 100% français",
        "url": "https://www.poker-academie.com/apprendre-poker/logiciels-poker/xeester/",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "Calculateur d'équité": {
    "description": "Outil permettant de déterminer la probabilité de victoire d’une main face à une ou plusieurs ranges adverses. Essentiel pour comprendre les décisions EV+.",
    "links": [
      {
        "label": "Qu’est-ce que l’équité ?",
        "url": "https://www.kill-tilt.fr/video/les-bases-du-poker-3-position-profiling-equite/",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Calcul d’équité",
        "url": "https://www.poker-academie.com/apprendre-poker/strategie-poker/strategie-generale/l-equite-au-poker.html",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "Flopzilla": {
    "description": "Logiciel d’analyse postflop permettant de visualiser comment une range touche différents boards, de calculer des équités et de préparer des stratégies de C-bet, check-raise, etc.",
    "links": [
      {
        "label": "Flopzilla",
        "url": "https://www.flopzilla.com/",
        "type": "website",
        "author": "Flopzilla"
      },
      {
        "label": "[GUIDE] Guide complet d’utilisation de Flopzilla pro en français",
        "url": "https://www.poker-academie.com/forum/t/guide-guide-complet-dutilisation-de-flopzilla-pro-en-francais/94715",
        "type": "website",
        "author": "yvan161"
      }
    ]
  },
  "Equilab": {
    "description": "Calculateur d’équité gratuit et complet. Il permet de comparer mains et ranges, de travailler les scénarios multiway et d’apprendre à estimer les forces relatives de jeu.",
    "links": [
      {
        "label": "Calculez votre equity avec PokerStrategy.com Equilab",
        "url": "https://fr.pokerstrategy.com/poker-software-tools/equilab-holdem/",
        "type": "website",
        "author": "PokerStrategy.com"
      },
      {
        "label": "Equilab Review: The Best Poker Equity Calculator for Beginners",
        "url": "https://www.pokerlistings.com/poker-tools/calculators/equilab",
        "type": "website",
        "author": "Poker Listings"
      }
    ]
  },
  "Entraînement pratique": {
    "description": "L'entraînement pratique est essentiel pour améliorer vos compétences au poker. Il peut inclure des exercices de simulation, des jeux de rôle, et l'utilisation de logiciels d'entraînement.",
    "links": []
  },
  "Checkraise.fr": {
    "description": "Checkraise.fr est un outil d'entraînement interactif qui vous permet de travailler votre jeu en vous confrontant à des situations variées. Il est conçu pour améliorer votre compréhension sur tous les aspects du poker.",
    "links": [
      {
        "label": "La plateforme d'entraînement pratique Checkraise.fr",
        "url": "/",
        "type": "website",
        "author": "Checkraise.fr"
      }
    ]
  },
  "Postflop": {
    "description": "Décisions après le flop (flop, turn, river) : c-bets, check-raises, plan multi-street — toujours penser en termes de range, d’équité et exploitation.",
    "links": [
      {
        "label": "Maîtriser les fondamentaux : stratégie postflop",
        "url": "https://www.youtube.com/watch?v=B1JjmsekmqI&pp=ugMICgJmchABGAHKBQ5wb3N0ZmxvcCBwb2tlcg%3D%3D",
        "type": "video",
        "author": "Poker Coaching"
      }
    ]
  },
  "Texture de board": {
    "description": "Type de flop (sec, connecté, monotone, paired...) influençant fréquence de mise, sizing et adaptation du range.",
    "links": [
      {
        "label": "Maîtriser les fondamentaux : stratégie postflop",
        "url": "https://www.youtube.com/watch?v=B1JjmsekmqI&pp=ugMICgJmchABGAHKBQ5wb3N0ZmxvcCBwb2tlcg%3D%3D",
        "type": "video",
        "author": "Poker Coaching"
      },
      {
        "label": "Jouer flop, turn et river en début de tournoi - Les bases du Tournoi #3",
        "url": "https://www.youtube.com/watch?v=eNqNchCJ3bg&pp=ygUOcG9zdGZsb3AgcG9rZXI%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Range & Nut Advantage",
        "url": "https://upswingpoker.com/nut-range-positional-advantage/",
        "type": "website",
        "author": "Upswing Poker"
      }
    ]
  },
  "Avantage de range": {
    "description": "Lorsque votre range touche mieux le board que celui de l’adversaire, ce qui permet un jeu postflop agressif équilibré.",
    "links": [
      {
        "label": "Maîtriser les fondamentaux : stratégie postflop",
        "url": "https://www.youtube.com/watch?v=B1JjmsekmqI&pp=ugMICgJmchABGAHKBQ5wb3N0ZmxvcCBwb2tlcg%3D%3D",
        "type": "video",
        "author": "Poker Coaching"
      },
      {
        "label": "Range & Nut Advantage",
        "url": "https://upswingpoker.com/nut-range-positional-advantage/",
        "type": "website",
        "author": "Upswing Poker"
      }
    ]
  },
  "Avantage de nuts": {
    "description": "Votre range contient plus de mains très fortes (nuts), justifiant mises fortes pour maximiser la value.",
    "links": [
      {
        "label": "How to Win More Chips with Your Bluff-to-Value Ratios",
        "url": "https://upswingpoker.com/what-is-bluff-to-value-ratio/",
        "type": "website",
        "author": "Poker Coaching"
      },
      {
        "label": "3 Concepts That Should Shape Your Postflop Strategy (Positional, Range, and Nut Advantage)",
        "url": "https://upswingpoker.com/nut-range-positional-advantage/",
        "type": "website",
        "author": "Upswing Poker"
      }
    ]
  },
  "Ratio bluff/value": {
    "description": "Equilibrer le nombre de bluffs et de mises de value pour rester exploitable-résistant.",
    "links": [
      {
        "label": "How to Win More Chips with Your Bluff-to-Value Ratios",
        "url": "https://upswingpoker.com/what-is-bluff-to-value-ratio/",
        "type": "website",
        "author": "Upswing Poker"
      }
    ]
  },
  "Se polariser": {
    "description": "Jouer soit en value, soit en bluff pur, pour ne pas inclure de mains médianes difficiles à utiliser.",
    "links": [
      {
        "label": "Polarized Ranges vs Linear (Merged) Ranges Explained",
        "url": "https://upswingpoker.com/polarized-vs-linear-ranges/",
        "type": "website",
        "author": "Upswing Poker"
      }
    ]
  },
  "Entraînement": {
    "description": "Utiliser vidéos, solvers, masterclasses, Discord, livestreams pour progresser hors des tables.",
    "links": [
      {
        "label": "Que faire pour progresser au Poker ??",
        "url": "https://www.youtube.com/watch?v=tsrY8hVnGKI&pp=ygUdZW50cmFpbmVtZW50IGhvcnMgdGFibGUgcG9rZXI%3D",
        "type": "video",
        "author": "zChance44"
      },
      {
        "label": "Poker : Travail hors table - Regarder une vidéo",
        "url": "https://www.youtube.com/watch?v=PjcSOz4zoZ4&pp=ygUZcG9rZXIgdHJhdmFpbCBob3JzIHRhYmxlcw%3D%3D",
        "type": "website",
        "author": "zChance44"
      }
    ]
  },
  "Review de main": {
    "description": "Analyser vos mains ou celles d'autres joueurs pour identifier vos forces et faiblesses.",
    "links": [
      {
        "label": "Alexane Najchaus finit 1ère d'un Expresso Winamax à 100 000€ (Review Intégrale)",
        "url": "https://www.youtube.com/watch?v=FlAXjhTYe2g&pp=ygURcmV2aWV3IG1haW4gcG9rZXI%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "Pierre Calamusa analyse sa 1ère place sur un Tournoi Winamax",
        "url": "https://www.youtube.com/watch?v=s50-G9ShGnk&pp=ygURcmV2aWV3IG1haW4gcG9rZXLSBwkJrQkBhyohjO8%3D",
        "type": "video",
        "author": "Kill Tilt"
      },
      {
        "label": "JE JOUE DES GROSSES MAINS SUR LE BATTLE ROYAL (REVIEW AVEC LE COACH)",
        "url": "https://www.youtube.com/watch?v=ETzTZrCiovY",
        "type": "video",
        "author": "ChoveKiPeu Poker"
      }
    ]
  },
  "Groupe de travail": {
    "description": "Étudier et partager des mains avec d’autres joueurs pour progresser plus vite grâce aux feedbacks collectifs.",
    "links": [
      {
        "label": "Groupe de travail",
        "url": "https://www.poker-academie.com/forum/t/groupe-de-travail/36841",
        "type": "website",
        "author": "Poker Académie"
      }
    ]
  },
  "Coaching": {
    "description": "Séances individuelles avec un coach pour corriger vos erreurs, structurer votre progression et cibler vos leaks.",
    "links": [
      {
        "label": "Poker Coaching: The 15 Best Poker Training Sites",
        "url": "https://www.pokernews.com/poker-coaching/",
        "type": "website",
        "author": "PokerNews"
      }
    ]
  }
};

export default function StaticDiagram() {
  const [selected, setSelected] = useState<string | null>(null);
  const [relatedProblems, setRelatedProblems] = useState<
    { problemNumber: number, title: string; difficulty: string }[]
  >([]);

  const handleClick = (label: string | null) => {
    setSelected((prev) => (prev === label ? null : label));
    setRelatedProblems([]);
  };

  const closeSidebar = () => setSelected(null);

  useEffect(() => {
    if (!selected) return;

    getRelatedProblems(selected).then((problems) => {
      setRelatedProblems(problems);
    });
  }, [selected]);

  return (
      <div
        className="bg-fixed bg-cover bg-center flex flex-col min-h-screen px-6 py-8"
        style={{ backgroundImage: "url('/images/bg3.png')" }}
      >
        {/* Top Bar */}
        <Header pageName="Roadmap"/>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-15 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            <span className="bg-[linear-gradient(to_right,#FFEB51,#995531)] bg-clip-text text-transparent">
              Roadmap
            </span>{" "}
            Poker
          </h1>
          <p className="text-lg md:text-xl text-[#EDEDED] font-semibold max-w-2xl leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Explorez les concepts clés du poker à travers notre roadmap interactive.
          </p>
          {/*<button*/}
          {/*  className="flex items-center gap-2 px-4 py-2*/}
          {/*             bg-[linear-gradient(to_right,#FFEB51,#995531)]*/}
          {/*             text-black font-semibold rounded shadow-lg*/}
          {/*             hover:shadow-xl hover:gap-4 hover:pr-3 transition-all duration-200 my-6"*/}
          {/*  onClick={() => router.push("https://discord.gg/tMdYK6PtK2")}*/}
          {/*  style={{ cursor: "pointer" }}*/}
          {/*>*/}
          {/*  Premium*/}
          {/*  <FaLongArrowAltRight className="w-5 h-5" />*/}
          {/*</button>*/}
        </div>
      <div
        className="flex static min-h-screen justify-center font-sans gap-4"
      >



        {/* Sidebar Desktop */}
        <div
          className={`
            hidden lg:block lg:sticky lg:top-4 lg:h-full
            bg-[#DFDFDF]/10 backdrop-blur shadow-xl rounded-2xl
            transform transition-transform duration-300 ease-in-out
            ${selected ? "translate-y-0 lg:min-w-96 lg:w-128" : "translate-y-2 w-0"}
          `}
        >
          {selected && (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-400">
                <h2 className="text-xl font-semibold text-slate-100">
                  Détails
                </h2>
                <button
                  onClick={closeSidebar}
                  className="text-slate-400 hover:text-slate-600 text-2xl transition-colors p-1 rounded-full"
                  style={{ cursor: "pointer" }}
                >
                  ×
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                  <h3 className="mb-3 text-lg text-slate-100">
                    {selected}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {detailsMap[selected]?.description ||
                      `Informations détaillées sur "${selected}" seront affichées ici.`}
                  </p>

                  {detailsMap[selected]?.links && (
                    <ul className="space-y-2">
                      {detailsMap[selected].links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col gap-2 text-[#141414] opacity-80 p-4 my-4 bg-slate-300 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:opacity-100 transition-opacity"
                          >
                            <div className="flex items-center gap-2">
                              <span>{link.type === "video" ? <FaYoutube className="text-[#DD0000]"/> : <FaGlobe/>}</span>
                              {link.author}
                            </div>
                            <p className="font-semibold">
                              {link.label}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                { relatedProblems.length > 0 &&
                  <div className="border-t border-slate-400 mt-8 pt-4">
                    <h3 className="text-lg my-3 text-slate-100">
                      Exercises
                    </h3>
                     <ul className="mt-4 space-y-2">
                       {relatedProblems.map((problem, idx) => (
                          <li key={idx}>
                            <Link
                              href={"/problems/" + problem.problemNumber}
                              rel="noopener noreferrer"
                              className="flex flex-col gap-2 text-[#141414] opacity-80 px-4 py-2 my-2 bg-slate-300 rounded-lg shadow-sm hover:opacity-100 transition-opacity"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className={"flex items-center gap-2"}>
                                  <FaBookOpen className="text-[#141414]"/>
                                  {problem.problemNumber}. {problem.title}
                                </div>
                                <div
                                    className={`rounded-md  py-0.5 px-2.5 border border-transparent text-sm ${
                                      problem.difficulty === 'Easy' ? 'bg-blue-500' : problem.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                    } text-white transition-all shadow-sm`}>
                                  {problem.difficulty}
                                </div>
                              </div>
                            </Link>
                          </li>
                       ))}
                     </ul>
                  </div>
                }
              </div>
            </div>
          )}
        </div>

        <Roadmap callback={handleClick} />

        {/* Modal Mobile/Tablet */}
        {selected && (
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="bg-[#F4F4F4] w-full rounded-t-3xl shadow-2xl animate-slide-up max-h-[75vh] overflow-y-auto">
              <div className="p-6">
                <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4"></div>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">{selected}</h2>
                  <button
                    onClick={closeSidebar}
                    className="text-slate-400 hover:text-slate-600 text-2xl p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    ×
                  </button>
                </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {detailsMap[selected]?.description ||
                      `Informations détaillées sur "${selected}" seront affichées ici.`}
                  </p>

                  {detailsMap[selected]?.links && (
                    <ul className="space-y-2 mb-4">
                      {detailsMap[selected].links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col gap-2 text-[#141414] opacity-80 p-4 my-4 bg-[#DFDFDF] rounded-lg shadow-sm hover:shadow-md transition-shadow hover:opacity-100 transition-opacity"
                          >
                            <div className="flex items-center gap-2">
                              <span>{link.type === "video" ? <FaYoutube className="text-[#DD0000]"/> : <FaGlobe/>}</span>
                              {link.author}
                            </div>
                            <p className="font-semibold">
                              {link.label}
                            </p>
                          </Link>
                        </li>
                      ))}
                      { relatedProblems.length > 0 &&
                        <div>
                          <hr/>
                          <h3 className="text-xl font-semibold my-3 text-lg bg-gradient-to-r from-yellow-600 to-orange-800 bg-clip-text text-transparent">
                            Exercises
                          </h3>
                           <ul className="mt-4 space-y-2">
                             {relatedProblems.map((problem, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={"/problems/" + problem.problemNumber}
                                    rel="noopener noreferrer"
                                    className="flex flex-col gap-2 text-[#141414] opacity-80 px-4 py-2 my-2 bg-[#DFDFDF] rounded-lg shadow-sm hover:opacity-100 transition-opacity"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <div className={"flex items-center gap-2"}>
                                        <FaBookOpen className="text-[#141414]"/>
                                        {problem.problemNumber}. {problem.title}
                                      </div>
                                      <div
                                          className={`rounded-md  py-0.5 px-2.5 border border-transparent text-sm ${
                                            problem.difficulty === 'Easy' ? 'bg-blue-500' : problem.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                          } text-white transition-all shadow-sm`}>
                                        {problem.difficulty}
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                             ))}
                           </ul>
                        </div>
                      }
                    </ul>
                  )}



              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </div>

        <Footer/>
    </div>
  );
}
