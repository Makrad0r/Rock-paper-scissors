module.exports = class Player {
	constructor(element, pickPlayer) {
		this.element = element
		this.pickPlayer = element[pickPlayer]
	}
	getPickPlayer(){
		return this.pickPlayer
	}
}