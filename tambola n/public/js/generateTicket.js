function generateTambolaTickets() {
    const tambolaNumbers = Array(3).fill(null).map(() => Array(9).fill(0));
    const usedNumbers = new Set();
  
    
    for (let col = 0; col < 9; col++) {
      let startNum = col * 10 +1; 
  
      
      for (let row = 0; row < 3; row++) {
        let number;
        
        if (col === 0) {

          do {
            number = Math.floor(Math.random() * 9) ;
          } while (usedNumbers.has(number));
        } else {

          do {
          
            number = Math.floor(Math.random() * 9) + startNum + row;
          } while (usedNumbers.has(number));
        }
  
        tambolaNumbers[row][col] = number;
        usedNumbers.add(number);
      }
    }
      tambolaNumbers.forEach((array) => {
            for(let i = 0; i < array.length; i++){
                const zeroCount = array.filter(num => num === 0).length;
                if(zeroCount >= 4) break
                const randomSet = new Set([])
                 randomSet.add(Math.floor(Math.random() * 9))
                 randomSet.forEach((val, ind) => array[val] = 0)
            }
                 
                
      })
    return tambolaNumbers;
  }

  module.exports = generateTambolaTickets