import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	loadPreviousSimulation,
	setSimulationConfig,
} from '@/store/actions/actions'
import { SimulationConfig } from '@/store/reducers/rootReducer'
import { configSelector } from '@/store/selectors/simulationSelectors'
import { ImmutableType } from '@/types/utils'

export default function useSimulationConfig({
	path,
	config,
	autoloadLastSimulation = false,
}: {
	path: string
	config?: ImmutableType<SimulationConfig>
	autoloadLastSimulation?: boolean
}) {
	const dispatch = useDispatch()

	// Initialize redux store in SSR mode
	if (import.meta.env.SSR) {
		dispatch(setSimulationConfig(config ?? {}, path))
	}

	const lastConfig = useSelector(configSelector)

	// useLayoutEffect like useEffect does nothing in SSR mode but triggers a warning,
	// so we replace it with useEffect which does not trigger any warning
	const useLayoutEffectWithoutWarnInSSR = import.meta.env.SSR
		? useEffect
		: useLayoutEffect

	useLayoutEffectWithoutWarnInSSR(() => {
		if (config && lastConfig !== config) {
			dispatch(setSimulationConfig(config ?? {}, path))
		}
	}, [config, dispatch, lastConfig, path])

	useEffect(() => {
		if (autoloadLastSimulation) {
			dispatch(loadPreviousSimulation())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
