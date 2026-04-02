/**
 * PetCare - Script Principal
 * Autor: Comité de Expertos en Ingeniería de Software
 * Descripción: Interactividad y mejora de experiencia del usuario
 */

// ========== 1. UTILIDADES Y HELPERS ==========

/**
 * Selecciona un elemento del DOM
 * @param {string} selector - Selector CSS
 * @returns {HTMLElement|null}
 */
const select = (selector) => document.querySelector(selector);

/**
 * Selecciona múltiples elementos del DOM
 * @param {string} selector - Selector CSS
 * @returns {NodeList}
 */
const selectAll = (selector) => document.querySelectorAll(selector);

/**
 * Añade una clase a un elemento
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Nombre de clase
 */
const addClass = (element, className) => element?.classList.add(className);

/**
 * Remueve una clase de un elemento
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Nombre de clase
 */
const removeClass = (element, className) => element?.classList.remove(className);

/**
 * Alterna una clase en un elemento
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Nombre de clase
 */
const toggleClass = (element, className) => element?.classList.toggle(className);

// ========== 2. NAVEGACIÓN MÓVIL ==========

class MobileNavigation {
    /**
     * Inicializa la navegación móvil
     */
    constructor() {
        this.navToggle = select('#nav-toggle');
        this.navMenu = select('#nav-menu');
        this.navLinks = selectAll('.nav__link');
        this.isOpen = false;
        
        this.init();
    }

    /**
     * Inicializa los event listeners
     */
    init() {
        if (!this.navToggle || !this.navMenu) return;
        
        // Toggle del menú
        this.navToggle.addEventListener('click', () => this.toggle());
        
        // Cerrar menú al hacer click en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (event) => {
            if (!this.navToggle?.contains(event.target) && 
                !this.navMenu?.contains(event.target) &&
                this.isOpen) {
                this.close();
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Alterna el estado del menú
     */
    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    /**
     * Abre el menú de navegación
     */
    open() {
        this.isOpen = true;
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navMenu.setAttribute('data-active', 'true');
    }

    /**
     * Cierra el menú de navegación
     */
    close() {
        this.isOpen = false;
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.removeAttribute('data-active');
    }
}

// ========== 3. FORMULARIO DE CONTACTO ==========

class ContactForm {
    /**
     * Inicializa el formulario de contacto
     */
    constructor() {
        this.form = select('.contact__form');
        this.init();
    }

    /**
     * Inicializa el formulario
     */
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });
        
        // Validación en tiempo real
        const inputs = selectAll('.form-group__input, .form-group__textarea, .form-group__select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    /**
     * Maneja el envío del formulario
     * @param {Event} event - Evento de envío
     */
    handleSubmit(event) {
        event.preventDefault();
        
        // Validar todos los campos requeridos
        const formData = new FormData(this.form);
        const isValid = this.validateForm();
        
        if (!isValid) {
            console.log('Formulario inválido');
            return;
        }
        
        // Validar fecha y hora
        const selectedDate = new Date(formData.get('date') + 'T' + formData.get('time'));
        const now = new Date();
        
        if (selectedDate <= now) {
            alert('Por favor, selecciona una fecha y hora futura.');
            return;
        }
        
        // Aquí se enviaría el formulario a un servidor
        console.log('Cita agendada - Datos:', Object.fromEntries(formData));
        
        // Mostrar mensaje de éxito
        this.showSuccessMessage('¡Cita agendada exitosamente! Te enviaremos una confirmación por email.');
        
        // Limpiar formulario
        this.form.reset();
    }

    /**
     * Valida todo el formulario
     * @returns {boolean}
     */
    validateForm() {
        const inputs = selectAll('.form-group__input[required], .form-group__textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Valida un campo individual
     * @param {HTMLElement} field - Campo a validar
     * @returns {boolean}
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Validar email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        // Validar teléfono
        if (type === 'tel' && value) {
            const phoneRegex = /^[+\d\s().-]{10,}$/;
            isValid = phoneRegex.test(value);
        }
        
        // Actualizar estado visual
        const formGroup = field.closest('.form-group');
        if (isValid) {
            removeClass(formGroup, 'form-group--error');
        } else {
            addClass(formGroup, 'form-group--error');
        }
        
        return isValid;
    }

    /**
     * Muestra un mensaje de éxito
     *
     * Nota: esta función añade notificación visual y también usa roles/accessibility para usuarios con lectores de pantalla.
     */
    showSuccessMessage() {
        // Crear elemento de mensaje
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '✓ Mensaje enviado correctamente. Nos contactaremos pronto.';
        message.setAttribute('role', 'alert');
        message.setAttribute('aria-live', 'polite');
        
        // Añadir estilos inline básicos
        message.style.cssText = `
            background-color: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            animation: slideDown 0.3s ease-in-out;
        `;
        
        // Insertar mensaje
        this.form.parentNode.insertBefore(message, this.form);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// ========== 4. SCROLL SUAVE ==========

class SmoothScroll {
    /**
     * Inicializa el scroll suave
     */
    constructor() {
        this.init();
    }

    /**
     * Configura los event listeners para scroll suave
     */
    init() {
        // Los navegadores modernos soportan scroll-behavior en CSS
        // Este código es un fallback para navegadores antiguos
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = select(targetId);
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// ========== 5. INTERSECTION OBSERVER - ANIMACIONES AL SCROLL ==========

class ScrollAnimation {
    /**
     * Inicializa las animaciones al scroll
     */
    constructor() {
        this.init();
    }

    /**
     * Configura el Intersection Observer
     */
    init() {
        // Opciones del observer
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Crear observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addClass(entry.target, 'animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observar elementos animables
        selectAll('.service-card, .team-member, .testimonial-card').forEach(element => {
            observer.observe(element);
        });
    }
}

// ========== 6. ACCESIBILIDAD - SKIP LINK ==========

class SkipLink {
    /**
     * Inicializa el skip link
     */
    constructor() {
        this.init();
    }

    /**
     * Configura el skip link
     */
    init() {
        // Crear skip link si no existe
        let skipLink = select('.skip-to-main');
        if (!skipLink) {
            skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Saltar al contenido principal';
            skipLink.className = 'sr-only skip-to-main';
            skipLink.style.cssText = `
                position: absolute;
                left: -9999px;
                z-index: 999;
                padding: 0.5rem;
                background-color: #10b981;
                color: white;
                text-decoration: none;
                border-radius: 0.25rem;
            `;
            
            skipLink.addEventListener('focus', () => {
                skipLink.style.left = '50%';
                skipLink.style.transform = 'translateX(-50%)';
                skipLink.style.top = '0.5rem';
            });
            
            skipLink.addEventListener('blur', () => {
                skipLink.style.left = '-9999px';
                skipLink.style.transform = 'none';
                skipLink.style.top = 'auto';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }
}

// ========== 7. DETECCIÓN DE TEMA OSCURO ==========

class ThemeDetection {
    /**
     * Detecta y aplica el tema según preferencias del sistema
     */
    constructor() {
        this.init();
    }

    /**
     * Inicializa la detección de tema
     */
    init() {
        // Verificar preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.applyTheme(savedTheme);
        } else {
            // Detectar preferencia del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.applyTheme('dark');
            }
        }
        
        // Escuchar cambios en preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            this.applyTheme(newTheme);
        });
    }

    /**
     * Aplica el tema
     * @param {string} theme - Tema a aplicar ('light' o 'dark')
     */
    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
        localStorage.setItem('theme', theme);
    }
}

// ========== 8. ESTADÍSTICAS Y TELEMETRÍA (OPCIONAL) ==========

class Analytics {
    /**
     * Registra eventos de análisis
     */
    constructor() {
        this.init();
    }

    /**
     * Inicializa el rastreo analítico
     */
    init() {
        // Rastrear clics en botones CTA
        selectAll('.btn--primary').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('cta_click', {
                    buttonText: button.textContent,
                    section: button.closest('section')?.id || 'unknown'
                });
            });
        });
        
        // Rastrear envío de formulario
        const form = select('.contact__form');
        if (form) {
            form.addEventListener('submit', () => {
                this.trackEvent('form_submission', {
                    formType: 'contact'
                });
            });
        }
    }

    /**
     * Registra un evento
     * @param {string} eventName - Nombre del evento
     * @param {Object} eventData - Datos del evento
     */
    trackEvent(eventName, eventData = {}) {
        // En producción, esto se enviaría a un servidor de análisis
        console.log(`Event: ${eventName}`, eventData);
    }
}

// ========== 9. FAQ INTERACTIVO ==========

class FAQAccordion {
    /**
     * Inicializa el acordeón del FAQ
     */
    constructor() {
        this.faqItems = selectAll('.faq-item__question');
        this.init();
    }

    /**
     * Inicializa los event listeners
     */
    init() {
        this.faqItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggle(item);
            });
            
            // Accesibilidad: Enter y Space
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.toggle(item);
                }
            });
        });
    }

    /**
     * Alterna la respuesta del FAQ
     * @param {HTMLElement} button - Botón del FAQ
     */
    toggle(button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const answer = button.nextElementSibling;
        
        // Cerrar todas las demás respuestas
        this.faqItems.forEach(item => {
            if (item !== button && item.getAttribute('aria-expanded') === 'true') {
                item.setAttribute('aria-expanded', 'false');
                item.nextElementSibling?.setAttribute('hidden', '');
            }
        });
        
        // Alternar la respuesta actual
        if (isExpanded) {
            button.setAttribute('aria-expanded', 'false');
            answer?.setAttribute('hidden', '');
        } else {
            button.setAttribute('aria-expanded', 'true');
            answer?.removeAttribute('hidden');
        }
    }
}

// ========== 10. MODALES PARA PROMOCIONES ==========

class PromoModal {
    /**
     * Inicializa los modales de promociones
     */
    constructor() {
        this.promoButtons = selectAll('[data-modal]');
        this.init();
    }

    /**
     * Inicializa los event listeners
     */
    init() {
        this.promoButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const promoId = button.getAttribute('data-modal');
                this.showPromo(promoId);
            });
        });
    }

    /**
     * Muestra información de la promoción
     * @param {string} promoId - ID de la promoción
     */
    showPromo(promoId) {
        const promos = {
            promo1: {
                title: 'Primera Consulta con Descuento',
                content: 'Obtén un 20% de descuento en tu primera consulta veterinaria. Este descuento es válido para clientes nuevos y se aplica automáticamente en el sistema. Válido hasta 30 días después de tu primer contacto.',
                terms: '- No acumulable con otras promociones\n- Válido para consulta general\n- Requiere agendar con anticipación'
            },
            promo2: {
                title: 'Paquete Completo de Vacunación',
                content: 'Descuento del 15% en el calendario completo de vacunación. Incluye todas las vacunas necesarias según la edad y tipo de mascota. Nuestro equipo te guiará en el plan ideal.',
                terms: '- Incluye asesoría personalizada\n- Recordatorios automáticos\n- Certificado internacional incluido'
            },
            promo3: {
                title: 'Membresía Mensual de Grooming',
                content: 'Acceso a descuento del 25% en todos nuestros servicios de estética. Incluye baños, cortes, y cuidado de uñas. Perfecto para mantener a tu mascota radiante todo el año.',
                terms: '- 1 sesión de grooming al mes\n- Descuento adicional en servicios extras\n- Cancelación flexible en cualquier momento'
            }
        };

        const promo = promos[promoId];
        if (!promo) return;

        alert(`🎁 ${promo.title}\n\n${promo.content}\n\nTérminos:\n${promo.terms}\n\n¡Contáctanos para más información!`);
    }
}

// ========== 11. CONSEJOS EXPANDIBLES ==========

class TipsExpander {
    /**
     * Inicializa los botones de consejos
     */
    constructor() {
        this.tipButtons = selectAll('[data-tip]');
        this.tips = {
            tip1: {
                title: 'Nutrición Adecuada',
                content: 'Una buena alimentación es fundamental para la salud de tu mascota. Proporciona alimentos de alta calidad diseñados para su edad y tamaño. Consulta con nuestro equipo sobre la mejor dieta. Evita alimentos tóxicos como chocolate, uvas y aguacate.'
            },
            tip2: {
                title: 'Ejercicio Diario',
                content: 'La actividad física es esencial para mantener a tu mascota sana y feliz. Los perros necesitan al menos 30 minutos de ejercicio diario, mientras que los gatos necesitan juego interactivo. El ejercicio previene obesidad y problemas de comportamiento.'
            },
            tip3: {
                title: 'Higiene Dental',
                content: 'La salud dental es crucial para prevenir enfermedades bucales. Cepilla los dientes de tu mascota regularmente y proporciona juguetes para masticar. Las limpiezas profesionales anuales son recomendadas. El Doctor Figueroa y la Dra. Aravena ofrecen servicios especializados.'
            },
            tip4: {
                title: 'Medicinas Preventivas',
                content: 'Prevenir es mejor que curar. Mantén un calendario de vacunación al día y administra desparasitantes regularmente. Estos cuidados protegen a tu mascota de enfermedades graves. Nuestro equipo te asesorará sobre el mejor plan preventivo.'
            }
        };
        this.init();
    }

    /**
     * Inicializa los event listeners
     */
    init() {
        this.tipButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tipId = button.getAttribute('data-tip');
                this.showTip(tipId);
            });
        });
    }

    /**
     * Muestra el consejo completo
     * @param {string} tipId - ID del consejo
     */
    showTip(tipId) {
        const tip = this.tips[tipId];
        if (!tip) return;

        const message = `📚 ${tip.title}\n\n${tip.content}\n\n¿Necesitas más información? ¡Contáctanos!`;
        alert(message);
    }
}

// ========== 12. INICIALIZACIÓN PRINCIPAL ==========

/**
 * Inicializa todas las funcionalidades cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 PetCare - Inicializando aplicación...');
    
    // Inicializar componentes
    new MobileNavigation();
    new ContactForm();
    new SmoothScroll();
    new ScrollAnimation();
    new SkipLink();
    new ThemeDetection();
    new Analytics();
    
    // Nuevas funcionalidades interactivas
    new FAQAccordion();
    new PromoModal();
    new TipsExpander();
    
    console.log('✓ Aplicación inicializada correctamente');
});

// ========== 13. ERROR HANDLING ==========

/**
 * Manejo global de errores
 */
window.addEventListener('error', (event) => {
    console.error('Error capturado:', event.error);
});

/**
 * Promesas rechazadas no capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada no capturada:', event.reason);
});
