/**Num multiconjunto podem haver várias cópias de um mesmo elemento. O número de cópias de um elemento é chamado de multiplicidade do elemento. Escreva uma função que recebe uma função que implementa a noção de igualdade entre os elementos que habitarão o multiconjunto, de forma similar a que fizemos com conjuntos, e devolve um objeto que representa um multiconjunto. Inspire-se na  implementação que fizemos para escrever versões análogas para multiconjuntos dos métodos definidos para conjuntos. Adicione quaisquer métodos que julgar necessário.  */

function makeMultiSet(eqFn, ...es){ 
    const elements = [];
    const obj = {
        size: function() { return elements.length },
        add: function(x){
            for (const e of elements) {
                if (eqFn(e[0], x)){ 
                    e[1] += 1;
                    return;
                }
            }
            elements.push([x, 1]);
        },
        remove:function(x){
            let i;
            for (i = 0; i< obj.size() && !eqFn(elements[i][0], x); ++i);
            if (i == obj.size()) return;
            else if (elements[i][1] > 1) {
                elements[i][1] -= 1;
                return;
            }

            elements[i] = elements[obj.size() - 1];
            elements.pop();
        },
        contains: function(x) {
            for (const e of elements)
                if (eqFn(e[0], x)) return true;
            return false;
        },
        subsetOf: function(other) {
            for (const e of elements)
                if (!other.contains(e[0])) return false;
            return true;
        },
        equals: function(other){
            return  obj.subsetOf(other) && other.subsetOf(obj);
        },
        print: function(){
            for (const e of elements){
                console.log(e[0], e[1]);
            }
        }
    }
    for (const e of es) obj.add(e);
    return obj;
}

const set = makeMultiSet((x, y) => x === y, 1, 2, 3, 1);

set.print();

set.remove(1);
set.remove(2);

console.log(set.size());
set.print();

console.log(set.contains(3));
console.log(set.contains(5));

const other = makeMultiSet((x, y) => x === y, 1, 4, 2, 3, 5, 6);
console.log(set.subsetOf(other));
console.log(other.subsetOf(set));

set.equals(other);