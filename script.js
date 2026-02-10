let questionCounter = 1;

// Initialize Date
document.getElementById('displayDate').innerText = new Date().toLocaleDateString();

function generateRollGrid() {
    const grid = document.getElementById('rollGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const col = document.createElement('div');
        col.className = 'roll-col';
        for (let j = 0; j <= 9; j++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble roll-bubble';
            bubble.innerText = j;
            bubble.onclick = function() {
                col.querySelectorAll('.bubble').forEach(b => b.classList.remove('filled'));
                this.classList.add('filled');
            };
            col.appendChild(bubble);
        }
        grid.appendChild(col);
    }
}

function addQuestions() {
    const type = document.getElementById('qType').value;
    const count = parseInt(document.getElementById('qCount').value);
    const container = document.getElementById('omrGrid');

    const sectionBlock = document.createElement('div');
    sectionBlock.className = `section-block section-${type}`;
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    const titles = { 'single': 'Single Choice', 'multi': 'Multi Choice', 'integer': 'Numerical Value', 'matrix': 'Matrix Match' };
    titleDiv.innerText = titles[type] || "Section";
    sectionBlock.appendChild(titleDiv);

    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.className = 'q-row';

        const numSpan = document.createElement('div');
        numSpan.className = 'q-num';
        numSpan.innerText = String(questionCounter).padStart(2, '0') + ".";
        row.appendChild(numSpan);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-wrapper'; // Force horizontal

        if (type === 'integer') {
            const mainInput = document.createElement('input');
            mainInput.type = 'number';
            mainInput.className = 'main-int-input no-print';
            mainInput.placeholder = "Type...";
            
            const boxContainer = document.createElement('div');
            boxContainer.className = 'integer-box-container';

            mainInput.oninput = function() {
                boxContainer.innerHTML = ''; 
                for (let char of this.value) {
                    const box = document.createElement('div');
                    box.className = 'int-box-display';
                    box.innerText = char;
                    boxContainer.appendChild(box);
                }
            };
            optionsDiv.appendChild(mainInput);
            optionsDiv.appendChild(boxContainer);
        } else {
            const choices = ['A', 'B', 'C', 'D'];
            choices.forEach(opt => {
                const b = document.createElement('div');
                b.className = 'bubble';
                b.innerText = opt;
                b.onclick = function() { this.classList.toggle('filled'); };
                optionsDiv.appendChild(b);
            });
        }

        row.appendChild(optionsDiv);
        sectionBlock.appendChild(row);
        questionCounter++;
    }
    container.appendChild(sectionBlock);
}

window.onload = generateRollGrid;
