import { createWriteStream } from 'node:fs';
import { Readable, Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { ReadableStream } from 'node:stream/web';

export async function fetchStreamToFile(url: string, output: string | Writable) {
  const response = await fetch(url);

  if (!response.body) throw new Error('No body');
  const body = Readable.fromWeb(response.body as unknown as ReadableStream<any>);

  const writeStream = typeof output === 'string' ? createWriteStream(output) : output;

  await finished(body.pipe(writeStream));
}
