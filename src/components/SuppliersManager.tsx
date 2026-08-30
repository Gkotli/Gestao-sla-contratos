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
  Mail, 
  User, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X,
  Wrench,
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

  // Identifica o setor da Manutenção
  const manutencaoSector = useMemo(() => {
    return sectors.find(sec => 
      sec.nome.toLowerCase().includes('manutenção') || 
      sec.nome.toLowerCase().includes('manutencao')
    );
  }, [sectors]);

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

  // Contagem dinâmica por setor
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

  // Indicadores Numéricos do Topo
  const metrics = useMemo(() => {
    const total = suppliers.length;
    const manutencaoCount = manutencaoSector ? (sectorCounts[manutencaoSector.id] || 0) : 0;
    const noSectorCount = sectorCounts['NO_SECTOR'] || 0;

    let vigentes = 0;
    let aVencer = 0;
    let vencidos = 0;

    suppliers.forEach(s => {
      const st = getContractStatus(s);
      if (st === 'VIGENTE' || st === 'INDETERMINADO') vigentes++;
      else if (st === 'A_VENCER') aVencer++;
      else if (st === 'VENCIDO') vencidos++;
    });

    return { total, manutencaoCount, noSectorCount, vigentes, aVencer, vencidos };
  }, [suppliers, sectorCounts, manutencaoSector]);

  // Filtragem Combinada (Busca + Setor + Status)
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      // 1. Filtro de Texto
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = s.nomeFantasia.toLowerCase().includes(query) || s.razaoSocial.toLowerCase().includes(query);
        const matchesCnpj = s.cnpj.replace(/\D/g, '').includes(query.replace(/\D/g, '')) || s.cnpj.toLowerCase().includes(query);
        const matchesService = s.categoriaServico.toLowerCase().includes(query);
        const matchesContract = (s.numeroContrato || '').toLowerCase().includes(query);
        if (!matchesName && !matchesCnpj && !matchesService && !matchesContract) return false;
      }

      // 2. Filtro de Setor
      if (selectedSectorFilter === 'NO_SECTOR') {
        if (s.setorResponsavelId && sectors.some(sec => sec.id === s.setorResponsavelId)) return false;
      } else if (selectedSectorFilter !== 'ALL') {
        if (s.setorResponsavelId !== selectedSectorFilter) return false;
      }

      // 3. Filtro de Status do Contrato
      if (selectedStatusFilter !== 'ALL') {
        const status = getContractStatus(s);
        if (selectedStatusFilter === 'VIGENTE_TODOS') {
          if (status !== 'VIGENTE' && status !== 'INDETERMINADO') return false;
        } else if (status !== selectedStatusFilter) {
          return false;
        }
      }

      return true;
    });
  }, [suppliers, sectors, searchTerm, selectedSectorFilter, selectedStatusFilter]);

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

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Cadastro de Fornecedores & Contratos</h2>
          <p className="text-xs text-slate-500">Gestão dos prestadores de serviço terceirizados e vinculação aos setores hospitalares</p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center px-4 py-2.5 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Fornecedor
        </button>
      </div>

      {/* KPI Summary Cards no Topo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setSelectedSectorFilter('ALL')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedSectorFilter === 'ALL' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Total Cadastrados</span>
            <Layers className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black mt-2">{metrics.total}</div>
          <p className="text-[11px] opacity-75 mt-0.5">Todos os fornecedores</p>
        </div>

        {/* Card Destaque: Manutenção */}
        <div 
          onClick={() => manutencaoSector && setSelectedSectorFilter(manutencaoSector.id)}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            manutencaoSector && selectedSectorFilter === manutencaoSector.id 
              ? 'bg-amber-600 text-white border-amber-600 shadow-md' 
              : 'bg-amber-50/80 text-amber-950 border-amber-200 hover:border-amber-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Manutenção</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black mt-2">{metrics.manutencaoCount}</div>
          <p className="text-[11px] opacity-80 mt-0.5">Contratos da Manutenção</p>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('VIGENTE_TODOS')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatusFilter === 'VIGENTE_TODOS'
              ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' 
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Contratos Vigentes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-700">{metrics.vigentes}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Ativos ou Indeterminados</p>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('A_VENCER')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedStatusFilter === 'A_VENCER' 
              ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>A Vencer / Aditivos</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black mt-2 text-orange-600">{metrics.aVencer}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Pendentes ou renovação</p>
        </div>
      </div>

      {/* Painel Unificado de Filtros Avançados */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 1. Busca por Texto (5 colunas) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, razão social, CNPJ ou serviço..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 text-xs font-medium rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            />
          </div>

          {/* 2. Filtro por Setor Responsável (4 colunas) */}
          <div className="md:col-span-4">
            <select
              value={selectedSectorFilter}
              onChange={(e) => setSelectedSectorFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os setores ({suppliers.length})</option>
              {sectors.map(sec => {
                const count = sectorCounts[sec.id] || 0;
                return (
                  <option key={sec.id} value={sec.id}>
                    {sec.nome} ({count})
                  </option>
                );
              })}
              <option value="NO_SECTOR">⚠️ Sem setor definido ({metrics.noSectorCount})</option>
            </select>
          </div>

          {/* 3. Filtro por Status do Contrato (3 colunas) */}
          <div className="md:col-span-3">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-lg focus:ring-hospital-500 focus:border-hospital-500"
            >
              <option value="ALL">Todos os status</option>
              <option value="VIGENTE_TODOS">Vigentes ({metrics.vigentes})</option>
              <option value="A_VENCER">A Vencer / Em Aditivo ({metrics.aVencer})</option>
              <option value="INDETERMINADO">Indeterminado</option>
              <option value="VENCIDO">Vencidos ({metrics.vencidos})</option>
            </select>
          </div>
        </div>

        {/* Linha de Status de Filtros Ativos + Atalho Rápido da Manutenção */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-2 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Exibindo <strong>{filteredSuppliers.length}</strong> de {suppliers.length} fornecedores</span>

            {(searchTerm || selectedSectorFilter !== 'ALL' || selectedStatusFilter !== 'ALL') && (
              <button
                onClick={clearAllFilters}
                className="text-rose-600 hover:text-rose-800 font-bold flex items-center ml-2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 mr-0.5" /> Limpar Filtros
              </button>
            )}
          </div>

          {/* Atalho Rápido para o Setor da Manutenção */}
          {manutencaoSector && (
            <button
              onClick={() => setSelectedSectorFilter(manutencaoSector.id)}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition flex items-center cursor-pointer ${
                selectedSectorFilter === manutencaoSector.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 mr-1" />
              Filtrar Manutenção ({sectorCounts[manutencaoSector.id] || 0})
            </button>
          )}
        </div>
      </div>

      {/* Grid de Cards de Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map(sup => {
            const sector = sectors.find(sec => sec.id === sup.setorResponsavelId);
            const status = getContractStatus(sup);
            const isManutencao = sector?.id === manutencaoSector?.id;

            return (
              <div 
                key={sup.id} 
                className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between transition ${
                  isManutencao ? 'border-amber-300 hover:border-amber-400' : 'border-slate-200 hover:border-hospital-300'
                }`}
              >
                <div className="p-5 space-y-3">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 truncate pr-1">
                      {/* Badge Destacada do Setor Responsável */}
                      {sector ? (
                        <span className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded border uppercase ${
                          isManutencao 
                            ? 'bg-amber-100 text-amber-900 border-amber-300' 
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}>
                          <Building2 className="w-3 h-3 mr-1 text-slate-500" />
                          SETOR: {sector.nome}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 uppercase">
                          <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
                          SEM SETOR DEFINIDO
                        </span>
                      )}

                      <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate">{sup.nomeFantasia}</h3>
                      <p className="text-xs text-slate-500 font-mono truncate">{sup.cnpj}</p>
                    </div>

                    <div className={`p-2 rounded-lg flex-shrink-0 ${isManutencao ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                      {isManutencao ? <Wrench className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Categoria do Serviço */}
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 leading-snug">
                    <strong className="text-slate-800">Serviço:</strong> {sup.categoriaServico}
                  </p>

                  {/* Detalhes do Contrato */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Nº do Contrato:</span>
                      <strong className="text-slate-900 font-mono text-xs">{sup.numeroContrato || 'N/A'}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Vigência:
                      </span>
                      <strong className={`font-bold ${
                        status === 'A_VENCER' ? 'text-orange-600' : status === 'VENCIDO' ? 'text-rose-600' : 'text-slate-800'
                      }`}>
                        {sup.vigenciaFim}
                      </strong>
                    </div>

                    {sup.contatoNome && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center">
                          <User className="w-3.5 h-3.5 mr-1 text-slate-400" /> Preposto:
                        </span>
                        <span className="text-slate-800 font-medium truncate max-w-[150px]">{sup.contatoNome}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rodapé com Botões de Ação */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => onStartEvaluation(sup.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg shadow-sm transition flex items-center cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" /> Avaliar Agora
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(sup)}
                      className="p-1.5 text-slate-600 hover:text-hospital-600 hover:bg-slate-200 rounded transition cursor-pointer"
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
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
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
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 bg-white rounded-xl shadow-sm border border-slate-200 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Nenhum Fornecedor Encontrado</h3>
            <p className="text-xs text-slate-500">Não encontramos registros para a combinação de filtros selecionada.</p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition cursor-pointer inline-flex items-center"
            >
              <X className="w-3.5 h-3.5 mr-1.5" /> Limpar Todos os Filtros
            </button>
          </div>
        )}
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
                  <label className="block font-semibold text-slate-700 mb-1">Nome do Preposto (Opcional)</label>
                  <input
                    type="text"
                    value={contatoNome}
                    onChange={(e) => setContatoNome(e.target.value)}
                    placeholder="Ex: Dr. André Fonseca"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email de Contato (Opcional)</label>
                  <input
                    type="email"
                    value={contatoEmail}
                    onChange={(e) => setContatoEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telefone (Opcional)</label>
                  <input
                    type="text"
                    value={contatoTelefone}
                    onChange={(e) => setContatoTelefone(e.target.value)}
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
                    type="text"
                    value={vigenciaFim}
                    onChange={(e) => setVigenciaFim(e.target.value)}
                    required
                    placeholder="DD/MM/AAAA ou Indeterminado"
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
