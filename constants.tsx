import { AppProduct, GlobalContent, PricingPlan, Testimonial, CountryCode, Guarantee } from './types';
import { 
  Bell, FileText, Database, BarChart, 
  Filter, Search, Layers, QrCode, UserCheck, Smartphone, Zap, ShieldCheck,
  Server, RefreshCcw, Headphones, Lock, Activity, Ban
} from 'lucide-react';

export const EXCHANGE_RATE = 26.33;

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
];

export const COUNTRIES: CountryCode[] = [
  { name: "Honduras", code: "+504", flag: "🇭🇳" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "España", code: "+34", flag: "🇪🇸" },
  { name: "México", code: "+52", flag: "🇲🇽" },
  { name: "Guatemala", code: "+502", flag: "🇬🇹" },
  { name: "El Salvador", code: "+503", flag: "🇸🇻" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { name: "Panamá", code: "+507", flag: "🇵🇦" },
  { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "Perú", code: "+51", flag: "🇵🇪" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨" },
  { name: "Venezuela", code: "+58", flag: "🇻🇪" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴" },
  { name: "Paraguay", code: "+595", flag: "🇵🇾" },
  { name: "Uruguay", code: "+598", flag: "🇺🇾" },
  { name: "Rep. Dominicana", code: "+1-809", flag: "🇩🇴" },
  { name: "Puerto Rico", code: "+1-787", flag: "🇵🇷" },
  { name: "Canadá", code: "+1", flag: "🇨🇦" },
];

export const CONTENT: Record<'es' | 'en', GlobalContent> = {
  es: {
    common: {
      offer: "OFERTA",
      viewDetails: "Ver Detalles",
      viewApp: "Ver App",
      recommended: "Recomendado",
      cookieMsg: "Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas su uso.",
      accept: "Aceptar"
    },
    nav: {
      home: "Inicio",
      apps: "Apps",
      features: "Plataforma",
      pricing: "Planes",
      contact: "Contacto"
    },
    hero: {
      title: "Apps Modernas y Ágiles con Tecnología Google",
      subtitle: "Soluciones No-Code potentes, seguras y rápidas de implementar. Gestiona tu negocio desde cualquier lugar con herramientas conectadas a internet.",
      ctaPrimary: "Ir al Catálogo",
      ctaSecondary: ""
    },
    about: {
      title: "Tecnología que se adapta a ti",
      description: "En Lexconecta usamos la potencia de Google para crear aplicaciones a medida sin los tiempos de espera del desarrollo tradicional. Somos expertos en soluciones No-Code que digitalizan tu negocio en tiempo récord.",
      missionTitle: "Nuestra Misión",
      mission: "Democratizar la tecnología para pequeños y medianos negocios, ofreciendo herramientas fáciles de usar, visualmente atractivas y totalmente integradas.",
      visionTitle: "Nuestra Visión",
      vision: "Ser el aliado número uno de los emprendedores en Latinoamérica, ayudándoles a crecer con software que simplemente funciona."
    },
    features: {
      title: "Todo lo que tu negocio necesita",
      subtitle: "Una plataforma intuitiva, conectada y lista para usar desde el primer día.",
      items: [
        { title: "Alertas al Instante", desc: "Recibe notificaciones en tu celular en tiempo real." },
        { title: "Reportes PDF", desc: "Genera facturas y reportes con un solo clic." },
        { title: "Control de Inventario", desc: "Mira qué tienes en stock desde donde estés." },
        { title: "Datos Claros", desc: "Gráficos simples para entender tus ventas." },
        { title: "Búsqueda Rápida", desc: "Encuentra clientes o productos en segundos." },
        { title: "Escáner QR", desc: "Usa la cámara de tu celular para agilizar procesos." },
        { title: "Mapas y GPS", desc: "Ubica tus entregas o visitas fácilmente." },
        { title: "Seguridad Google", desc: "Tus datos protegidos por la infraestructura de Google." }
      ]
    },
    pricing: {
      title: "Planes a tu Medida",
      subtitle: "Mantén tu app funcionando sin problemas. Elige el plan que mejor se adapte al tamaño de tu equipo.",
      perMonth: "mes",
      guaranteesTitle: "Nuestras Garantías",
      emailBanner: "1 Correo Corporativo = 3 Usuarios de Sistema",
      storage: "Almacenamiento Incluido",
      expansionNote: "Puedes expandir cualquier plan agregando packs adicionales (1 Correo + 3 Usuarios) por L339/mes."
    },
    testimonials: {
      title: "Historias de Éxito de Nuestros Socios"
    },
    footer: {
      text: "Transformando negocios con innovación digital desde Honduras. Soluciones escalables para el mundo moderno.",
      legalTitle: "Legal",
      socialTitle: "Redes Sociales"
    },
    contact: {
      title: "Contacto",
      subtitle: "Cuéntanos qué necesitas y lo construimos juntos.",
      intro: "¿Listo para modernizar tu negocio? Nuestro equipo de expertos en soluciones digitales está listo para crear la herramienta perfecta para ti, de forma rápida, eficiente y amigable.",
      agileTech: "Tecnología Ágil",
      callUs: "Llámanos o Escríbenos",
      inquiries: "Consultas",
      name: "Tu Nombre",
      email: "Tu Correo",
      phone: "Tu Teléfono",
      country: "País",
      message: "¿Qué tienes en mente?",
      send: "Enviar Mensaje",
      address: "Operaciones Digitales (Tegucigalpa, Honduras)",
      modalTitle: "¡Hola {name}!",
      modalMsg: "¡Gracias por escribirnos! Hemos recibido tu mensaje. Uno de nuestros asesores expertos te contactará muy pronto para platicar sobre tu proyecto.",
      close: "Cerrar"
    },
    checkout: {
      title: "Configura tu Pedido",
      step1: "Elige tu App",
      step2: "Elige tu Plan",
      step3: "Tus Datos",
      step4: "Pago",
      payDev: "Inversión Desarrollo",
      payMonth: "Primer Mes Plan",
      totalNow: "Total a Pagar",
      bankTransfer: "Transferencia Bancaria",
      paypal: "PayPal",
      submit: "Confirmar Pedido",
      successTitle: "¡Pedido Recibido!",
      successMsg: "Gracias por confiar en nosotros. Un asesor de nuestro equipo te escribirá pronto para comenzar a configurar tu nueva app.",
      software: "Software",
      devSetup: "Precio Base",
      offerDiscount: "Descuento Oferta",
      subtotalDev: "Subtotal Desarrollo",
      securePayment: "Pagos 100% seguros y encriptados. Garantía de satisfacción.",
      sendReceipt: "Envía el comprobante a nuestro WhatsApp para activar el servicio.",
      paypalNote: "Opción de suscripción automática disponible vía PayPal para el mantenimiento mensual. Consulta con soporte tras el pago inicial.",
      businessLabel: "Empresa / Negocio",
      goToPayment: "Ir al Pago",
      orderSummary: "Resumen del Pedido",
      processing: "Procesando...",
      continuePaypal: "Continuar a PayPal",
      backHome: "Volver al Inicio",
      paySecurely: "Pagar de forma segura"
    },
    bank: {
      account: "No. Cuenta",
      beneficiary: "Beneficiario"
    },
    legal: {
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    },
    appDetail: {
      whyNeed: "¿Por qué necesitas esto?",
      devFee: "Precio de Desarrollo (Pago Único)",
      save: "AHORRA",
      buyNow: "Comprar Ahora",
      monthlySub: "Suscripción mensual disponible vía PayPal",
      includedFeatures: "Funciones Incluidas",
      questions: "¿Dudas?",
      talkToExpert: "Habla directamente con un ingeniero de ventas antes de comprar.",
      chatWhatsapp: "Chat WhatsApp",
      gallery: "Galería",
      demoImages: "Imágenes de demostración disponibles en WhatsApp"
    },
    benefits: {
      salesTitle: "Aumenta Ventas",
      salesDesc: "Optimiza procesos para vender más rápido.",
      theftTitle: "Reduce Robos",
      theftDesc: "Control total de inventario y caja.",
      timeTitle: "Ahorra Tiempo",
      timeDesc: "Automatiza tareas repetitivas."
    }
  },
  en: {
    common: {
      offer: "OFFER",
      viewDetails: "View Details",
      viewApp: "View App",
      recommended: "Recommended",
      cookieMsg: "We use cookies to ensure you get the best experience on our website.",
      accept: "Accept"
    },
    nav: {
      home: "Home",
      apps: "Apps",
      features: "Features",
      pricing: "Plans",
      contact: "Contact"
    },
    hero: {
      title: "Modern & Agile Apps with Google Tech",
      subtitle: "Powerful No-Code solutions, secure and fast to deploy. Manage your business from anywhere with internet-connected tools.",
      ctaPrimary: "Go to Catalog",
      ctaSecondary: ""
    },
    about: {
      title: "Technology that adapts to you",
      description: "At Lexconecta, we use the power of Google to create custom applications without the wait times of traditional development. We are experts in No-Code solutions that digitize your business in record time.",
      missionTitle: "Our Mission",
      mission: "To democratize technology for small and medium businesses, offering easy-to-use, visually appealing, and fully integrated tools.",
      visionTitle: "Our Vision",
      vision: "To be the number one partner for entrepreneurs in Latin America, helping them grow with software that just works."
    },
    features: {
      title: "Everything your business needs",
      subtitle: "An intuitive platform, connected and ready to use from day one.",
      items: [
        { title: "Instant Alerts", desc: "Receive real-time notifications on your phone." },
        { title: "PDF Reports", desc: "Generate invoices and reports with a single click." },
        { title: "Inventory Control", desc: "Check your stock from wherever you are." },
        { title: "Clear Data", desc: "Simple charts to understand your sales." },
        { title: "Fast Search", desc: "Find clients or products in seconds." },
        { title: "QR Scanner", desc: "Use your phone camera to speed up processes." },
        { title: "Maps & GPS", desc: "Locate deliveries or visits easily." },
        { title: "Google Security", desc: "Your data protected by Google infrastructure." }
      ]
    },
    pricing: {
      title: "Tailored Plans",
      subtitle: "Keep your app running smoothly. Choose the plan that best fits your team size.",
      perMonth: "month",
      guaranteesTitle: "Our Guarantees",
      emailBanner: "1 Corporate Email = 3 System Users",
      storage: "Storage Included",
      expansionNote: "You can expand any plan by adding additional packs (1 Email + 3 Users) for L339/mo."
    },
    testimonials: {
      title: "Success Stories from Our Partners"
    },
    footer: {
      text: "Transforming businesses with digital innovation from Honduras. Scalable solutions for the modern world.",
      legalTitle: "Legal",
      socialTitle: "Social Media"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Tell us what you need, and we'll build it together.",
      intro: "Ready to modernize your business? Our team of digital solutions experts is ready to create the perfect tool for you, quickly, efficiently, and friendly.",
      agileTech: "Agile Tech",
      callUs: "Call or Write Us",
      inquiries: "Inquiries",
      name: "Your Name",
      email: "Your Email",
      phone: "Your Phone",
      country: "Country",
      message: "What's on your mind?",
      send: "Send Message",
      address: "Digital Operations (Tegucigalpa, Honduras)",
      modalTitle: "Hi {name}!",
      modalMsg: "Thanks for writing! We received your message. One of our expert advisors will contact you very soon to discuss your project.",
      close: "Close"
    },
    checkout: {
      title: "Setup Your Order",
      step1: "Choose App",
      step2: "Choose Plan",
      step3: "Your Info",
      step4: "Payment",
      payDev: "Development Fee",
      payMonth: "First Month Plan",
      totalNow: "Total Due",
      bankTransfer: "Bank Transfer",
      paypal: "PayPal",
      submit: "Confirm Order",
      successTitle: "Order Received!",
      successMsg: "Thanks for trusting us. An advisor from our team will contact you shortly to start setting up your new app.",
      software: "Software",
      devSetup: "Base Price",
      offerDiscount: "Offer Discount",
      subtotalDev: "Dev Subtotal",
      securePayment: "100% secure encrypted payments. Satisfaction guarantee.",
      sendReceipt: "Send the receipt to our WhatsApp to activate service.",
      paypalNote: "Automatic subscription option available via PayPal for monthly maintenance. Consult support after initial payment.",
      businessLabel: "Company / Business",
      goToPayment: "Go to Payment",
      orderSummary: "Order Summary",
      processing: "Processing...",
      continuePaypal: "Continue to PayPal",
      backHome: "Back to Home",
      paySecurely: "Pay Now Securely"
    },
    bank: {
      account: "Account No.",
      beneficiary: "Beneficiario"
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    appDetail: {
      whyNeed: "Why do you need this?",
      devFee: "Development Fee (One-time Payment)",
      save: "SAVE",
      buyNow: "Buy Now",
      monthlySub: "Monthly subscription available via PayPal",
      includedFeatures: "Included Features",
      questions: "Questions?",
      talkToExpert: "Speak directly with a sales engineer before buying.",
      chatWhatsapp: "WhatsApp Chat",
      gallery: "Gallery",
      demoImages: "Demo images available on WhatsApp"
    },
    benefits: {
      salesTitle: "Increase Sales",
      salesDesc: "Optimize processes to sell faster.",
      theftTitle: "Reduce Theft",
      theftDesc: "Total control of inventory and cash.",
      timeTitle: "Save Time",
      timeDesc: "Automate repetitive tasks."
    }
  }
};

export const GUARANTEES: Record<'es' | 'en', Guarantee[]> = {
  es: [
    { 
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />, 
      title: "Seguridad Google", 
      desc: "Protección de nivel empresarial. Tu app vive dentro del ecosistema de Google Workspace, beneficiándose de la misma seguridad que protege a Gmail y Drive: encriptación avanzada y autenticación segura." 
    },
    { 
      icon: <Headphones className="w-6 h-6 text-blue-600" />, 
      title: "Soporte Humano", 
      desc: "Expertos en Workspace a tu lado. Nuestro equipo no solo resuelve problemas, sino que te asesora sobre cómo aprovechar al máximo herramientas como Calendar, Meet y Sheets integradas en tu app." 
    },
    { 
      icon: <Zap className="w-6 h-6 text-purple-600" />, 
      title: "Desarrollo Rápido", 
      desc: "Implementación ágil con tecnología de Google. Al usar la tecnología No-Code de Google, convertimos tus hojas de cálculo en apps potentes en tiempo récord, listas para operar inmediatamente." 
    },
    { 
      icon: <Activity className="w-6 h-6 text-red-500" />, 
      title: "Uptime de Google", 
      desc: "Fiabilidad total. Tu aplicación corre sobre la infraestructura global de Google. Si Google Drive funciona, tu negocio funciona. Olvídate de servidores caídos o mantenimiento técnico." 
    },
    { 
      icon: <RefreshCcw className="w-6 h-6 text-orange-500" />, 
      title: "Actualizaciones", 
      desc: "Siempre al día. Tu sistema evoluciona automáticamente junto con Google Workspace. Las nuevas funciones de seguridad y rendimiento se aplican sin que tengas que instalar parches manuales." 
    },
    { 
      icon: <Server className="w-6 h-6 text-indigo-500" />, 
      title: "Escalabilidad", 
      desc: "Crece con tu Drive. Tu capacidad de almacenamiento y procesamiento escala tan fácil como tu cuenta de Google. Desde 100 hasta millones de registros, la nube se adapta a ti." 
    }
  ],
  en: [
    { 
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />, 
      title: "Google Security", 
      desc: "Enterprise-grade protection. Your app lives within the Google Workspace ecosystem, benefiting from the same security guarding Gmail and Drive: advanced encryption and secure authentication." 
    },
    { 
      icon: <Headphones className="w-6 h-6 text-blue-600" />, 
      title: "Human Support", 
      desc: "Workspace experts by your side. Our team doesn't just fix issues; we advise you on leveraging tools like Calendar, Meet, and Sheets integrated into your app." 
    },
    { 
      icon: <Zap className="w-6 h-6 text-purple-600" />, 
      title: "Fast Development", 
      desc: "Agile Google technology implementation. Using Google's No-Code tech, we turn your spreadsheets into powerful apps in record time, ready for immediate operation." 
    },
    { 
      icon: <Activity className="w-6 h-6 text-red-500" />, 
      title: "Google Uptime", 
      desc: "Total reliability. Your application runs on Google's global infrastructure. If Google Drive is working, your business is working. Forget about server downtime or technical maintenance." 
    },
    { 
      icon: <RefreshCcw className="w-6 h-6 text-orange-500" />, 
      title: "Updates Included", 
      desc: "Always up to date. Your system evolves automatically alongside Google Workspace. New security and performance features apply without manual patching." 
    },
    { 
      icon: <Server className="w-6 h-6 text-indigo-500" />, 
      title: "Scalability", 
      desc: "Grow with your Drive. Your storage and processing capacity scales as easily as your Google account. From 100 to millions of records, the cloud adapts to you." 
    }
  ]
};

export const APPS: Record<'es' | 'en', AppProduct[]> = {
  es: [
    {
      id: "pos-system",
      title: "POS Master",
      shortDescription: "Sistema de caja en la nube conectado a Google Workspace.",
      fullDescription: "Transforma la gestión de tus ventas con la potencia de Google Workspace. POS Master no es solo una caja registradora; es un centro de comando que sincroniza cada venta directamente con Google Sheets en tiempo real. Olvídate de perder datos o depender de dispositivos específicos; accede a tu inventario, historial de ventas y reportes financieros desde cualquier dispositivo (celular, tablet o PC) con la seguridad de tu cuenta de Google. Ideal para retail, ferreterías y tiendas de conveniencia que buscan auditar sus ingresos sin complicaciones.",
      features: ["Sincronización con Google Sheets", "Control de Inventario en Drive", "Facturación Digital Rápida", "Alertas de Stock al Correo", "Multiusuario en Tiempo Real"],
      imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800", "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800"],
      price: 3999,
      originalPrice: 7500
    },
    {
      id: "gym-master",
      title: "Gym Pulse",
      shortDescription: "Gestión de gimnasios integrada con Google Calendar y Drive.",
      fullDescription: "Lleva tu gimnasio al siguiente nivel digital. Gym Pulse centraliza la información de tus miembros en una base de datos segura alojada en Google Drive, garantizando que la información nunca se pierda. Automatiza el envío de rutinas personalizadas a través de Gmail, gestiona las renovaciones de membresías con recordatorios automáticos en Calendar y controla el acceso mediante códigos QR únicos generados al instante. Es la solución perfecta para entrenadores y dueños que quieren dejar el papel y enfocarse en sus clientes.",
      features: ["Base de Datos en Google Drive", "Accesos QR Dinámicos", "Rutinas enviadas por Gmail", "Recordatorios en Calendar", "Dashboard de Asistencia"],
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800"],
      price: 3499,
      originalPrice: 6200
    },
    {
      id: "booking-app",
      title: "Citas 360",
      shortDescription: "Automatización de citas con sincronización nativa a Google Calendar.",
      fullDescription: "¿Cansado de cruzar horarios y perder clientes? Citas 360 se convierte en tu asistente personal 24/7. Esta aplicación se integra nativamente con Google Calendar, bloqueando automáticamente los espacios ocupados y permitiendo que tus clientes reserven solo en horas disponibles. Cada nueva cita genera un evento detallado en tu calendario y envía confirmaciones automáticas por WhatsApp y correo electrónico. Perfecta para clínicas, salones de belleza, spas y consultorios que buscan profesionalizar su atención sin contratar más personal.",
      features: ["Sincronización Google Calendar", "Reservas Online 24/7", "Notificaciones Automáticas", "Base de Clientes en Contactos", "Pagos Anticipados"],
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800"],
      price: 3299,
      originalPrice: 5800
    },
    {
      id: "delivery-logistics",
      title: "LogiTrack",
      shortDescription: "Logística inteligente potenciada por Google Maps Platform.",
      fullDescription: "Optimiza cada kilómetro con la precisión de Google Maps. LogiTrack utiliza la tecnología de geolocalización de Google para planificar las rutas más eficientes, calcular tiempos estimados de llegada y permitirte rastrear a tu flota en tiempo real sobre interfaces de mapas familiares. Tus clientes recibirán enlaces de seguimiento en vivo, reduciendo la ansiedad y las llamadas de '¿dónde está mi pedido?'. Además, todos los registros de entrega, firmas digitales y fotos se respaldan automáticamente en carpetas organizadas de Google Drive.",
      features: ["Integración Google Maps", "Rutas Optimizadas", "Prueba de Entrega en Drive", "Seguimiento en Vivo", "Análisis de Kilometraje"],
      imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=800"],
      price: 4299,
      originalPrice: 8500
    },
    {
      id: "school-connect",
      title: "EduLink",
      shortDescription: "Ecosistema educativo conectado con Google Classroom y Drive.",
      fullDescription: "Crea un puente digital entre el colegio y el hogar. EduLink aprovecha las herramientas educativas de Google para ofrecer un portal robusto donde los maestros pueden subir calificaciones directamente a hojas de cálculo compartidas, y los alumnos pueden entregar tareas que se organizan automáticamente en carpetas de Drive por materia y estudiante. Los padres reciben boletines digitales y avisos importantes en tiempo real, garantizando que nadie se pierda de nada. Seguridad, orden y accesibilidad para la educación moderna.",
      features: ["Boletines en Google Docs", "Tareas en Google Drive", "Calendario Escolar Compartido", "Asistencia Digital", "Chat Seguro Profesores-Padres"],
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1427504743055-e99aa7616bd6?auto=format&fit=crop&w=800"],
      price: 4999,
      originalPrice: 9000
    },
    {
      id: "restaurant-pro",
      title: "RestoFlow",
      shortDescription: "Comandas digitales y analítica de restaurante en Google Data Studio.",
      fullDescription: "Agiliza tu operación desde la mesa hasta la cocina con tecnología en la nube. RestoFlow permite a tus meseros tomar pedidos desde dispositivos móviles que se sincronizan instantáneamente con pantallas en cocina (KDS). Pero el verdadero poder está en los datos: cada plato vendido alimenta un dashboard en tiempo real (posiblemente integrado con Looker Studio), permitiéndote analizar márgenes, platos más vendidos y horas pico para tomar decisiones informadas sobre tu menú y personal, todo respaldado por la nube de Google.",
      features: ["Comandas Móviles en Nube", "KDS (Pantalla Cocina)", "Analítica de Ventas", "Menú Digital QR", "Control de Mermas"],
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      screenshots: ["https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800"],
      price: 4499,
      originalPrice: 8200
    }
  ],
  en: [
    {
      id: "pos-system", 
      title: "POS Master", 
      shortDescription: "Cloud POS system seamlessly connected to Google Workspace.",
      fullDescription: "Transform your sales management with the power of Google Workspace. POS Master isn't just a cash register; it's a command center that syncs every sale directly to Google Sheets in real-time. Forget about data loss or device dependency; access your inventory, sales history, and financial reports from any device (phone, tablet, or PC) with the security of your Google account. Ideal for retail, hardware stores, and convenience shops looking to audit revenue without complications.",
      features: ["Google Sheets Sync", "Inventory on Drive", "Fast Digital Billing", "Stock Alerts via Email", "Real-Time Multi-user"],
      imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800", "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800"], 
      price: 3999, 
      originalPrice: 7500
    },
    { 
      id: "gym-master", 
      title: "Gym Pulse", 
      shortDescription: "Gym management integrated with Google Calendar and Drive.", 
      fullDescription: "Take your gym to the next digital level. Gym Pulse centralizes your member information in a secure database hosted on Google Drive, ensuring data is never lost. Automate personalized routine emails via Gmail, manage membership renewals with automatic Calendar reminders, and control access via instantly generated unique QR codes. It's the perfect solution for trainers and owners who want to go paperless and focus on their clients.", 
      features: ["Database on Google Drive", "Dynamic QR Access", "Routines sent via Gmail", "Calendar Reminders", "Attendance Dashboard"], 
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800"], 
      price: 3499, 
      originalPrice: 6200 
    },
    { 
      id: "booking-app", 
      title: "Citas 360", 
      shortDescription: "Automated booking with native Google Calendar sync.", 
      fullDescription: "Tired of double-bookings and lost clients? Citas 360 becomes your 24/7 personal assistant. This application natively integrates with Google Calendar, automatically blocking busy slots and allowing clients to book only available times. Every new appointment generates a detailed event in your calendar and sends automatic confirmations via WhatsApp and email. Perfect for clinics, salons, spas, and consulting offices looking to professionalize their service without hiring more staff.", 
      features: ["Google Calendar Sync", "24/7 Online Booking", "Automated Notifications", "Client Base in Contacts", "Upfront Payments"], 
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800"], 
      price: 3299, 
      originalPrice: 5800 
    },
    { 
      id: "delivery-logistics", 
      title: "LogiTrack", 
      shortDescription: "Smart logistics powered by Google Maps Platform.", 
      fullDescription: "Optimize every mile with the precision of Google Maps. LogiTrack uses Google's geolocation technology to plan the most efficient routes, calculate estimated arrival times, and allow you to track your fleet in real-time on familiar map interfaces. Your customers receive live tracking links, reducing anxiety and 'where is my order?' calls. Plus, all delivery records, digital signatures, and photos are automatically backed up in organized Google Drive folders.", 
      features: ["Google Maps Integration", "Optimized Routes", "Proof of Delivery on Drive", "Live Tracking", "Mileage Analysis"], 
      imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=800"], 
      price: 4299, 
      originalPrice: 8500 
    },
    { 
      id: "school-connect", 
      title: "EduLink", 
      shortDescription: "Connected educational ecosystem with Google Classroom and Drive.", 
      fullDescription: "Build a digital bridge between school and home. EduLink leverages Google's educational tools to offer a robust portal where teachers can upload grades directly to shared spreadsheets, and students can submit homework that automatically organizes into Drive folders by subject and student. Parents receive digital report cards and important notices in real-time, ensuring no one misses a beat. Safety, order, and accessibility for modern education.", 
      features: ["Report Cards on Docs", "Homework on Drive", "Shared School Calendar", "Digital Attendance", "Secure Teacher-Parent Chat"], 
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1427504743055-e99aa7616bd6?auto=format&fit=crop&w=800"], 
      price: 4999, 
      originalPrice: 9000 
    },
    { 
      id: "restaurant-pro", 
      title: "RestoFlow", 
      shortDescription: "Digital orders and restaurant analytics via Google Data Studio.", 
      fullDescription: "Streamline your operation from table to kitchen with cloud technology. RestoFlow allows servers to take orders on mobile devices that sync instantly with kitchen screens (KDS). But the real power lies in data: every dish sold feeds a real-time dashboard (potentially integrated with Looker Studio), allowing you to analyze margins, best-sellers, and peak hours to make informed decisions about your menu and staff, all backed by Google cloud.", 
      features: ["Cloud Mobile Orders", "KDS (Kitchen Screen)", "Sales Analytics", "QR Digital Menu", "Waste Control"], 
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", 
      screenshots: ["https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800"], 
      price: 4499, 
      originalPrice: 8200 
    }
  ]
};

export const PRICING: Record<'es' | 'en', PricingPlan[]> = {
  es: [
    {
      id: "standard",
      name: "Plan Esencial",
      priceValue: 599,
      priceCurrency: "L",
      usdPrice: "$25 USD",
      features: [
        "Logo y Colores Personalizados",
        "Descarga APK Android",
        "Catálogo de Productos",
        "Notificaciones al Celular",
        "Reportes PDF Mensuales",
        "Lector QR Integrado",
        "Dashboard Simple",
        "Soporte por Ticket",
        "Copia de Seguridad Semanal"
      ],
      cta: "Elegir Esencial"
    },
    {
      id: "pro",
      name: "Plan Profesional",
      priceValue: 999,
      priceCurrency: "L",
      usdPrice: "$40 USD",
      features: [
        "Todo lo incluido en el Plan Esencial",
        "Asistente con IA (Gemini)",
        "Notificaciones Ilimitadas",
        "Conexión WhatsApp",
        "Exportar a Excel/Sheets",
        "Soporte Rápido VIP",
        "Copia de Seguridad Diaria"
      ],
      isRecommended: true,
      cta: "Elegir Profesional"
    },
    {
      id: "enterprise",
      name: "Plan Empresarial",
      priceValue: 0,
      priceCurrency: "L",
      usdPrice: "A Cotizar",
      features: [
        "Módulos Personalizados",
        "Servidor Dedicado",
        "Múltiples Sucursales",
        "Conexión con otros sistemas",
        "Asesor Personal",
        "Garantía Total"
      ],
      cta: "Cotizar Ahora"
    },
  ],
  en: [
    {
      id: "standard",
      name: "Essential Plan",
      priceValue: 599,
      priceCurrency: "L",
      usdPrice: "$25 USD",
      features: [
        "Custom Logo & Colors",
        "Android APK Download",
        "Product Catalog",
        "Mobile Notifications",
        "Monthly PDF Reports",
        "Integrated QR Reader",
        "Ticket Support",
        "Weekly Backups"
      ],
      cta: "Select Essential"
    },
    {
      id: "pro",
      name: "Professional Plan",
      priceValue: 999,
      priceCurrency: "L",
      usdPrice: "$40 USD",
      features: ["Everything in Essential Plan", "AI Assistant (Gemini)", "Unlimited Notifications", "WhatsApp Connection", "Export to Excel/Sheets", "VIP Fast Support", "Daily Backups"],
      isRecommended: true,
      cta: "Select Professional"
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      priceValue: 0,
      priceCurrency: "L",
      usdPrice: "Custom Quote",
      features: ["Custom Modules", "Dedicated Server", "Multi-Branch", "System Integrations", "Personal Advisor", "Total Warranty"],
      cta: "Get Quote"
    }
  ]
};

export const FEATURE_ICONS = [
  { icon: <Bell className="w-8 h-8" />, key: 0 },
  { icon: <FileText className="w-8 h-8" />, key: 1 },
  { icon: <Database className="w-8 h-8" />, key: 2 },
  { icon: <BarChart className="w-8 h-8" />, key: 3 },
  { icon: <Filter className="w-8 h-8" />, key: 4 },
  { icon: <QrCode className="w-8 h-8" />, key: 5 },
  { icon: <UserCheck className="w-8 h-8" />, key: 6 },
  { icon: <Layers className="w-8 h-8" />, key: 7 },
];

export const TESTIMONIALS: Record<'es' | 'en', Testimonial[]> = {
  es: [
    {
      id: 1,
      name: "Carlos Méndez",
      role: "Dueño, Grupo Sabor",
      content: "Implementar el sistema POS fue súper fácil. Ahora sé exactamente cuánto vendo cada día y recuperé mi inversión en el primer mes.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "María Rodríguez",
      role: "Gerente, Moda Boutique",
      content: "Me encanta que la app tenga mis colores y mi logo. Se ve muy profesional y a mis clientes les gusta mucho.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Jorge Luis",
      role: "Gym Power Center",
      content: "El acceso con QR es genial. Ya no tengo que estar cobrando manualmente, el sistema me avisa quién pagó y quién no.",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      id: 4,
      name: "Dra. Ana Soto",
      role: "Dental Spa",
      content: "La agenda automática me ha ahorrado horas de llamadas. Mis pacientes reservan solos y les llega recordatorio al WhatsApp.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 5,
      name: "Roberto Gómez",
      role: "Supermercados La Fe",
      content: "Poder ver el inventario desde mi casa es lo mejor. Sé qué pedir a los proveedores sin tener que ir a la bodega.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 6,
      name: "Sofía Martínez",
      role: "Instituto San José",
      content: "EduLink mejoró muchísimo la comunicación con los papás. Es muy fácil subir las notas y las tareas.",
      avatar: "https://randomuser.me/api/portraits/women/91.jpg"
    }
  ],
  en: [
    {
      id: 1,
      name: "Carlos Méndez",
      role: "Owner, Sabor Group",
      content: "Implementing the POS system was super easy. Now I know exactly how much I sell every day and recovered my investment in the first month.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Manager, Fashion Boutique",
      content: "I love that the app has my colors and my logo. It looks very professional and my clients like it a lot.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Jorge Luis",
      role: "Gym Power Center",
      content: "QR access is great. I no longer have to collect manually, the system tells me who paid and who didn't.",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      id: 4,
      name: "Dr. Ana Soto",
      role: "Dental Spa",
      content: "The automatic agenda has saved me hours of calls. My patients book themselves and get a WhatsApp reminder.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 5,
      name: "Roberto Gomez",
      role: "La Fe Supermarkets",
      content: "Being able to see inventory from home is the best. I know what to order from suppliers without going to the warehouse.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 6,
      name: "Sofia Martinez",
      role: "San Jose Institute",
      content: "EduLink greatly improved communication with parents. It's very easy to upload grades and homework.",
      avatar: "https://randomuser.me/api/portraits/women/91.jpg"
    }
  ]
};

export const LEGAL_CONTENT = {
  es: {
    privacy: `POLÍTICA DE PRIVACIDAD DE DATOS - LEXCONECTA

1. TU PRIVACIDAD ES IMPORTANTE
En Lexconecta, cuidamos la información de tu negocio como si fuera nuestra. Aquí te explicamos cómo.

2. QUÉ DATOS USAMOS
Solo guardamos lo necesario para que tu app funcione:
- Tu correo para entrar al sistema.
- Los datos de tu negocio (productos, ventas) para mostrarte tus reportes.
- Todo viaja seguro y encriptado.

3. CÓMO USAMOS LA INFORMACIÓN
Usamos los datos solo para:
- Que puedas usar la plataforma.
- Darte soporte técnico cuando lo necesites.
- Mejorar el servicio.
- Jamás vendemos tus datos a nadie.

4. SEGURIDAD CON GOOGLE
Usamos la infraestructura de Google, que es de las más seguras del mundo, para guardar tu información.

5. CONTACTO
Si tienes dudas sobre tus datos:
WhatsApp: +504 3311 3189
Email: info@lexconecta.hn`,
    terms: `TÉRMINOS DE USO

1. SOBRE EL SERVICIO
Lexconecta te ofrece un servicio de software para tu negocio (SaaS), basado en tecnologías ágiles y No-Code.

2. ALCANCE
- Desarrollo: Te entregamos la app configurada.
- Mantenimiento: Nos encargamos de que la app siga funcionando y se actualice.
- Soporte: Te ayudamos si tienes dudas, según tu plan.

3. LICENCIA
Te damos permiso para usar el software mientras mantengas tu plan activo. El código base es propiedad de Lexconecta.

4. DISPONIBILIDAD
Nos esforzamos para que el servicio esté siempre activo, usando servidores confiables de Google.

5. POLÍTICA DE SERVICIOS DIGITALES
Al ser software configurado a medida y desplegado en servidores, el pago de desarrollo e implementación no es reembolsable una vez iniciado el proceso.

6. LEYES
Este acuerdo se rige por las leyes de Honduras.`
  },
  en: {
    privacy: `DATA PRIVACY POLICY - LEXCONECTA

1. YOUR PRIVACY MATTERS
We protect your business information.

2. DATA WE USE
Only what's needed for your app to work:
- Login email.
- Business data (products, sales) for reports.
- Everything is encrypted.

3. HOW WE USE IT
Strictly for:
- Platform operation.
- Technical support.
- Service improvement.
- We never sell your data.

4. SECURITY WITH GOOGLE
We use Google infrastructure.

5. CONTACT
WhatsApp: +504 3311 3189`,
    terms: `TERMS OF USE

1. ABOUT THE SERVICE
Lexconecta offers software services (SaaS) based on agile No-Code tech.

2. SCOPE
- Development: We deliver the configured app.
- Maintenance: We keep it running.
- Support: We help you out.

3. LICENSE
You can use the software while your plan is active.

4. AVAILABILITY
We strive for high uptime using Google servers.

5. DIGITAL SERVICES POLICY
Since this is custom-configured software deployed on servers, the development and implementation fee is non-refundable once the process has started.

6. LAWS
Governed by Honduran laws.`
  }
};