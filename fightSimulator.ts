import { type Dino, type Stat } from "./dino.ts";

export function fight(dino1: Dino, dino2: Dino) {
  let dino1hp = dino1.hitpoints;
  let dino2hp = dino2.hitpoints;

  let roundCounter = 1;

  while (dino1hp >= 0 && dino2hp >= 0) {
    let damageDino1 = dinoAttack(dino1, dino2);
    dino2hp -= damageDino1;

    if (dino2hp <= 0) return "dino 1 won";

    if (damageDino1 > 0 && dino2.spike > 0) {
      dino1hp -= dino2.spike;
    }

    if (dino1hp <= 0) return "dino 2 won";

    let damageDino2 = dinoAttack(dino2, dino1);
    dino1hp -= damageDino2;

    if (dino1hp <= 0) return "dino 2 won";

    if (damageDino2 > 0 && dino1.spike > 0) {
      dino2hp -= dino1.spike;
    }

    if (dino2hp <= 0) return "dino 1 won";

    roundCounter++;
  }
}

export function rollDice(input: Stat) {
  return input.value + Math.floor(Math.random() * (input.dice - 1) + 1);
}

export function dinoAttack(dino1: Dino, dino2: Dino): number {
  const dinoAttack = rollDice(dino1.attack);
  if (dinoAttack < rollDice(dino2.evasion)) {
    return 0;
  }
  const dino2Defence = rollDice(dino2.defence);
  if (dinoAttack > dino2Defence) {
    return dinoAttack - dino2Defence;
  }
  return 0;
}
