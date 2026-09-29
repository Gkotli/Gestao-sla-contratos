import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, RefreshCw } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { RemoteSync } from '../services/remoteSync';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleResetState = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleClearLocalCache = () => {
    // Descarta só a cópia deste navegador (nada é apagado no banco); ao recarregar,
    // os dados são baixados de novo do banco compartilhado.
    StorageService.clearLocalCache();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center p-6 text-[#172B4D] font-sans">
          <div className="bg-white max-w-xl w-full p-8 rounded-lg border border-[#CBD5E1] shadow-sm space-y-6 text-center">
            <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#172B4D]">Inconsistência de Dados Identificada</h2>
              <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                Foi detectada uma diferença no formato dos registros armazenados no navegador. O sistema evitou o travamento da página.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-slate-50 p-3 rounded-md border border-[#CBD5E1] text-left text-[11px] font-mono text-[#B91C1C] overflow-x-auto">
                <strong>Detalhe técnico:</strong> {this.state.error.message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleResetState}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-[#172B4D] bg-white border border-[#CBD5E1] hover:bg-slate-50 rounded-md transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recarregar Página
              </button>

              <button
                onClick={this.handleClearLocalCache}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-[#123768] hover:bg-[#0B2850] rounded-md shadow-sm transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {RemoteSync.isEnabled() ? 'Baixar Dados do Banco' : 'Limpar Dados Locais'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
