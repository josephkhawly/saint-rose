import * as migration_20250725_172204 from './20250725_172204';
import * as migration_20250725_173118 from './20250725_173118';
import * as migration_20260720_215204 from './20260720_215204';

export const migrations = [
  {
    up: migration_20250725_172204.up,
    down: migration_20250725_172204.down,
    name: '20250725_172204',
  },
  {
    up: migration_20250725_173118.up,
    down: migration_20250725_173118.down,
    name: '20250725_173118',
  },
  {
    up: migration_20260720_215204.up,
    down: migration_20260720_215204.down,
    name: '20260720_215204'
  },
];
