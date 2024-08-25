
class TagGenerator {

	static createTag(userId, name) {
		const lastIndex = name.length - 1;
		const firstLetters = name.substr(0, 1).charCodeAt(0).toString();
		const lastLetters = name.substr(lastIndex, 1).charCodeAt(0).toString();

		return firstLetters + lastLetters + userId;
	}

}

module.exports = TagGenerator;