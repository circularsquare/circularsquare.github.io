const offsetTop = 120;
const offsetLeft = 70;
const cellSize = 25;
const container = document.getElementById("wrapper")
console.log(container);

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const data = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
]

for (const [i, ci] of alphabet.entries()){
    for (const [j, cj] of alphabet.entries()){
        for (const [k, ck] of alphabet.entries()){
            const div = document.createElement('div');
            div.innerText = ci + cj + ck;
            div.style.position = 'fixed';
            div.style.top = `${i * cellSize + k * cellSize*26 + offsetTop}px`;
            div.style.left = `${j * cellSize + offsetLeft}px`;

            container.appendChild(div);
        }
        
    }
}

