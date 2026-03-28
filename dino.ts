export const Dice = {
  d2: 2,
  d4: 4,
  d6: 6,
} as const;

export type Dice = (typeof Dice)[keyof typeof Dice];

export type Stat = {
  value: number;
  dice: Dice;
};

export type Dino = {
  hitpoints: number;
  attack: Stat;
  defence: Stat;
  evasion: Stat;
  spike: number;
};

const createDino = (
  hp: number,
  attack: number,
  defence: number,
  evasion: number,
  spike: number,
): Dino => ({
  hitpoints: hp,
  attack: { value: attack, dice: Dice.d6 },
  defence: { value: defence, dice: Dice.d2 },
  evasion: { value: evasion, dice: Dice.d4 },
  spike: spike,
});

export const Stegosaurus: Dino = createDino(24, 2, 3, 0, 1);

export const Velociraptor: Dino = createDino(20, 5, 0, 4, 0);

export const Tyrannonsaurus: Dino = createDino(21, 5, 1, 1, 0);

export const Bracusaurus: Dino = createDino(46, 3, 0, 0, 0);

export const Ankylsaurus: Dino = createDino(23, 0, 4, 0, 2);

export const Triceratops: Dino = createDino(23, 3, 2, 2, 1);

export const Parasaurolophus: Dino = createDino(28, 4, 0, 3, 0);

export const Pterodactyl: Dino = createDino(20, 4, 0, 5, 0);

export const Dimetrodon: Dino = createDino(24, 4, 1, 3, 0);
