import React, { useState } from 'react';
import { Sector, Supplier } from '../types';
import { Building2, Plus, Edit3, Trash2, Search, FileText, Calendar, Phone, Mail, User } from 'lucide-react';

interface SuppliersManagerProps {
  suppliers: Supplier[];
  sectors: Sector[];
  onSaveSupplier: (supplier: Supplier) => void;
  onDeleteSupplier: (supplierId: string) => void;
  onStartEvaluation: (supplierId: string) => void;
}

export const SuppliersManager: React.FC<SuppliersManagerProps> = ({
  suppliers,
  sectors,
  onSaveSupplier,
  onDeleteSupplier,
  onStartEvaluation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Form State
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [categoriaServico, setCategoriaServico] = useState('');
  const [setorResponsavelId, setSetorResponsavelId] = useState(sectors[0]?.id || '');
  const [contatoNome, setContatoNome] = useState('');
  const [contatoEmail, setContatoEmail] = useState('');
  const [contatoTelefone, setContatoTelefone] = useState('');
  const [numeroContrato, setNumeroContrato] = useState('');
  const [vigenciaFim, setVigenciaFim] = useState('');

  const openNewModal = () => {
    setEditingSupplier(null);
    setCnpj('');
    setRazaoSocial('');
    setNomeFantasia('');
    setCategoriaServico('');
    setSetorResponsavelId(sectors[0]?.id || '');
    setContatoNome('');
    setContatoEmail('');
    setContatoTelefone('');
    setNumeroContrato(`CT-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`);
    setVigenciaFim('2027-12-31');
    setIsModalOpen(true);
  };

  const openEditModal = (sup: Supplier) => {
    setEditingSupplier(sup);
    setCnpj(sup.cnpj);
    setRazaoSocial(sup.razaoSocial);
    setNomeFantasia(sup.nomeFantasia);
    setCategoriaServico(sup.categoriaServico);
    setSetorResponsavelId(sup.setorResponsavelId);
    setContatoNome(sup.contatoNome);
    setContatoEmail(sup.contatoEmail);
    setContatoTelefone(sup.contatoTelefone);
    setNumeroContrato(sup.numeroContrato);
    setVigenciaFim(sup.vigenciaFim);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const supplierData: Supplier = {
      id: editingSupplier?.id || `sup_${Date.now()}`,
      cnpj,
      razaoSocial,
      nomeFantasia,
      categoriaServico,
      setorResponsavelId,
      contatoNome,
      contatoEmail,
      contatoTelefone,
      numeroContrato,
      vigenciaFim
    };

    onSaveSupplier(supplierData);
    setIsModalOpen(false);
  };

  const filteredSuppliers = suppliers.filter(s => {
    if (!searchTerm) return true;
    return (
      s.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cnpj.includes(searchTerm) ||
      s.categoriaServico.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Cadastro de Fornecedores & Contratos</h2>
          <p className="text-xs text-slate-500">Gestão dos prestadores de serviço terceirizados e vinculação aos setores hospitalares</p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Fornecedor
        </button>
      </div>

      {/* Pesquisa */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por razão social, nome fantasia, CNPJ ou serviço..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
          />
        </div>
      </div>

      {/* Grid de Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(sup => {
          const sector = sectors.find(sec => sec.id === sup.setorResponsavelId);

          return (
            <div key={sup.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-hospital-300 transition">
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="bg-hospital-50 text-hospital-700 text-[10px] font-bold px-2 py-0.5 rounded border border-hospital-200">
                      {sup.numeroContrato}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">{sup.nomeFantasia}</h3>
                    <p className="text-xs text-slate-500 font-mono">{sup.cnpj}</p>
                  </div>

                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong className="text-slate-800">Serviço:</strong> {sup.categoriaServico}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center">
                    <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Setor: <strong className="text-slate-800">{sector?.nome || 'N/A'}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Preposto: {sup.contatoNome}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span className="truncate">{sup.contatoEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    <span>Vigência até: <strong className="text-slate-800">{sup.vigenciaFim}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => onStartEvaluation(sup.id)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow-sm transition flex items-center"
                >
                  <FileText className="w-3.5 h-3.5 mr-1" /> Avaliar Agora
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(sup)}
                    className="p-1.5 text-slate-600 hover:text-hospital-600 hover:bg-slate-200 rounded transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Deseja excluir este fornecedor do cadastro?')) {
                        onDeleteSupplier(sup.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Cadastro / Edição de Fornecedor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingSupplier ? 'Editar Fornecedor / Contrato' : 'Novo Cadastro de Fornecedor'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Razão Social *</label>
                  <input
                    type="text"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    required
                    placeholder="Ex: VO2 Care Fisioterapia LTDA"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome Fantasia *</label>
                  <input
                    type="text"
                    value={nomeFantasia}
                    onChange={(e) => setNomeFantasia(e.target.value)}
                    required
                    placeholder="Ex: VO2 Care Fisioterapia"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CNPJ *</label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                    placeholder="00.000.000/0000-00"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setor Responsável *</label>
                  <select
                    value={setorResponsavelId}
                    onChange={(e) => setSetorResponsavelId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-semibold"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.id}>{sec.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoria de Serviço Prestado *</label>
                <input
                  type="text"
                  value={categoriaServico}
                  onChange={(e) => setCategoriaServico(e.target.value)}
                  required
                  placeholder="Ex: Fisioterapia Respiratória e Motora em UTI"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nome do Preposto *</label>
                  <input
                    type="text"
                    value={contatoNome}
                    onChange={(e) => setContatoNome(e.target.value)}
                    required
                    placeholder="Ex: Dr. André Fonseca"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email de Contato *</label>
                  <input
                    type="email"
                    value={contatoEmail}
                    onChange={(e) => setContatoEmail(e.target.value)}
                    required
                    placeholder="contato@empresa.com.br"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telefone *</label>
                  <input
                    type="text"
                    value={contatoTelefone}
                    onChange={(e) => setContatoTelefone(e.target.value)}
                    required
                    placeholder="(11) 99999-8888"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nº do Contrato *</label>
                  <input
                    type="text"
                    value={numeroContrato}
                    onChange={(e) => setNumeroContrato(e.target.value)}
                    required
                    placeholder="CT-2024/089"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fim da Vigência *</label>
                  <input
                    type="date"
                    value={vigenciaFim}
                    onChange={(e) => setVigenciaFim(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
              </div>

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
                  Salvar Fornecedor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
