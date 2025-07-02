import React, { useState } from 'react';
import './Login.css';

// Importa as ferramentas de autenticação do Firebase
import { auth } from '../../firebase/config.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  // Estados para guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para feedback visual
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError('');
    setLoading(true);

    try {
      // Tenta fazer o login no Firebase com as credenciais fornecidas
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      alert("Login realizado com sucesso! Bem-vindo, " + user.email);
      // Futuramente, redirecionaremos para o dashboard aqui

    } catch (err) {
      // Se o Firebase der um erro (senha errada, etc.)
      setError("Falha no login. Verifique seu e-mail e senha.");
    } finally {
      // Garante que o estado de carregamento seja desativado
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login do CRM</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {/* Mostra a mensagem de erro, se houver */}
        {error && <p className="error-message">{error}</p>}

        {/* O botão fica desabilitado e mostra "Entrando..." durante o carregamento */}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;