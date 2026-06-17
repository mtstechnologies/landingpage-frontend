import { useState } from "react";
import { X, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { availableTechnologies } from "../mocks/data";
import type { ProjectFormValues } from "../types";

interface Props {
  initialValues?: Partial<ProjectFormValues>;
  onSubmit?: (values: ProjectFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const defaultValues: ProjectFormValues = {
  title: "",
  description: "",
  repoUrl: "",
  liveUrl: "",
  technologies: [],
  status: "draft",
};

export function ProjectForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Salvar projeto",
}: Props) {
  const [values, setValues] = useState<ProjectFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const update = <K extends keyof ProjectFormValues>(key: K, val: ProjectFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const addTech = (tech: string) => {
    if (!tech || values.technologies.includes(tech)) return;
    update("technologies", [...values.technologies, tech]);
  };
  const removeTech = (tech: string) =>
    update(
      "technologies",
      values.technologies.filter((t) => t !== tech),
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-6 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Informações gerais</h2>
          <p className="text-sm text-muted-foreground">
            Dados principais exibidos na vitrine do portfólio.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex: Orbit Analytics"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Descreva o projeto em poucas linhas..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repoUrl">URL do repositório</Label>
            <Input
              id="repoUrl"
              type="url"
              value={values.repoUrl}
              onChange={(e) => update("repoUrl", e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveUrl">URL de produção</Label>
            <Input
              id="liveUrl"
              type="url"
              value={values.liveUrl}
              onChange={(e) => update("liveUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={values.status}
              onValueChange={(v) => update("status", v as ProjectFormValues["status"])}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Tecnologias</h2>
          <p className="text-sm text-muted-foreground">
            Selecione a stack utilizada neste projeto.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 min-h-10 rounded-md border border-dashed border-border bg-background/50 p-3">
          {values.technologies.length === 0 && (
            <span className="text-sm text-muted-foreground">Nenhuma tecnologia selecionada.</span>
          )}
          {values.technologies.map((t) => (
            <Badge key={t} variant="secondary" className="gap-1 pl-2 pr-1 py-1">
              {t}
              <button
                type="button"
                onClick={() => removeTech(t)}
                className="ml-1 rounded-sm p-0.5 hover:bg-muted-foreground/20"
                aria-label={`Remover ${t}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {availableTechnologies
            .filter((t) => !values.technologies.includes(t))
            .map((t) => (
              <Button
                key={t}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addTech(t)}
                className="h-7 gap-1 text-xs"
              >
                <Plus className="h-3 w-3" />
                {t}
              </Button>
            ))}
        </div>
      </section>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
