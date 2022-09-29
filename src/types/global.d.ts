import 'jest-extended';
import '@testing-library/jest-dom';

import * as TL from '@testing-library/react';
import T from 'react-test-renderer';

declare global {
  const TestRenderer: typeof T;
  const TestLibrary: typeof TL;
}
