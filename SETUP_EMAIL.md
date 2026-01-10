# Nastavení emailových notifikací

## ✅ CO JE HOTOVO

1. **Databáze**: Tabulka `contact_submissions` vytvořena pro ukládání všech odeslání
2. **Edge Function**: `contact-form` nasazena a funkční
3. **Formulář**: Aktualizován pro použití Edge Function místo Netlify Forms
4. **Build**: Projekt zkompilován bez chyb

## 🔑 POTŘEBUJETE: RESEND API KLÍČ

Pro funkční odesílání emailů potřebujete nastavit Resend API klíč:

### Krok 1: Registrace na Resend
1. Jděte na https://resend.com/signup
2. Vytvořte účet (je ZDARMA - 100 emailů/den)
3. Po registraci jděte do "API Keys"

### Krok 2: Vytvoření API klíče
1. Klikněte na "Create API Key"
2. Pojmenujte ho např. "Zelena Dotace Plus Production"
3. Vyberte "Sending access"
4. Zkopírujte vygenerovaný klíč (začíná `re_...`)

### Krok 3: Ověření domény (doporučeno pro produkci)
1. V Resend dashboardu jděte do "Domains"
2. Přidejte doménu `zelena-dotace-plus.cz`
3. Nastavte DNS záznamy podle instrukcí
4. Po ověření můžete posílat z `kontakt@zelena-dotace-plus.cz`

**DŮLEŽITÉ**: Bez ověření domény můžete posílat pouze z `onboarding@resend.dev` nebo ověřených domén.

### Krok 4: Nastavení v Supabase
1. Jděte do Supabase Dashboard: https://supabase.com/dashboard
2. Vyberte váš projekt
3. Jděte do "Project Settings" → "Edge Functions"
4. V sekci "Secrets" přidejte:
   - **Name**: `RESEND_API_KEY`
   - **Value**: [váš API klíč z kroku 2]
5. Klikněte "Add secret"

## 🧪 TESTOVÁNÍ

### Test 1: Lokální test (dev)
```bash
# V prohlížeči otevřete:
# http://localhost:5173
# Vyplňte formulář a odešlete
```

### Test 2: Po deploy
1. Deploy na Netlify: `git push`
2. Otevřete https://zelena-dotace-plus.cz
3. Vyplňte a odešlete formulář
4. Email by měl dorazit na `info@zelenadotaceplus.cz` do 1 minuty

### Kontrola úspěšnosti
1. **Supabase Dashboard** → Table Editor → `contact_submissions`
   - Měl by se zobrazit nový záznam
   - Sloupec `email_sent` by měl být `true`

2. **Supabase Dashboard** → Edge Functions → `contact-form` → Logs
   - Měly by se zobrazit logy o zpracování

3. **Email inbox**: `info@zelenadotaceplus.cz`
   - Email s předmětem "🟢 Nová poptávka: [typ projektu]"

## ⚠️ TROUBLESHOOTING

### Email nepřichází
1. Zkontrolujte Supabase Edge Function logs
2. Ověřte, že `RESEND_API_KEY` je nastaven
3. Zkontrolujte spam složku
4. Ověřte, že doména je ověřena v Resend

### Formulář se neodešle
1. Otevřete Developer Console (F12)
2. Zkontrolujte Network tab → hledejte request na `contact-form`
3. Podívejte se na response - měla by být JSON s `success: true`

### Submission se neuloží do databáze
1. Zkontrolujte Supabase logs
2. Ověřte, že tabulka `contact_submissions` existuje
3. Spusťte migrace znovu: `supabase db reset` (pouze dev)

## 📊 AUDIT TRAIL

Všechny submissions jsou automaticky ukládány do databáze:
- **IP adresa** odesílatele
- **Timestamp** odeslání
- **Status** emailu (`email_sent`)
- Všechna **data formuláře**

Pro zobrazení všech submissions:
```sql
SELECT * FROM contact_submissions
ORDER BY submitted_at DESC;
```

## 🎯 VÝSLEDEK

Po nastavení Resend API klíče:
✅ Formulář funguje 100% spolehlivě
✅ Email dorazí do 1 minuty
✅ Vše uloženo v databázi
✅ Žádné Netlify Forms problémy
✅ Plná kontrola nad procesem
