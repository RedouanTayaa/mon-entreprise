import { Trans, useTranslation } from 'react-i18next'

import { Article } from '@/design-system/card'
import { useSitePaths } from '@/sitePaths'

export function SecuriteSocialeCard() {
	const { absoluteSitePaths } = useSitePaths()
	const { t } = useTranslation()

	return (
		<Article
			title={
				<h3>
					<Trans i18nKey="gérer.ressources.sécuritéSociale.title">
						Comprendre la sécurité sociale
					</Trans>
				</h3>
			}
			ctaLabel={t('gérer.ressources.sécuritéSociale.cta', 'Voir la vidéo')}
			aria-label={t(
				'gérer.ressources.sécuritéSociale.aria-label',
				'Comprendre la sécurité sociale, Voir la vidéo'
			)}
			to={absoluteSitePaths.assistants.sécuritéSociale}
		>
			<Trans i18nKey="gérer.ressources.sécuritéSociale.body">
				A quoi servent les cotisations sociales ? Le point sur le système de
				protection sociale dont bénéficient tous les travailleurs en France.
			</Trans>
		</Article>
	)
}
