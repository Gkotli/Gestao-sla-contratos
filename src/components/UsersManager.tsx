import React, { useState } from 'react';
import { Sector, Supplier, User, UserRole } from '../types';
import { downloadFullBackup } from '../services/exportService';
import { UserPlus, Download, KeyRound, ShieldCheck, Mail, Building2, User as UserIcon, Trash2, Edit3, Lock, CheckCircle2, Send, Clock } from 'lucide-react';

interface UsersManagerProps {
  users: User[];
  sectors: Sector[];
  suppliers: Supplier[];
  currentUser: User | null;
  // true = usuários em public.profiles e login pelo Supabase Auth
  remote: boolean;
  // Retorna false quando o salvamento falhou (o formulário continua aberto)
  onSaveUser: (user: User, isNew: boolean, senhaProvisoria?: string) => Promise<boolean> | void;
  onDeleteUser: (user: User) => void;
  // Alternativa ao e-mail: cria o login ou troca a senha com uma senha provisória
  onSetTemporaryPassword?: (user: User, senhaProvisoria: string) => void;
  // Troca de sessão sem senha: só existe no modo local de demonstração
  onSelectUser?: (user: User) => void;
}

// Senha provisória legível (sem caracteres que confundem, como 0/O e 1/l)
function gerarSenhaProvisoria(): string {
  const letras = 'abcdefghjkmnpqrstuvwxyz', numeros = '23456789';
  const sortear = (chars: string, n: number) => Array.from(crypto.getRandomValues(new Uint32Array(n)), v => chars[v % chars.length]).join('');
  return `Sla-${sortear(letras, 4)}${sortear(numeros, 4)}`;
}

export const UsersManager: React.FC<UsersManagerProps> = ({
  users,
  sectors,
  suppliers,
  currentUser,
  remote,
  onSaveUser,
  onDeleteUser,
  onSetTemporaryPassword,
  onSelectUser
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [senhaProvisoria, setSenhaProvisoria] = useState('');
  const [role, setRole] = useState<UserRole>('GESTOR');
  const [setorId, setSetorId] = useState(sectors[0]?.id || '');
  const [fornecedorId, setFornecedorId] = useState(suppliers[0]?.id || '');

  const openNewModal = () => {
    setEditingUser(null);
    setSenhaProvisoria('');
    setNome('');
    setEmail('');
    setCargo('Gestor Hospitalar');
    setRole('GESTOR');
    setSetorId(sectors[0]?.id || '');
    setFornecedorId(suppliers[0]?.id || '');
    setIsModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setSenhaProvisoria('');
    setNome(u.nome);
    setEmail(u.email);
    setCargo(u.cargo);
    setRole(u.role);
    setSetorId(u.setorId || (sectors[0]?.id || ''));
    setFornecedorId(u.fornecedorId || (suppliers[0]?.id || ''));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaProvisoria && (senhaProvisoria.length < 8 || !/[A-Za-z]/.test(senhaProvisoria) || !/[0-9]/.test(senhaProvisoria))) {
      alert('A senha provisória deve ter pelo menos 8 caracteres, com letras e números.');
      return;
    }

    const userData: User = {
      id: editingUser?.id || `user_${Date.now()}`,
      nome,
      email: email.trim().toLowerCase(),
      cargo,
      role,
      // Diretoria pode ter setor de origem (ex.: sec_diretoria): preserva ao editar
      setorId: role === 'GESTOR' ? setorId : (role === 'DIRETORIA' ? editingUser?.setorId : undefined),
      fornecedorId: role === 'FORNECEDOR' ? fornecedorId : undefined,
      acessoAtivo: editingUser?.acessoAtivo
    };

    setSaving(true);
    const ok = await onSaveUser(userData, !editingUser, senhaProvisoria || undefined);
    setSaving(false);
    if (ok !== false) setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#172B4D]">Gestão de Usuários & Logins de Acesso</h2>
          <p className="text-xs text-[#475569]">Cadastre gestores hospitalares e defina permissões individuais com criptografia de dados</p>
        </div>

        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              const { total } = downloadFullBackup(users);
              alert(`Backup gerado com ${total} registros. Guarde o arquivo em uma pasta segura da rede (ele contém dados pessoais).`);
            }}
            title="Baixa uma cópia completa dos dados (usuários, setores, fornecedores, avaliações e planos)"
            className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-[#123768] bg-white hover:bg-slate-50 border border-[#CBD5E1] rounded-md shadow-sm transition cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Backup
          </button>
          <button
            onClick={openNewModal}
            className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Novo Usuário
          </button>
        </div>
      </div>

      {/* Aviso de Segurança e Privacidade LGPD */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-lg flex items-center space-x-3 text-xs text-[#047857]">
        <ShieldCheck className="w-6 h-6 text-[#047857] flex-shrink-0" />
        <div>
          <strong className="font-bold block text-[#047857]">Proteção de Privacidade & LGPD:</strong>
          <span>
            {remote
              ? 'O sistema não armazena senhas. No primeiro acesso, a pessoa clica em "Primeiro acesso ou esqueci a senha" no login e recebe no próprio e-mail o link para criar a senha; ninguém (nem os administradores) tem acesso a ela. A Diretoria não recebe e-mails de aviso.'
              : 'Modo local de demonstração: não há senhas e os dados ficam apenas neste navegador.'}
          </span>
        </div>
      </div>

      {/* Troca Rápida de Sessão Demo (apenas modo local) */}
      {onSelectUser && (
      <div className="bg-slate-50 p-5 rounded-lg shadow-sm border border-[#CBD5E1] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-[#123768]" />
            <h3 className="font-bold text-sm text-[#172B4D]">Alternar Sessão Ativa de Usuário</h3>
          </div>
          <span className="text-xs text-[#475569]">Selecione o usuário autenticado</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {users.map(u => {
            const isSelected = currentUser?.id === u.id;
            return (
              <button
                key={u.id}
                onClick={() => onSelectUser(u)}
                className={`p-3 rounded-md border text-left transition flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-[#047857] shadow-md ring-2 ring-[#047857]/20 text-[#172B4D]'
                    : 'bg-white border-[#CBD5E1] text-[#172B4D] shadow-sm hover:border-[#123768] hover:shadow-md'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                    u.role === 'DIRETORIA' ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]' :
                    u.role === 'GESTOR' ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]' :
                    'bg-[#FFFBEB] text-[#92400E] border-[#FCD34D]'
                  }`}>
                    {u.role}
                  </span>
                  <p className="font-bold text-xs mt-1.5 truncate text-[#172B4D]">{u.nome}</p>
                  <p className="text-[11px] text-[#475569] truncate">{u.email}</p>
                </div>

                {isSelected && (
                  <span className="mt-2 text-[10px] font-bold bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded flex items-center w-fit">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-[#047857]" /> Logado Agora
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* Grid de Lista de Usuários Cadastrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => {
          const sector = sectors.find(sec => sec.id === u.setorId);
          const supplier = suppliers.find(sup => sup.id === u.fornecedorId);

          return (
            <div key={u.id} className="bg-white rounded-lg shadow-sm border border-[#CBD5E1] overflow-hidden flex flex-col justify-between">
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      u.role === 'DIRETORIA' ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]' :
                      u.role === 'GESTOR' ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]' :
                      'bg-[#FFFBEB] text-[#92400E] border-[#FCD34D]'
                    }`}>
                      {u.role === 'DIRETORIA' ? 'Diretoria Operacional (Admin)' :
                       u.role === 'GESTOR' ? 'Gestor de Setor Hospitalar' :
                       'Preposto Fornecedor'}
                    </span>
                    <h3 className="font-bold text-[#172B4D] text-base pt-1">{u.nome}</h3>
                    <p className="text-xs text-[#475569]">{u.cargo}</p>
                  </div>

                  <div className="p-2.5 bg-slate-100 text-[#172B4D] rounded-md">
                    <UserIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#475569] pt-2 border-t border-[#CBD5E1]">
                  <div className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Email: <strong className="text-[#172B4D]">{u.email}</strong></span>
                  </div>
                  {remote && (
                    <div className="flex items-center text-[#475569]">
                      {u.acessoAtivo ? (
                        <>
                          <Lock className="w-3.5 h-3.5 mr-2 text-emerald-600" />
                          <span>Login: <strong className="text-[#047857]">ativo</strong></span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 mr-2 text-amber-500" />
                          <span>Login: <strong className="text-[#92400E]">aguardando primeiro acesso</strong></span>
                        </>
                      )}
                    </div>
                  )}
                  {u.role === 'GESTOR' && sector && (
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>Setor: <strong className="text-[#172B4D]">{sector.nome}</strong></span>
                    </div>
                  )}
                  {u.role === 'FORNECEDOR' && supplier && (
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>Fornecedor: <strong className="text-[#172B4D]">{supplier.nomeFantasia}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-[#CBD5E1] flex items-center justify-between">
                {onSelectUser ? (
                  <button
                    onClick={() => onSelectUser(u)}
                    className="px-3 py-1.5 text-xs font-bold text-[#172B4D] bg-white border border-[#CBD5E1] hover:bg-slate-100 rounded-md transition"
                  >
                    Entrar como este Usuário
                  </button>
                ) : onSetTemporaryPassword ? (
                  <button
                    onClick={() => {
                      const senha = window.prompt(
                        `${u.acessoAtivo ? 'Nova senha provisória' : 'Senha provisória para criar o acesso'} de ${u.nome}.\n\nUse só se o link por e-mail não chegar. Copie e entregue à pessoa; no primeiro acesso ela criará a própria senha.`,
                        gerarSenhaProvisoria()
                      );
                      if (senha) onSetTemporaryPassword(u, senha.trim());
                    }}
                    title="Alternativa ao e-mail: define uma senha provisória"
                    className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-[#172B4D] bg-white border border-[#CBD5E1] hover:bg-slate-100 rounded-md transition cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                    {u.acessoAtivo ? 'Senha provisória' : 'Criar acesso com senha provisória'}
                  </button>
                ) : <span />}

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(u)}
                    className="p-1.5 text-[#475569] hover:text-[#123768] hover:bg-slate-200 rounded-md transition"
                    title="Editar Usuário"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {users.length > 1 && u.id !== currentUser?.id && (
                    <button
                      onClick={() => {
                        if (confirm(`Deseja excluir o usuário ${u.nome}? O acesso dele ao sistema será removido.`)) {
                          onDeleteUser(u);
                        }
                      }}
                      className="p-1.5 text-[#B91C1C] hover:bg-rose-50 rounded-md transition"
                      title="Excluir Usuário"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Cadastro / Edição de Usuário */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-[#CBD5E1] overflow-hidden my-8">
            <div className="bg-[#123768] text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingUser ? 'Editar Usuário' : 'Novo Cadastro de Usuário'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#172B4D] mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Ex: Dra. Juliana Paes"
                  className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#172B4D] mb-1">E-mail Corporativo *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nome@hospital.com.br"
                  className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Perfil de Acesso *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs font-bold rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  >
                    <option value="DIRETORIA">Diretoria Operacional</option>
                    <option value="GESTOR">Gestor de Setor</option>
                    <option value="FORNECEDOR">Preposto Fornecedor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#172B4D] mb-1">Cargo / Função *</label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                  placeholder="Ex: Coordenadora de Enfermagem"
                  className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                />
              </div>

              {role === 'GESTOR' && (
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Setor Hospitalar Vinculado *</label>
                  <select
                    value={setorId}
                    onChange={(e) => setSetorId(e.target.value)}
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.id}>{sec.nome}</option>
                    ))}
                  </select>
                </div>
              )}

              {role === 'FORNECEDOR' && (
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Fornecedor Vinculado *</label>
                  <select
                    value={fornecedorId}
                    onChange={(e) => setFornecedorId(e.target.value)}
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  >
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.nomeFantasia}</option>
                    ))}
                  </select>
                </div>
              )}

              {remote && (
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">
                    {editingUser?.acessoAtivo ? 'Nova senha provisória (opcional)' : 'Senha provisória (opcional)'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={senhaProvisoria}
                      onChange={(e) => setSenhaProvisoria(e.target.value)}
                      autoComplete="off"
                      placeholder="Mín. 8 caracteres, letras e números"
                      className="flex-1 bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-mono focus:ring-2 focus:ring-[#123768] focus:border-[#123768] placeholder:text-[#94A3B8]"
                    />
                    <button
                      type="button"
                      onClick={() => setSenhaProvisoria(gerarSenhaProvisoria())}
                      className="px-3 py-2 text-xs font-bold text-[#123768] bg-white border border-[#CBD5E1] rounded-md hover:bg-slate-50 cursor-pointer"
                    >
                      Gerar
                    </button>
                  </div>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed">
                    Normalmente não é preciso: no login, a pessoa usa "Primeiro acesso ou esqueci a senha" e recebe o link no próprio e-mail.
                    Use a senha provisória só se o e-mail não chegar; no primeiro acesso o sistema pede que a pessoa crie a própria senha.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#172B4D] bg-white border border-[#CBD5E1] rounded-md hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow disabled:opacity-60"
                >
                  {saving ? 'Salvando…' : 'Salvar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
