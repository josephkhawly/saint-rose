import * as migration_20250725_172204 from './20250725_172204';
import * as migration_20250725_173118 from './20250725_173118';
import * as migration_20260720_215204 from './20260720_215204';
import * as migration_20260722_001354 from './20260722_001354';
import * as migration_20260722_170028 from './20260722_170028';
import * as migration_20260722_213018 from './20260722_213018';
import * as migration_20260722_234940_gallery_orientation_image_position from './20260722_234940_gallery_orientation_image_position';

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
    name: '20260720_215204',
  },
  {
    up: migration_20260722_001354.up,
    down: migration_20260722_001354.down,
    name: '20260722_001354',
  },
  {
    up: migration_20260722_170028.up,
    down: migration_20260722_170028.down,
    name: '20260722_170028',
  },
  {
    up: migration_20260722_213018.up,
    down: migration_20260722_213018.down,
    name: '20260722_213018',
  },
  {
    up: migration_20260722_234940_gallery_orientation_image_position.up,
    down: migration_20260722_234940_gallery_orientation_image_position.down,
    name: '20260722_234940_gallery_orientation_image_position'
  },
];
