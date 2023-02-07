import { it } from 'vitest'

import { configSASU } from '@/pages/Simulateurs/sasu/dirigeantSASU'

import rémunérationSASUSituations from './simulations-SASU.yaml'
import { runSimulations } from './utils'

it('calculate assimilé salarié', () => {
	runSimulations(
		rémunérationSASUSituations,
		[
			...(configSASU['objectifs exclusifs'] ?? []),
			...(configSASU.objectifs ?? []),
		],
		configSASU.situation
	)
})
