import React, { useState } from 'react';
import { User } from '../types';
import { validateNewPassword, verifyPassword, withNewPassword } from '../services/passwordService';
import { KeyRound, Eye, EyeOff, AlertCircle, LogOut, CheckCircle2 } from 'lucide-react';

interface ForcePasswordChangeProps {
  user: User;
  onPasswordChanged: (updatedUser: User) => void;
  onLogout: () => void;
}

// Exibida no lugar do sistema enquanto o usuário ainda usa a senha antiga/padrão ou provisória
export const ForcePasswordChange: React.FC<ForcePasswordChangeProps> = ({ user, onPasswordChanged, onLogout }) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const problema = validateNewPassword(novaSenha, user.email);
    if (problema) return setErro(problema);
    if (novaSenha !== confirmacao) return setErro('As senhas digitadas não coincidem.');
    if (await verifyPassword(user, novaSenha)) return setErro('A nova senha precisa ser diferente da atual.');

    setSalvando(true);
    onPasswordChanged(await withNewPassword(user, novaSenha));
  };

  const regras = [
    { ok: novaSenha.length >= 8, texto: 'Pelo menos 8 caracteres' },
    { ok: /[A-Za-z]/.test(novaSenha) && /[0-9]/.test(novaSenha), texto: 'Letras e números' },
    { ok: novaSenha.length > 0 && novaSenha === confirmacao, texto: 'As duas senhas iguais' }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 font-sans text-[#172B4D]">
      <div className="bg-white w-full max-w-md rounded-lg border border-[#CBD5E1] shadow-sm overflow-hidden">
        <div className="bg-[#123768] text-white p-5 flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-md border border-white/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base">Crie a sua senha pessoal</h1>
            <p className="text-xs text-slate-300">Olá, {user.nome.split(' ')[0]}. Por segurança, defina uma senha antes de continuar.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <p className="text-[#475569]">
            {user.precisaTrocarSenha
              ? 'Você entrou com uma senha provisória definida pelo administrador.'
              : 'Sua conta ainda usa a senha padrão do sistema, que não é segura.'}{' '}
            A nova senha fica criptografada: nem os administradores conseguem vê-la.
          </p>

          {erro && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] rounded-md flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" /> {erro}
            </div>
          )}

          <div>
            <label className="block font-bold mb-1">Nova senha *</label>
            <div className="relative">
              <input
                type={mostrar ? 'text' : 'password'}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full pr-10 p-2.5 bg-white border border-[#CBD5E1] rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
              />
              <button type="button" onClick={() => setMostrar(!mostrar)} className="absolute right-3 top-2.5 text-slate-400 hover:text-[#475569] cursor-pointer" title={mostrar ? 'Ocultar' : 'Mostrar'}>
                {mostrar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Confirmar nova senha *</label>
            <input
              type={mostrar ? 'text' : 'password'}
              value={confirmacao}
              onChange={(e) => setConfirmacao(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full p-2.5 bg-white border border-[#CBD5E1] rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
            />
          </div>

          <ul className="space-y-1">
            {regras.map(r => (
              <li key={r.texto} className={`flex items-center ${r.ok ? 'text-[#047857]' : 'text-[#475569]'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${r.ok ? '' : 'opacity-40'}`} /> {r.texto}
              </li>
            ))}
          </ul>

          <button
            type="submit"
            disabled={salvando}
            className="w-full py-3 font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition cursor-pointer disabled:opacity-60"
          >
            {salvando ? 'Salvando…' : 'Salvar senha e continuar'}
          </button>

          <button type="button" onClick={onLogout} className="w-full inline-flex items-center justify-center text-[#475569] hover:text-[#172B4D] cursor-pointer">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sair
          </button>
        </form>
      </div>
    </div>
  );
};
