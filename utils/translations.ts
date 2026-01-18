import { Language } from "../types";

export const translations = {
  en: {
    // Navbar
    appName: "Shang Yi AI",
    hello: "Hello",
    login: "Login",
    logout: "Logout",
    
    // Home
    shangYi: "Shang Yi Zhi Wei Bing",
    heroTitle: "Balance Your Body",
    heroTitleSuffix: "Before It Breaks",
    heroDesc: "The tongue is the only muscle we can see that connects directly to our internal organs. It acts as a real-time dashboard for your holistic health.",
    startDiagnosis: "Start Diagnosis",
    
    // Tongue Map
    dashboardTitle: "Your Internal Dashboard",
    dashboardDesc: "Hover over the map to see how your tongue reflects your organs.",
    tip: "Tip (Heart & Lungs)",
    tipDesc: "Redness here often indicates anxiety, insomnia, or respiratory heat.",
    center: "Center (Spleen & Stomach)",
    centerDesc: "A thick coating here suggests digestive stagnation or dampness.",
    sides: "Sides (Liver)",
    sidesDesc: "Swollen or red sides can indicate high stress, anger, or stagnation.",
    root: "Root (Kidney)",
    rootDesc: "Peeled coating here often reflects exhaustion or adrenal fatigue.",

    // Decoding
    decodingTitle: "Decoding the Signs",
    decodingDesc: "How our AI reads your body's language.",
    color: "Color",
    colorDesc: "Reflects the condition of your blood and temperature.",
    colorRed: "Red: Excess Heat/Inflammation.",
    colorPale: "Pale: Cold/Deficiency.",
    colorPurple: "Purple: Stagnation/Poor Circulation.",
    shape: "Shape",
    shapeDesc: "Indicates the state of Qi (Energy) and fluids.",
    shapeSwollen: "Swollen: Dampness/Fluid Retention.",
    shapeThin: "Thin: Blood/Yin Deficiency.",
    shapeTeeth: "Teeth Marks: Spleen Qi Deficiency.",
    coating: "Coating",
    coatingDesc: "Reflects the digestive system and pathogen depth.",
    coatingYellow: "Yellow: Heat Accumulation.",
    coatingWhite: "White/Thick: Cold/Dampness.",
    coatingPeeled: "Peeled/None: Yin Deficiency.",
    
    // Call to Action
    readyTitle: "Ready to understand your body?",
    readyDesc: "Upload a simple photo and get a comprehensive TCM analysis in seconds.",
    startFree: "Start Free Analysis",

    // Analyze View
    uploadTitle: "Upload Your Tongue Image",
    uploadDesc: "For best results, take the photo in natural light, relax your tongue, and ensure it's fully visible.",
    tapToUpload: "Tap to Upload Photo",
    formatSupport: "JPG or PNG supported",
    clickToChange: "Click to change",
    symptomsLabel: "Current Symptoms (Optional)",
    symptomsPlaceholder: "e.g., I have trouble sleeping, feel bloated after meals, sweating easily...",
    voiceListening: "Listening...",
    voiceStart: "Tap mic to speak",
    analyzeBtn: "Reveal My Balance",
    analyzing: "Analyzing Pattern...",
    loginNote: "Note: You are not logged in. Result will not be saved permanently.",
    error: "Failed to analyze image. Please try again with a clearer photo.",

    // Results
    diagnosisResult: "Diagnosis Result",
    patternAnalysis: "Pattern Analysis",
    clinicalObservation: "Clinical Observation",
    tongueBody: "Tongue Body",
    tongueCoating: "Tongue Coating",
    wellnessPlan: "Wellness Plan",
    dietaryGuidance: "Dietary Guidance",
    beneficial: "Beneficial",
    avoid: "Avoid",
    lifestyleExercise: "Lifestyle & Exercise",
    premiumRec: "Premium Recommendation",
    startCourse: "Start Course",
    analyzeAnother: "Analyze Another Image",
    
    // History
    historyTitle: "Your Journey",
    noRecords: "No records yet.",
    startJourney: "Start your wellness journey by analyzing your tongue.",
    
    // Auth
    welcomeBack: "Welcome Back",
    joinJourney: "Join the Journey",
    continuePath: "Continue your path to wellness",
    createRecord: "Create your personal health record",
    username: "Username",
    password: "Password",
    enterUsername: "Enter your username",
    enterPassword: "Enter your password",
    signIn: "Sign In",
    signUp: "Sign Up",
    createAccount: "Create Account",
    dontHaveAccount: "Don't have an account? ",
    alreadyHaveAccount: "Already have an account? ",

    // Common
    unknown: "Unknown",
    noneSpecified: "None specified",
    generalRest: "General rest",
    generalWellness: "Wellness Basics"
  },
  zh: {
    // Navbar
    appName: "上医 AI",
    hello: "你好",
    login: "登录",
    logout: "登出",

    // Home
    shangYi: "上医治未病",
    heroTitle: "调理身体",
    heroTitleSuffix: "防患于未然",
    heroDesc: "舌头是唯一可以直接看到的与内脏连接的肌肉。它是您整体健康的实时仪表盘。",
    startDiagnosis: "开始诊断",

    // Tongue Map
    dashboardTitle: "您的内在仪表盘",
    dashboardDesc: "悬停在地图上，查看舌头如何反映您的器官。",
    tip: "舌尖 (心肺)",
    tipDesc: "此处发红常表示焦虑、失眠或心肺有热。",
    center: "舌中 (脾胃)",
    centerDesc: "此处苔厚建议消化停滞或湿气重。",
    sides: "舌边 (肝胆)",
    sidesDesc: "舌边肿胀或发红可能表示压力大、愤怒或气滞。",
    root: "舌根 (肾)",
    rootDesc: "此处剥苔常反映疲惫或肾虚。",

    // Decoding
    decodingTitle: "解读信号",
    decodingDesc: "我们的 AI 如何解读您的身体语言。",
    color: "舌色",
    colorDesc: "反映血气状况和寒热。",
    colorRed: "红: 实热/炎症。",
    colorPale: "淡白: 虚寒/气血不足。",
    colorPurple: "紫: 气滞血瘀/循环不畅。",
    shape: "舌形",
    shapeDesc: "指示气（能量）和津液的状态。",
    shapeSwollen: "胖大: 湿气/水肿。",
    shapeThin: "瘦薄: 血虚/阴虚。",
    shapeTeeth: "齿痕: 脾气虚。",
    coating: "舌苔",
    coatingDesc: "反映消化系统和病邪深浅。",
    coatingYellow: "黄: 热积。",
    coatingWhite: "白/厚: 寒/湿。",
    coatingPeeled: "剥落/无苔: 阴虚。",

    // Call to Action
    readyTitle: "准备好了解您的身体了吗？",
    readyDesc: "上传一张简单的照片，几秒钟内获得全面的中医分析。",
    startFree: "开始免费分析",

    // Analyze View
    uploadTitle: "上传您的舌像",
    uploadDesc: "为了获得最佳效果，请在自然光下拍摄，放松舌头，并确保完全可见。",
    tapToUpload: "点击上传照片",
    formatSupport: "支持 JPG 或 PNG",
    clickToChange: "点击更换",
    symptomsLabel: "当前症状（可选）",
    symptomsPlaceholder: "例如：我睡眠不好，饭后腹胀，容易出汗...",
    voiceListening: "正在聆听...",
    voiceStart: "点击麦克风说话",
    analyzeBtn: "揭示我的体质",
    analyzing: "正在分析...",
    loginNote: "注意：您未登录。结果将不会永久保存。",
    error: "分析图像失败。请用更清晰的照片重试。",

    // Results
    diagnosisResult: "诊断结果",
    patternAnalysis: "体质分析",
    clinicalObservation: "临床观察",
    tongueBody: "舌质",
    tongueCoating: "舌苔",
    wellnessPlan: "调理方案",
    dietaryGuidance: "饮食指导",
    beneficial: "宜食",
    avoid: "忌食",
    lifestyleExercise: "生活方式与运动",
    premiumRec: "高级推荐",
    startCourse: "开始课程",
    analyzeAnother: "分析另一张图片",

    // History
    historyTitle: "您的历程",
    noRecords: "暂无记录。",
    startJourney: "通过分析您的舌头开始您的健康之旅。",

    // Auth
    welcomeBack: "欢迎回来",
    joinJourney: "加入旅程",
    continuePath: "继续您的健康之路",
    createRecord: "创建您的个人健康档案",
    username: "用户名",
    password: "密码",
    enterUsername: "输入您的用户名",
    enterPassword: "输入您的密码",
    signIn: "登录",
    signUp: "注册",
    createAccount: "创建账户",
    dontHaveAccount: "还没有账户？",
    alreadyHaveAccount: "已有账户？",

    // Common
    unknown: "未知",
    noneSpecified: "未指定",
    generalRest: "注意休息",
    generalWellness: "基础养生"
  },
  fr: {
    // Navbar
    appName: "Shang Yi AI",
    hello: "Bonjour",
    login: "Connexion",
    logout: "Déconnexion",
    
    // Home
    shangYi: "Shang Yi Zhi Wei Bing",
    heroTitle: "Équilibrez Votre Corps",
    heroTitleSuffix: "Avant Qu'il Ne Cède",
    heroDesc: "La langue est le seul muscle visible directement relié à nos organes internes. Elle agit comme un tableau de bord en temps réel pour votre santé holistique.",
    startDiagnosis: "Commencer le Diagnostic",
    
    // Tongue Map
    dashboardTitle: "Votre Tableau de Bord Interne",
    dashboardDesc: "Survolez la carte pour voir comment votre langue reflète vos organes.",
    tip: "Pointe (Cœur & Poumons)",
    tipDesc: "Une rougeur ici indique souvent de l'anxiété, de l'insomnie ou une chaleur respiratoire.",
    center: "Centre (Rate & Estomac)",
    centerDesc: "Un enduit épais ici suggère une stagnation digestive ou de l'humidité.",
    sides: "Côtés (Foie)",
    sidesDesc: "Des côtés enflés ou rouges peuvent indiquer un stress élevé, de la colère ou une stagnation.",
    root: "Racine (Reins)",
    rootDesc: "Un enduit pelé ici reflète souvent l'épuisement ou une fatigue surrénale.",

    // Decoding
    decodingTitle: "Décoder les Signes",
    decodingDesc: "Comment notre IA lit le langage de votre corps.",
    color: "Couleur",
    colorDesc: "Reflète l'état de votre sang et la température.",
    colorRed: "Rouge: Excès de Chaleur/Inflammation.",
    colorPale: "Pâle: Froid/Déficience.",
    colorPurple: "Violet: Stagnation/Mauvaise Circulation.",
    shape: "Forme",
    shapeDesc: "Indique l'état du Qi (Énergie) et des fluides.",
    shapeSwollen: "Enflée: Humidité/Rétention d'eau.",
    shapeThin: "Fine: Déficience de Sang/Yin.",
    shapeTeeth: "Marques de Dents: Déficience du Qi de la Rate.",
    coating: "Enduit",
    coatingDesc: "Reflète le système digestif et la profondeur des pathogènes.",
    coatingYellow: "Jaune: Accumulation de Chaleur.",
    coatingWhite: "Blanc/Épais: Froid/Humidité.",
    coatingPeeled: "Pelé/Aucun: Déficience de Yin.",
    
    // Call to Action
    readyTitle: "Prêt à comprendre votre corps ?",
    readyDesc: "Téléchargez une simple photo et obtenez une analyse MTC complète en quelques secondes.",
    startFree: "Analyse Gratuite",

    // Analyze View
    uploadTitle: "Téléchargez l'Image de Votre Langue",
    uploadDesc: "Pour de meilleurs résultats, prenez la photo à la lumière naturelle, détendez votre langue et assurez-vous qu'elle est entièrement visible.",
    tapToUpload: "Appuyez pour Télécharger",
    formatSupport: "JPG ou PNG supportés",
    clickToChange: "Cliquez pour changer",
    symptomsLabel: "Symptômes Actuels (Optionnel)",
    symptomsPlaceholder: "ex: J'ai du mal à dormir, je me sens ballonné après les repas, je transpire facilement...",
    voiceListening: "Écoute...",
    voiceStart: "Appuyez pour parler",
    analyzeBtn: "Révéler Mon Équilibre",
    analyzing: "Analyse du Modèle...",
    loginNote: "Note: Vous n'êtes pas connecté. Le résultat ne sera pas sauvegardé de façon permanente.",
    error: "Échec de l'analyse de l'image. Veuillez réessayer avec une photo plus claire.",

    // Results
    diagnosisResult: "Résultat du Diagnostic",
    patternAnalysis: "Analyse du Modèle",
    clinicalObservation: "Observation Clinique",
    tongueBody: "Corps de la Langue",
    tongueCoating: "Enduit de la Langue",
    wellnessPlan: "Plan de Bien-être",
    dietaryGuidance: "Conseils Diététiques",
    beneficial: "Bénéfique",
    avoid: "À Éviter",
    lifestyleExercise: "Mode de Vie & Exercice",
    premiumRec: "Recommandation Premium",
    startCourse: "Commencer le Cours",
    analyzeAnother: "Analyser une Autre Image",
    
    // History
    historyTitle: "Votre Parcours",
    noRecords: "Aucun enregistrement pour le moment.",
    startJourney: "Commencez votre parcours de bien-être en analysant votre langue.",
    
    // Auth
    welcomeBack: "Bon Retour",
    joinJourney: "Rejoignez l'Aventure",
    continuePath: "Continuez votre chemin vers le bien-être",
    createRecord: "Créez votre dossier de santé personnel",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    enterUsername: "Entrez votre nom d'utilisateur",
    enterPassword: "Entrez votre mot de passe",
    signIn: "Se Connecter",
    signUp: "S'inscrire",
    createAccount: "Créer un Compte",
    dontHaveAccount: "Vous n'avez pas de compte ? ",
    alreadyHaveAccount: "Vous avez déjà un compte ? ",

    // Common
    unknown: "Inconnu",
    noneSpecified: "Non spécifié",
    generalRest: "Repos général",
    generalWellness: "Bases du Bien-être"
  }
};