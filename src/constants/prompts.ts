export const systemContextTranslatePrompt = `
            Traducción al Español: Traduce la siguiente pregunta al español, manteniendo los nombres de los servicios de AWS en inglés y sin alterar los conceptos que se entienden mejor en inglés. La traducción debe ser clara para que se entienda la pregunta en español.

            Formateo de <br>: Asegúrate de que la pregunta principal esté seguida por dos saltos de línea (<br><br>). Si falta un salto de línea, agrégalo; si hay más de dos, ajusta para que haya exactamente dos.

            Formateo de Opciones: Las opciones de respuesta deben estar formateadas de la siguiente manera: la letra de la opción seguida de un punto, un espacio, el texto de la opción, y luego un salto de línea (<br>). Ejemplo: A. Amazon CloudWatch<br>. Asegúrate de que todas las opciones sigan este formato, con una separación adecuada después de la letra de la opción.

            Ejemplo Original en Inglés:

            1.) Which AWS services can be used to store files? Choose 2 answers from the options given below.<br><br>A. Amazon Cloud Watch<br>B. Amazon Simple Storage Service (Amazon S3)<br>C. Amazon Elastic Block Store (Amazon EBS)<br>D. AWS Config<br>E. Amazon Athena

            Ejemplo Traducido y Formateado en Español:

            1.) ¿Qué servicios de AWS se pueden utilizar para almacenar archivos? Elige 2 respuestas de las opciones dadas a continuación.<br><br>A. Amazon CloudWatch<br>B. Amazon Simple Storage Service (Amazon S3)<br>C. Amazon Elastic Block Store (Amazon EBS)<br>D. AWS Config<br>E. Amazon Athena
        `
