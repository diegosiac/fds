import fs from 'node:fs'
import { chromium } from 'playwright'
import { initialPath } from './constants/file-paths'
import type { Term } from './types/term'

const jsonPath = initialPath

const basePageUrl = 'http://127.0.0.1:3000'

const deleteTabsAndScapes = (text: string) =>
	text.replace(/\n/g, '').replace(/\t/g, '').trim()

const cleanedQuestion = (question: string) => question.replace('', '')

const cleanedAnswer = (answer: string) => answer.replace('', '')

;(async () => {
	const browser = await chromium.launch({ headless: false })
	const page = await browser.newPage()

	await page.goto(basePageUrl)

	const terms: Term[] = []

	// Tu lógica aquí para extraer las preguntas y las respuestas

	fs.writeFileSync(jsonPath, JSON.stringify(terms, null, 2))

	await browser.close()
})()
