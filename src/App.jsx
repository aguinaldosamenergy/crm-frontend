import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// 1. Importe o 'db' do nosso novo arquivo de configuração e as funções do Firestore.
import { db } from './firebase/config.js'; 
import { collection, addDoc } from "firebase/firestore"; 

function App() {
  const [count, setCount] = useState(0);

  // 2. Crie uma função assíncrona para adicionar um contato de teste.
  const handleAddContact = async () => {
    try {
      // Tenta adicionar um novo documento na coleção "contacts"
      const docRef = await addDoc(collection(db, "contacts"), {
        name: "Contato de Teste",
        email: "teste@exemplo.com",
        createdAt: new Date()
      });
      // Se for bem-sucedido, mostra um alerta de sucesso
      alert("Contato de teste adicionado com sucesso! ID do Documento: " + docRef.id);
    } catch (e) {
      // Se falhar, mostra o erro no console do navegador e um alerta de falha
      console.error("Erro ao adicionar documento: ", e);
      alert("Falha ao adicionar contato. Verifique o console do navegador para detalhes.");
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nosso CRM Incrível</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        {/* 3. Adicione o nosso novo botão para chamar a função de teste. */}
        <button onClick={handleAddContact} style={{ marginLeft: '10px' }}>
          Adicionar Contato no Firestore
        </button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
