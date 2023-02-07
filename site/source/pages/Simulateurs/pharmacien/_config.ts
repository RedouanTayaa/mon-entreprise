import { config } from '../configs/config'
import { SimulatorsDataParams } from '../configs/types'
import { IndépendantPLSimulation } from '../indépendant/Indépendant'
import { configPharmacien } from '../profession-libérale/_simulationConfig'

export function pharmacienConfig({ t, sitePaths }: SimulatorsDataParams) {
	return config({
		id: 'pharmacien',
		tracking: {
			chapter2: 'profession_liberale',
			chapter3: 'pharmacien',
		},
		meta: {
			title: t(
				'pages.simulateurs.pharmacien.meta.title',
				'Pharmacien : simulateur de revenus'
			),
			description: t(
				'pages.simulateurs.pharmacien.meta.description',
				'Calcul du revenu net après déduction des cotisations à partir du total des recettes pour pharmacien en libéral'
			),
		},
		icône: '⚕️',
		iframePath: 'pharmacien',
		pathId: 'simulateurs.profession-libérale.pharmacien',
		shortName: t('pages.simulateurs.pharmacien.shortname', 'Pharmacien'),
		title: t(
			'pages.simulateurs.pharmacien.title',
			'Simulateur de revenus pour pharmacien en libéral'
		),
		path: sitePaths.simulateurs['profession-libérale'].pharmacien,
		simulation: configPharmacien,
		component: IndépendantPLSimulation,
	} as const)
}
