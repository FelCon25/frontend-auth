# Sessione 1 - AuthCard Refactor (Guida Operativa)

Questa guida ti fa completare la Sessione 1 in modo pulito: estrarre `AuthCard` e rimuovere duplicazioni da `LoginForm` e `RegistrationForm`.

## Obiettivo della sessione

A fine lavoro devi avere:
- un componente riusabile `AuthCard`
- `LoginForm` e `RegistrationForm` con solo logica form + campi
- stesso layout/header nei due form

Nessun cambiamento funzionale: solo refactor UI/struttura.

---

## Step 1 - Crea `AuthCard`

**File:** `src/features/auth/components/AuthCard.tsx`

### Cosa deve fare
- centrare la card nella viewport
- renderizzare titolo e descrizione
- ospitare `children` (il form)
- permettere larghezza diversa (`max-w-md`, `max-w-lg`, ecc.)

### Props consigliate
- `title: string`
- `description?: string`
- `children: React.ReactNode`
- `maxWidthClassName?: string` (default `max-w-md`)

### Snippet pronto

```tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type AuthCardProps = {
  title: string
  description?: string
  children: ReactNode
  maxWidthClassName?: string
}

export default function AuthCard({
  title,
  description,
  children,
  maxWidthClassName = "max-w-md",
}: AuthCardProps) {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div
        className={cn(
          "w-full rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm",
          maxWidthClassName
        )}
      >
        <header className="mb-2 space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </header>
        {children}
      </div>
    </div>
  )
}
```

---

## Step 2 - Aggiorna `LoginForm`

**File:** `src/features/auth/components/LoginForm.tsx`

### Cosa cambiare
1. importa `AuthCard`
2. rimuovi i `div` wrapper outer/card/header attuali
3. wrappa il form con:

```tsx
<AuthCard
  title="Login to your account"
  description="Enter your credentials to continue."
>
  <form className="space-y-4" ...>
    ...
  </form>
</AuthCard>
```

### Regole da non toccare
- lascia invariati `useForm`, `register`, `handleSubmit`, errori
- non cambiare i nomi campo

---

## Step 3 - Aggiorna `RegistrationForm`

**File:** `src/features/auth/components/RegistrationForm.tsx`

### Cosa cambiare
Stesso refactor del login, ma con card piu' larga:

```tsx
<AuthCard
  title="Create your account"
  description="Start by filling in your details."
  maxWidthClassName="max-w-lg"
>
  <form className="space-y-4" ...>
    ...
  </form>
</AuthCard>
```

### Mantieni
- `grid gap-3 sm:grid-cols-2` sui blocchi a 2 colonne
- bottone full width con `mt-2 w-full`

---

## Step 4 - Uniforma stile (micro-regole)

Conferma che entrambi i form usano:
- card: `rounded-lg border border-border bg-card p-6 shadow-sm`
- header: `mb-2 space-y-1`
- titolo: `text-2xl font-bold`
- descrizione: `text-sm text-muted-foreground`
- form spacing: `space-y-4`

Se una regola differisce senza motivo, allineala.

---

## Step 5 - Verifica finale

Checklist veloce:
- [ ] `AuthCard.tsx` creato e compilante
- [ ] Login usa `AuthCard`
- [ ] Register usa `AuthCard`
- [ ] Nessun wrapper card/header duplicato nei due form
- [ ] Build/lint senza errori
- [ ] UI identica o migliore rispetto a prima

---

## Errori comuni da evitare

- Estrarre troppo: in Sessione 1 non creare hook/API layer.
- Cambiare logica RHF mentre refattorizzi layout.
- Rinominare campi senza aggiornare schema/register.

Regola: Sessione 1 = solo composizione UI.

---

## Done criteria (quando puoi chiuderla)

Puoi considerare Sessione 1 completata quando:
- il codice dei due form e' chiaramente piu' corto/leggibile
- il layout condiviso vive in un solo posto (`AuthCard`)
- non hai introdotto regressioni funzionali

