import { unlink } from 'node:fs/promises';
import { PathLike } from 'fs';

export function unlinkMaybe(path: PathLike) {
  return unlink(path).catch((error) => {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  });
}
