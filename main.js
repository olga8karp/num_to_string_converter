
/* Removing the output from the previous session on window reload */
window.onload = function(){
    document.getElementById("output").innerHTML = ""; 
}

/* Getting input, converting and displaying values */ 
document.getElementById("submit").addEventListener("click", function(){ 
    let number = document.getElementById("number").value;
    let language = document.querySelector('input[name="language"]:checked').value;
    let amountAsString;

    /* Checking if the value is out of range (in this case the program gets terminated and the window gets reloaded) */
    if (parseFloat(number) > 2147483647 || parseFloat(number) < 0 ||  typeof(parseFloat(number)) !== "number" || number === ""){
        alert("Please enter a number in the following range: 0 to 2147483647.")
        location.reload();
        throw new Error("Input value is out of range.");
    } 

    /* Checking the input and performing conversion based on the selected language */
    switch(language){
        case "Ukrainian": 
        number = parseFloat(number).toFixed(2);
        amountAsString = numberToUkrainian(number);
        number = parseFloat(number).toLocaleString('uk-UA');
        
        break;    

        case "English":
        number = parseFloat(number).toFixed(2);
        amountAsString = numberToEnglish(number);
        number = parseFloat(number).toLocaleString("en-US");
        break;

        default: 
        break;
    }
    document.getElementById("output").innerHTML = `Your amount as a number: <br> ${number} <br><br>The amount in the selected language and local currency: <br> ${amountAsString}`;
});

/* Converting a number into a string in English */

function numberToEnglish(n) {

    let string = n, decimal, 
        units, tens, scales, start, end, chunks, chunksLength, chunk, ints, i, word, words;
    
    decimal = string.split('.')[1];
    string = string.split('.')[0];

    /* Array of units as words */
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    /* Array of tens as words */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Array of scales as words */
    scales = ['', 'thousand', 'million', 'billion'];

  /* Splitting input value into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    chunksLength = chunks.length;

    /* Turning numbers in each chunk into strings */
    words = [];
    for (i = 0; i < chunksLength; i++) {

        chunk = parseInt(chunks[i]);

        if (chunk) {

            /* Splitting chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Adding scale word if chunk is not zero and array item exists */
            if (word = scales[i]) {
                words.push(word);
            }

            /* Adding unit word if array item exists */
            if (word = units[ints[0]]) {
                words.push(word);
            }

            /* Adding tens word if array item exists */
            if (word = tens[ints[1]]) {
                if (units[ints[0]] == 0){
                    words.push(word);
                } else {
                    words.push("-", word);
                }
            }

            /* Adding hundreds word if array item exists */
            if (word = units[ints[2]]) {
                words.push(word + ' hundred');
            }

        }

    }

  /* Decimals */
    start = decimal.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(decimal.slice((start = Math.max(0, start - 3)), end));
    }
    chunksLength = chunks.length;

    /* Turning numbers in each chunk into strings */
    dWords = [];
    for (i = 0; i < chunksLength; i++) {

        chunk = parseInt(chunks[i]);

        if (chunk) {

            /* Splitting chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Adding unit word if array item exists */
            if (word = units[ints[0]]) {
                dWords.push(word);
            }

            /* Adding tens word if array item exists */
            if (word = tens[ints[1]]) {
                if (units[ints[0]] == 0){
                    dWords.push(word);
                } else {
                    dWords.push("-", word);
                }
            }

        }

    }

    words = words.reverse().join(' ');
    dWords = dWords.reverse().join(' ');
    words = words.split(" - ");
    dWords = dWords.split(" - ");
    words = words.join("-");
    dWords = dWords.join("-");

    if (words == 0 && dWords == 0){
        words = "zero";
    }
    else if (words == "one" && dWords == "one"){
        words = "one dollar and one cent";
    }

    else if (words == "one" && dWords == 0){
        words = "One dollar";
    }

   else if (words == 0 && dWords.substring(dWords.length - 3) == "one"){
       words = dWords + " cent";
   }

   else if ((words.substring(words.length - 3) == "one" && dWords == 0)){
    words = words + " dollar";
   }

   else if ((words.substring(words.length - 3) == "one" && dWords == "one")){
    words = words + " dollar and one cent";
   }

   else if (words.substring(words.length - 3) == "one" && dWords.substring(dWords.length - 3) == "one"){
    words = words + " dollar and " + dWords + " cent";
   }

    else if (dWords == 0) {
        words = words + " dollars";
    }

    else if (dWords == "one"){
        words = words + " dollars and one cent";
    }

    else if (words == 0){
        words = dWords + " cents";
    }

    else if (words.substring(words.length - 3) == "one"){
        words = words + " dollar and " + dWords + " cents";
    }

    else if ((words.substring(words.length - 3) == "one")){
        words = words + " dollar and " + dWords + " cents";
    }

    else if ((dWords.substring(dWords.length - 3) == "one")){
        words = words + " dollars and " + dWords + " cent";
    }

    else {
        words = words + " dollars and " + dWords + " cents.";
    }
    return words;
}

/* Converting a number into a string in Ukrainian */

function numberToUkrainian(n) {

    let string = n, decimal,
        units, tens, hundreds, scales, scales2, scales3, start, end, chunks, chunksLength, chunk, ints, i, word, words;
    
    decimal = string.split('.')[1];
    string = string.split('.')[0];

    /* Array of units as words */
    units = ['', 'одна', 'дві', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять', 'десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п\'ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев\'ятнадцять'];

    /* Array of tens as words */
    tens = ['', '', 'двадцять', 'тридцять', 'сорок', 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев\'яносто'];

    /* Array of tens as words */
    hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот'];

    /* Array of scales as words */
    scales = ['', 'тисяча', 'мільйон', 'мільярд'];
    scales2 = ['', 'тисячі', 'мільйони', 'мільйярди'];
    scales3 = ['', 'тисяч', 'мільйонів', 'мільйядрів'];

    /* Splitting input value into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    chunksLength = chunks.length;


    /* Turning numbers in each chunk into strings */
    words = [];
    for (i = 0; i < chunksLength; i++) {

        chunk = parseInt(chunks[i]);

        if (chunk) {

            /* Splitting chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Adding scale word if chunk is not zero and array item exists */
            
            if (ints[0] === 1){
                if (word = scales[i]){
                    words.push(word);
                }
            }
            else if (ints[0] === 2 || ints[0] === 3 || ints[0] === 4){
                if (word = scales2[i]){
                    words.push(word);
                }
            }
            else {
                if (word = scales3[i]){
                    words.push(word);
                }
            }

            /* Adding unit word if array item exists */
            if (word = units[ints[0]]) {
                words.push(word);
            } 

            /* Adding tens word if array item exists */
            if (word = tens[ints[1]]) {
                words.push(word);
            }

            /* Adding hundreds word if array item exists */
            if (word = hundreds[ints[2]]) {
                words.push(word);
            }
        }  
    }
    

    /* Decimals */

     /* Splitting input value into 3 digit chunks from right to left */
     start = decimal.length;
     chunks = [];
     while (start > 0) {
         end = start;
         chunks.push(decimal.slice((start = Math.max(0, start - 3)), end));
     }
     chunksLength = chunks.length;
 
 
     /* Turning numbers in each chunk into strings */
     dWords = [];
     for (i = 0; i < chunksLength; i++) {
 
         chunk = parseInt(chunks[i]);
 
         if (chunk) {
 
             /* Splitting chunk into array of individual integers */
             ints = chunks[i].split('').reverse().map(parseFloat);
 
             /* If tens integer is 1, i.e. 10, then add 10 to units integer */
             if (ints[1] === 1) {
                 ints[0] += 10;
             }
 
             /* Adding unit word if array item exists */
             if (word = units[ints[0]]) {
                 dWords.push(word);
             } 
 
             /* Adding tens word if array item exists */
             if (word = tens[ints[1]]) {
                 dWords.push(word);
             }
 
         }
 
     }


    /* Displaying the whole string */
    
    dWords = dWords.reverse();
    words = words.reverse();

    if(words.length == 0 && dWords.length == 0){
        words = "нуль";
    }
    else if(words[words.length - 1] == "одна"){
        words = words.join(' ') + " гривня " + dWords.join(' ');
    } 
    else if(words[words.length - 1] == "дві" || words[words.length - 1] == "три" || words[words.length - 1] == "чотири"){
        words = words.join(' ') + " гривні " + dWords.join(' ');
    } 
    else if (words.length == 0){
    words = dWords.join(' ');
    }
    else {
        words = words.join(' ') + " гривень " + dWords.join(' ');
    }

    if (dWords[dWords.length - 1] == "одна"){
        words += " копійка";
    }
    else if (dWords[dWords.length - 1] == "дві" || dWords[dWords.length - 1] == "три" || dWords[dWords.length - 1] == "чотири" ){
        words += " копійки";
    }
    else if (dWords.length != 0) {
        words += " копійок";
    }

    /* Cutom corrections of values tha could not be set properly with the algorythm */
    if (words.indexOf("одна мільйон") != -1){
        words = words.replace("одна мільйон", "один мільйон");
    }

    if (words.indexOf("одна мільярд") != -1){
        words = words.replace("одна мільярд", "один мільярд");
    }

    if (words.indexOf("дві мільйони") != -1){
        words = words.replace("дві мільйони", "два мільйони");
    }

    if (words.indexOf("дві мільйярди") != -1){
        words = words.replace("дві мільйярди", "два мільйярди");
    }

    return words;
}