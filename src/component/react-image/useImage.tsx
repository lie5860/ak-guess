import { useState } from 'react';
import imagePromiseFactory from './imagePromiseFactory';

export type useImageProps = {
  srcList: string | string[];
  imgPromise?: (...args: unknown[]) => Promise<void>;
  useSuspense?: boolean;
};

const removeBlankArrayElements = (a: string[]) => a.filter((x) => x);
const stringToArray = (x: string | string[]) => (Array.isArray(x) ? x : [x]);
const cache: Record<
  string,
  { promise: Promise<string>; cache?: string; error?: unknown; src?: string }
> = {};

// sequential map.find for promises
const promiseFind = (arr: string[], promiseFactory: (src: string) => Promise<void>) => {
  let done = false;
  return new Promise<string>((resolve, reject) => {
    const queueNext = (src: string) => {
      return promiseFactory(src).then(() => {
        done = true;
        resolve(src);
      });
    };

    arr
      .reduce(
        (p: Promise<void>, src: string) => {
          // ensure we aren't done before enquing the next source
          return p.catch(() => {
            if (!done) return queueNext(src);
          });
        },
        queueNext(arr.shift() as string),
      )
      .catch(reject);
  });
};

export default function useImage({
  srcList,
  imgPromise = imagePromiseFactory({ decode: true }) as (...args: unknown[]) => Promise<void>,
  useSuspense = false,
}: useImageProps): { src: string | undefined; isLoading: boolean; error: unknown } {
  const [, setIsLoading] = useState(true);
  const sourceList = removeBlankArrayElements(stringToArray(srcList));
  const sourceKey = sourceList.join('');

  if (!cache[sourceKey]) {
    // create promise to loop through sources and try to load one
    cache[sourceKey] = {
      promise: promiseFind(sourceList, imgPromise as (src: string) => Promise<void>),
      cache: 'pending',
      error: null,
    };
  }

  // when promise resolves/reject, update cache & state
  cache[sourceKey].promise
    // if a source was found, update cache
    // when not using suspense, update state to force a rerender
    .then((src: string) => {
      cache[sourceKey] = { ...cache[sourceKey], cache: 'resolved', src };
      if (!useSuspense) setIsLoading(false);
    })
    // if no source was found, or if another error occured, update cache
    // when not using suspense, update state to force a rerender
    .catch((error: unknown) => {
      cache[sourceKey] = { ...cache[sourceKey], cache: 'rejected', error };
      if (!useSuspense) setIsLoading(false);
    });

  if (cache[sourceKey].cache === 'resolved') {
    return { src: cache[sourceKey].src, isLoading: false, error: null };
  }

  if (cache[sourceKey].cache === 'rejected') {
    if (useSuspense) throw cache[sourceKey].error;
    return { isLoading: false, error: cache[sourceKey].error, src: undefined };
  }

  // cache[sourceKey].cache === 'pending')
  if (useSuspense) throw cache[sourceKey].promise;
  return { isLoading: true, src: undefined, error: null };
}
