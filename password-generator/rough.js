function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function generatePassword(length, numAllowed, charAllowed){
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*"

    for(let i =0;i<length;i++){
        let randomNum = randomNumber(0, str.length);
        password += str.charAt(randomNum);
    }

    return password;
}

console.log(generatePassword(16, true, true));