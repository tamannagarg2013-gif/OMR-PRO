let questionCounter = 1;

// Initialize Date
document.getElementById('displayDate').innerText = new Date().toLocaleDateString();

// Sync Header Inputs
document.getElementById('examNameInput').addEventListener('input', (e) => {
    document.getElementById('displayExamName').innerText = e.target.value.toUpperCase() || "EXAMINATION NAME";
});
document.getElementById('studentNameInput').addEventListener('input', (e) => {
    document.getElementById('displayStudentName').innerText = e.target.value.toUpperCase() || "_______________________";
});

// Function to generate the Roll Number Grid
function generateRollGrid() {
    const grid = document.getElementById('rollGrid');
    grid.innerHTML = '';
    const digits = 10; // Standard 10-digit roll number

    for (let i = 0; i < digits; i++) {
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
    // Color coding classes based on type
    sectionBlock.className = `section-block section-${type}`;
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    
    if (type === 'single') titleDiv.innerText = "Section I: Single Choice";
    else if (type === 'multi') titleDiv.innerText = "Section II: Multi Choice";
    else if (type === 'integer') titleDiv.innerText = "Section III: Numerical Value";
    else titleDiv.innerText = "Section IV: Matrix Match";
    
    sectionBlock.appendChild(titleDiv);

    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.className = 'q-row';

        const numSpan = document.createElement('div');
        numSpan.className = 'q-num';
        numSpan.innerText = String(questionCounter).padStart(2, '0');
        row.appendChild(numSpan);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

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
        } 
        else if (type === 'matrix') {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-container';
            ['A', 'B', 'C', 'D'].forEach(label => {
                const mRow = document.createElement('div');
                mRow.className = 'matrix-row';
                const s = document.createElement('span');
                s.className = 'matrix-label';
                s.innerText = label;
                mRow.appendChild(s);
                ['P', 'Q', 'R', 'S', 'T'].forEach(o => mRow.appendChild(createBubble(o)));
                matrixContainer.appendChild(mRow);
            });
            optionsDiv.appendChild(matrixContainer);
        } 
        else {
            ['A', 'B', 'C', 'D'].forEach(opt => optionsDiv.appendChild(createBubble(opt)));
        }

        row.appendChild(optionsDiv);
        sectionBlock.appendChild(row);
        questionCounter++;
    }
    container.appendChild(sectionBlock);
}

function createBubble(text) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.innerText = text;
    b.onclick = function() { this.classList.toggle('filled'); };
    return b;
}

function resetSheet() {
    if(confirm("Reset entire sheet?")) {
        document.getElementById('omrGrid').innerHTML = '';
        questionCounter = 1;
        generateRollGrid();
    }
}

// Load Roll Grid on Start
window.onload = generateRollGrid;
