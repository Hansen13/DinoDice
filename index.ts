import {
  Ankylsaurus,
  Bracusaurus,
  Dimetrodon,
  Parasaurolophus,
  Pterodactyl,
  Stegosaurus,
  Triceratops,
  Tyrannonsaurus,
  Velociraptor,
  type Dino,
  type Stat,
} from "./dino.ts";
import { fight } from "./fightSimulator.ts";

console.log("Simulation started...");

const stat: Stat = { value: 4, dice: 6 };

// 1. Adjusted Types for better tracking
type Rate = {
  opponentName: string;
  wins: number;
};

type WinRate = {
  dinoName: string;
  dinoData: Dino;
  results: Rate[];
};

// 2. Initialize the results structure
const results: WinRate[] = [
  { dinoName: "Stegosaurus", dinoData: Stegosaurus, results: [] },
  { dinoName: "Velociraptor", dinoData: Velociraptor, results: [] },
  { dinoName: "Tyrannosaurus", dinoData: Tyrannonsaurus, results: [] },
  { dinoName: "Brachiousaurus", dinoData: Bracusaurus, results: [] },
  { dinoName: "Ankylosaurus", dinoData: Ankylsaurus, results: [] },
  { dinoName: "Triceratops", dinoData: Triceratops, results: [] },
  { dinoName: "Parasaurolophus", dinoData: Parasaurolophus, results: [] },
  { dinoName: "Pterodactyl", dinoData: Pterodactyl, results: [] },
  { dinoName: "Dimetrodon", dinoData: Dimetrodon, results: [] },
];

// ... (Previous types and dino definitions)
const ITERATIONS = 2_000_000;
const totalPossibleFights = ITERATIONS * (results.length - 1);

for (let i = 0; i < results.length; i++) {
  let totalDinoWins = 0; // Track overall wins for this specific Dino

  for (let y = 0; y < results.length; y++) {
    if (i === y) continue;

    let matchupWins = 0;
    const attacker = results[i].dinoData;
    const defender = results[y].dinoData;

    for (let count = 0; count < ITERATIONS; count++) {
      if (fight(attacker, defender) === "dino 1 won") {
        matchupWins++;
      }
    }

    totalDinoWins += matchupWins;
    results[i].results.push({
      opponentName: results[y].dinoName,
      wins: matchupWins,
    });
  }

  // Attach the global total to the object for easy access later
  (results[i] as any).totalWins = totalDinoWins;
}

// --- FINAL OUTPUT ---
console.clear();
console.log("=== DETAILED MATCHUP STATS ===");

results.forEach((dino) => {
  console.log(`\n> ${dino.dinoName.toUpperCase()}`);
  dino.results.forEach((res) => {
    const winPc = ((res.wins / ITERATIONS) * 100).toFixed(1);
    console.log(`  vs ${res.opponentName.padEnd(15)} | ${winPc}%`);
  });
});

console.log("\n" + "=".repeat(40));
console.log("GLOBAL STANDINGS (Average Win Rate)");
console.log("=".repeat(40));

// Sort by highest winrate for a "Leaderboard" feel
const leaderboard = [...results].sort(
  (a, b) => (b as any).totalWins - (a as any).totalWins,
);

leaderboard.forEach((dino, index) => {
  const totalWins = (dino as any).totalWins;
  const globalPercentage = ((totalWins / totalPossibleFights) * 100).toFixed(2);

  console.log(
    `${index + 1}. ${dino.dinoName.padEnd(15)} : ${globalPercentage}% Total Win Rate`,
  );
});

// const ITERATIONS = 1_000_000;

// // 3. Run the Simulation
// for (let i = 0; i < results.length; i++) {
//   for (let y = 0; y < results.length; y++) {
//     // We don't want them fighting themselves (unless you want to!)
//     if (i === y) continue;

//     let wins = 0;
//     const attacker = results[i];
//     const defender = results[y];

//     for (let count = 0; count < ITERATIONS; count++) {
//       const outcome = fight(attacker.dinoData, defender.dinoData);
//       if (outcome === "dino 1 won") {
//         wins++;
//       }
//     }

//     // Record the total wins for this specific matchup
//     attacker.results.push({
//       opponentName: defender.dinoName,
//       wins: wins,
//     });
//   }
// }

// // 4. Post results to the console
// console.log("--- SIMULATION RESULTS (1,000,000 Fights per Matchup) ---");
// results.forEach((dino) => {
//   console.log(`\n${dino.dinoName.toUpperCase()}:`);
//   dino.results.forEach((res) => {
//     const percentage = ((res.wins / ITERATIONS) * 100).toFixed(2);
//     console.log(
//       `  vs ${res.opponentName}: ${res.wins.toLocaleString()} wins (${percentage}%)`,
//     );
//   });
// });

// type Rate = {
//   opponent: Dino;
//   timesWon: number;
// };

// type WinRate = {
//   name: Dino;
//   winrate: Rate[];
// };
// const dinos: WinRate[] = [
//   { name: Stegosaurus, winrate: [] },
//   { name: Velociraptor, winrate: [] },
//   { name: Tyrannonsaurus, winrate: [] },
//   { name: Bracusaurus, winrate: [] },
//   { name: Ankylsaurus, winrate: [] },
// ];

// for (let i = 0; i < dinos.length; i++)
//   for (let y = 0; y < dinos.length; y++) {
//     for (let index = 0; index < 1000000; index++) {
//       const fightDone = fight(dinos[i], dinos[y]);
//       if (fightDone == "dino 1 won") {
//         dinos[i].winrate.push({opponent: dinos[y], timesWon: dinos[i].winrate.});
//       } else dinos[y].winrate.push();
//     }
//   }
