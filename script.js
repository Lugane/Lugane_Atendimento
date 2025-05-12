// Firebase SDK (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbYPpH8kBvd3w0G99xrlsqcvJ51OyItS4",
  authDomain: "lugane-estoque-a76a6.firebaseapp.com",
  databaseURL: "https://lugane-estoque-a76a6-default-rtdb.firebaseio.com",
  projectId: "lugane-estoque-a76a6",
  storageBucket: "lugane-estoque-a76a6.appspot.com",
  messagingSenderId: "218820542563",
  appId: "1:218820542563:web:5c39fe1643bdb6cfed7856"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const atendimentosRef = ref(db, 'atendimentos');

// Função para salvar atendimento
window.salvarAtendimento = function () {
  const nome = document.getElementById('nomeAtend').value.trim();
  const descricao = document.getElementById('descricaoAtend').value.trim();
  const data = document.getElementById('dataAtend').value;
  const empresa = document.getElementById('empresaAtend').value.trim();

  if (!nome || !descricao || !data || !empresa) {
    alert("Preencha todos os campos do atendimento.");
    return;
  }

  const novaRef = push(atendimentosRef);
  set(novaRef, {
    nome,
    descricao,
    data,
    empresa
  }).then(() => {
    alert("Atendimento salvo com sucesso!");
    document.getElementById('nomeAtend').value = '';
    document.getElementById('descricaoAtend').value = '';
    document.getElementById('dataAtend').value = '';
    document.getElementById('empresaAtend').value = '';
  }).catch((error) => {
    alert("Erro ao salvar atendimento: " + error.message);
  });
};

// Função para exibir atendimentos
onValue(atendimentosRef, (snapshot) => {
  const tbody = document.getElementById('tabela-atendimentos');
  tbody.innerHTML = '';

  snapshot.forEach((child) => {
    const item = child.val();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.descricao}</td>
      <td>${formatarDataBR(item.data)}</td>
      <td>${item.empresa}</td>
    `;
    tbody.appendChild(tr);
  });
});

// Formata data para formato BR
function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  const partes = dataISO.split('-');
  if (partes.length !== 3) return dataISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
