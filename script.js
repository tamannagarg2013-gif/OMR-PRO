let questionCounter = 1;

// Initialize Header Data
document.getElementById('displayDate').innerText = new Date().toLocaleDateString();

// Sync Header Inputs
document.getElementById('examNameInput').addEventListener('input', (e) => {
    document.getElementById('displayExamName').innerText = e.target.value.toUpperCase() || "EXAMINATION NAME";
});
document.getElementById('studentNameInput').addEventListener('input', (e) => {
    document.getElementById('displayStudentName').innerText = e.target.value.toUpperCase() || "_______________________";
});

function addQuestions() {
    const type = document.getElementById('qType').value;
    const count = parseInt(document.getElementById('qCount').value);
    const container = document.getElementById('omrGrid');

    const sectionBlock = document.createElement('div');
    sectionBlock.className = 'section-block';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    titleDiv.innerText = type === 'integer' ? "Numerical Value Section" : "Multiple Choice Section";
    sectionBlock.appendChild(titleDiv);

    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.className = 'q-row';

        const numSpan = document.createElement('div');
        numSpan.className = 'q-num';
        numSpan.innerText = questionCounter + ".";
        row.appendChild(numSpan);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        if (type === 'integer') {
            // Main input for the user to type the full number
            const mainInput = document.createElement('input');
            mainInput.type = 'number';
            mainInput.className = 'main-int-input no-print';
            mainInput.placeholder = "Type number...";

            // Container for the individual printed boxes
            const boxContainer = document.createElement('div');
            boxContainer.className = 'integer-box-container';

            // Sync boxes with input
            mainInput.addEventListener('input', function() {
                boxContainer.innerHTML = ''; // Clear old boxes
                const valStr = this.value.toString();
                
                // Create a box for every digit typed
                for (let char of valStr) {
                    const box = document.createElement('div');
                    box.className = 'int-box-display';
                    box.innerText = char;
                    boxContainer.appendChild(box);
                }
            });

            optionsDiv.appendChild(mainInput);
            optionsDiv.appendChild(boxContainer);

        } else if (type === 'matrix') {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-container';
            ['A', 'B', 'C', 'D'].forEach(rowLabel => {
                const mRow = document.createElement('div');
                mRow.className = 'matrix-row';
                const label = document.createElement('span');
                label.className = 'matrix-label';
                label.innerText = rowLabel;
                mRow.appendChild(label);
                ['P', 'Q', 'R', 'S', 'T'].forEach(opt => mRow.appendChild(createBubble(opt)));
                matrixContainer.appendChild(mRow);
            });
            optionsDiv.appendChild(matrixContainer);
        } else {
            ['A', 'B', 'C', 'D'].forEach(opt => optionsDiv.appendChild(createBubble(opt)));
        }

        row.appendChild(optionsDiv);
        sectionBlock.appendChild(row);
        questionCounter++;
    }
    container.appendChild(sectionBlock);
}

function createBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = text;
    bubble.addEventListener('click', function() { this.classList.toggle('filled'); });
    return bubble;
}

function resetSheet() {
    if(confirm("Clear sheet?")) {
        document.getElementById('omrGrid').innerHTML = '';
        questionCounter = 1;
    }
}
