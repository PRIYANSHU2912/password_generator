const scan = document.querySelector('#copy');
let input = document.querySelector('.password');
const additional = document.querySelector('.copy');

scan.addEventListener('click', function () {
    if (input.value === "") {
        additional.classList.add("active");
        additional.textContent = 'Can not be copied';
        additional.style.left = "43.5rem";
        additional.style.top = "5.8rem";
        setTimeout(function () {
            additional.classList.remove("active");
        }, 1500);
    }
    else {
        copyContent();
    }
});


async function copyContent() {
    try {
        await navigator.clipboard.writeText(input.value);
        additional.classList.add("active");
        additional.textContent = 'Copied!';
        additional.style.top = "5.8rem";
        additional.style.left = "45.8rem";
        setTimeout(function () {
            additional.classList.remove("active");
        }, 1500);

    }
    catch (error) {
        console.log("Error Generated");
    }
}

let slider = document.querySelector(".slider");
let password_length = document.querySelector(".num");
let num = parseInt(password_length.textContent);

slider.addEventListener('input', function (e) {
    num = e.target.value;
    password_length.textContent = `${num}`;
});

let circle = document.querySelector(".circle");

let uppercase = document.querySelector("#check1");
let lowercase = document.querySelector("#check2");
let number = document.querySelector("#check3");
let symbol = document.querySelector("#check4");

let count = 0;
function checkboxes() {
    count = 0;
    check.forEach(function (item) {
        if (item.checked) {
            count++;
        }
    });
    countcheck();

    if (count === 4) {
        circle.style.backgroundColor = "green";
        circle.style.boxShadow = "1px 1px 15px green";
    }
    else if (count === 3) {
        circle.style.backgroundColor = "orange";
        circle.style.boxShadow = "1px 1px 15px orange";
    }
    else if (count === 2) {
        circle.style.backgroundColor = "yellow";
        circle.style.boxShadow = "1px 1px 15px yellow";
    }
    else if (count === 1) {
        circle.style.backgroundColor = "red";
        circle.style.boxShadow = "1px 1px 15px red";
    }
    else {
        circle.style.backgroundColor = "white";
        circle.style.boxShadow = "1px 1px 15px white";
    }

}

function countcheck() {
    if (count > num) {
        num = count;
        slider.value = count;
        password_length.textContent = `${num}`;
    }
}

let symbolic_form = ',./?!@#$%^&*()_+-={}|';

function mathgenerator(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;
}

function generateuppercase() {
    return String.fromCharCode(mathgenerator(65, 91));
}

function generatelowercase() {
    return String.fromCharCode(mathgenerator(97, 123));
}

function generatenumber() {
    return mathgenerator(0, 9);
}

function generatesymbol() {
    return symbolic_form.charAt(mathgenerator(0, symbolic_form.length));

}

let check = document.querySelectorAll(".check");
check.forEach(function (item) {
    item.addEventListener('change', checkboxes);   //forEach() loop then inside in its function (item) the item variable holds the each individual items in that particular slot
});
function numericfunc() {
    let numeric = Math.floor((Math.random() * 10));
    return numeric;
}

let button = document.querySelector(".submain4");
let i = 0;

button.addEventListener('click', function () {
    let yourpassword = "";
    input.value = "";
    if (count === 0) {
        return;
    }
    else if (count > num) {
        countcheck();
    }
    else {
        let arr = [];
        if (uppercase.checked) {
            arr.push(generateuppercase);
        }
        if (lowercase.checked) {
            arr.push(generatelowercase);
        }
        if (number.checked) {
            arr.push(generatenumber);
        }
        if (symbol.checked) {
            arr.push(generatesymbol);
        }

        for (let i = 0; i < arr.length; i++) {
            yourpassword += arr[i]();
        }

        for (let i = 0; i < num - arr.length; i++) {
            let newnum = mathgenerator(0, arr.length - 1);
            yourpassword += arr[newnum]();
        }

        yourpassword = shuffleyourpassword(Array.from(yourpassword));
        input.value = yourpassword;

        checkboxes();
    }
});


function shuffleyourpassword(array) {
    for (let i = 0; i < array.length; i++) {
        let temp;
        let newnum = mathgenerator(0, array.length - 1);
        temp = array[i];
        array[i] = array[newnum];
        array[newnum] = temp;
    }
    let character = "";
    array.forEach(function (item) {
        character += item;
    });
    return character;
}