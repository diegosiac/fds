import fs from 'node:fs'
import type { Term } from './types/term'
import { finalPath, translationsPath } from './constants/file-paths'

const inputPath = translationsPath
const outputPath = finalPath

function formatText(text: string) {
	const removeDoubleQuotes = text.replace(/"/g, "'")

	const lines = removeDoubleQuotes.split('\n')

	const linesWithTab = lines.map((linea) => `\t${linea}`)

	return linesWithTab.join('<br>\n')
}

;(async () => {
	const questions: Term[] = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))

	const lines = []

	lines.push('#separator:tab')
	lines.push('#html:true')

	questions.forEach(({ question, answer }) => {
		const frontCard = `<div class=""front-card"">\n${formatText(
			question
		)}\n</div>`
		const backCard = `<div class=""back-card"">\n${formatText(answer)}\n</div>`

		lines.push(`"${frontCard}"\t"${backCard}"`)
	})

	fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8')
})()
