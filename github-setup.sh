#!/bin/bash
# GitHub Setup Script for ShortFlow Infinity
# Run this after extracting the ZIP file

echo "🚀 ShortFlow Infinity - GitHub Setup"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git nije instaliran"
    echo "📱 Na mobitelu instaliraj: Termux (Android) ili iSH (iOS)"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Nisi u pravoj mapi!"
    echo "📁 Prvo uđi u: cd shortflow-infinity-mobile"
    exit 1
fi

echo "✅ Git je instaliran"
echo ""

# Step 1: Prepare files
echo "📝 Priprema datoteka..."

# Hide real .env, create example
if [ -f ".env" ]; then
    mv .env .env.local
    echo "✅ .env preimenovan u .env.local (za tvoju sigurnost)"
fi

# Create .env.example if not exists
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
# Base44 Configuration
VITE_BASE44_API_URL=https://api.base44.com
VITE_BASE44_API_KEY=your_base44_api_key_here
EOF
    echo "✅ .env.example kreiran"
fi

# Add .env.local to .gitignore
if ! grep -q ".env.local" .gitignore; then
    echo ".env.local" >> .gitignore
    echo ".env" >> .gitignore
    echo "✅ .gitignore ažuriran"
fi

echo ""
echo "📋 Slijedi ove korake na GitHub-u:"
echo "==================================="
echo ""
echo "1. Otvori u pregledniku: github.com/new"
echo "2. Ime repozitorija: shortflow-infinity"
echo "3. Klikni 'Create repository'"
echo ""
echo "Zatim pokreni ove naredbe:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/TVOJ_USERNAME/shortflow-infinity.git"
echo "   git push -u origin main"
echo ""
