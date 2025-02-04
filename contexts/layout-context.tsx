import { createContext, useContext } from 'react'

interface LayoutContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {}
})

export const useLayout = () => useContext(LayoutContext) 