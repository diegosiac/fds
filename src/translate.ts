import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import fs from 'node:fs'
import type { Term } from './types/term'
import { initialPath, translationsPath } from './constants/file-paths'
import { systemContextTranslatePrompt } from './constants/prompts'

const inputPath = initialPath
const outputPath = translationsPath

let totalTokens = 0
let promptTokens = 0
let completionTokens = 0

const maxBatchSize: null | number = null

const traduceAI = async (question: string) => {
	const { text, usage } = await generateText({
		model: openai('gpt-4o'),
		prompt: question,
		system: systemContextTranslatePrompt,
		maxTokens: 1500,
		temperature: 0.4,
	})

	totalTokens += usage.totalTokens
	promptTokens += usage.promptTokens
	completionTokens += usage.completionTokens

	return text
}

const logTokens = () => {
	console.log(`Tokens totales: ${totalTokens}`)
	console.log(`Tokens de la pregunta: ${promptTokens}`)
	console.log(`Tokens de la respuesta: ${completionTokens}`)
}

const readProgress = (): Term[] => {
	if (fs.existsSync(outputPath)) {
		const data = fs.readFileSync(outputPath, 'utf8')

		return JSON.parse(data)
	}

	return []
}

const saveProgress = (translatedQuestions: Term[]) => {
	logTokens()

	fs.writeFileSync(outputPath, JSON.stringify(translatedQuestions, null, 2))
}

const readQuestions = (): Term[] => {
	const data = fs.readFileSync(inputPath, 'utf8')

	return JSON.parse(data)
}

;(async () => {
	const questions = readQuestions()
	let translatedQuestions = readProgress()
	let startIndex = translatedQuestions.length

	console.log(`Comenzando desde el índice: ${startIndex}`)

	let completedTask = 0

	for (let i = startIndex; i < questions.length; i++) {
		try {
			completedTask++

			console.log(
				`Traduciendo pregunta ${i + 1} de ${
					maxBatchSize ? startIndex + maxBatchSize : questions.length
				}...`
			)

			const translatedQuestion = await traduceAI(questions[i].question)

			translatedQuestions.push({
				question: translatedQuestion,
				answer: questions[i].answer,
			})

			if (!maxBatchSize) continue

			if (completedTask >= maxBatchSize) {
				saveProgress(translatedQuestions)

				console.log(`Se han completado ${completedTask} tareas.`)

				return
			}
		} catch (error) {
			console.log(error)

			console.error(
				`Fallo en la traducción en el índice ${i}. Guardando progreso...`
			)

			saveProgress(translatedQuestions)
			return
		}
	}

	saveProgress(translatedQuestions)

	console.log('Todas las preguntas han sido traducidas con éxito.')
})()
