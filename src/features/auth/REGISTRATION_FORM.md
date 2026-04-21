# RegistrationForm — Scelte tecniche e stilistiche

Questo documento spiega come è costruito `RegistrationForm.tsx` e **perché** ogni scelta è stata fatta, con riferimenti al design system shadcn del progetto (`src/index.css`).

---

## 1. Architettura del componente

### Librerie usate
- `react-hook-form` → gestione form state, submit, validazione e performance (uncontrolled-like).
- `@hookform/resolvers/zod` → collega lo schema Zod al motore RHF.
- `zod` → validazione tipizzata e type inference per `RegisterInput`.
- `cn` (da `@/lib/utils`) → merge classi Tailwind evitando conflitti.
- `Button` (shadcn) → bottone coerente col design system.

### Perché questa combinazione
- RHF + Zod = **standard industriale** per form in React moderno.
- Tipi derivati da `z.infer<typeof registerSchema>` evitano duplicazione tra runtime e TypeScript.
- `cn()` è necessario per classi condizionali pulite (es. bordo errore).

---

## 2. Cosa è stato rimosso e perché

### `useState` manuali per ogni campo
Prima c'erano `email`, `password`, `username`, ecc. gestiti a mano. Con RHF non servono più: `register("campo")` collega l'input al form state interno di RHF. Tenere entrambi sarebbe ridondante e pericoloso (warning controlled/uncontrolled).

### `showPassword` e `showConfirmPassword`
Erano stati dichiarati ma non usati. Rimossi per evitare codice morto. Si possono reintrodurre in futuro come componente `PasswordInput` dedicato.

### `FormSubmitEvent` custom
Non serve più: con RHF si usa `handleSubmit(onSubmit)` e il tipo dei dati è `RegisterInput` (inferito da Zod).

### `rounded-md` sugli input
Nel tuo `index.css` è definito:

```css
--radius: 0;
```

Quindi **tutti i `rounded-*` del design system risultano 0**. Tenere `rounded-md` era fuorviante: sembrava arrotondato ma non lo era. Rimosso per coerenza col tema. Se in futuro vuoi angoli smussati, basta cambiare `--radius` nel CSS globale e ogni componente lo eredita.

### Errori ammassati in fondo al form
Prima erano tutti sotto, staccati dai campi. È una cattiva UX (non capisci a colpo d'occhio quale input è sbagliato) e pattern non standard. Spostati **sotto ciascun campo**.

### `hover:bg-primary/80 cursor-pointer` sul Button
Ridondante: il componente `Button` shadcn ha già gli stati hover nel suo `cva` interno. Aggiungere classi sovrascrive la logica del design system.

---

## 3. Coerenza con il design system shadcn

Il file `src/index.css` definisce token semantici via CSS variables (`--background`, `--foreground`, `--border`, `--input`, `--ring`, `--card`, `--destructive`, ecc.) che vengono mappati in Tailwind tramite `@theme inline`.

Sono stati usati **solo token semantici**, mai colori hardcoded (`gray-300`, `red-500`, ecc.), così:
- il form funziona automaticamente in **light e dark mode**;
- eventuali cambi di tema non richiedono toccare il componente;
- il form resta coerente col resto dell'app.

### Token usati e loro significato

| Classe Tailwind | Token CSS | Uso nel form |
|---|---|---|
| `bg-card` | `--card` | sfondo della card principale |
| `text-card-foreground` | `--card-foreground` | colore testo su card |
| `border-border` | `--border` | bordo della card |
| `bg-background` | `--background` | sfondo degli input |
| `border-input` | `--input` | bordo input normale |
| `focus-visible:ring-ring` | `--ring` | anello di focus accessibile |
| `text-muted-foreground` | `--muted-foreground` | testi secondari (placeholder, descrizioni) |
| `text-destructive` / `border-destructive` / `ring-destructive` | `--destructive` | stato errore |

---

## 4. Layout

### Centratura verticale + orizzontale
```
<div className="flex min-h-svh items-center justify-center p-6">
```

- `min-h-svh` → altezza minima pari alla "small viewport height", più stabile di `vh` su mobile.
- `flex items-center justify-center` → centra la card sia verticalmente che orizzontalmente.
- `p-6` → evita che la card tocchi i bordi dello schermo.

### Larghezza della card
```
<div className="w-full max-w-lg ...">
```
- `w-full` → occupa tutta la larghezza disponibile su mobile.
- `max-w-lg` → si ferma a circa 512px su desktop per restare leggibile.

### Griglia dei campi
- Sezione nome/cognome e password/conferma: `grid gap-4 sm:grid-cols-2` → una colonna su mobile, due su desktop (responsive senza media queries manuali).
- Ogni singolo field: `grid gap-2` → stack verticale label → input → errore con spacing coerente.
- Il form stesso: `grid gap-5` → separazione uniforme tra le sezioni.

---

## 5. Accessibilità (a11y)

Sono presenti le pratiche considerate **obbligatorie in codice professionale**:

- `label` con `htmlFor` legato all'`id` dell'input → click sulla label mette focus all'input e gli screen reader associano label e campo.
- `aria-invalid={Boolean(errors.campo)}` → comunica lo stato errore agli assistive tools.
- `aria-describedby="campo-error"` + `id` sul `<p>` errore → lo screen reader legge il messaggio quando l'input ha focus.
- `focus-visible:ring-2 focus-visible:ring-ring` → focus ring chiaramente visibile per chi naviga da tastiera.
- `noValidate` sul `<form>` → disabilita la validazione HTML nativa, così la validazione Zod è l'unica fonte di verità.

---

## 6. Gestione errori e layout shift

### Struttura di ogni field
Ogni campo è renderizzato dal componente interno `TextField`. La struttura è:

```
<label class="mb-1.5 block text-sm font-medium">
<input class="h-10 ..." />
<p class="mt-1 text-xs leading-4 text-destructive min-h-4">
```

- `mb-1.5` sulla label e `mt-1` sull'errore → spacing **compatto** e identico sopra/sotto l'input, senza il "gap-2" esagerato della versione precedente.
- `text-xs leading-4` sul messaggio errore → testo piccolo e line-height stretto, coerente con come shadcn mostra le helper text.

### Riserva di spazio per i messaggi di errore
Il `<p>` dell'errore ha altezza minima fissa così il layout non salta:

- campi normali: `min-h-4` (una riga da 16px)
- password / conferma: `min-h-8` (due righe, perché gli errori di regex sono lunghi)

Perché? Se l'errore appare solo quando presente, il layout "salta" e spinge gli altri campi verso il basso al primo errore: pessima UX. Prenotare lo spazio evita il **layout shift** ed è una pratica standard nelle UI reali.

### Perché un componente interno `TextField`
Prima ogni campo era duplicato 6 volte con ~15 righe di JSX ciascuno. Ora c'è un solo componente tipizzato (`id: keyof RegisterInput`) che:
- elimina duplicazione,
- forza coerenza (se cambio stile, cambio in un punto solo),
- riduce il file da 210 a ~150 righe.

### Bordo rosso + ring rosso sugli input invalidi
Usando `cn()`:
```tsx
errors.campo
  ? "border-destructive focus-visible:ring-destructive"
  : "border-input"
```
Feedback visivo immediato e coerente col token `--destructive`.

---

## 7. Scelte su React Hook Form

### `mode: "onBlur"`
Gli errori compaiono **quando l'utente esce dal campo**, non ad ogni tasto. Miglior equilibrio tra feedback rapido e non essere invadenti mentre l'utente scrive (che è invece il caso con `mode: "onChange"`).

### `isSubmitting` sul bottone
Il bottone viene disabilitato e cambia testo durante la submit. Previene doppi invii e dà feedback chiaro.

### `register("campo")` invece di `value`/`onChange` manuali
RHF usa un approccio uncontrolled ottimizzato: meno re-render, codice più conciso, validazione integrata. Si passa come spread: `{...register("email")}` inietta `name`, `onChange`, `onBlur`, `ref`.

---

## 8. Cose non ancora fatte (prossimi step suggeriti)

- Estrarre un componente `TextField` riusabile per eliminare la ripetizione tra i campi.
- Aggiungere toggle "mostra password" usando un `PasswordInput` con icona.
- Collegare `onSubmit` al backend `/api/v1/auth/register` via `fetch` con `credentials: "include"`.
- Gestire errori server (es. email già in uso → `setError("email", ...)`).
- Aggiungere stato di successo e redirect dopo registrazione.

---

## 9. TL;DR delle scelte chiave

| Decisione | Motivo |
|---|---|
| Rimossi `useState` dei campi | Duplicavano lo state già gestito da RHF |
| Rimosso `rounded-md` | Incoerente con `--radius: 0` del design system |
| Token semantici ovunque (`bg-card`, `text-destructive`, ...) | Supporto light/dark automatico e coerenza con shadcn |
| Errori sotto ogni campo con altezza minima | Miglior UX e nessun layout shift |
| `aria-invalid` + `aria-describedby` | Accessibilità reale, non cosmetica |
| `mode: "onBlur"` | Feedback utile ma non invadente |
| `isSubmitting` sul `Button` | Previene doppi invii |
| `noValidate` sul `<form>` | Zod unica fonte di verità sulla validazione |
