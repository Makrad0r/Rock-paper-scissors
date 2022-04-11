function csprng(min, max) {
  
  		const crypto = require('crypto')

    const range = max - min
    if (range >= Math.pow(2, 32))
        console.log("Warning! Range is too large.")
    
    var tmp = range
    var bitsNeeded = 0
    var bytesNeeded = 0
    var mask = 1

    while (tmp > 0) {
        if (bitsNeeded % 8 === 0) bytesNeeded += 1
        bitsNeeded += 1
        mask = mask << 1 | 1
        tmp = tmp >>> 1
    }
    const randomBytes = crypto.randomBytes(bytesNeeded)
    var randomValue = 0

    for (var i = 0; i < bytesNeeded; i++) {
	    randomValue |= randomBytes[i] << 8 * i
    }

    randomValue = randomValue & mask;

    if (randomValue <= range) {
        return min + randomValue
    } else {
        return csprng(min, max)
    }
}
// require()
// class Player {
// 	constructor(element, pickPlayer) {
// 		this.element = element
// 		this.pickPlayer = element[pickPlayer]
// 	}
// 	getPickPlayer(){
// 		return this.pickPlayer
// 	}
// }

// class Winner{
// 	constructor(length){
// 		this.half = (length - 1) / 2;
// 	}
// 	getWinner(pickPlayer, pickBot){
// 		if (pickBot == pickPlayer) return 'Draw!'
// 		if (pickBot > pickPlayer){
//             if (pickBot - pickPlayer <= this.half){
//                 return 'Lose!'
//             }
//             return 'Win!'
//         }
//         if (pickPlayer - pickBot <= this.half){
//                 return 'Win!'
//         }
//         return 'Lose!'
//     }
// }
// class Table extends Winner{
// 	makeTable(){
// 		let AsciiTable = require('ascii-table')
// 		let tableA = new AsciiTable()
// 		let table = new Array(element.length)	
// 		for(let i = 0; i <= element.length; i++){
// 			table[i] = new Array(element.length)
// 		}
// 		table[0][0] = 'You->'
// 		for(let i = 1; i <= element.length; i++){
// 			table[0][i] = element[i-1]
// 			table[i][0] = element[i-1]
// 		}
// 		for (let i = 1; i <= element.length; i++) {
//             for (let j = 1; j <= element.length ; j++) {
//                     table[i][j] = super.getWinner(i,j)  
//         	}
//         }
//         console.table(table)
// 	}
// }

function showMenu(element){
	console.log('Available moves:')
	for(let i = 0; i<element.length; i++){
	console.log(i+1 + ' - ' + element[i])
	}
	console.log('0 - Exit')
	console.log('? - Help')
}


function start(element){
	let temp = true

	const Player = require('D:/projects/itra/rps/player.js')
	const Winner = require('D:/projects/itra/rps/winner.js')
	const Table = require('D:/projects/itra/rps/table.js')
	const HMAC = require('D:/projects/itra/rps/hmac.js')
	const winner = new Winner(element.length)
	let readlineSync = require('readline-sync')
	while(temp){
 		const pick2 = csprng(0, element.length-1)
		const bot = new Player(element, pick2)
		let hmac = new HMAC() 
		let hmac1 = hmac.getHMAC1(pick2)
		let hmac2 = hmac.getHMAC2(hmac1, bot.getPickPlayer())
		console.log('HMAC - ' + hmac2)
		showMenu(element)

		let pick1 = readlineSync.question("Enter your move: ")

		if(pick1 >= 1 && pick1-1 < element.length){
			const player = new Player(element, pick1-1)
			let randomNumber = require("random-number-csprng-2")
			console.log('Your turn - ' + player.getPickPlayer())
			console.log('Bots turn - ' + bot.getPickPlayer())
			console.log(winner.getWinner(pick2, pick1-1))
			console.log('HMAC key:\n' + hmac1)
		} else if(pick1 == '?') {
			let table = new Table(element)
			table.makeTable()
		} else if(pick1 == '0') temp = false
		else console.log('try enter correctly') 
	}
}



const element = process.argv.slice(2)
if(element.length % 2 == 0 || element.length <= 1) console.log('Try again with other values')
else start(element)




