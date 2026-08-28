import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormMetadados {
  fornecedor: string;
  cnpj: string;
  setorAlvo: string;
  criticidade: 'Critica' | 'Alta' | 'Media' | 'Baixa';
  inicioVigencia: string;
  fimVigencia: string;
  indiceReajuste: 'IPCA' | 'IGPM' | 'Fixo / Sem Reajuste';
  gestorResponsavel: string;
}

export const FormularioContrato: React.FC = () => {
  // Estado para os campos de texto e seletores
  const [metadados, setMetadados] = useState<FormMetadados>({
    fornecedor: '',
    cnpj: '',
    setorAlvo: '',
    criticidade: 'Media',
    inicioVigencia: '',
    fimVigencia: '',
    indiceReajuste: 'IPCA',
    gestorResponsavel: '',
  });

  // Estados para gerenciar os arquivos anexados
  const [arquivoContrato, setArquivoContrato] = useState<File | null>(null);
  const [arquivoCredenciais, setArquivoCredenciais] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMetadados((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, tipo: 'contrato' | 'credenciais') => {
    if (e.target.files && e.target.files[0]) {
      if (tipo === 'contrato') setArquivoContrato(e.target.files[0]);
      if (tipo === 'credenciais') setArquivoCredenciais(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validação básica de segurança
    if (!arquivoContrato) {
      alert('Por favor, anexe o PDF do contrato principal.');
      return;
    }

    // Objeto consolidado pronto para ser enviado para a sua API / Backend
    const payloadEnvio = {
      ...metadados,
      contratoNomeArquivo: arquivoContrato.name,
      credenciaisNomeArquivo: arquivoCredenciais ? arquivoCredenciais.name : null,
      dataCadastro: new Date().toISOString(),
    };

    console.log('Enviando dados para o banco de dados:', payloadEnvio);
    // Aqui você inseriria a chamada do axios/fetch: axios.post('/api/contratos', payloadEnvio)
    alert('Contrato e metadados de compliance salvos com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-900">Cadastrar Novo Contrato da Unidade</h2>
        <p className="text-sm text-slate-500 mt-1">Insira o arquivo e os parâmetros exigidos para a automação do SLA e auditoria JCI.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SEÇÃO 1: Upload dos Arquivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 p-4 rounded-xl text-center cursor-pointer transition bg-slate-50/50">
            <label className="cursor-pointer block">
              <span className="text-sm font-semibold text-blue-600 block">📄 Contrato Principal (PDF) *</span>
              <span className="text-xs text-slate-400 block mt-1">{arquivoContrato ? arquivoContrato.name : "Clique para selecionar o arquivo"}</span>
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, 'contrato')} />
            </label>
          </div>

          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 p-4 rounded-xl text-center cursor-pointer transition bg-slate-50/50">
            <label className="cursor-pointer block">
              <span className="text-sm font-semibold text-emerald-600 block">🛡️ Credenciais e Certidões (JCI)</span>
              <span className="text-xs text-slate-400 block mt-1">{arquivoCredenciais ? arquivoCredenciais.name : "Alvarás, CRM/COREN do prestador, etc."}</span>
              <input type="file" accept=".pdf,.zip" className="hidden" onChange={(e) => handleFileChange(e, 'credenciais')} />
            </label>
          </div>
        </div>

        {/* SEÇÃO 2: Informações do Fornecedor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nome do Fornecedor / Razão Social</label>
            <input type="text" name="fornecedor" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" placeholder="Ex: Winet Tecnologia" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">CNPJ</label>
            <input type="text" name="cnpj" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" placeholder="00.000.000/0001-00" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Criticidade da Unidade</label>
            <select name="criticidade" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" value={metadados.criticidade} onChange={handleInputChange}>
              <option value="Critica">🚨 Crítica (UTI, Centro Cirúrgico)</option>
              <option value="Alta">📦 Alta (Farmácia, TI, Lab)</option>
              <option value="Media">💼 Média (Ambulatório, Recepção)</option>
              <option value="Baixa">🍃 Baixa (Administrativo)</option>
            </select>
          </div>
        </div>

        {/* SEÇÃO 3: Vigência e Governança */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Início da Vigência</label>
            <input type="date" name="inicioVigencia" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Fim da Vigência</label>
            <input type="date" name="fimVigencia" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Índice de Reajuste Anual</label>
            <select name="indiceReajuste" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" onChange={handleInputChange}>
              <option value="IPCA">IPCA</option>
              <option value="IGPM">IGPM</option>
              <option value="Fixo / Sem Reajuste">Fixo / Sem Reajuste</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gestor Técnico Interno</label>
            <input type="text" name="gestorResponsavel" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-blue-500" placeholder="Nome do responsável" onChange={handleInputChange} />
          </div>
        </div>

        {/* SEÇÃO 4: Botões de Ação */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
          <button type="button" className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
            Salvar e Ativar Alertas Anuais
          </button>
        </div>
      </form>
    </div>
  );
};
