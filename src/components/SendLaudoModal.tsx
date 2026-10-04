import React, { useEffect, useMemo, useState } from 'react';
import { Evaluation, Sector, Supplier, User } from '../types';
import {
  buildLaudoEmail,
  buildMailto,
  computeLaudoCode,
  formatDateTime,
  getLastEnvio,
  isValidEmail,
  registerEnvio
} from '../services/laudoEnvioService';
import { Mail, X, Copy, CheckCircle2, ExternalLink, Paperclip, AlertTriangle } from 'lucide-react';

interface SendLaudoModalProps {
  evaluation: Evaluation;
  supplier?: Supplier;
  sector?: Sector;
  currentUser: User | null;
  onConfirmSent: (updatedEval: Evaluation) => void;
  onClose: () => void;
}

export const SendLaudoModal: React.FC<SendLaudoModalProps> = ({
  evaluation,
  supplier,
  sector,
  currentUser,
  onConfirmSent,
  onClose
}) => {
  const [destinatario, setDestinatario] = useState(supplier?.contatoEmail || '');
  const [codigo, setCodigo] = useState('');
  const [outlookAberto, setOutlookAberto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    computeLaudoCode(evaluation).then(setCodigo);
  }, [evaluation]);

  const { assunto, corpo } = useMemo(
    () => buildLaudoEmail(evaluation, supplier, sector, currentUser, codigo || '…'),
    [evaluation, supplier, sector, currentUser, codigo]
  );

  const ultimoEnvio = getLastEnvio(evaluation);
  const emailValido = isValidEmail(destinatario);

  const handleAbrirOutlook = () => {
    if (!emailValido || !codigo) return;
    window.location.href = buildMailto(destinatario, assunto, corpo);
    setOutlookAberto(true);
  };

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(`Para: ${destinatario}\nAssunto: ${assunto}\n\n${corpo}`);
      setCopiado(true);
      setOutlookAberto(true);
    } catch {
      alert('Não foi possível copiar automaticamente. Selecione o texto da prévia e copie manualmente.');
    }
  };

  const handleConfirmar = () => {
    if (!emailValido || !codigo) return;
    onConfirmSent(registerEnvio(evaluation, {
      enviadoPor: currentUser?.nome || evaluation.gestorAvaliador || 'Gestor',
      enviadoPorEmail: currentUser?.email,
      destinatario: destinatario.trim(),
      assunto,
      codigoLaudo: codigo
    }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-[#CBD5E1] overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#123768] text-white p-5 flex items-center justify-between border-b border-[#0B2850]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 text-white rounded-md border border-white/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Enviar Laudo ao Fornecedor</h3>
              <p className="text-xs text-slate-300">O e-mail sai do seu Outlook e o envio fica registrado no sistema</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition cursor-pointer" title="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-[#172B4D]">
          {ultimoEnvio && (
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] p-3 rounded-md">
              Último envio em <strong>{formatDateTime(ultimoEnvio.dataHora)}</strong> para <strong>{ultimoEnvio.destinatario}</strong>, por {ultimoEnvio.enviadoPor}.
              {codigo && ultimoEnvio.codigoLaudo !== codigo && (
                <span className="flex items-center mt-1 text-[#92400E] font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> O laudo foi alterado depois desse envio. Recomenda-se reenviar.
                </span>
              )}
            </div>
          )}

          {/* Passo 1: destinatário */}
          <div>
            <label className="block font-bold mb-1">1. E-mail do fornecedor *</label>
            <input
              type="email"
              value={destinatario}
              onChange={(e) => { setDestinatario(e.target.value); setOutlookAberto(false); }}
              placeholder="contato@fornecedor.com.br"
              className="w-full bg-slate-50 border border-[#CBD5E1] text-[#172B4D] text-xs rounded-md p-2.5 font-medium focus:ring-2 focus:ring-[#123768] focus:border-[#123768] placeholder:text-[#94A3B8]"
            />
            <p className="mt-1 text-[11px] text-[#475569]">
              {supplier?.contatoEmail
                ? `Preenchido com o contato do contrato${supplier.contatoNome ? ` (${supplier.contatoNome})` : ''}.`
                : 'Este fornecedor não tem e-mail de contato cadastrado. Informe o endereço e, se possível, atualize o cadastro em Fornecedores.'}
            </p>
          </div>

          {/* Passo 2: prévia */}
          <div>
            <span className="block font-bold mb-1">2. Mensagem que será aberta no Outlook</span>
            <div className="bg-slate-50 border border-[#CBD5E1] rounded-md p-3 space-y-2">
              <p><span className="text-[#475569]">Assunto:</span> <strong>{assunto}</strong></p>
              <pre className="whitespace-pre-wrap font-sans text-[11px] text-[#172B4D] max-h-48 overflow-y-auto border-t border-[#CBD5E1] pt-2">{corpo}</pre>
            </div>
            <p className="mt-1.5 flex items-start text-[11px] text-[#92400E]">
              <Paperclip className="w-3.5 h-3.5 mr-1 mt-px flex-shrink-0" />
              Anexe o PDF do laudo antes de enviar (no laudo, botão "Baixar PDF").
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAbrirOutlook}
              disabled={!emailValido || !codigo}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ExternalLink className="w-4 h-4 mr-1.5" />
              Abrir no Outlook
            </button>
            <button
              type="button"
              onClick={handleCopiar}
              disabled={!emailValido || !codigo}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-[#172B4D] bg-white border border-[#CBD5E1] hover:bg-slate-50 rounded-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4 mr-1.5" />
              {copiado ? 'Texto copiado' : 'Copiar texto (se o Outlook não abrir)'}
            </button>
          </div>

          {/* Passo 3: confirmação */}
          <div className="pt-4 border-t border-[#CBD5E1] space-y-3">
            <span className="block font-bold">3. Depois de enviar o e-mail no Outlook, confirme aqui</span>
            <p className="text-[11px] text-[#475569]">
              Fica registrado: data e hora, quem enviou, o destinatário e o código de verificação <strong className="font-mono text-[#172B4D]">{codigo || '…'}</strong>.
              Guarde a mensagem em "Itens Enviados" — ela é a prova do envio.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#172B4D] bg-white border border-[#CBD5E1] rounded-md hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmar}
                disabled={!outlookAberto || !emailValido}
                title={outlookAberto ? '' : 'Abra o e-mail no Outlook (ou copie o texto) antes de confirmar'}
                className="inline-flex items-center px-5 py-2 text-xs font-bold text-white bg-[#047857] hover:bg-[#065F46] rounded-md shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Confirmo que enviei o e-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
