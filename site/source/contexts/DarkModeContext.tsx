import { ReactNode, createContext, useEffect, useState } from 'react'

import { useIsEmbedded } from '@/components/utils/useIsEmbedded'
import { getItem, setItem } from '@/storage/safeLocalStorage'

type DarkModeContextType = [boolean, (darkMode: boolean) => void]

const persistDarkMode = (darkMode: boolean) => {
	setItem('darkMode', darkMode.toString())
}

const getDefaultDarkMode = () => {
	if (import.meta.env.SSR) {
		return false
	}

	return getItem('darkMode') ? getItem('darkMode') === 'true' : false
}

export const DarkModeContext = createContext<DarkModeContextType>([
	false,
	() => {
		// eslint-disable-next-line no-console
		console.error('No dark mode provider found')
	},
])

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
	const [darkMode, _setDarkMode] = useState<boolean>(getDefaultDarkMode())

	const setDarkMode = (darkMode: boolean) => {
		_setDarkMode(darkMode)
		persistDarkMode(darkMode)

		// https://www.youtube.com/watch?v=Pr8ETbGz35Q
		// eslint-disable-next-line no-console
		console.log(darkMode ? 'Nuit' : 'Jour')
	}

	useEffect(() => {
		if (!window.matchMedia) {
			return
		}
		const onDarkModeChange = (e: MediaQueryListEvent) => {
			setDarkMode(e.matches)
		}
		const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

		// safari 13 doesn't have addEventListener
		matchDarkMode.addEventListener
			? matchDarkMode.addEventListener('change', onDarkModeChange)
			: matchDarkMode.addListener(onDarkModeChange)

		return () => {
			// safari 13 doesn't have removeEventListener
			matchDarkMode.removeEventListener
				? matchDarkMode.removeEventListener('change', onDarkModeChange)
				: matchDarkMode.removeListener(onDarkModeChange)
		}
	})
	const finalDarkMode = !useIsEmbedded() && darkMode

	return (
		<DarkModeContext.Provider value={[finalDarkMode, setDarkMode]}>
			{/* <ThemeProvider theme={(theme) => ({ ...theme, darkMode: finalDarkMode })}> */}
			{children}
			{/* </ThemeProvider> */}
		</DarkModeContext.Provider>
	)
}