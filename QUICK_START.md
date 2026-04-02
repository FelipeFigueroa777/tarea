# 🚀 INICIO RÁPIDO - PetCare Clínica Veterinaria

**Tiempo de setup**: < 2 minutos  
**Requisitos**: Navegador moderno + Editor de código

---

## 📖 Paso 1: Obtener el Código

### Opción A: Git (Recomendado)
```bash
git clone https://github.com/tu-usuario/petcare-clinic.git
cd petcare-clinic
```

### Opción B: Descargar ZIP
1. Ve a GitHub y descarga como ZIP
2. Extrae en tu carpeta
3. Abre terminal en esa carpeta

---

## 🌐 Paso 2: Ejecutar Servidor Local

Elige tu opción según tu sistema:

### Python 3 (Recomendado)
```bash
python -m http.server 8000
```

### Python 2
```bash
python -m SimpleHTTPServer 8000
```

### Node.js
```bash
npx http-server
```

### Ruby
```bash
ruby -run -ehttpd . -p8000
```

### Windows (PowerShell)
```powershell
python -m http.server 8000
```

---

## 🔗 Paso 3: Abrir en Navegador

**Dirección**: `http://localhost:8000`

✅ La página debe verse perfectamente  
✅ Prueba la navegación móvil  
✅ Abre DevTools (F12) para inspeccionar

---

## 🎨 Personalización Rápida

### Cambiar Colores

**Archivo**: `styles.css` (línea 1-60)

```css
:root {
    --color-primary: #10b981;      /* ← Cambiar aquí */
    --color-secondary: #3b82f6;    /* ← O aquí */
}
```

### Cambiar Nombre del Negocio

**Archivo**: `index.html`

```html
<span class="logo__text">PetCare</span>  <!-- Cambiar aquí -->
<title>PetCare - Clínica Veterinaria</title> <!-- Y aquí -->
```

### Cambiar Información de Contacto

**Archivo**: `index.html` (sección contacto)

```html
<p class="contact-item__text">
    Avenida Principal 123  <!-- Cambiar dirección -->
    Ciudad Veterinaria, CP 12345
</p>
```

---

## ✅ Verificaciones

### Accesibilidad
```
✓ Abre DevTools (F12)
✓ Ve a Lighthouse
✓ Click "Analyze page load"
✓ Esperado: Accessibility 98+
```

### Responsive
```
✓ DevTools → Toggle device toolbar (Ctrl+Shift+M)
✓ Prueba: iPhone 12, iPad, Desktop
✓ Todos deberían verse bien
```

### Validación HTML
```
Ir a: https://validator.w3.org/
Cargar archivo
Esperado: 0 errores
```

---

## 📁 Estructura de Archivos

```
petcare-clinic/
├── index.html          ← Página principal
├── styles.css          ← Todos los estilos
├── script.js           ← Interactividad
├── README.md           ← Documentación completa
├── ESTRATEGIA_CONCEPTUAL.md ← Análisis detallado
├── QUICK_START.md      ← Este archivo
└── .gitignore          ← Para Git
```

---

## 🛠️ Desarrollo Local

### Editar Código

1. Abre `index.html` en tu editor (VS Code recomendado)
2. Cambia cualquier cosa
3. Guarda (Ctrl+S)
4. Actualiza navegador (F5)

✅ Los cambios aparecen al instante

### Ejemplo: Cambiar Servicio

**En `index.html`, busca**:
```html
<article class="service-card">
    <div class="service-card__icon">🏥</div>
    <h3 class="service-card__title">Medicina General</h3>
    <!-- Editar aquí -->
</article>
```

---

## 🚀 Publicar en Internet

### Opción 1: GitHub Pages (Gratuito)

```bash
# 1. Sube a GitHub
git push origin main

# 2. Ve a Settings → Pages
# 3. Selecciona branch: main
# 4. URL: https://tu-usuario.github.io/petcare-clinic
```

### Opción 2: Netlify (Gratuito + Fácil)

1. Ve a `netlify.com`
2. Conecta tu repositorio GitHub
3. Deploy automático ✅

### Opción 3: Hosting Tradicional

```bash
# Upload via FTP todos los archivos
index.html
styles.css
script.js
```

---

## 🐛 Troubleshooting

### "Archivo no encontrado" en navegador
```
✓ Asegúrate de ejecutar servidor local
✓ URL debe ser: http://localhost:8000
✓ NO: file:///C:/ruta/index.html
```

### "Estilos no cargan"
```
✓ Abre DevTools (F12)
✓ Network tab → ¿Falta styles.css?
✓ Verifica ruta en HTML: <link rel="stylesheet" href="styles.css">
```

### "JavaScript no funciona"
```
✓ Console tab en DevTools
✓ ¿Hay errores en rojo?
✓ Recarga página: Ctrl+Shift+R (cache limpio)
```

---

## 📚 Siguientes Pasos

1. **Lee README.md** - Documentación técnica completa
2. **Lee ESTRATEGIA_CONCEPTUAL.md** - Análisis de diseño
3. **Personaliza contenido** - Cambia nombres, colores, servicios
4. **Sube a Git** - `git push origin main`
5. **Publica online** - GitHub Pages o Netlify

---

## 💡 Tips Profesionales

✅ **Hacer un backup** antes de cambios grandes
```bash
git commit -m "backup: before major changes"
```

✅ **Ver cambios antes de guardar**
```bash
git diff
```

✅ **Volver a versión anterior**
```bash
git revert HEAD
```

✅ **Crear rama para experimentos**
```bash
git checkout -b feature/nuevo
```

---

## 📞 Soporte

**Documentación**: [README.md](README.md)  
**Estrategia**: [ESTRATEGIA_CONCEPTUAL.md](ESTRATEGIA_CONCEPTUAL.md)  
**Email**: info@petcare-clinic.com  
**Issues**: [GitHub Issues](https://github.com/tu-usuario/petcare/issues)

---

## 🏆 Objetivo Logrado ✅

- ✅ Landing page profesional
- ✅ HTML5 semántico
- ✅ CSS3 moderno
- ✅ JavaScript funcional
- ✅ Accesibilidad WCAG AA
- ✅ Responsive design
- ✅ Listo para producción

**¡Felicidades! Tu sitio está listo.** 🚀
