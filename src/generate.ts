import fs from 'node:fs'
import type { Term } from './types/term'
import { finalPath, translationsPath } from './constants/file-paths'

const inputPath = translationsPath
const outputPath = finalPath

;(async () => {
	const questions: Term[] = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))

	const lines = []

	lines.push('#separator:tab')
	lines.push('#html:true')

	questions.forEach(({ question, answer }) => {
		const frontCard = `<div class=""front-card"">\n\t${question}\n</div>`
		const backCard = `<div class=""back-card"">\n\t${answer}\n</div>`

		lines.push(`"${frontCard}"\t"${backCard}"`)
	})

	fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8')
})()
