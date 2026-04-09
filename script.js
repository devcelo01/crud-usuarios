const form = document.getElementById("form");
const lista = document.getElementById("lista");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function renderizar() {
  lista.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${usuario.nome} - ${usuario.email}</span>
      <div>
        <button onclick="editar(${index})">✏️</button>
        <button onclick="deletar(${index})">🗑️</button>
      </div>
    `;

    lista.appendChild(li);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  // ✅ VALIDAÇÃO
  if (nome.trim() === "" || email.trim() === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!email.includes("@")) {
    alert("Por favor, insira um email válido.");
    return;
  }

  usuarios.push({ nome, email });

  salvarLocalStorage();
  renderizar();

  alert("Usuário salvo com sucesso!");

  form.reset();
});

function editar(index) {
  const usuario = usuarios[index];

  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;

  deletar(index);
}

function deletar(index) {
  if (confirm("Tem certeza que deseja excluir?")) {
    usuarios.splice(index, 1);
    salvarLocalStorage();
    renderizar();
  }
}

renderizar();