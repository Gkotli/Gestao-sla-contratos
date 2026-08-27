import React, { useState } from 'react';
import { Sector, Supplier, User, UserRole } from '../types';
import { UserPlus, KeyRound, ShieldCheck, Mail, Building2, User as UserIcon, Trash2, Edit3, Lock, CheckCircle2 } from 'lucide-react';

interface UsersManagerProps {
  users: User[];
  sectors: Sector[];
  suppliers: Supplier[];
  currentUser: User | null;
  onSaveUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onSelectUser: (user: User) => void;
}

export const UsersManager: React.FC<UsersManagerProps> = ({
  users,
  sectors,
  suppliers,
  currentUser,
  onSaveUser,
  onDeleteUser,
  onSelectUser
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('123');
  const [cargo, setCargo] = useState('');
  const [role, setRole] = useState<UserRole>('GESTOR');
  const [setorId, setSetorId] = useState(sectors[0]?.id || '');
  const [fornecedorId, setFornecedorId] = useState(suppliers[0]?.id || '');

  const openNewModal = () => {
    setEditingUser(null);
    setNome('');
    setEmail('');
    setSenha('123');
    setCargo('Gestor Hospitalar');
    setRole('GESTOR');
    setSetorId(sectors[0]?.id || '');
    setFornecedorId(suppliers[0]?.id || '');
    setIsModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setNome(u.nome);
    setEmail(u.email);
    setSenha(u.senha || '123');
    setCargo(u.cargo);
    setRole(u.role);
    setSetorId(u.setorId || (sectors[0]?.id || ''));
    setFornecedorId(u.fornecedorId || (suppliers[0]?.id || ''));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData: User = {
      id: editingUser?.id || `user_${Date.now()}`,
      nome,
      email,
      senha,
      cargo,
      role,
      setorId: role === 'GESTOR' ? setorId : undefined,
      fornecedorId: role === 'FORNECEDOR' ? fornecedorId : undefined
    };

    onSaveUser(userData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestão de Usuários & Logins de Acesso</h2>
          <p className="text-xs text-slate-500">Cadastre gestores hospitalares, representantes da diretoria e prepostos de fornecedores</p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow transition self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Cadastrar Novo Usuário
        </button>
      </div>

      {/* Troca Rápida de Sessão Demo */}
      <div className="bg-slate-900 text-white p-5 rounded-xl shadow-sm border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm">Troca Rápida de Usuário Logado (Demonstração)</h3>
          </div>
          <span className="text-xs text-slate-400">Clique para alternar o usuário ativo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {users.map(u => {
            const isSelected = currentUser?.id === u.id;
            return (
              <button
                key={u.id}
                onClick={() => onSelectUser(u)}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-hospital-600 border-hospital-400 text-white shadow-md ring-2 ring-hospital-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    u.role === 'DIRETORIA' ? 'bg-purple-900/60 text-purple-200 border border-purple-700' :
                    u.role === 'GESTOR' ? 'bg-teal-900/60 text-teal-200 border border-teal-700' :
                    'bg-amber-900/60 text-amber-200 border border-amber-700'
                  }`}>
                    {u.role}
                  </span>
                  <p className="font-bold text-xs mt-1.5 truncate">{u.nome}</p>
                  <p className="text-[11px] opacity-80 truncate">{u.email}</p>
                </div>

                {isSelected && (
                  <span className="mt-2 text-[10px] font-bold text-teal-300 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Logado Agora
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Lista de Usuários Cadastrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => {
          const sector = sectors.find(sec => sec.id === u.setorId);
          const supplier = suppliers.find(sup => sup.id === u.fornecedorId);

          return (
            <div key={u.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      u.role === 'DIRETORIA' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                      u.role === 'GESTOR' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                      'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {u.role === 'DIRETORIA' ? 'Diretoria Operacional (Admin)' :
                       u.role === 'GESTOR' ? 'Gestor de Setor Hospitalar' :
                       'Preposto Fornecedor'}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base pt-1">{u.nome}</h3>
                    <p className="text-xs text-slate-500">{u.cargo}</p>
                  </div>

                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
                    <UserIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Email: <strong className="text-slate-800">{u.email}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Senha: <span className="font-mono bg-slate-100 px-1 rounded">123</span></span>
                  </div>
                  {u.role === 'GESTOR' && sector && (
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>Setor: <strong className="text-slate-800">{sector.nome}</strong></span>
                    </div>
                  )}
                  {u.role === 'FORNECEDOR' && supplier && (
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>Fornecedor: <strong className="text-slate-800">{supplier.nomeFantasia}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectUser(u)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded transition"
                >
                  Entrar como este Usuário
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(u)}
                    className="p-1.5 text-slate-600 hover:text-hospital-600 hover:bg-slate-200 rounded transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {users.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Deseja excluir o usuário ${u.nome}?`)) {
                          onDeleteUser(u.id);
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition"
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
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingUser ? 'Editar Usuário' : 'Novo Cadastro de Usuário'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Ex: Dra. Juliana Paes"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nome@hospital.com.br"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Senha *</label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Perfil de Acesso *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg p-2.5"
                  >
                    <option value="DIRETORIA">Diretoria Operacional</option>
                    <option value="GESTOR">Gestor de Setor</option>
                    <option value="FORNECEDOR">Preposto Fornecedor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cargo / Função *</label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                  placeholder="Ex: Coordenadora de Enfermagem"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                />
              </div>

              {role === 'GESTOR' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setor Hospitalar Vinculado *</label>
                  <select
                    value={setorId}
                    onChange={(e) => setSetorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.id}>{sec.nome}</option>
                    ))}
                  </select>
                </div>
              )}

              {role === 'FORNECEDOR' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fornecedor Vinculado *</label>
                  <select
                    value={fornecedorId}
                    onChange={(e) => setFornecedorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  >
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.nomeFantasia}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow"
                >
                  Salvar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
