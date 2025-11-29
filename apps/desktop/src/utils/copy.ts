import { toast } from "sonner";

export function copy(content: string) {
  return () => {
    try {
      navigator.clipboard.writeText(content);
      toast.success("Copiado para a área de transferência");
    } catch (error) {
      toast.error("Erro ao copiar para a área de transferência");
    }
  };
}
