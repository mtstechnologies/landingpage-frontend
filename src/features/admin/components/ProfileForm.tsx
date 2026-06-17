import { useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileFormValues {
  name: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  avatarUrl: string;
}

const defaultValues: ProfileFormValues = {
  name: "Alex Morgan",
  bio: "Engenheiro de software focado em arquitetura de sistemas distribuídos e experiências web performáticas.",
  githubUrl: "https://github.com/alexmorgan",
  linkedinUrl: "https://linkedin.com/in/alexmorgan",
  avatarUrl: "",
};

interface Props {
  initialValues?: Partial<ProfileFormValues>;
  onSubmit?: (values: ProfileFormValues) => void;
  onCancel?: () => void;
}

export function ProfileForm({ initialValues, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<ProfileFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const update = <K extends keyof ProfileFormValues>(key: K, val: ProfileFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  const initials = values.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-6 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Identidade</h2>
          <p className="text-sm text-muted-foreground">
            Informações exibidas publicamente no portfólio.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-semibold">
            {initials || "?"}
          </div>
          <div className="space-y-2">
            <Button type="button" variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Enviar avatar
            </Button>
            <p className="text-xs text-muted-foreground">PNG ou JPG, até 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={values.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={4}
              placeholder="Conte um pouco sobre você..."
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <header>
          <h2 className="text-base font-semibold text-foreground">Redes</h2>
          <p className="text-sm text-muted-foreground">Links profissionais exibidos no rodapé.</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={values.githubUrl}
              onChange={(e) => update("githubUrl", e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              type="url"
              value={values.linkedinUrl}
              onChange={(e) => update("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">Salvar perfil</Button>
      </div>
    </form>
  );
}
