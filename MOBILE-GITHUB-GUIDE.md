# 📱 GitHub + Mobile Upute (Android/iOS)

## 🎯 Cilj
Postavit ćeš projekt na GitHub i buildati APK bez računala!

---

## 1️⃣ Instaliraj Terminal App

### Android: **Termux**
- Google Play ili F-Droid → "Termux"

### iPhone: **iSH**  
- App Store → "iSH"

---

## 2️⃣ Otvori Terminal u Termux/iSH

### Termux (Android):
```bash
termux-setup-storage
cd /storage/emulated/0/Download/shortflow-infinity-mobile
bash github-setup.sh
```

---

## 3️⃣ Kreiraj GitHub Repozitorij (U Pregledniku)

1. 📱 Otvori Chrome
2. 🌐 Idi na: **github.com/new**
3. 📝 Ime: `shortflow-infinity`
4. 🟢 Klikni: **Create repository**

---

## 4️⃣ Uploadaj Datoteke (NAJLAKŠE)

1. U repozitoriju klikni **"uploading an existing file"**
2. Odaberi datoteke (po potrebi u više komada)
3. Klikni **"Commit changes"**

---

## 5️⃣ Postavi API Ključ 🔑

1. 🔧 Settings → Secrets and variables → Actions
2. ➕ New repository secret
3. Name: `VITE_BASE44_API_KEY`
4. Value: `29fc6820ef8a41e3819d0334c8cdb979`
5. 🟢 Add secret

---

## 6️⃣ Pokreni Build 🤖

1. Klikni **Actions** u repozitoriju
2. Pričekaj 5-10 minuta
3. Preuzmi APK iz **Artifacts** 🎉

---

## 🆘 Pomoć

Ako zapneš, slobodno pitaj! 🚀
