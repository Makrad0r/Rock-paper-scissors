module.exports = class Table{
	constructor(element) {
		this.element = element
		this.length = element.length
	}
	makeTable(){
		const Winner = require('D:\\projects\\itra\\rps\\winner.js')
		const winner = new Winner(this.length)
		let table = new Array(this.length)	
		for(let i = 0; i <= this.length; i++){
			table[i] = new Array(this.length)
		}
		table[0][0] = 'You->'
		for(let i = 1; i <= this.length; i++){
			table[0][i] = this.element[i-1]
			table[i][0] = this.element[i-1]
		}
		for (let i = 1; i <= this.length; i++) {
            for (let j = 1; j <= this.length ; j++) {
                    table[i][j] = winner.getWinner(i,j)  
        	}
        }
        console.table(table)
	}
}