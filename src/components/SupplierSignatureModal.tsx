import React, { useState, useRef, useEffect } from 'react';
import { Evaluation, Sector, Supplier } from '../types';
import { getMetaBadgeDetails } from '../services/evaluationCalculation';
import { safeFormatScore } from '../utils/formatters';
import { PenTool, CheckCircle2, RotateCcw, X } from 'lucide-react';

interface SupplierSignatureModalProps {
  evaluation: Evaluation;
  supplier?: Supplier;
  sector?: Sector;
  onSaveSignature?: (updatedEval: Evaluation) => void;
  onSave?: (updatedEval: Evaluation) => void;
  onClose: () => void;
}

export const SupplierSignatureModal: React.FC<SupplierSignatureModalProps> = ({
  evaluation,
  supplier,
  sector,
  onSaveSignature,
  onSave,
  onClose
}) => {
  const [nomeSignatario, setNomeSignatario] = useState(evaluation.nomeSignatario || supplier?.contatoNome || '');
  const [cargoSignatario, setCargoSignatario] = useState(evaluation.cargoSignatario || 'Preposto / Gestor do Contrato');
  const [parecerFornecedor, setParecerFornecedor] = useState(evaluation.parecerFornecedor || '');
  const [hasDrawn, setHasDrawn] = useState(false);
  const initialSignature = evaluation.assinaturaBase64 || evaluation.assinaturaDigitalUrl;
  const [assinaturaBase64, setAssinaturaBase64] = useState<string | undefined>(initialSignature);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const badge = getMetaBadgeDetails(evaluation.statusMeta, evaluation.mediaGeral);

  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#0f172a'; // dark navy signature line
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasDrawn(true);
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setAssinaturaBase64(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setAssinaturaBase64(undefined);
      setHasDrawn(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const finalSignature = hasDrawn && canvas ? canvas.toDataURL() : (assinaturaBase64 || initialSignature);

    const updatedEval: Evaluation = {
      ...evaluation,
      statusAssinatura: 'ASSINADO_CIENTE',
      dataCiencia: new Date().toISOString().split('T')[0],
      nomeSignatario: nomeSignatario || supplier?.contatoNome || 'Preposto / Representante Legal',
      cargoSignatario: cargoSignatario || 'Representante do Fornecedor',
      parecerFornecedor,
      assinaturaBase64: finalSignature,
      assinaturaDigitalUrl: finalSignature
    };

    const callback = onSaveSignature || onSave;
    if (callback) {
      callback(updatedEval);
    } else {
      console.error('Nenhuma função de salvamento informada para SupplierSignatureModal.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500/20 text-teal-300 rounded-lg border border-teal-400/30">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Termo de Ciência e Assinatura do Fornecedor</h3>
              <p className="text-xs text-slate-300">Aceite digital do laudo de avaliação anual de contrato</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          {/* Resumo da Avaliação Avaliada */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-500 font-medium">Fornecedor Avaliado:</span>
                <h4 className="text-sm font-bold text-slate-900">{supplier?.nomeFantasia || 'Fornecedor Terceirizado'}</h4>
                <p className="text-[11px] text-slate-500 font-mono">CNPJ: {supplier?.cnpj || 'N/A'}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-medium block">Ano do Ciclo:</span>
                <span className="font-bold text-slate-800 text-sm">{evaluation.ano}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-center">
              <div>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">Legais</span>
                <strong className="text-slate-800 font-bold">{safeFormatScore(evaluation.mediaLegais)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">Comport.</span>
                <strong className="text-slate-800 font-bold">{safeFormatScore(evaluation.mediaComportamentais)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">Qualidade</span>
                <strong className="text-slate-800 font-bold">{safeFormatScore(evaluation.mediaQualidade)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">Média Geral</span>
                <span className={`font-extrabold px-1.5 py-0.5 rounded ${badge.colorClass}`}>
                  {safeFormatScore(evaluation.mediaGeral)}
                </span>
              </div>
            </div>
          </div>

          {/* Dados do Signatário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome do Representante Legal / Preposto *</label>
              <input
                type="text"
                required
                value={nomeSignatario}
                onChange={(e) => setNomeSignatario(e.target.value)}
                placeholder="Ex: Dr. André Fonseca"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cargo / Função *</label>
              <input
                type="text"
                required
                value={cargoSignatario}
                onChange={(e) => setCargoSignatario(e.target.value)}
                placeholder="Ex: Diretor de Operações / Gerente"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-medium"
              />
            </div>
          </div>

          {/* Parecer ou Considerações do Fornecedor */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Considerações / Parecer do Fornecedor (Opcional)</label>
            <textarea
              rows={3}
              value={parecerFornecedor}
              onChange={(e) => setParecerFornecedor(e.target.value)}
              placeholder="Digite aqui quaisquer ressalvas, comentários ou alinhamentos em resposta à avaliação do hospital..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5"
            />
          </div>

          {/* Canvas de Assinatura Digital */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800">Assinatura Digital na Tela *</label>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Limpar Assinatura
              </button>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 p-2 touch-none">
              <canvas
                ref={canvasRef}
                width={550}
                height={130}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full bg-white rounded border border-slate-200 cursor-crosshair"
              />
              <p className="text-[10px] text-slate-400 text-center mt-1">Desenhe a assinatura com o mouse ou na tela sensível ao toque</p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Confirmar Ciência e Registrar Assinatura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
