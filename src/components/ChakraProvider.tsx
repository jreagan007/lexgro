/**
 * Chakra UI Provider wrapper for Astro
 *
 * This component wraps the application with ChakraProvider.
 * Used in BaseLayout.astro to provide Chakra context to all React components.
 */

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../lib/theme';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function LexgroChakraProvider({ children }: Props) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}

export default LexgroChakraProvider;
