const Sentiment = require("sentiment");
const translatte = require('translatte');

class SentimentalAnalysis {

	static async verifySentiment(data) {
		let result;

		await translatte(data, {
			from: 'pt',
			to: 'en',
		}).then(res => {
			result = res.text;
		}).catch(err => {
			console.error(err);
		});

		//Verifica se existe algum conteúdo no data.
		if (!result.trim()) return;
		let filterData = result.replace(/[^a-zA-Z ]/gi, '');

		const sentimentInstance = new Sentiment();
		const analysis = sentimentInstance.analyze(filterData);
		const sentiment = {};
		//TODO Melhorar lógica de sentimento, fazer testes para saber se parece com a realidade
		sentiment.positive = analysis?.positive?.length;
		sentiment.negative = analysis?.negative?.length;
		sentiment.neutral = analysis?.tokens?.length - sentiment?.positive - sentiment?.negative;
		sentiment.sentiment = analysis?.score > 5 ? 'positive' : analysis?.score < 0 ? 'negative' : 'neutral';

		return sentiment;
	}

}

module.exports = SentimentalAnalysis;