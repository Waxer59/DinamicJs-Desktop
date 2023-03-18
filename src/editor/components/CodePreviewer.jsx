import { useEffect, useRef } from 'react';

import { useCodePreviewer } from '../hooks/useCodePreviewer';
import { useCodeStore } from '../hooks/useCodeStore';

export const CodePreviewer = () => {
  const preview = useRef(null);
  const { activeCode } = useCodeStore();
  const { update } = useCodePreviewer();

  useEffect(() => {
    update(preview.current, activeCode);
  }, [activeCode]);

  return <iframe className="output" ref={preview}></iframe>;
};
