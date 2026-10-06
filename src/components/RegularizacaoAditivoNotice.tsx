import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { RegularizacaoAditivo } from '../types';

export function descreverResponsavel(reg: RegularizacaoAditivo): string {
  return reg.responsavel === 'DOR'
    ? `DOR${reg.numeroDor ? ` nº ${reg.numeroDor}` : ''} aberta no Portal Conecta`
    : 'Aditivo em tratativa pelo Corporativo com o fornecedor';
}

const formatData = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR');
};

interface Props {
  regularizacao: RegularizacaoAditivo;
  compact?: boolean;
}

// Explicação para auditoria: vigência expirada, mas serviço mantido enquanto o aditivo é formalizado
export const RegularizacaoAditivoNotice: React.FC<Props> = ({ regularizacao, compact }) => {
  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] leading-tight"
        title={`${descreverResponsavel(regularizacao)}. Serviço mantido; pendência apenas de formalização jurídica.`}
      >
        <ShieldCheck className="w-3 h-3 shrink-0" />
        Aditivo em regularização
      </span>
    );
  }

  return (
    <div className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] rounded-md p-3 space-y-1.5 text-xs leading-snug">
      <strong className="flex items-center gap-1.5 text-[11px] uppercase text-[#1E40AF]">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        Aditivo em regularização jurídica
      </strong>
      <p>
        <strong>O serviço continua sendo prestado normalmente.</strong> A pendência é apenas a formalização jurídica do
        aditivo contratual.
      </p>
      <p>
        <span className="text-[#475569]">Tratativa:</span> <strong>{descreverResponsavel(regularizacao)}</strong>
      </p>
      {regularizacao.observacao && <p className="break-words">{regularizacao.observacao}</p>}
      <p className="text-[10px] text-[#475569]">
        Registrado por {regularizacao.registradoPor}
        {formatData(regularizacao.registradoEm) ? ` em ${formatData(regularizacao.registradoEm)}` : ''}
      </p>
    </div>
  );
};
