import * as React from "react"
import MainBlock from './MainBlock';
import RegularPath from './RegularPath';
import AnimatedPath from "./AnimatedPath";
import FirstBlock from "./FirstBlock";
import SecondaryBlock from "./SecondaryBlock";
import LastBlock from "./LastBlock";
import HighlightBlock from "./HighlightBlock";

type RoadmapProps = {
  callback: (label: string) => void; // callback qui prend 'label' et ne retourne rien
};


const Roadmap = ({ callback } : RoadmapProps) => (
  <svg
    width="auto"
    height="auto"
    style={{
      maxWidth: "741px",
      background: "0 0",
      backgroundColor: "transparent",
      colorScheme: "light dark",
    }}
    viewBox="-0.5 -0.5 741 1560"
  >
    <defs>
      <style>
        {
          "@keyframes ge-flow-animation-1jKgMrk81DSBv60hyZqZ{to{stroke-dashoffset:0}}"
        }
      </style>
        <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="200%" y2="0%">
          <stop offset="0%" stopColor="#FFEB51" />
          <stop offset="50%" stopColor="#995531" />
          <stop offset="100%" stopColor="#FFEB51" />
        </linearGradient>
    </defs>
    <g data-cell-id={0}>
      <g data-cell-id={1}>
        <RegularPath d={"M210 130q-32.5 0-32.5 42.5T145 215"} />
        <AnimatedPath d={"M345 130q52.5 0 52.5-37.5T450 55"} />
        <AnimatedPath d={"M345 130q52.5 0 52.5-17.5T450 95"} />
        <AnimatedPath d={"M345 130q53 0 53 2.5t53 2.5"} />

        <MainBlock x1={210} y1={110} callback={callback} label={"Bases"} />
        <FirstBlock d={"M242.5 10h70v30h-70z"} label={"Poker"}/>
        <RegularPath d={"M277.5 40v70"}/>
        <RegularPath d={"M145 215q132.5 0 132.5 95.5"}/>
        <AnimatedPath d={"M77.5 195v-45"} />

        <MainBlock x1={10} y1={195} callback={callback} label={"Gestion"} />

        <SecondaryBlock x1={450} y1={40} callback={callback} label={"R\xE8gles"} size={"sm"} />
        <SecondaryBlock x1={10} y1={275} callback={callback} label={"Cash Game"} size={"sm"} />
        <SecondaryBlock x1={450} y1={80} callback={callback} label={"Combinaisons"} size={"sm"} />
        <SecondaryBlock x1={594} y1={80} callback={callback} label={"Positions"} size={"sm"} />
        <SecondaryBlock x1={10} y1={40} callback={callback} label={"Bankroll Management"} size={"sm"} />
        <SecondaryBlock x1={10} y1={120} callback={callback} label={"Mental"} size={"sm"} />
        <SecondaryBlock x1={10} y1={80} callback={callback} label={"Objectifs"} size={"sm"} />

        <AnimatedPath d={"M235 1005q27.5 0 27.5-17.5T290 970"}/>
        <AnimatedPath d={"M235 1005q27 0 27 15t27 15"}/>
        <RegularPath d={"M167.5 1025q0 42.8-45 42.8t-45 42.7"}/>

        <MainBlock x1={100} y1={985} callback={callback} label={"Outils"} />

        <AnimatedPath d={"M425 970q20 0 20-10t9-10"}/>
        <AnimatedPath d={"M425 970q20 0 20 10t9 10"}/>
        <MainBlock x1={290} y1={950} callback={callback} label={"Trackers"}/>

        <AnimatedPath d={"M424 1035q20 0 30 .5"}/>

        <MainBlock x1={289} y1={1016.5} callback={callback} label={"Calculateur d'\xE9quit\xE9"}/>
        <AnimatedPath d={"M662.5 439.5v30"}/>
        <RegularPath d={"M595 419.5q-30 0-30 27t-30 27"}/>

        <MainBlock x1={595} y1={399.5} callback={callback} label={"Math\xE9matiques"}/>
        <SecondaryBlock x1={595} y1={589.5} callback={callback} label={"C\xF4tes du pot"} size={"sm"} />

        <LastBlock/>

        <AnimatedPath d={"M210 850q-32.5 0-32.5-40T145 770"}/>
        <AnimatedPath d={"M210 850q-32.5 0-32.5-20.5T145 809"}/>
        <AnimatedPath d={"M210 850h-65"}/>
        <AnimatedPath d={"M210 850q-32.5 0-32.5 19.5T145 889"}/>
        <AnimatedPath d={"M210 850q-32.5 0-32.5 39T145 928"}/>
        <RegularPath d={"M277.5 870q0 57.5-55 57.5t-55 57.5"}/>
        <RegularPath d={"M584 330.5q78.5 0 78.5 69"}/>
        <AnimatedPath d={"M516.5 310.5V255"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5-75.5T145 455.5"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5-54t-32.5-54"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5-34.25T145 538"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5-13t-32.5-13"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5 6.25T145 619"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5 27.9T145 662.25"}/>
        <RegularPath d={"M277.5 626.5V830"}/>
        <AnimatedPath d={"M210 606.5q-32.5 0-32.5 49.5T145 705.5"}/>
        <AnimatedPath d={"M467.5 627v34.5"}/>
        <RegularPath d={"M400 607h-27.5l-27.5-.5"}/>
        <AnimatedPath d={"M400 473.5q-27.5 0-27.5-29.5T345 414.5"}/>
        <AnimatedPath d={"M400 473.5q-27.5 0-27.5-9t-27.5-9"}/>
        <AnimatedPath d={"M400 473.5q-27.5 0-27.5 10.5T345 494.5"}/>
        <AnimatedPath d={"M400 473.5q-27.5 0-27.5 30.5T345 534.5"}/>
        <RegularPath d={"M467.5 493.5V587"}/>
        <AnimatedPath d={"M377.5 1225q36.3 0 36.3-20t36.2-20"}/>
        <AnimatedPath d={"M377.5 1225q36.3 0 36.3 20t36.2 20"}/>
        <AnimatedPath d={"M377.5 1225H450"}/>
        <RegularPath d={"M310 1245v180.95"}/>
        <AnimatedPath d={"M210 330.5q-32.5 0-32.5-20.25T145 290"}/>
        <AnimatedPath d={"M210 330.5q-32.5 0-65-.5"}/>
        <AnimatedPath d={"M210 330.5q-32.5 0-32.5 20.25T145 371"}/>
        <RegularPath d={"M345 330.5h104"}/>
        <AnimatedPath d={"M77.5 1150.5v34.5"}/>
        <RegularPath d={"M145 1130.5q165 0 165 74.5"}/>
        <AnimatedPath d={"M235 1005q27.5 0 27.5 37.25t27.5 37.25"}/>
        <AnimatedPath d={"m425 1079.5 29 .5"}/>
        <SecondaryBlock x1={595} y1={508.5} callback={callback} label={"EV"} size={"sm"} />
        <MainBlock x1={210} y1={830} callback={callback} label={"Modes de tournois"}/>
        <SecondaryBlock x1={10} y1={755} callback={callback} label={"Freezeout"} size={"sm"} />
        <SecondaryBlock x1={10} y1={794} callback={callback} label={"KO"} size={"sm"} />
        <SecondaryBlock x1={10} y1={874} callback={callback} label={"Space KO"} size={"sm"} />
        <SecondaryBlock x1={10} y1={913} callback={callback} label={"Mystery KO"} size={"sm"} />
        <MainBlock x1={449} y1={310.5} callback={callback} label={"Ranges"}/>
        <MainBlock x1={210} y1={586.5} callback={callback} label={"Phases de tournois"}/>
        <SecondaryBlock x1={10} y1={440.5} callback={callback} label={"D\xE9but de tournoi"} size={"sm"} />
        <SecondaryBlock x1={10} y1={482} callback={callback} label={"Milieu de tournoi"} size={"sm"} />
        <SecondaryBlock x1={10} y1={565.5} callback={callback} label={"Post bulle"} size={"sm"} />
        <SecondaryBlock x1={10} y1={523} callback={callback} label={"Bulle"} size={"sm"} />
        <SecondaryBlock x1={10} y1={604} callback={callback} label={"Table Finale"} size={"sm"} />
        <SecondaryBlock x1={595} y1={40} callback={callback} label={"Types de mains"} size={"sm"} />
        <SecondaryBlock x1={451} y1={120} callback={callback} label={"Raisons de miser"} size={"sm"} />
        <SecondaryBlock x1={594} y1={120} callback={callback} label={"Sizings"} size={"sm"} />
        <SecondaryBlock x1={10} y1={835} callback={callback} label={"PKO"} size={"sm"} />
        <SecondaryBlock x1={595} y1={469.5} callback={callback} label={"Outs"} size={"sm"} />
        <MainBlock x1={400} y1={587} callback={callback} label={"Concepts de mise"}/>
        <SecondaryBlock x1={400} y1={661.5} callback={callback} label={"Bluff"} size={"sm"} />
        <SecondaryBlock x1={400} y1={820.5} callback={callback} label={"C-bet"} size={"sm"} />
        <SecondaryBlock x1={400} y1={740.5} callback={callback} label={"3-bet"} size={"sm"} />
        <SecondaryBlock x1={400} y1={700.5} callback={callback} label={"Value bet"} size={"sm"} />
        <MainBlock x1={400} y1={453.5} callback={callback} label={"Exploitation"}/>
        <SecondaryBlock x1={210} y1={440.5} callback={callback} label={"Profiling"} size={"sm"} />
        <SecondaryBlock x1={400} y1={780.5} callback={callback} label={"Squeeze"} size={"sm"} />
        <SecondaryBlock x1={400} y1={860.5} callback={callback} label={"Blocking bet"} size={"sm"} />
        <MainBlock x1={242.5} y1={1205} callback={callback} label={"Entra\xEEnement"}/>
        <SecondaryBlock x1={450} y1={1170} callback={callback} label={"Review de main"} size={"sm"} />
        <SecondaryBlock x1={595} y1={549.5} callback={callback} label={"SPR"} size={"sm"} />
        <SecondaryBlock x1={595} y1={670.5} callback={callback} label={"Sizing g\xE9om\xE9trique"} size={"sm"} />
        <SecondaryBlock x1={210} y1={519.5} callback={callback} label={"ICM"} size={"sm"} />
        <SecondaryBlock x1={10} y1={647.25} callback={callback} label={"ICM"} size={"sm"} />
        <SecondaryBlock x1={595} y1={631.5} callback={callback} label={"Stack effectif"} size={"sm"} />
        <SecondaryBlock x1={454} y1={1020.5} callback={callback} label={"Flopzilla"} size={"sm"} />
        <SecondaryBlock x1={600} y1={1020.5} callback={callback} label={"Equilab"} size={"sm"} />
        <SecondaryBlock x1={454} y1={935} callback={callback} label={"HM3"} size={"lg"} />
        <SecondaryBlock x1={454} y1={975} callback={callback} label={"PT4"} size={"sm"} />
        <SecondaryBlock x1={600} y1={975} callback={callback} label={"Xeester"} size={"sm"} />
        <SecondaryBlock x1={450} y1={1210} callback={callback} label={"Groupe de travail"} size={"sm"} />
        <SecondaryBlock x1={450} y1={1250} callback={callback} label={"Coaching"} size={"sm"} />
        <SecondaryBlock x1={449} y1={225} callback={callback} label={"Ranges Préflop"} size={"sm"} />
        <MainBlock x1={210} y1={310.5} callback={callback} label={"Format"}/>
        <SecondaryBlock x1={10} y1={315} callback={callback} label={"Tournoi (MTT)"} size={"sm"} />
        <SecondaryBlock x1={10} y1={356} callback={callback} label={"Spins / Expressos"} size={"sm"} />
        <SecondaryBlock x1={210} y1={479.5} callback={callback} label={"Adaptation"} size={"sm"} />
        <SecondaryBlock x1={210} y1={399.5} callback={callback} label={"GTO"} size={"sm"} />
        <MainBlock x1={10} y1={1110.5} callback={callback} label={"Postflop"}/>
        <SecondaryBlock x1={10} y1={1185} callback={callback} label={"Texture de board"} size={"sm"} />
        <SecondaryBlock x1={10} y1={1225} callback={callback} label={"Avantage de range"} size={"sm"} />
        <SecondaryBlock x1={10} y1={1265} callback={callback} label={"Avantage de nuts"} size={"sm"} />
        <SecondaryBlock x1={10} y1={1305} callback={callback} label={"Sizings"} size={"sm"} />
        <SecondaryBlock x1={10} y1={1345} callback={callback} label={"Ratio bluff/value"} size={"sm"} />
        <SecondaryBlock x1={10} y1={1386} callback={callback} label={"Se polariser"} size={"sm"} />
        <SecondaryBlock x1={10} y1={690.5} callback={callback} label={"Jeu Shortstack"} size={"sm"} />
        <MainBlock x1={290} y1={1065} callback={callback} label={"Entra\xEEnement pratique"}/>
        <HighlightBlock x1={454} y1={1068} callback={callback} label={"Checkraise.fr"} size={"lg"} />

      </g>
    </g>
  </svg>
)
export default Roadmap;
