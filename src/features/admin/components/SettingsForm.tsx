import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export interface SettingsFormValues {
  siteTitle: string;
  seoDescription: string;
  isPublic: boolean;
}

const defaultValues: SettingsFormValues = {
  siteTitle: "Alex Morgan · Portfolio",
  seoDescription:
    "Portfólio de engenharia de software com estudos de caso de arquitetura e produtos digitais.",
  isPublic: true,
};

interface Props {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit?: (values: SettingsFormValues) => void;
  onCancel?: () => void;
}

export function SettingsForm({ initialValues, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<SettingsFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const update = <K extends keyof SettingsFormValues>(key: K, val: SettingsFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-6 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Site</h2>
          <p className="text-sm text-muted-foreground">
            Metadados exibidos em buscadores e redes sociais.
          </p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Título do site</Label>
            <Input
              id="siteTitle"
              value={values.siteTitle}
              onChange={(e) => update("siteTitle", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">Descrição SEO</Label>
            <Textarea
              id="seoDescription"
              value={values.seoDescription}
              onChange={(e) => update("seoDescription", e.target.value)}
              rows={3}
              placeholder="Texto curto exibido nos mecanismos de busca."
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Visibilidade</h2>
          <p className="text-sm text-muted-foreground">
            Controle se o portfólio público está acessível.
          </p>
        </header>

        <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/50 px-4 py-3">
          <div className="space-y-0.5">
            <Label htmlFor="isPublic" className="text-sm font-medium">
              Portfólio público
            </Label>
            <p className="text-xs text-muted-foreground">
              Quando desativado, o site exibe uma página de manutenção.
            </p>
          </div>
          <Switch
            id="isPublic"
            checked={values.isPublic}
            onCheckedChange={(v) => update("isPublic", v)}
          />
        </div>
      </section>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">Salvar configurações</Button>
      </div>
    </form>
  );
}
