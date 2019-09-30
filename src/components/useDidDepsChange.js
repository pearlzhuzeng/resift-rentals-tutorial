import { useEffect, useRef } from 'react';

/**
 * use this helper in development to see if a dependencies of a hooks dependency array changed
 *
 * e.g.
 *
 * ```js
 * import useDidDependenciesChange from '@sift/skipper/helpers/useDidDependenciesChange';
 *
 * function FunctionComponent({foo, bar}) {
 *   // you'll have something like this
 *   useEffect(() => {}, [foo, bar]);
 *
 *   // then, in-order to see what caused that effect (or useMemo etc) to fire, use
 *   // `useDidDependenciesChange` like so:
 *   useDidDependenciesChange({ foo, bar });
 *
 *   // in your console, you should see some useful output
 *   // e.g. Differences: "foo"
 * }
 * ```
 */
export default function useDidDependenciesChange(depsObj) {
  const previousDepsRef = useRef(null);

  const deps = Object.entries(depsObj)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([_, value]) => value);

  useEffect(() => {
    const previousDeps = previousDepsRef.current;
    if (!previousDeps) {
      previousDepsRef.current = depsObj;
      return;
    }

    const differences = [];

    const keys = Object.keys(depsObj);

    for (const key of keys) {
      const previous = previousDeps[key];
      const current = depsObj[key];

      if (previous !== current) {
        differences.push(key);
      }
    }

    if (differences.length > 0) {
      console.log('Differences:', `"${differences.join(', ')}"`);
    }
  }, deps);
}
