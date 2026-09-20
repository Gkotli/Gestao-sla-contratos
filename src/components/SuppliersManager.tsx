import React, { useState, useMemo } from 'react';
import { Sector, Supplier } from '../types';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  FileText, 
  Calendar, 
  User, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X,
  Layers
} from 'lucide-react';

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
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

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

  // Função para determinar o status do contrato
  const getContractStatus = (sup: Supplier): 'VIGENTE' | 'A_VENCER' | 'VENCIDO' | 'INDETERMINADO' => {
    const vig = (sup.vigenciaFim || '').trim().toLowerCase();

    if (!vig || vig.includes('indeterminado') || vig.includes('automatico') || vig.includes('automático')) {
      return 'INDETERMINADO';
    }

    if (
      vig.includes('aguardando') || 
      vig.includes('aditivo') || 
      vig.includes('renovação') || 
      vig.includes('renovacao') || 
      vig.includes('chamado') || 
      vig.includes('aberto') || 
      vig.includes('processo')
    ) {
      return 'A_VENCER';
    }

    let expiryDate: Date | null = null;
    if (vig.includes('/')) {
      const parts = vig.split('/');
      if (parts.length === 3) {
        expiryDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
      }
    } else if (vig.includes('-')) {
      const parts = vig.split('-');
      if (parts.length === 3) {
        expiryDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }

    if (expiryDate && !isNaN(expiryDate.getTime())) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return 'VENCIDO';
      if (diffDays <= 90) return 'A_VENCER';
      return 'VIGENTE';
    }

    return 'VIGENTE';
  };

  // Contagem dinâmica por setor para o dropdown
  const sectorCounts = useMemo(() => {
    const map: Record<string, number> = {};
    suppliers.forEach(s => {
      if (s.setorResponsavelId && sectors.some(sec => sec.id === s.setorResponsavelId)) {
        map[s.setorResponsavelId] = (map[s.setorResponsavelId] || 0) + 1;
      } else {
        map['NO_SECTOR'] = (map['NO_SECTOR'] || 0) + 1;
      }
    });
    return map;
  }, [suppliers, sectors]);

  // Setores ordenados alfabeticamente
  const sortedSectors = useMemo(() => {
    return [...sectors].sort((a, b) => a.nome.localeCompare(b.nome));
  }, [sectors]);

  // 1. Universo de Fornecedores filtrados pelo SETOR selecionado
  const sectorScopedSuppliers = useMemo(() => {
    if (selectedSectorFilter === 'NO_SECTOR') {
      return suppliers.filter(s => !s.setorResponsavelId || !sectors.some(sec => sec.id === s.setorResponsavelId));
    }
    if (selectedSectorFilter !== 'ALL') {
      return suppliers.filter(s => s.setorResponsavelId === selectedSectorFilter);
    }
    return suppliers;
  }, [suppliers, sectors, selectedSectorFilter]);

  // 2. Métricas Dinâmicas dos CARDS (Considera SOMENTE o setor selecionado)
  const sectorMetrics = useMemo(() => {
    const total = sectorScopedSuppliers.length;
    let vigentes = 0;
    let aVencer = 0;
    let vencidos = 0;

    sectorScopedSuppliers.forEach(s => {
      const st = getContractStatus(s);
      if (st === 'VIGENTE' || st === 'INDETERMINADO') vigentes++;
      else if (st === 'A_VENCER') aVencer++;
      else if (st === 'VENCIDO') vencidos++;
    });

    return { total, vigentes, aVencer, vencidos };
  }, [sectorScopedSuppliers]);

  // 3. Fornecedores Finais Exibidos no Grid (Setor + Status do Card + Busca por Texto)
  const filteredSuppliers = useMemo(() => {
    return sectorScopedSuppliers.filter(s => {
      // 3.1. Filtro por Status do Contrato (Card clicável)
      if (selectedStatusFilter !== 'ALL') {
        const status = getContractStatus(s);
        if (selectedStatusFilter === 'VIGENTE_TODOS') {
          if (status !== 'VIGENTE' && status !== 'INDETERMINADO') return false;
        } else if (status !== selectedStatusFilter) {
          return false;
        }
      }

      // 3.2. Filtro por Busca Textual (Refina a lista sem recalcular os cards de resumo do setor)
      if (searchTerm && searchTerm.trim() !== '') {
        const query = searchTerm.trim().toLowerCase();
        const cleanDigits = query.replace(/\D/g, '');

        const matchesNome = (s.nomeFantasia || '').toLowerCase().includes(query) || (s.razaoSocial || '').toLowerCase().includes(query);
        const matchesService = (s.categoriaServico || '').toLowerCase().includes(query);
        const matchesContract = (s.numeroContrato || '').toLowerCase().includes(query);
        const matchesCnpj = s.cnpj.toLowerCase().includes(query) || (
          cleanDigits.length >= 3 && s.cnpj.replace(/\D/g, '').includes(cleanDigits)
        );

        if (!matchesNome && !matchesService && !matchesContract && !matchesCnpj) {
          return false;
        }
      }

      return true;
    });
  }, [sectorScopedSuppliers, selectedStatusFilter, searchTerm]);

  // Nomes contextuais para mensagens de resultado
  const currentSectorObj = sectors.find(sec => sec.id === selectedSectorFilter);
  const sectorLabel = selectedSectorFilter === 'ALL' 
    ? 'Todos os setores' 
    : selectedSectorFilter === 'NO_SECTOR' 
    ? 'Sem setor definido' 
    : currentSectorObj?.nome || 'Setor Selecionado';

  const statusLabel = selectedStatusFilter === 'ALL' 
    ? 'Todos os status' 
    : selectedStatusFilter === 'VIGENTE_TODOS' 
    ? 'Contratos Vigentes' 
    : selectedStatusFilter === 'A_VENCER' 
    ? 'A Vencer / Em Aditivo' 
    : 'Contratos Vencidos';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSectorFilter('ALL');
    setSelectedStatusFilter('ALL');
  };

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
    const randomArray = new Uint16Array(1);
    crypto.getRandomValues(randomArray);
    const randomContractNum = 100 + (randomArray[0] % 900);
    setNumeroContrato(`CT-${new Date().getFullYear()}/${randomContractNum}`);
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

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#172B4D]">Cadastro de Fornecedores & Contratos</h2>
          <p className="text-xs text-[#475569]">Gestão dos prestadores de serviço terceirizados e vinculação aos setores hospitalares</p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Fornecedor
        </button>
      </div>

      {/* CARDS DE RESUMO CLICÁVEIS E DINÂMICOS CONFORME O SETOR SELECIONADO */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TOTAL DO SETOR OU TOTAL GERAL */}
        <div 
          onClick={() => setSelectedStatusFilter('ALL')}
          className={`p-4 rounded-lg border transition cursor-pointer select-none ${
            selectedStatusFilter === 'ALL' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-400' 
              : 'bg-white text-[#172B4D] border-[#CBD5E1] hover:border-slate-300 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>{selectedSectorFilter === 'ALL' ? 'TOTAL GERAL' : 'TOTAL DO SETOR'}</span>
            <Layers className={`w-4 h-4 ${selectedStatusFilter === 'ALL' ? 'text-teal-400' : 'text-slate-400'}`} />
          </div>
          <div className="text-2xl font-black mt-2">{sectorMetrics.total}</div>
          <p className={`text-[11px] truncate mt-0.5 ${selectedStatusFilter === 'ALL' ? 'opacity-80' : 'text-[#475569]'}`}>
            {selectedSectorFilter === 'ALL' ? 'Todos os fornecedores' : sectorLabel}
          </p>
        </div>

        {/* CARD 2: VIGENTES NO SETOR */}
        <div 
          onClick={() => setSelectedStatusFilter('VIGENTE_TODOS')}
          className={`p-4 rounded-lg border transition cursor-pointer select-none ${
            selectedStatusFilter === 'VIGENTE_TODOS'
              ? 'bg-[#047857] text-white border-[#047857] shadow-md ring-2 ring-emerald-400' 
              : 'bg-white text-[#172B4D] border-[#CBD5E1] hover:border-emerald-300 hover:bg-emerald-50/40 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>VIGENTES</span>
            <CheckCircle2 className={`w-4 h-4 ${selectedStatusFilter === 'VIGENTE_TODOS' ? 'text-emerald-300' : 'text-[#047857]'}`} />
          </div>
          <div className={`text-2xl font-black mt-2 ${selectedStatusFilter === 'VIGENTE_TODOS' ? 'text-white' : 'text-[#047857]'}`}>
            {sectorMetrics.vigentes}
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStatusFilter === 'VIGENTE_TODOS' ? 'opacity-80' : 'text-[#475569]'}`}>
            Ativos ou Indeterminados
          </p>
        </div>

        {/* CARD 3: A VENCER / ADITIVOS NO SETOR */}
        <div 
          onClick={() => setSelectedStatusFilter('A_VENCER')}
          className={`p-4 rounded-lg border transition cursor-pointer select-none ${
            selectedStatusFilter === 'A_VENCER' 
              ? 'bg-[#92400E] text-white border-[#92400E] shadow-md ring-2 ring-amber-400' 
              : 'bg-white text-[#172B4D] border-[#CBD5E1] hover:border-orange-300 hover:bg-orange-50/40 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>A VENCER / ADITIVOS</span>
            <Clock className={`w-4 h-4 ${selectedStatusFilter === 'A_VENCER' ? 'text-orange-200' : 'text-[#92400E]'}`} />
          </div>
          <div className={`text-2xl font-black mt-2 ${selectedStatusFilter === 'A_VENCER' ? 'text-white' : 'text-[#92400E]'}`}>
            {sectorMetrics.aVencer}
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStatusFilter === 'A_VENCER' ? 'opacity-80' : 'text-[#475569]'}`}>
            Pendentes ou renovação
          </p>
        </div>

        {/* CARD 4: VENCIDOS NO SETOR */}
        <div 
          onClick={() => setSelectedStatusFilter('VENCIDO')}
          className={`p-4 rounded-lg border transition cursor-pointer select-none ${
            selectedStatusFilter === 'VENCIDO' 
              ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-md ring-2 ring-rose-400' 
              : 'bg-white text-[#172B4D] border-[#CBD5E1] hover:border-rose-300 hover:bg-rose-50/40 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>CONTRATOS VENCIDOS</span>
            <AlertTriangle className={`w-4 h-4 ${selectedStatusFilter === 'VENCIDO' ? 'text-rose-200' : 'text-[#B91C1C]'}`} />
          </div>
          <div className={`text-2xl font-black mt-2 ${selectedStatusFilter === 'VENCIDO' ? 'text-white' : 'text-[#B91C1C]'}`}>
            {sectorMetrics.vencidos}
          </div>
          <p className={`text-[11px] mt-0.5 ${selectedStatusFilter === 'VENCIDO' ? 'opacity-80' : 'text-[#475569]'}`}>
            Vigência expirada
          </p>
        </div>
      </div>

      {/* Painel Limpo de Filtro por Setor e Busca Textual */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-[#CBD5E1] space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 1. Busca por Texto (7 colunas) */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome do fornecedor, razão social, CNPJ ou serviço..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs font-medium rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
            />
          </div>

          {/* 2. Seleção de Setor Responsável (5 colunas) */}
          <div className="md:col-span-5">
            <select
              value={selectedSectorFilter}
              onChange={(e) => setSelectedSectorFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-[#CBD5E1] text-xs font-bold text-[#172B4D] rounded-md focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
            >
              <option value="ALL">Todos os setores ({suppliers.length})</option>
              {sortedSectors.map(sec => {
                const count = sectorCounts[sec.id] || 0;
                return (
                  <option key={sec.id} value={sec.id}>
                    {sec.nome} ({count})
                  </option>
                );
              })}
              <option value="NO_SECTOR">⚠️ Sem setor definido ({sectorCounts['NO_SECTOR'] || 0})</option>
            </select>
          </div>
        </div>

        {/* Linha Contextual de Resultado e Status dos Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center space-x-2 text-[#475569] font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>
              <strong>{filteredSuppliers.length}</strong> {filteredSuppliers.length === 1 ? 'fornecedor encontrado' : 'fornecedores encontrados'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="bg-slate-100 text-[#172B4D] px-2.5 py-0.5 rounded border border-[#CBD5E1] text-[11px] font-bold">
              {sectorLabel} • {statusLabel}
            </span>
          </div>

          {(searchTerm || selectedSectorFilter !== 'ALL' || selectedStatusFilter !== 'ALL') && (
            <button
              onClick={clearAllFilters}
              className="text-[#B91C1C] hover:text-rose-800 font-bold flex items-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5 mr-0.5" /> Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid Neutro de Cards de Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map(sup => {
            const sector = sectors.find(sec => sec.id === sup.setorResponsavelId);
            const status = getContractStatus(sup);

            return (
              <div 
                key={sup.id} 
                className="bg-white rounded-lg shadow-sm border border-[#CBD5E1] hover:border-[#123768] transition overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  {/* Cabeçalho do Card com Badge Neutra de Setor */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 truncate pr-1">
                      {/* Badge Padronizada para Todos os Setores */}
                      {sector ? (
                        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded border bg-slate-100 text-slate-800 border-[#CBD5E1] uppercase">
                          <Building2 className="w-3 h-3 mr-1 text-slate-500" />
                          SETOR: {sector.nome}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] uppercase">
                          <AlertTriangle className="w-3 h-3 mr-1 text-[#B91C1C]" />
                          SEM SETOR DEFINIDO
                        </span>
                      )}

                      <h3 className="font-extrabold text-[#172B4D] text-base leading-tight truncate">{sup.nomeFantasia}</h3>
                      <p className="text-xs text-[#475569] font-mono truncate">{sup.cnpj}</p>
                    </div>

                    <div className="p-2 rounded-md flex-shrink-0 bg-slate-100 text-slate-700">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Categoria do Serviço */}
                  <p className="text-xs text-[#475569] bg-slate-50 p-2.5 rounded-md border border-[#CBD5E1] leading-snug">
                    <strong className="text-[#172B4D]">Serviço:</strong> {sup.categoriaServico}
                  </p>

                  {/* Detalhes do Contrato */}
                  <div className="space-y-1.5 text-xs text-[#475569] pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[#475569]">Nº do Contrato:</span>
                      <strong className="text-[#172B4D] font-mono text-xs">{sup.numeroContrato || 'N/A'}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#475569] flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Vigência:
                      </span>
                      <strong className={`font-bold ${
                        status === 'A_VENCER' ? 'text-[#92400E]' : status === 'VENCIDO' ? 'text-[#B91C1C]' : 'text-[#172B4D]'
                      }`}>
                        {sup.vigenciaFim}
                      </strong>
                    </div>

                    {sup.contatoNome && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#475569] flex items-center">
                          <User className="w-3.5 h-3.5 mr-1 text-slate-400" /> Preposto:
                        </span>
                        <span className="text-[#172B4D] font-medium truncate max-w-[150px]">{sup.contatoNome}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rodapé com Botões de Ação */}
                <div className="p-3 bg-slate-50 border-t border-[#CBD5E1] flex items-center justify-between">
                  <button
                    onClick={() => onStartEvaluation(sup.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition flex items-center cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" /> Avaliar Agora
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(sup)}
                      className="p-1.5 text-slate-600 hover:text-[#123768] hover:bg-slate-200 rounded-md transition cursor-pointer"
                      title="Editar Cadastro"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja excluir o fornecedor "${sup.nomeFantasia}" do cadastro?`)) {
                          onDeleteSupplier(sup.id);
                        }
                      }}
                      className="p-1.5 text-[#B91C1C] hover:bg-rose-50 rounded-md transition cursor-pointer"
                      title="Excluir Fornecedor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 bg-white rounded-lg shadow-sm border border-[#CBD5E1] text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#172B4D]">Nenhum Fornecedor Encontrado</h3>
            <p className="text-xs text-[#475569]">Não encontramos registros para a combinação de filtros selecionada.</p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-[#123768] text-white font-bold text-xs rounded-md hover:bg-[#0B2850] transition cursor-pointer inline-flex items-center"
            >
              <X className="w-3.5 h-3.5 mr-1.5" /> Limpar Todos os Filtros
            </button>
          </div>
        )}
      </div>

      {/* Modal para Cadastro / Edição de Fornecedor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-2xl border border-[#CBD5E1] overflow-hidden my-8">
            <div className="bg-[#123768] text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingSupplier ? 'Editar Fornecedor / Contrato' : 'Novo Cadastro de Fornecedor'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Razão Social *</label>
                  <input
                    type="text"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    required
                    placeholder="Ex: VO2 Care Fisioterapia LTDA"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Nome Fantasia *</label>
                  <input
                    type="text"
                    value={nomeFantasia}
                    onChange={(e) => setNomeFantasia(e.target.value)}
                    required
                    placeholder="Ex: VO2 Care Fisioterapia"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">CNPJ *</label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                    placeholder="00.000.000/0000-00"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-mono focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Setor Responsável *</label>
                  <select
                    value={setorResponsavelId}
                    onChange={(e) => setSetorResponsavelId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-semibold focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.id}>{sec.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#172B4D] mb-1">Categoria de Serviço Prestado *</label>
                <input
                  type="text"
                  value={categoriaServico}
                  onChange={(e) => setCategoriaServico(e.target.value)}
                  required
                  placeholder="Ex: Fisioterapia Respiratória e Motora em UTI"
                  className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#172B4D] mb-1">Nome do Preposto (Opcional)</label>
                  <input
                    type="text"
                    value={contatoNome}
                    onChange={(e) => setContatoNome(e.target.value)}
                    placeholder="Ex: Dr. André Fonseca"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#172B4D] mb-1">Email de Contato (Opcional)</label>
                  <input
                    type="email"
                    value={contatoEmail}
                    onChange={(e) => setContatoEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#172B4D] mb-1">Telefone (Opcional)</label>
                  <input
                    type="text"
                    value={contatoTelefone}
                    onChange={(e) => setContatoTelefone(e.target.value)}
                    placeholder="(11) 99999-8888"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Nº do Contrato *</label>
                  <input
                    type="text"
                    value={numeroContrato}
                    onChange={(e) => setNumeroContrato(e.target.value)}
                    required
                    placeholder="CT-2024/089"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-mono focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#172B4D] mb-1">Fim da Vigência *</label>
                  <input
                    type="text"
                    value={vigenciaFim}
                    onChange={(e) => setVigenciaFim(e.target.value)}
                    required
                    placeholder="DD/MM/AAAA ou Indeterminado"
                    className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 focus:ring-2 focus:ring-[#123768] focus:border-[#123768]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-[#CBD5E1] rounded-md hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow"
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
