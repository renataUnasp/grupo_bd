function carregarAutores() {
    fetch("/api/autores")
    .then(response => response.json())
    .then(autores => {
      const autorSelect = document.getElementById("autor");
      autores.forEach(autor => {
        const option = document.createElement("option");
        option.value = autor.id;
        option.textContent = autor.nome;
        autorSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar autores:", error));
  }
  
  function carregarEditoras() {
    fetch("/api/editoras")
    .then(response => response.json())
    .then(editoras => {
      const editoraSelect = document.getElementById("editora");
      editoras.forEach(editora => {
        const option = document.createElement("option");
        option.value = editora.id;
        option.textContent = editora.nome;
        editoraSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar editoras:", error));
  }

function displayLivros(livros) {
    const tbody = document.getElementById("listaLivros");
    tbody.innerHTML = ""; // Limpar a tabela

    livros.forEach(livro => {
        const row = tbody.insertRow();

        const tituloCell = row.insertCell(0);
        tituloCell.textContent = livro.titulo;

        const autorCell = row.insertCell(1);
        autorCell.textContent = livro.autor;

        const dataCell = row.insertCell(2);
        dataCell.textContent = new Date(livro.dataPublicacao).toLocaleDateString();

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button class="icon-btn" onclick='editarLivro(${JSON.stringify(livro)})'>
        <i class="fas fa-edit"></i> Editar
    </button>
    <button class="icon-btn" onclick="deleteLivro(${livro.id})">
    <i class="fas fa-trash"></i> Excluir
    </button>`;
    });
}

function fetchLivros() {
    fetch("/api/livros")
        .then(res => res.json())
        .then(data => {
            displayLivros(data);
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
        });
}

function deleteLivro(id) {
    fetch(`/api/livros/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        fetchLivros();
    })
    .catch(error => {
        console.error("Erro ao deletar livro:", error);
    });
}

function editarLivro(livro) {
    const addBookBtn = document.getElementById("addBookBtn");
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");
    const dataPublicacao = document.getElementById("dataPublicacao");
    const livroId= document.getElementById("id_livro");
    titulo.value = livro.titulo;
    autor.value = livro.autor;
    dataPublicacao.value = new Date(livro.dataPublicacao).toISOString().split('T')[0];
    livroId.value = livro.id;
    addBookBtn.click();
/**/
}

function limparFormulario(){
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");
    const dataPublicacao = document.getElementById("dataPublicacao");
    const livroId= document.getElementById("id_livro");

    titulo.value = "";
    autor.value = "";
    dataPublicacao.value = "";
    livroId.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    carregarAutores();
    carregarEditoras();
    const apiUrl = "/api/livros";
    const bookForm = document.getElementById("bookForm");
    const bookPopup = document.getElementById("bookPopup");
    const addBookBtn = document.getElementById("addBookBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Carregar livros ao carregar a página
    fetchLivros()

    // Mostrar popup ao clicar no botão "Adicionar Livro"
    addBookBtn.addEventListener("click", function() {
        bookPopup.classList.add("show");
        bookPopup.classList.remove("hidden");
    });

    // Fechar popup
    closePopupBtn.addEventListener("click", function() {
        bookPopup.classList.add("hidden");
        bookPopup.classList.remove("show");
        limparFormulario();
    });

    // Adicionar novo livro ou atualizar um existente
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const dataPublicacao = document.getElementById("dataPublicacao").value;
        const livroId= document.getElementById("id_livro").value;

        let methodSalvar = "POST";
        let apiUrlSalvar = apiUrl;
        if(livroId != "" && livroId > 0){
            methodSalvar = "PUT";
            apiUrlSalvar += "/" + livroId;
        }
    
        fetch(apiUrlSalvar, {
            method: methodSalvar,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, autor, dataPublicacao })
        })
        .then(res => {
            if (res.ok && res.status == "201") return res.json();
            else if (res.ok && res.status == "204") return;
            throw new Error(res.statusText);
        })
        .then(data => {
            fetchLivros();
            limparFormulario();
            closePopupBtn.click();
        })
        .catch(error => {
            console.error("Erro ao adicionar/atualizar livro:", error);
        });
    
    });
});
