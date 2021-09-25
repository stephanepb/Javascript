//Functional sets

//para qualquer valor de x retorna false, indicando um conjunto vazio
const emptySet = x => false;

//cria um conjunto unitário, que possui um único elemento. É passado um parâmetro a e retorna uma função que recebe um x e por sua vez retorna se ele é igual a a 
const unit = a => x => x === a;
/*function unit(a){
        return x => x === a;
}

let xs = unit(1);
xs(1) = true -> o conjunto unitário possui apenas o valor 1
xs(0) = false
xs(2) = false */


const union = (xs, ys) => x => xs(x) || ys(x);
/* function union(xs, ys){
        return x => xs(x) || ys(x);
}*/

const inter = (xs, ys) => x => xs(x) && ys(x);
//devolve a intersecção, se um valor x está em ambos os conjuntos


const fromArray = ls => {
    let xs = emptySet;
    for (let x of ls) xs = union(unit(x), xs)
    return xs;
} // recebe um array e coloca os valores dele em um conjunto

//Exercício 1

/*(i) escreva uma função que recebe dois conjuntos funcionais xs e ys, que representam os conjuntos X e Y, respectivamente, e devolve um conjunto functional que representa o conjunto cujos elementos estão em X mas não estão em Y */
//const fromX = (xs, ys) => x => xs(x) && !ys(x);
function fromX(xs, ys){
    return x => xs(x) && !ys(x);
}

let a = [1, 2, 3, 4, 5];
let b = [1, 2, 4, 4, 5];
let d = fromArray(a);
let e = fromArray(b);
let zs = fromX(d, e);

console.log("Exercício 1.1: " + zs(1), zs(2), zs(3), zs(4), zs(5));

/*(ii) escreva uma função que recebe inteiros b e e tais que b <= e e devolve um conjunto functional que representa o conjunto{b, b+1, . . . , e−1} */
function cresc(b, e){
    let x = emptySet;
    while (b < e){
        x = union(unit(b), x);
        b++;
    }
    return x;
}

const f = cresc(1, 11);

console.log("Exercício 1.2: ")
for (let i=1; i<12; ++i){
    console.log(`${i}:${f(i)}`);
}

/*(iii) escreva uma versão da função do item (ii) usando a técnica de divisão e conquista. 

/*Exercício 2. Escreva uma função, usando conjuntos funcionais, que recebe
um array elems e devolve true se, e só se, os elementos de elems são dois
a dois distintos.*/

function distintos(elems){
    for (let i=0; i<elems.length; i++){
        if (elems[i] === elems[i+1]) return false;
    }
    return true;
}

console.log(distintos(b));