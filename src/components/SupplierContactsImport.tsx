import React, { useState } from 'react';
import { Sector, Supplier } from '../types';
import { ContactImportResult, downloadContactsTemplate, parseContactsFile } from '../services/supplierContactsService';
import { X, Download, Upload, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

interface SupplierContactsImportProps {
  suppliers: Supplier[];
  sectors: Sector[];
  onApply: (updated: Supplier[]) => void;
  onClose: () => void;
}

export const SupplierContactsImport: React.FC<SupplierContactsImportProps> = ({ suppliers, sectors, onApply, onClose }) => {
  const [resultado, setResultado] = useState<ContactImportResult | null>(null);
  const [erro, setErro] = useState('');
  const [processando, setProcessando] = useState(false);

  const semEmail = suppliers.filter(s => !s.contatoEmail).length;

  const handleArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErro('');
    setResultado(null);
    setProcessando(true);
    try {
      setResultado(await parseContactsFile(file, suppliers));
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível ler a planilha. Use o arquivo .xlsx da planilha modelo.');
    } finally {
      setProcessando(false);
    }
  };

  const handleAplicar = () => {
    if (!resultado?.changes.length) return;
    onApply(resultado.changes.map(c => ({ ...c.supplier, ...c.novo })));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl border border-[#CBD5E1] overflow-hidden my-8">
        <div className="bg-[#123768] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-md border border-white/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Atualizar Contatos por Planilha</h3>
              <p className="text-xs text-slate-300">{semEmail} de {suppliers.length} fornecedores estão sem e-mail de contato</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer" title="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-[#172B4D]">
          <ol className="space-y-3">
            <li>
              <strong className="block mb-1">1. Baixe a planilha modelo</strong>
              <p className="text-[#475569] mb-2">Ela já vem com todos os fornecedores cadastrados. Preencha as colunas Contato, E-mail e Telefone. Não altere a coluna ID.</p>
              <button
                onClick={() => downloadContactsTemplate(suppliers, sectors)}
                className="inline-flex items-center px-4 py-2 font-bold text-[#123768] bg-white hover:bg-slate-50 border border-[#CBD5E1] rounded-md cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1.5" /> Baixar planilha modelo
              </button>
            </li>
            <li>
              <strong className="block mb-1">2. Envie a planilha preenchida</strong>
              <p className="text-[#475569] mb-2">Nada é gravado neste passo: você confere as alterações antes. Células em branco não apagam dados existentes.</p>
              <label className="inline-flex items-center px-4 py-2 font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md cursor-pointer">
                <Upload className="w-4 h-4 mr-1.5" /> {processando ? 'Lendo…' : 'Escolher arquivo .xlsx'}
                <input type="file" accept=".xlsx" onChange={handleArquivo} className="hidden" />
              </label>
            </li>
          </ol>

          {erro && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] rounded-md font-semibold">{erro}</div>
          )}

          {resultado && (
            <div className="space-y-3 border-t border-[#CBD5E1] pt-4">
              <strong className="block">3. Confira e aplique</strong>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-semibold">{resultado.changes.length} para atualizar</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-[#475569] border border-[#CBD5E1]">{resultado.semAlteracao} sem alteração</span>
                {resultado.errors.length > 0 && (
                  <span className="px-2 py-1 rounded bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] font-semibold">{resultado.errors.length} com problema</span>
                )}
              </div>

              {resultado.errors.length > 0 && (
                <ul className="bg-[#FEF2F2] border border-[#FECACA] rounded-md p-3 space-y-1 text-[#B91C1C] max-h-32 overflow-y-auto">
                  {resultado.errors.map(e => (
                    <li key={e.linha} className="flex items-start"><AlertTriangle className="w-3.5 h-3.5 mr-1.5 mt-px flex-shrink-0" /> Linha {e.linha}: {e.motivo}</li>
                  ))}
                </ul>
              )}

              {resultado.changes.length > 0 && (
                <div className="max-h-72 overflow-y-auto border border-[#CBD5E1] rounded-md">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 text-[#475569] uppercase font-bold sticky top-0">
                      <tr>
                        <th className="py-2 px-3">Fornecedor</th>
                        <th className="py-2 px-3">Contato</th>
                        <th className="py-2 px-3">E-mail</th>
                        <th className="py-2 px-3">Telefone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CBD5E1]">
                      {resultado.changes.map(c => (
                        <tr key={c.supplier.id}>
                          <td className="py-2 px-3 font-semibold">{c.supplier.nomeFantasia}</td>
                          {(['contatoNome', 'contatoEmail', 'contatoTelefone'] as const).map(campo => {
                            const mudou = c.novo[campo] !== c.supplier[campo];
                            return (
                              <td key={campo} className={`py-2 px-3 ${mudou ? 'bg-[#ECFDF5] text-[#047857] font-semibold' : 'text-[#475569]'}`}>
                                {c.novo[campo] || '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button onClick={onClose} className="px-4 py-2 font-medium text-[#172B4D] bg-white border border-[#CBD5E1] rounded-md hover:bg-slate-50 cursor-pointer">
                  Cancelar
                </button>
                <button
                  onClick={handleAplicar}
                  disabled={!resultado.changes.length}
                  className="inline-flex items-center px-5 py-2 font-bold text-white bg-[#047857] hover:bg-[#065F46] rounded-md shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aplicar {resultado.changes.length} alteraç{resultado.changes.length === 1 ? 'ão' : 'ões'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
