const inputTarefa = document.querySelector('.input-nova-tarefa')
const btnTarefa = document.querySelector('.btn-add-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li');
    return li;
};

// função para capturar a tecla enter e criar tarefa
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
});

//função para limpar input e deixar cursor para a proxima tarefa
function limpaInput () {
    inputTarefa.value = '';
    inputTarefa.focus(); // cursor
};

function criaBotaoApagar(li) {
    li.innerText += ' '; // espaço
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Delete task';
    //botaoApagar.classList.add('apagar'); criar class para o botão
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'click to delete task'); //titulo aparece quando paro com o cursor em cima
    li.appendChild(botaoApagar);
};

function criaTarefa (textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li)
    salvarTarefas();
};

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
});

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas(); // chamo essa função para apagar a tarefa salva no navegador
    }
});

function salvarTarefas () {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Delete task', '').trim(); 
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //stringify converte um elemento JS para uma string no formato JSON
    localStorage.setItem('tarefas', tarefasJSON); // salva em JSON no mini banco de dados do navegador
}

function adicionaTarefasSalvas () {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); // com o parse estamos retonando para um objeto JS

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
