module.exports = 
	class HMAC {
	getHMAC1(value){
		const sha3_256 = require('js-sha3').sha3_256	
		return sha3_256(value.toString())
	}
	getHMAC2(value, turn){
		const sha3_256 = require('js-sha3').sha3_256
		let temp = value + turn
		let hmac2 = sha3_256(temp.toString())
		return hmac2
	}
}