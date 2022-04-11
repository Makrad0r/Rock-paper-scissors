module.exports = class Winner{
	constructor(length){
		this.half = (length - 1) / 2;
	}
	getWinner(pickPlayer, pickBot){
		if (pickBot == pickPlayer) return 'Draw!'
		if (pickBot > pickPlayer){
            if (pickBot - pickPlayer <= this.half){
                return 'Lose!'
            }
            return 'Win!'
        }
        if (pickPlayer - pickBot <= this.half){
                return 'Win!'
        }
        return 'Lose!'
    }
}
// class Table extends Winner{
//     makeTable(){
//         let table = new Array(element.length)   
//         for(let i = 0; i <= element.length; i++){
//             table[i] = new Array(element.length)
//         }
//         table[0][0] = 'You->'
//         for(let i = 1; i <= element.length; i++){
//             table[0][i] = element[i-1]
//             table[i][0] = element[i-1]
//         }
//         for (let i = 1; i <= element.length; i++) {
//             for (let j = 1; j <= element.length ; j++) {
//                     table[i][j] = super.getWinner(i,j)  
//             }
//         }
//         console.table(table)
//     }
// }