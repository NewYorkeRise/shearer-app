import { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  Globe2,
  House,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Navigation,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Sun,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

const googleMapsEmbedKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY as string | undefined

type Language = 'en' | 'mn'
type Theme = 'light' | 'dark'
type Role = 'herder' | 'shearer' | 'director' | 'accountant' | 'manager'
type View = 'home' | 'jobs' | 'wool' | 'messages' | 'reports' | 'profile'
type OnboardingStep = 'language' | 'profile' | 'login' | 'done'
type Localized = Record<Language, string>

type Job = {
  id: number
  title: Localized
  location: Localized
  date: Localized
  sheep: number
  offer: Localized
  status: 'open' | 'in-progress' | 'completed'
}

type DemoUser = {
  id: string
  role: Role
  name: string
  initials: string
  organization: Localized
  location: Localized
}

type Copy = { [key: string]: string }

type RoleProfile = {
  name: string
  organization: Localized
  title: Localized
  body: Localized
  badge: Localized
  region: Localized
  since: Localized
  focusLabel: Localized
  focusTitle: Localized
  focusBody: Localized
  responsibilities: Localized[]
  stats: { label: Localized; value: string; detail: Localized }[]
  actions: Localized[]
}

const dictionary: Record<Language, Copy> = {
  en: {
    seasonTitle: '2026 shearing season',
    seasonChartTitle: 'Sheep sheared by month',
    seasonChartCaption: 'Season progress',
    monthMay: 'May',
    monthJune: 'Jun',
    monthJuly: 'Jul',
    monthAugust: 'Aug',
    monthSeptember: 'Sep',
    appName: 'Shearer', eyebrow: 'Field operations, simplified', greeting: 'Good morning, Delgermaa', heroTitle: 'The next flock is already waiting.', heroBody: 'Find the right shearing crew, keep every promise visible, and move wool from field to market with less friction.', createJob: 'Post a shearing job', viewJobs: 'Explore open jobs', home: 'Overview', jobs: 'Shearing jobs', wool: 'Wool market', messages: 'Messages', profile: 'Profile', herder: 'Herder', shearer: 'Shearer', overview: 'Overview', activeSeason: 'Active season', fieldReady: 'Field-ready operations', capacity: 'Team capacity', sheepThisSeason: 'sheep this season', woolRecovered: 'wool recovered', upcoming: 'Upcoming work', seeAll: 'See all', next: 'Next', available: 'Available now', browse: 'Browse work near you', location: 'Current location', shareLocation: 'Share location', openMaps: 'Open in Google Maps', locationHint: 'Precise location stays private until you share it.', today: 'Today', inProgress: 'In progress', completed: 'Completed', open: 'Open', trusted: 'Trusted workflow', trustedBody: 'Contracts, milestone payments, and completion checks in one calm workspace.', impact: 'This season’s impact', impactBody: 'Every efficient shearing day keeps more value with the herder.', welcome: 'Welcome to the field desk', welcomeBody: 'Your clean view of jobs, people, payments, and wool.', search: 'Search jobs, locations, or teams', allJobs: 'All jobs', filters: 'Filters', noJobs: 'No jobs match your search yet.', woolTitle: 'Wool, ready for its next chapter.', woolBody: 'List quality, quantity, and location once. Let nearby buyers come to you.', listWool: 'List wool for sale', messagesTitle: 'Clear conversations, fewer missed details.', messagesBody: 'Keep site access, timing, food, and payment questions in one thread.', profileTitle: 'Your working profile', profileBody: 'Keep the essentials current so the right work finds you.', googleReady: 'Google ecosystem ready', googleBody: 'Designed for Firebase, Google Maps, and secure cloud workflows.', launch: 'Open prototype', save: 'Save job', cancel: 'Cancel', newJobTitle: 'Post a shearing job', newJobBody: 'Share the essentials. Keep the rest simple.', flockSize: 'Flock size', flockPlaceholder: 'e.g. 650 sheep', siteName: 'Location', sitePlaceholder: 'e.g. Selenge, Mongolia', readyDate: 'Ready date', offer: 'Offer per sheep', housing: 'Housing available', food: 'Food available', jobSaved: 'Job saved locally for this prototype.', locationShared: 'Google Maps location link copied.', locationFound: 'Current location found.', locationDenied: 'Location access was not available. Using the demo site.', switchLanguage: 'Switch language', switchTheme: 'Switch theme', notifications: 'Notifications', notificationTitle: 'Notifications', notificationBody: 'Recent field updates and payment status.', notificationOne: 'All salaries have been paid.', notificationTwo: 'Every task is 100% complete.', notificationThree: 'Reports and totals match.', closeNotifications: 'Close notifications', signIn: 'Signed in with Google', fieldDesk: 'FIELD DESK', settings: 'Settings', closeMenu: 'Close menu', chooseRole: 'Choose your role', openMenu: 'Open menu', closeDialog: 'Close dialog', live: 'Live', inEscrow: 'In escrow', inEscrowDetail: 'MNT · 3 contracts', weeklyChange: '+4 this week', avgResponse: 'Avg. response', avgResponseDetail: 'Across active crews', lastSeasonChange: '+12% vs last season', paymentReleaseNote: 'Payment is released only after completion is confirmed.', fieldMap: 'Field map', selenge: 'Selenge', tov: 'Töv', darkhanUul: 'Darkhan-Uul', selengeFieldSite: 'Selenge field site', requestStep: 'Request', matchStep: 'Match', confirmStep: 'Confirm', updatedNow: 'Updated just now', stayClose: 'Stay close to the work.', mapsTeamNote: 'Use the same Google Maps link for the team, the herder, and the driver.', sheep: 'sheep', tonnes: 'TONNES', marketAccess: 'Market access', seasonToDate: 'Season to date', qualityMessage: 'Quality wool is a message.', qualityDescription: 'Keep weight, type, location, and asking price easy to compare for buyers.', merinoBlend: 'Merino blend', cleanClip: 'Clean clip', nearbyBuyers: 'Nearby buyers', cleanWhiteWool: 'Clean white wool', coarseWoolBatch: 'Coarse wool batch', mixedSpringClip: 'Mixed spring clip', newMessage: 'New message', altanTeam: 'Altan team', bayangolFamily: 'Bayangol family', kharaaValley: 'Kharaa valley', altanPreview: 'We can arrive on the 18th after lunch.', bayangolPreview: 'Housing is ready for 4 people.', kharaaPreview: 'Can you confirm the road condition?', professionalCrew: 'Professional shearing crew · 4.9 rating', arrivalMessage: 'We can arrive on the 18th after lunch. Is housing ready for four people?', housingQuestion: 'Housing is ready for four people.', yesSiteMessage: 'Yes. The site pin and road notes are in the job details.', googleMapsShared: 'Google Maps location shared', writeMessage: 'Write a message...', editProfile: 'Edit profile', verifiedProfile: 'Verified profile', homeRegion: 'Home region', homeRegionValue: 'Ulaanbaatar · Mongolia', activeSince: 'Active since', activeSinceValue: '2024 season', preferredLanguage: 'Preferred language', preferredLanguageValue: 'English + Монгол', everythingHasPlace: 'Everything has a place.', googleMapsLinks: 'Google Maps links', firebaseAuth: 'Firebase-ready auth', cloudData: 'Cloud data workflow', shearerFieldSite: 'Shearer field site', impactDashboardNext: 'Impact dashboard is coming next.', filtersNext: 'Filters are ready for the next iteration.', woolListingNext: 'Wool listing flow is ready for the next screen.', selected: 'selected.', yesterday: 'Yesterday', monday: 'Mon', sep: 'SEP', mobileNavigation: 'Mobile navigation', languageTitle: 'Choose your language', languageBody: 'You can change this anytime in settings.', mongolian: 'Mongolian', english: 'English', chooseLanguage: 'Select language', continue: 'Continue', back: 'Back', chooseProfile: 'Choose your demo profile', chooseProfileBody: 'Select the account you want to open. Every demo record is already completed and paid.', loginStepTitle: 'Ready to enter', loginStepBody: 'You will open this demo profile with all work, salary, and reports marked complete.', enterDemo: 'Demo login', demoLoginSuccess: 'Demo login successful.', demoAccount: 'Demo account', loginTitle: 'Choose a demo account', loginBody: 'Open any role instantly. All demo work, salaries, and reports are complete.', loginNow: 'Open account', currentUser: 'Current', salaryPaid: 'Salary paid', tasksComplete: 'Tasks complete', reportMatched: 'Reports matched', statusSuccess: 'All clear', allWorkComplete: 'All work completed', paidPayroll: 'Payroll paid', paidPayrollDetail: '9 people · 100% paid', reports: 'Reports', reportTitle: '100% completion report', reportBody: 'Every assigned task is completed and every financial total matches.', totalJobs: 'Total jobs', completedJobs: 'Completed jobs', paidSalary: 'Paid salaries', exactMatch: 'Exact match', allPaid: 'All paid', allComplete: '100% complete', matched: 'Matched', reportPeriod: '2026 season', allUsers: '9 demo users', workTasks: 'Work tasks', financeSummary: 'Finance summary', noOpenIssues: 'No open issues', closeLogin: 'Close login', auditReady: 'Audit-ready demo', viewProfile: 'View profile', director: 'Director', accountant: 'Accountant', manager: 'Manager', roleAccess: 'Role access', roleActions: 'Quick actions', identity: 'Identity', connectedServices: 'Connected services',
  },
  mn: {
    seasonTitle: '2026 оны хяргалтын улирал',
    seasonChartTitle: 'Сар бүрийн хяргасан хонь',
    seasonChartCaption: 'Улирлын явц',
    monthMay: '5-р сар',
    monthJune: '6-р сар',
    monthJuly: '7-р сар',
    monthAugust: '8-р сар',
    monthSeptember: '9-р сар',
    appName: 'Shearer', eyebrow: 'Хээрийн ажлыг хялбарчилна', greeting: 'Өглөөний мэнд, Дэлгэрмаа', heroTitle: 'Дараагийн сүрэг аль хэдийн хүлээж байна.', heroBody: 'Зөв хяргалтын багийг хурдан олж, амлалт бүрийг ил тод байлгаж, ноосыг талбайгаас зах зээлд саадгүй хүргэнэ.', createJob: 'Хяргалтын ажил нэмэх', viewJobs: 'Нээлттэй ажлууд үзэх', home: 'Тойм', jobs: 'Хяргалтын ажил', wool: 'Ноосны зах', messages: 'Зурвас', profile: 'Профайл', herder: 'Малчин', shearer: 'Хяргагч', overview: 'Тойм', activeSeason: 'Ид үе', fieldReady: 'Хээрийн ажилд бэлэн', capacity: 'Багийн хүчин чадал', sheepThisSeason: 'энэ улиралд хяргасан хонь', woolRecovered: 'цуглуулсан ноос', upcoming: 'Удахгүй болох ажил', seeAll: 'Бүгдийг үзэх', next: 'Дараагийн', available: 'Одоо нээлттэй', browse: 'Ойролцоох ажил хайх', location: 'Одоогийн байршил', shareLocation: 'Байршил хуваалцах', openMaps: 'Google Maps нээх', locationHint: 'Та хуваалцах хүртэл нарийвчилсан байршил нууц байна.', today: 'Өнөөдөр', inProgress: 'Явагдаж байна', completed: 'Дууссан', open: 'Нээлттэй', trusted: 'Итгэлтэй ажлын урсгал', trustedBody: 'Гэрээ, үе шаттай төлбөр, ажлын баталгаажуулалт нэг тайван орчинд.', impact: 'Энэ улирлын үр дүн', impactBody: 'Үр ашигтай хяргалтын өдөр бүр малчинд илүү их үнэ цэнэ үлдээнэ.', welcome: 'Талбайн ажлын төвд тавтай морил', welcomeBody: 'Ажил, хүмүүс, төлбөр, ноосоо нэг дороос харна.', search: 'Ажил, байршил, баг хайх', allJobs: 'Бүх ажил', filters: 'Шүүлтүүр', noJobs: 'Таны хайлтад тохирох ажил алга.', woolTitle: 'Ноос дараагийн зах зээлдээ бэлэн.', woolBody: 'Чанар, хэмжээ, байршлаа нэг удаа оруул. Ойролцоох худалдан авагчид тантай холбогдоно.', listWool: 'Ноос худалдах', messagesTitle: 'Тодорхой яриа, мартагдсан зүйл бага.', messagesBody: 'Байршил, хугацаа, хоол, төлбөрийн бүх асуултыг нэг сувгаар хадгална.', profileTitle: 'Таны ажлын профайл', profileBody: 'Чухал мэдээллээ шинэчилж байвал зөв ажил өөрөө таныг олно.', googleReady: 'Google орчинд бэлэн', googleBody: 'Firebase, Google Maps, найдвартай үүлэн ажлын урсгалд зориулсан бүтэц.', launch: 'Туршилтын хувилбар нээх', save: 'Ажил хадгалах', cancel: 'Цуцлах', newJobTitle: 'Хяргалтын ажил нэмэх', newJobBody: 'Хамгийн чухал мэдээллээ оруулна. Үлдсэнийг энгийн байлгана.', flockSize: 'Сүргийн хэмжээ', flockPlaceholder: 'жишээ нь 650 хонь', siteName: 'Байршил', sitePlaceholder: 'жишээ нь Сэлэнгэ, Монгол', readyDate: 'Бэлэн огноо', offer: 'Хонь тутмын санал', housing: 'Байрлах боломжтой', food: 'Хоолтой', jobSaved: 'Туршилтын хувилбарт ажил хадгалагдлаа.', locationShared: 'Google Maps байршлын холбоос хууллаа.', locationFound: 'Одоогийн байршил олдлоо.', locationDenied: 'Байршил авах боломжгүй байна. Туршилтын байршил ашиглалаа.', switchLanguage: 'Хэл солих', switchTheme: 'Загвар солих', signIn: 'Google-ээр нэвтэрсэн', fieldDesk: 'ХЭЭРИЙН АЖЛЫН ТӨВ', settings: 'Тохиргоо', closeMenu: 'Цэс хаах', chooseRole: 'Өөрийн үүргийг сонгох', openMenu: 'Цэс нээх', closeDialog: 'Цонх хаах', live: 'Идэвхтэй', inEscrow: 'Түр хадгаламжид', inEscrowDetail: '3 гэрээ · MNT', weeklyChange: 'Энэ долоо хоногт +4', avgResponse: 'Дундаж хариу', avgResponseDetail: 'Идэвхтэй багуудын дундаж', lastSeasonChange: 'Өнгөрсөн улирлаас +12%', paymentReleaseNote: 'Ажил дууссаныг баталгаажуулсны дараа төлбөр гарна.', fieldMap: 'Талбайн зураг', selenge: 'Сэлэнгэ', tov: 'Төв', darkhanUul: 'Дархан-Уул', selengeFieldSite: 'Сэлэнгэ дэх талбай', requestStep: 'Хүсэлт', matchStep: 'Тохирох баг', confirmStep: 'Баталгаажуулах', updatedNow: 'Дөнгөж сая шинэчлэгдсэн', stayClose: 'Ажлынхаа ойролцоо байгаарай.', mapsTeamNote: 'Баг, малчин, жолооч бүгд ижил Google Maps холбоос ашиглана.', sheep: 'хонь', tonnes: 'ТОНН', marketAccess: 'Зах зээлд хүрэх', seasonToDate: 'Энэ улирлын дүн', qualityMessage: 'Чанартай ноос өөрөө мэдээлэл болдог.', qualityDescription: 'Жин, төрөл, байршил, үнийг худалдан авагчид хялбар харьцуулахуйц байлгана.', merinoBlend: 'Мериносын хольц', cleanClip: 'Цэвэр хяргалт', nearbyBuyers: 'Ойролцоох худалдан авагчид', cleanWhiteWool: 'Цэвэр цагаан ноос', coarseWoolBatch: 'Бүдүүн ноосны багц', mixedSpringClip: 'Хаврын холимог ноос', newMessage: 'Шинэ зурвас', altanTeam: 'Алтан баг', bayangolFamily: 'Баянголын малчин өрх', kharaaValley: 'Хараагийн хөндий', altanPreview: 'Бид 18-ны өдөр өдрийн хоолны дараа очиж чадна.', bayangolPreview: '4 хүний байр бэлэн.', kharaaPreview: 'Замын нөхцөлийг баталгаажуулж болох уу?', professionalCrew: 'Мэргэжлийн хяргалтын баг · 4.9 үнэлгээ', arrivalMessage: 'Бид 18-ны өдөр өдрийн хоолны дараа очиж чадна. Дөрвөн хүний байр бэлэн үү?', housingQuestion: 'Дөрвөн хүний байр бэлэн үү?', yesSiteMessage: 'Тийм. Талбайн тэмдэглэгээ, замын тайлбар ажлын дэлгэрэнгүйд байгаа.', googleMapsShared: 'Google Maps байршил хуваалцсан', writeMessage: 'Зурвас бичих...', editProfile: 'Профайл засах', verifiedProfile: 'Баталгаатай профайл', homeRegion: 'Үндсэн бүс', homeRegionValue: 'Улаанбаатар · Монгол', activeSince: 'Ажиллаж эхэлсэн', activeSinceValue: '2024 оны улирал', preferredLanguage: 'Сонгосон хэл', preferredLanguageValue: 'Англи + Монгол', everythingHasPlace: 'Бүх зүйл өөрийн байртай.', googleMapsLinks: 'Google Maps холбоос', firebaseAuth: 'Firebase нэвтрэлт', cloudData: 'Үүлэн өгөгдлийн урсгал', shearerFieldSite: 'Хяргагчийн талбай', impactDashboardNext: 'Үр дүнгийн самбар дараагийн дэлгэцэд нэмэгдэнэ.', filtersNext: 'Шүүлтүүр дараагийн хувилбарт бэлэн болно.', woolListingNext: 'Ноос бүртгэх хэсэг дараагийн дэлгэцэд бэлэн болно.', selected: 'сонгогдлоо.', yesterday: 'Өчигдөр', monday: 'Дав', sep: '9-р сар', mobileNavigation: 'Гар утасны цэс', languageTitle: 'Хэлээ сонгоно уу', languageBody: 'Үүнийг дараа нь тохиргооноос өөрчилж болно.', mongolian: 'Монгол хэл', english: 'Англи хэл', chooseLanguage: 'Хэл сонгох', continue: 'Үргэлжлүүлэх', back: 'Буцах', chooseProfile: 'Демо профайлаа сонгоно уу', chooseProfileBody: 'Нээж харах хэрэглэгчээ сонгоно уу. Бүх демо ажил дуусаж, цалин олгогдсон.', loginStepTitle: 'Нэвтрэхэд бэлэн', loginStepBody: 'Энэ профайлыг бүх ажил, цалин, тайлан 100% дууссан төлөвтэй нээнэ.', enterDemo: 'Демо нэвтрэх', demoLoginSuccess: 'Демо нэвтрэлт амжилттай.', demoAccount: 'Демо хэрэглэгч', loginTitle: 'Демо хэрэглэгчээр нэвтрэх', loginBody: 'Дурын үүргээр шууд нэвтэрнэ. Бүх ажил, цалин, тайлан бүрэн дууссан.', loginNow: 'Нэвтрэх', currentUser: 'Одоогийн', salaryPaid: 'Цалин олгогдсон', tasksComplete: 'Даалгавар биелсэн', reportMatched: 'Тайлан таарсан', statusSuccess: 'Бүгд хэвийн', allWorkComplete: 'Бүх ажил амжилттай дууссан', paidPayroll: 'Цалин бүрэн олгогдсон', paidPayrollDetail: '9 хүн · 100% олгогдсон', reports: 'Тайлан', reportTitle: '100% биелэлттэй тайлан', reportBody: 'Бүх даалгавар дуусаж, бүх санхүүгийн дүн яг таарсан.', totalJobs: 'Нийт ажил', completedJobs: 'Дууссан ажил', paidSalary: 'Олгосон цалин', exactMatch: 'Яг таарсан', allPaid: 'Бүгд олгогдсон', allComplete: '100% биелсэн', matched: 'Таарсан', reportPeriod: '2026 оны улирал', allUsers: '9 демо хэрэглэгч', workTasks: 'Ажлын даалгавар', financeSummary: 'Санхүүгийн дүн', noOpenIssues: 'Нээлттэй асуудалгүй', closeLogin: 'Нэвтрэх цонх хаах', auditReady: 'Шалгалтад бэлэн демо', viewProfile: 'Профайл харах', director: 'Захирал', accountant: 'Нягтлан', manager: 'Менежер', roleAccess: 'Эрхийн хүрээ', roleActions: 'Шуурхай үйлдэл', identity: 'Танилцуулга', connectedServices: 'Холбогдсон үйлчилгээнүүд',
  },
}

const supplementalCopy: Record<Language, Copy> = {
  en: {
    notifications: 'Notifications', notificationTitle: 'Notifications', notificationBody: 'Recent field updates and payment status.', notificationOne: 'All salaries have been paid.', notificationTwo: 'Every task is 100% complete.', notificationThree: 'Reports and totals match.', closeNotifications: 'Close notifications', developer: 'Developer',
  },
  mn: {
    notifications: 'Мэдэгдэл', notificationTitle: 'Мэдэгдэл', notificationBody: 'Сүүлийн талбайн шинэчлэлт ба цалингийн мэдээлэл.', notificationOne: 'Бүх цалин олгогдсон.', notificationTwo: 'Бүх даалгавар 100% биелсэн.', notificationThree: 'Тайлан, тооцоо яг таарсан.', closeNotifications: 'Мэдэгдэл хаах', developer: 'Хөгжүүлэгч',
  },
}

const roleOptions: { id: Role; labelKey: string; icon: typeof House }[] = [
  { id: 'herder', labelKey: 'herder', icon: House },
  { id: 'shearer', labelKey: 'shearer', icon: UsersRound },
  { id: 'director', labelKey: 'director', icon: ShieldCheck },
  { id: 'accountant', labelKey: 'accountant', icon: CircleDollarSign },
  { id: 'manager', labelKey: 'manager', icon: ClipboardCheck },
]

const localized = (en: string, mn: string): Localized => ({ en, mn })

const demoUsers: DemoUser[] = [
  { id: 'director-delgermaa', role: 'director', name: 'Дэлгэрмаа', initials: 'Д', organization: localized('Share Mongolia NGO', 'Share Mongolia ТББ'), location: localized('Ulaanbaatar · Mongolia', 'Улаанбаатар · Монгол') },
  { id: 'accountant-bolor', role: 'accountant', name: 'Болор', initials: 'Б', organization: localized('Share Mongolia NGO', 'Share Mongolia ТББ'), location: localized('Ulaanbaatar · Mongolia', 'Улаанбаатар · Монгол') },
  { id: 'shearer-bat', role: 'shearer', name: 'Бат', initials: 'Б', organization: localized('Altan shearing crew', 'Алтан хяргалтын баг'), location: localized('Darkhan-Uul · Mongolia', 'Дархан-Уул · Монгол') },
  { id: 'shearer-bold', role: 'shearer', name: 'Болд', initials: 'Б', organization: localized('Kharaa shearing crew', 'Хараагийн хяргалтын баг'), location: localized('Selenge · Mongolia', 'Сэлэнгэ · Монгол') },
  { id: 'shearer-bayar', role: 'shearer', name: 'Баяр', initials: 'Б', organization: localized('Eastern steppe crew', 'Зүүн талын хяргалтын баг'), location: localized('Khentii · Mongolia', 'Хэнтий · Монгол') },
  { id: 'manager-galkhuu', role: 'manager', name: 'Галхүү', initials: 'Г', organization: localized('Field operations team', 'Хээрийн үйл ажиллагааны баг'), location: localized('Töv · Mongolia', 'Төв · Монгол') },
  { id: 'herder-tumenbayar', role: 'herder', name: 'Түмэнбаяр', initials: 'Т', organization: localized('Tumenbayar family flock', 'Түмэнбаярын малчин өрх'), location: localized('Binder soum, Khentii aimag', 'Хэнтий аймгийн Биндэр сум') },
  { id: 'herder-myanganbayar', role: 'herder', name: 'Мянганбаяр', initials: 'М', organization: localized('Myanganbayar family flock', 'Мянганбаярын малчин өрх'), location: localized('Batnorov soum, Khentii aimag', 'Хэнтий аймгийн Батноров сум') },
  { id: 'herder-ikhbayar', role: 'herder', name: 'Ихбаяр', initials: 'И', organization: localized('Ikhbayar family flock', 'Ихбаярын малчин өрх'), location: localized('Dadal soum, Khentii aimag', 'Хэнтий аймгийн Дадал сум') },
]

const roleProfiles: Record<Role, RoleProfile> = {
  herder: {
    name: 'Delgermaa', organization: localized('Share Mongolia NGO', 'Share Mongolia ТББ'), title: localized('Your herder profile', 'Малчин профайл'), body: localized('Manage your flock, shearing requests, locations, and payments from one place.', 'Сүрэг, хяргалтын хүсэлт, байршил, төлбөрөө нэг дороос удирдана.'), badge: localized('Verified herder', 'Баталгаатай малчин'), region: localized('Selenge · Mongolia', 'Сэлэнгэ · Монгол'), since: localized('2024 season', '2024 оны улирал'), focusLabel: localized('Flock at a glance', 'Сүргийн товч мэдээлэл'), focusTitle: localized('Your next shearing day, under control.', 'Дараагийн хяргалтын өдрөө бүрэн хянаарай.'), focusBody: localized('Keep the crew, date, site pin, and payment milestone visible before the work begins.', 'Ажил эхлэхээс өмнө баг, огноо, талбайн байршил, төлбөрийн үе шатыг тодорхой харна.'), responsibilities: [localized('Create and track shearing requests', 'Хяргалтын хүсэлт үүсгэж, явцыг хянах'), localized('Share a private field location through Google Maps', 'Талбайн нууц байршлыг Google Maps-ээр хуваалцах'), localized('Confirm completed work before payment release', 'Төлбөр гаргахаас өмнө дууссан ажлыг баталгаажуулах')], stats: [{ label: localized('My flock', 'Миний сүрэг'), value: '1,240', detail: localized('sheep this season', 'энэ улирлын хонь') }, { label: localized('Open requests', 'Нээлттэй хүсэлт'), value: '12', detail: localized('active jobs', 'идэвхтэй ажил') }, { label: localized('Earned this season', 'Энэ улирлын орлого'), value: '4.8M', detail: localized('salary fully paid', 'цалин бүрэн олгогдсон') }], actions: [localized('Add a shearing job', 'Хяргалтын ажил нэмэх'), localized('Share location', 'Байршил хуваалцах')],
  },
  shearer: {
    name: 'Baterdene', organization: localized('Altan shearing crew', 'Алтан хяргалтын баг'), title: localized('Your shearer profile', 'Хяргагч профайл'), body: localized('Show your crew capacity, experience, availability, and completed work to herders.', 'Багийн хүчин чадал, туршлага, боломжит хугацаа, хийсэн ажлаа малчдад харуулна.'), badge: localized('Verified crew lead', 'Баталгаатай багийн ахлагч'), region: localized('Darkhan-Uul · Mongolia', 'Дархан-Уул · Монгол'), since: localized('2022 season', '2022 оны улирал'), focusLabel: localized('Crew readiness', 'Багийн бэлэн байдал'), focusTitle: localized('A clear profile earns the next job.', 'Тодорхой профайл дараагийн ажлыг авчирна.'), focusBody: localized('Keep your team size, daily capacity, rating, and arrival details ready for every match.', 'Багийн хэмжээ, өдөрт хийх хүчин чадал, үнэлгээ, очих мэдээллээ бүрэн шинэчилж байгаарай.'), responsibilities: [localized('Set crew capacity and availability', 'Багийн хүчин чадал, боломжит хугацааг тохируулах'), localized('Respond to nearby job requests', 'Ойролцоох ажлын хүсэлтэд хариу өгөх'), localized('Share arrival notes and road details', 'Очих болон замын мэдээлэл хуваалцах')], stats: [{ label: localized('Completed jobs', 'Дуусгасан ажил'), value: '38', detail: localized('100% complete', '100% биелэлттэй') }, { label: localized('Crew rating', 'Багийн үнэлгээ'), value: '4.9', detail: localized('from herders', 'малчдын үнэлгээ') }, { label: localized('Daily capacity', 'Өдрийн хүчин чадал'), value: '720', detail: localized('sheep / day', 'хонь / өдөр') }], actions: [localized('Update availability', 'Боломжит хугацаа шинэчлэх'), localized('Browse nearby jobs', 'Ойролцоох ажил хайх')],
  },
  director: {
    name: 'Erdenebat', organization: localized('Share Mongolia NGO', 'Share Mongolia ТББ'), title: localized('Your director profile', 'Захирал профайл'), body: localized('See the whole operation: partner herders, field performance, revenue, and delivery quality.', 'Хамтрагч малчид, талбайн гүйцэтгэл, орлого, ажлын чанарыг байгууллагын түвшинд харна.'), badge: localized('Organization owner', 'Байгууллагын эзэмшигч'), region: localized('Ulaanbaatar · Mongolia', 'Улаанбаатар · Монгол'), since: localized('2021 season', '2021 оны улирал'), focusLabel: localized('Organization overview', 'Байгууллагын тойм'), focusTitle: localized('One view for every important decision.', 'Чухал шийдвэр бүрт нэг цэгийн харагдац.'), focusBody: localized('Review the season at a glance while keeping access to people, contracts, and outcomes accountable.', 'Улирлын үр дүнг нэг дороос харж, хүн, гэрээ, гүйцэтгэлийн хариуцлагыг тодорхой байлгана.'), responsibilities: [localized('View organization-wide performance', 'Байгууллагын нийт гүйцэтгэлийг харах'), localized('Approve key contracts and operating rules', 'Чухал гэрээ, ажлын дүрмийг батлах'), localized('Manage access for finance and field teams', 'Санхүү, талбайн багийн эрхийг удирдах')], stats: [{ label: localized('Partner herders', 'Хамтрагч малчин'), value: '128', detail: localized('active profiles', 'идэвхтэй профайл') }, { label: localized('Season revenue', 'Улирлын орлого'), value: '86.4M', detail: localized('MNT tracked', 'хянагдсан MNT') }, { label: localized('Completion rate', 'Дуусгалтын хувь'), value: '100%', detail: localized('all tasks completed', 'бүх даалгавар дууссан') }], actions: [localized('View organization report', 'Байгууллагын тайлан харах'), localized('Manage team access', 'Багийн эрх удирдах')],
  },
  accountant: {
    name: 'Oyunchimeg', organization: localized('Share Mongolia NGO', 'Share Mongolia ТББ'), title: localized('Your accountant profile', 'Нягтлан профайл'), body: localized('Reconcile contracts, milestone payments, invoices, and the season’s financial picture.', 'Гэрээ, үе шаттай төлбөр, нэхэмжлэл, улирлын санхүүгийн дүнг тулгана.'), badge: localized('Finance administrator', 'Санхүүгийн администратор'), region: localized('Ulaanbaatar · Mongolia', 'Улаанбаатар · Монгол'), since: localized('2023 season', '2023 оны улирал'), focusLabel: localized('Financial control', 'Санхүүгийн хяналт'), focusTitle: localized('Every payment has a clear source.', 'Төлбөр бүр тодорхой эх үүсвэртэй.'), focusBody: localized('Match completed work to approved milestones, keep records tidy, and surface anything that needs attention.', 'Дууссан ажлыг батлагдсан үе шаттай тулгаж, бүртгэлийг цэгцтэй байлгана.'), responsibilities: [localized('Review and reconcile milestone payments', 'Үе шаттай төлбөрийг шалгаж тулгах'), localized('Track invoices and contract balances', 'Нэхэмжлэл, гэрээний үлдэгдэл хянах'), localized('Export a clean season finance report', 'Улирлын санхүүгийн тайлан гаргах')], stats: [{ label: localized('Paid payroll', 'Олгосон цалин'), value: '4.8M', detail: localized('MNT paid', 'олгосон MNT') }, { label: localized('Paid contracts', 'Төлсөн гэрээ'), value: '42', detail: localized('this season', 'энэ улиралд') }, { label: localized('Books closed', 'Хаасан бүртгэл'), value: '100%', detail: localized('exactly matched', 'яг таарсан') }], actions: [localized('Review payments', 'Төлбөр шалгах'), localized('Export finance report', 'Санхүүгийн тайлан гаргах')],
  },
  manager: {
    name: 'Nomin', organization: localized('Field operations team', 'Хээрийн үйл ажиллагааны баг'), title: localized('Your manager profile', 'Менежер профайл'), body: localized('Coordinate crews, schedules, sites, and exceptions so every shearing day runs smoothly.', 'Баг, хуваарь, талбай, асуудлыг уялдуулж хяргалтын өдөр бүрийг жигд явуулна.'), badge: localized('Field operations lead', 'Хээрийн үйл ажиллагааны ахлагч'), region: localized('Töv · Mongolia', 'Төв · Монгол'), since: localized('2024 season', '2024 оны улирал'), focusLabel: localized('Operations control', 'Үйл ажиллагааны хяналт'), focusTitle: localized('Keep every crew moving in the same direction.', 'Бүх багийг нэг чиглэлд урагшлуулна.'), focusBody: localized('Balance requests, crew availability, travel time, and field issues from one working view.', 'Хүсэлт, багийн боломж, замын хугацаа, талбайн асуудлыг нэг ажлын цонхоор зохицуулна.'), responsibilities: [localized('Assign crews to approved requests', 'Батлагдсан хүсэлтэд баг хуваарилах'), localized('Monitor schedule and field progress', 'Хуваарь, талбайн явцыг хянах'), localized('Resolve access, timing, and road issues', 'Байршил, хугацаа, замын асуудлыг шийдэх')], stats: [{ label: localized('Active crews', 'Идэвхтэй баг'), value: '14', detail: localized('field teams', 'талбайн баг') }, { label: localized('Scheduled jobs', 'Товлосон ажил'), value: '27', detail: localized('next 30 days', 'дараагийн 30 өдөр') }, { label: localized('Issue rate', 'Асуудлын хувь'), value: '0%', detail: localized('all clear', 'бүгд хэвийн') }], actions: [localized('Open field schedule', 'Талбайн хуваарь нээх'), localized('Manage crews', 'Баг удирдах')],
  },
}

const seedJobs: Job[] = [
  { id: 1, title: { en: 'Bayangol winter flock', mn: 'Баянголын өвөлжөөний сүрэг' }, location: { en: 'Selenge aimag', mn: 'Сэлэнгэ аймаг' }, date: { en: 'Sep 18 · 2 days', mn: '9-р сарын 18 · 2 өдөр' }, sheep: 720, offer: { en: '2,000 MNT / sheep', mn: '2,000 MNT / хонь' }, status: 'open' },
  { id: 2, title: { en: 'Kharaa valley team', mn: 'Хараагийн хөндийн баг' }, location: { en: 'Darkhan-Uul', mn: 'Дархан-Уул' }, date: { en: 'Sep 22 · 1 day', mn: '9-р сарын 22 · 1 өдөр' }, sheep: 410, offer: { en: '2,200 MNT / sheep', mn: '2,200 MNT / хонь' }, status: 'open' },
  { id: 3, title: { en: 'Altanbulag cooperative', mn: 'Алтанбулагийн хоршоо' }, location: { en: 'Töv aimag', mn: 'Төв аймаг' }, date: { en: 'Sep 15 · 3 days', mn: '9-р сарын 15 · 3 өдөр' }, sheep: 860, offer: { en: '2,100 MNT / sheep', mn: '2,100 MNT / хонь' }, status: 'in-progress' },
]

function format24HourTime(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i)
  if (!match) return value
  let hours = Number(match[1])
  const minutes = match[2]
  const meridiem = match[3]?.toUpperCase()
  if (meridiem === 'PM' && hours < 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0
  return `${String(hours).padStart(2, '0')}:${minutes}`
}

function App() {
  const [language, setLanguage] = useState<Language>('mn')
  const [theme, setTheme] = useState<Theme>('light')
  const [currentUserId, setCurrentUserId] = useState(demoUsers[0].id)
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('language')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeView, setActiveView] = useState<View>('home')
  const [jobs, setJobs] = useState<Job[]>(seedJobs)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [coords, setCoords] = useState({ lat: 47.918, lng: 106.917 })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [jobForm, setJobForm] = useState({ title: '', location: '', sheep: '', date: '2026-09-18', offer: '2,000 MNT', housing: true, food: false })

  const t = (key: string) => dictionary[language][key] ?? supplementalCopy[language][key] ?? key
  const currentUser = demoUsers.find((user) => user.id === currentUserId) ?? demoUsers[0]
  const role = currentUser.role

  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = language }, [theme, language])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filteredJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return jobs
    return jobs.filter((job) => `${job.title.en} ${job.title.mn} ${job.location.en} ${job.location.mn} ${job.offer.en} ${job.offer.mn}`.toLowerCase().includes(normalized))
  }, [jobs, query])

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
  const mapEmbedUrl = googleMapsEmbedKey ? `https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(googleMapsEmbedKey)}&center=${coords.lat},${coords.lng}&zoom=8&language=${language}` : ''
  const navItems: { id: View; label: string; icon: typeof House }[] = [
    { id: 'home', label: t('home'), icon: House }, { id: 'jobs', label: t('jobs'), icon: ClipboardCheck }, { id: 'wool', label: t('wool'), icon: PackageCheck }, { id: 'messages', label: t('messages'), icon: MessageCircle }, { id: 'reports', label: t('reports'), icon: BarChart3 }, { id: 'profile', label: t('profile'), icon: UserRound },
  ]
  const showToast = (message: string) => setToast(message)
  const selectOnboardingUser = (user: DemoUser) => { setCurrentUserId(user.id); setOnboardingStep('login') }
  const finishDemoLogin = () => { setOnboardingStep('done'); setActiveView('profile'); showToast(`${currentUser.name} · ${t('demoLoginSuccess')}`) }

  const copyLink = async (link: string) => {
    try { await navigator.clipboard.writeText(link) } catch {
      const area = document.createElement('textarea'); area.value = link; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove()
    }
  }

  const shareLocation = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: t('shearerFieldSite'), url: mapUrl }) } catch { await copyLink(mapUrl) }
    } else await copyLink(mapUrl)
    showToast(t('locationShared'))
  }

  const findLocation = () => {
    if (!navigator.geolocation) return showToast(t('locationDenied'))
    navigator.geolocation.getCurrentPosition(
      (position) => { setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }); showToast(t('locationFound')) },
      () => showToast(t('locationDenied')),
      { enableHighAccuracy: true, timeout: 7000 },
    )
  }

  const submitJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setJobs((current) => [{ id: Date.now(), title: { en: jobForm.title || 'New shearing request', mn: jobForm.title || 'Шинэ хяргалтын хүсэлт' }, location: { en: jobForm.location || 'Mongolia', mn: jobForm.location || 'Монгол' }, date: { en: `${jobForm.date} · 2 days`, mn: `${jobForm.date} · 2 өдөр` }, sheep: Number(jobForm.sheep) || 500, offer: { en: `${jobForm.offer} / sheep`, mn: `${jobForm.offer} / хонь` }, status: 'open' }, ...current])
    setIsModalOpen(false); setActiveView('jobs'); showToast(t('jobSaved')); setJobForm({ ...jobForm, title: '', location: '', sheep: '' })
  }

  const selectNav = (view: View) => { setActiveView(view); setMobileNavOpen(false) }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark">S</div><div><div className="brand-name">{t('appName')}</div><div className="brand-caption">{t('fieldDesk')}</div></div><button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label={t('closeMenu')}><X size={18} /></button></div>
      <div className="role-switcher" aria-label={t('chooseRole')}>{roleOptions.map(({ id, labelKey, icon: Icon }) => <button key={id} className={role === id ? 'role-active' : ''} onClick={() => { const nextUser = demoUsers.find((user) => user.role === id); if (nextUser) setCurrentUserId(nextUser.id); setActiveView('profile'); setMobileNavOpen(false) }}><Icon size={15} /> {t(labelKey)}</button>)}</div>
      <nav className="side-nav"><div className="nav-label">{t('overview')}</div>{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => selectNav(id)}><Icon size={18} strokeWidth={activeView === id ? 2.4 : 1.8} /><span>{label}</span>{id === 'messages' && <span className="nav-dot" />}</button>)}</nav>
      <div className="sidebar-bottom"><button className="settings-link" onClick={() => selectNav('profile')}><Settings2 size={17} /> {t('settings')}</button><a className="settings-link developer-link" href="https://scorej.biz/" target="_blank" rel="noreferrer"><ExternalLink size={17} /> {t('developer')}</a><button className="account-row account-button" onClick={() => setIsLoginOpen(true)}><div className="avatar">{currentUser.initials}</div><div className="account-copy"><strong>{currentUser.name}</strong><span>{currentUser.organization[language]}</span></div><MoreHorizontal size={17} className="muted-icon" /></button></div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <button className="icon-button menu-button" onClick={() => setMobileNavOpen(true)} aria-label={t('openMenu')}><Menu size={20} /></button>
        <div className="topbar-context"><span className="context-kicker">{t('eyebrow')}</span><span className="context-title">{activeView === 'home' ? t('activeSeason') : navItems.find((item) => item.id === activeView)?.label}</span></div>
        <div className="topbar-actions">
          <button className="control-button language-button" onClick={() => setLanguage(language === 'en' ? 'mn' : 'en')} title={t('switchLanguage')}><span>{language === 'en' ? 'MN' : 'EN'}</span></button>
          <button className="control-button theme-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title={t('switchTheme')}>{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button>
          <button className="topbar-user login-trigger" onClick={() => setIsLoginOpen(true)} title={t('loginTitle')}><div className="avatar small">{currentUser.initials}</div><span>{currentUser.name} · {t('demoAccount')}</span></button>
          <div className="notification-wrap">
            <button className="control-button notification-button" onClick={() => setIsNotificationsOpen((open) => !open)} title={t('notifications')} aria-label={t('notifications')} aria-expanded={isNotificationsOpen} aria-controls="notification-panel"><Bell size={16} /><span className="notification-dot" /></button>
            {isNotificationsOpen && <div className="notification-panel" id="notification-panel" role="dialog" aria-label={t('notifications')}>
              <div className="notification-panel-header"><div><strong>{t('notificationTitle')}</strong><span>{t('notificationBody')}</span></div><button className="icon-button" onClick={() => setIsNotificationsOpen(false)} aria-label={t('closeNotifications')}><X size={15} /></button></div>
              <div className="notification-list"><div className="notification-item"><span className="notification-status"><Check size={13} /></span><div><strong>{t('notificationOne')}</strong><small>{t('salaryPaid')}</small></div></div><div className="notification-item"><span className="notification-status"><Check size={13} /></span><div><strong>{t('notificationTwo')}</strong><small>{t('tasksComplete')}</small></div></div><div className="notification-item"><span className="notification-status"><Check size={13} /></span><div><strong>{t('notificationThree')}</strong><small>{t('reportMatched')}</small></div></div></div>
            </div>}
          </div>
        </div>
      </header>
      {activeView === 'home' && <HomeView t={t} language={language} role={role} jobs={jobs} coords={coords} mapUrl={mapUrl} mapEmbedUrl={mapEmbedUrl} onCreate={() => setIsModalOpen(true)} onJobs={() => selectNav('jobs')} onShare={shareLocation} onFindLocation={findLocation} showToast={showToast} />}
      {activeView === 'jobs' && <JobsView t={t} language={language} jobs={filteredJobs} query={query} setQuery={setQuery} onCreate={() => setIsModalOpen(true)} onShare={shareLocation} onFindLocation={findLocation} onOpenMap={() => window.open(mapUrl, '_blank', 'noopener,noreferrer')} showToast={showToast} />}
      {activeView === 'wool' && <WoolView t={t} onCreate={() => showToast(t('woolListingNext'))} />}
      {activeView === 'messages' && <MessagesView t={t} />}
      {activeView === 'reports' && <ReportsView t={t} />}
      {activeView === 'profile' && <ProfileView t={t} language={language} user={currentUser} showToast={showToast} />}
      <nav className="bottom-nav" aria-label={t('mobileNavigation')}>
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`bottom-nav-item ${activeView === id ? 'active' : ''}`} onClick={() => selectNav(id)}><Icon size={18} strokeWidth={activeView === id ? 2.4 : 1.8} /><span>{label}</span></button>)}
      </nav>
    </main>

    {toast && <div className="toast" role="status"><Check size={16} /> {toast}</div>}
    {isLoginOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setIsLoginOpen(false)}><div className="modal-card login-card" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal-header"><div><div className="eyebrow"><UserRound size={14} /> {t('demoAccount')}</div><h2 id="login-title">{t('loginTitle')}</h2><p>{t('loginBody')}</p></div><button className="icon-button" onClick={() => setIsLoginOpen(false)} aria-label={t('closeLogin')}><X size={18} /></button></div><div className="demo-status-strip"><span><Check size={14} /> {t('salaryPaid')}</span><span><Check size={14} /> {t('tasksComplete')}</span><span><Check size={14} /> {t('reportMatched')}</span></div><div className="demo-user-grid">{demoUsers.map((user) => <div className={`demo-user-card ${user.id === currentUserId ? 'selected' : ''}`} key={user.id}><div className="demo-user-avatar">{user.initials}</div><div className="demo-user-copy"><strong>{user.name}</strong><span>{t(user.role)}</span><small>{user.location[language]}</small><small className="demo-user-paid"><Check size={11} /> {t('salaryPaid')}</small></div><button className={user.id === currentUserId ? 'secondary-button' : 'primary-button'} onClick={() => { setCurrentUserId(user.id); setIsLoginOpen(false); setActiveView('profile'); showToast(`${user.name} · ${t('statusSuccess')}`) }}>{user.id === currentUserId ? t('currentUser') : t('loginNow')}</button></div>)}</div></div></div>}
    {isModalOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setIsModalOpen(false)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="new-job-title"><div className="modal-header"><div><div className="eyebrow">{t('fieldReady')}</div><h2 id="new-job-title">{t('newJobTitle')}</h2><p>{t('newJobBody')}</p></div><button className="icon-button" onClick={() => setIsModalOpen(false)} aria-label={t('closeDialog')}><X size={18} /></button></div><form onSubmit={submitJob}><div className="form-grid"><label><span>{t('siteName')}</span><input value={jobForm.location} onChange={(event) => setJobForm({ ...jobForm, location: event.target.value })} placeholder={t('sitePlaceholder')} /></label><label><span>{t('flockSize')}</span><input value={jobForm.sheep} onChange={(event) => setJobForm({ ...jobForm, sheep: event.target.value })} type="number" min="1" placeholder={t('flockPlaceholder')} /></label><label><span>{t('readyDate')}</span><input value={jobForm.date} onChange={(event) => setJobForm({ ...jobForm, date: event.target.value })} type="date" /></label><label><span>{t('offer')}</span><select value={jobForm.offer} onChange={(event) => setJobForm({ ...jobForm, offer: event.target.value })}><option>2,000 MNT</option><option>2,200 MNT</option><option>2,500 MNT</option></select></label></div><div className="toggle-row"><label className="toggle-label"><input type="checkbox" checked={jobForm.housing} onChange={(event) => setJobForm({ ...jobForm, housing: event.target.checked })} /><span className="fake-check">{jobForm.housing && <Check size={13} />}</span>{t('housing')}</label><label className="toggle-label"><input type="checkbox" checked={jobForm.food} onChange={(event) => setJobForm({ ...jobForm, food: event.target.checked })} /><span className="fake-check">{jobForm.food && <Check size={13} />}</span>{t('food')}</label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setIsModalOpen(false)}>{t('cancel')}</button><button type="submit" className="primary-button">{t('save')} <ArrowUpRight size={16} /></button></div></form></div></div>}
    {onboardingStep !== 'done' && <OnboardingView t={t} language={language} step={onboardingStep} currentUser={currentUser} setLanguage={setLanguage} setStep={setOnboardingStep} onSelectProfile={selectOnboardingUser} onLogin={finishDemoLogin} />}
  </div>
}

type OnboardingProps = { t: (key: string) => string; language: Language; step: OnboardingStep; currentUser: DemoUser; setLanguage: (language: Language) => void; setStep: (step: OnboardingStep) => void; onSelectProfile: (user: DemoUser) => void; onLogin: () => void }

function OnboardingView({ t, language, step, currentUser, setLanguage, setStep, onSelectProfile, onLogin }: OnboardingProps) {
  return <div className="modal-backdrop onboarding-backdrop">
    <div className="modal-card onboarding-card" role="dialog" aria-modal="true">
      {step === 'language' && <>
        <div className="eyebrow"><Globe2 size={14} /> {t('chooseLanguage')}</div><h2>{t('languageTitle')}</h2><p>{t('languageBody')}</p>
        <div className="language-choice-grid">
          <button className={`language-choice ${language === 'mn' ? 'selected' : ''}`} onClick={() => setLanguage('mn')}><span>MN</span><strong>{t('mongolian')}</strong><small>Монгол</small></button>
          <button className={`language-choice ${language === 'en' ? 'selected' : ''}`} onClick={() => setLanguage('en')}><span>EN</span><strong>{t('english')}</strong><small>English</small></button>
        </div>
        <div className="onboarding-actions"><span /><button className="primary-button" onClick={() => setStep('profile')}>{t('continue')} <ArrowUpRight size={16} /></button></div>
      </>}
      {step === 'profile' && <>
        <div className="eyebrow"><UsersRound size={14} /> {t('demoAccount')}</div><h2>{t('chooseProfile')}</h2><p>{t('chooseProfileBody')}</p>
        <div className="onboarding-user-grid">{demoUsers.map((user) => <button className={`onboarding-user-card ${user.id === currentUser.id ? 'selected' : ''}`} key={user.id} onClick={() => onSelectProfile(user)}><div className="demo-user-avatar">{user.initials}</div><div className="demo-user-copy"><strong>{user.name}</strong><span>{t(user.role)}</span><small>{user.location[language]}</small></div><ChevronRight size={16} className="muted-icon" /></button>)}</div>
        <div className="onboarding-actions"><button className="secondary-button" onClick={() => setStep('language')}>{t('back')}</button><span /></div>
      </>}
      {step === 'login' && <>
        <div className="eyebrow"><ShieldCheck size={14} /> {t('demoAccount')}</div><h2>{t('loginStepTitle')}</h2><p>{t('loginStepBody')}</p>
        <div className="onboarding-login"><div className="onboarding-login-user"><div className="profile-avatar">{currentUser.initials}</div><div><strong>{currentUser.name}</strong><span>{t(currentUser.role)} · {currentUser.location[language]}</span></div></div><div className="onboarding-success"><span><Check size={14} /> {t('salaryPaid')}</span><span><Check size={14} /> {t('tasksComplete')}</span><span><Check size={14} /> {t('reportMatched')}</span></div></div>
        <div className="onboarding-actions"><button className="secondary-button" onClick={() => setStep('profile')}>{t('back')}</button><button className="primary-button" onClick={onLogin}>{t('enterDemo')} <ArrowUpRight size={16} /></button></div>
      </>}
    </div>
  </div>
}

type HomeProps = { t: (key: string) => string; language: Language; role: Role; jobs: Job[]; coords: { lat: number; lng: number }; mapUrl: string; mapEmbedUrl: string; onCreate: () => void; onJobs: () => void; onShare: () => void; onFindLocation: () => void; showToast: (message: string) => void }
function HomeView({ t, language, role, jobs, coords, mapUrl, mapEmbedUrl, onCreate, onJobs, onShare, onFindLocation, showToast }: HomeProps) { return <div className="page-wrap"><section className="hero-grid home-summary-grid"><div className="season-card"><div className="season-header"><div><span>{t('activeSeason')}</span><strong>{t('seasonTitle')}</strong></div><span className="status-pill"><span /> {t('live')}</span></div><div className="season-chart"><div className="season-chart-head"><div><strong>{t('seasonChartTitle')}</strong><span>{t('seasonChartCaption')}</span></div><BarChart3 size={17} /></div><div className="season-chart-plot" role="img" aria-label={t('seasonChartTitle')}><div className="season-chart-axis"><span>420</span><span>0</span></div><div className="season-chart-bars"><div className="season-chart-column"><strong>120</strong><div className="season-bar" style={{ height: '29%' }} /><span>{t('monthMay')}</span></div><div className="season-chart-column"><strong>220</strong><div className="season-bar" style={{ height: '52%' }} /><span>{t('monthJune')}</span></div><div className="season-chart-column"><strong>260</strong><div className="season-bar" style={{ height: '62%' }} /><span>{t('monthJuly')}</span></div><div className="season-chart-column"><strong>330</strong><div className="season-bar" style={{ height: '79%' }} /><span>{t('monthAugust')}</span></div><div className="season-chart-column current"><strong>310</strong><div className="season-bar" style={{ height: '74%' }} /><span>{t('monthSeptember')}</span></div></div></div></div><div className="season-footer"><div><strong>1,240</strong><span>{t('sheepThisSeason')}</span></div><div><strong>+38%</strong><span>{t('capacity')}</span></div></div></div></section><section className="metric-row"><MetricCard icon={ClipboardCheck} label={t('upcoming')} value="12" detail={t('weeklyChange')} tone="mint" /><MetricCard icon={CircleDollarSign} label={t('paidPayroll')} value="4.8M" detail={t('paidPayrollDetail')} tone="sand" /><MetricCard icon={Leaf} label={t('woolRecovered')} value="1.86t" detail={t('lastSeasonChange')} tone="blue" /><MetricCard icon={Clock3} label={t('avgResponse')} value="2.4h" detail={t('avgResponseDetail')} tone="lavender" /></section><section className="content-grid"><div className="panel activity-panel"><div className="panel-heading"><div><div className="eyebrow">{t('next')}</div><h2>{t('upcoming')}</h2></div><div className="panel-heading-actions"><button className="small-action" onClick={onCreate}><Plus size={14} /> {t('createJob')}</button><button className="link-button" onClick={onJobs}>{t('seeAll')} <ChevronRight size={15} /></button></div></div><div className="job-list">{jobs.slice(0, 3).map((job) => <JobRow key={job.id} job={job} language={language} t={t} onClick={onJobs} />)}</div><div className="panel-footer-note"><AlertCircle size={15} /> {t('paymentReleaseNote')}</div></div><div className="panel map-panel"><div className="panel-heading"><div><div className="eyebrow">{t('location')}</div><h2>{t('fieldMap')}</h2></div><button className="icon-button" onClick={onFindLocation} aria-label={t('location')}><Navigation size={17} /></button></div><div className="map-surface">{mapEmbedUrl ? <iframe className="map-embed" src={mapEmbedUrl} title={t('fieldMap')} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="map-fallback"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-river" /><div className="map-pin pin-one"><MapPin size={21} fill="currentColor" /></div><div className="map-pin pin-two"><MapPin size={21} fill="currentColor" /></div><div className="map-label label-one">{t('selenge')}</div><div className="map-label label-two">{t('tov')}</div></div>}<div className="map-coordinates">{coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}</div></div><div className="map-footer"><div><strong>{t('selengeFieldSite')}</strong><span>{t('locationHint')}</span></div><div className="map-actions"><button className="small-action" onClick={onShare}><Share2 size={14} /> {t('shareLocation')}</button><a className="small-action ghost" href={mapUrl} target="_blank" rel="noreferrer"><ExternalLink size={14} /> {t('openMaps')}</a></div></div></div></section><section className="bottom-grid"><div className="statement-card"><div className="statement-icon"><Leaf size={19} /></div><div><div className="eyebrow">{t('impact')}</div><h2>{t('impactBody')}</h2></div><button className="circle-arrow" onClick={() => showToast(t('impactDashboardNext'))}><ArrowUpRight size={17} /></button></div><div className="workflow-card"><div className="workflow-header"><div><div className="eyebrow">{t(role)}</div><h2>{t('welcome')}</h2></div><div className="mini-avatar">D</div></div><div className="workflow-steps"><WorkflowStep number="01" text={t('requestStep')} done /><WorkflowStep number="02" text={t('matchStep')} done /><WorkflowStep number="03" text={t('confirmStep')} /></div></div></section><CompletionSummary t={t} /></div> }
function CompletionSummary({ t }: { t: (key: string) => string }) {
  return <section className="panel completion-panel">
    <div className="completion-header"><div><div className="eyebrow"><ShieldCheck size={14} /> {t('auditReady')}</div><h2>{t('allWorkComplete')}</h2></div><span className="success-pill"><Check size={13} /> {t('statusSuccess')}</span></div>
    <div className="completion-grid"><div><strong>100%</strong><span>{t('tasksComplete')}</span></div><div><strong>100%</strong><span>{t('salaryPaid')}</span></div><div><strong>100%</strong><span>{t('reportMatched')}</span></div></div>
    <div className="completion-checks"><span><Check size={14} /> {t('allPaid')}</span><span><Check size={14} /> {t('allComplete')}</span><span><Check size={14} /> {t('exactMatch')}</span></div>
  </section>
}

function ReportsView({ t }: { t: (key: string) => string }) {
  const rows = [
    { label: t('workTasks'), count: '42 / 42', status: t('allComplete') },
    { label: t('paidSalary'), count: '9 / 9', status: t('allPaid') },
    { label: t('financeSummary'), count: '42 / 42', status: t('exactMatch') },
    { label: t('allUsers'), count: '9 / 9', status: t('matched') },
  ]
  return <div className="page-wrap inner-page compact-page"><CompletionSummary t={t} /><div className="panel report-table"><div className="panel-heading"><div><div className="eyebrow">{t('financeSummary')}</div><h2>{t('reportTitle')}</h2></div><div className="report-heading-meta"><span className="report-period">{t('reportPeriod')}</span><span className="status-pill report-status"><span /> {t('matched')}</span></div></div><div className="report-row report-row-head"><span>{t('workTasks')}</span><span>{t('completedJobs')}</span><span>{t('statusSuccess')}</span></div>{rows.map((row) => <div className="report-row" key={row.label}><strong>{row.label}</strong><span>{row.count}</span><span className="report-match"><Check size={13} /> {row.status}</span></div>)}</div></div>
}

function MetricCard({ icon: Icon, label, value, detail, tone }: { icon: typeof ClipboardCheck; label: string; value: string; detail: string; tone: string }) { return <div className={`metric-card ${tone}`}><div className="metric-icon"><Icon size={17} /></div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div> }
function JobRow({ job, language, t, onClick }: { job: Job; language: Language; t: (key: string) => string; onClick: () => void }) { return <button className="job-row" onClick={onClick}><div className="job-date"><CalendarDays size={16} /><span>{job.date[language]}</span></div><div className="job-main"><strong>{job.title[language]}</strong><span><MapPin size={13} /> {job.location[language]} · {job.sheep} {t('sheep')}</span></div><div className={`job-status ${job.status}`}>{job.status === 'open' ? t('open') : job.status === 'in-progress' ? t('inProgress') : t('completed')}</div><ChevronRight size={17} className="job-chevron" /></button> }
function WorkflowStep({ number, text, done = false }: { number: string; text: string; done?: boolean }) { return <div className="workflow-step"><span className={done ? 'step-number done' : 'step-number'}>{done ? <Check size={13} /> : number}</span><span>{text}</span></div> }

type JobsProps = { t: (key: string) => string; language: Language; jobs: Job[]; query: string; setQuery: (value: string) => void; onCreate: () => void; onShare: () => void; onFindLocation: () => void; onOpenMap: () => void; showToast: (message: string) => void }
function JobsView({ t, language, jobs, query, setQuery, onCreate, onShare, onFindLocation, onOpenMap, showToast }: JobsProps) { return <div className="page-wrap inner-page compact-page"><div className="toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search')} /></div><button className="secondary-button" onClick={() => showToast(t('filtersNext'))}><Settings2 size={16} /> {t('filters')}</button><button className="secondary-button map-toolbar-button" onClick={onFindLocation}><Navigation size={16} /> {t('location')}</button><button className="primary-button toolbar-primary" onClick={onCreate}><Plus size={17} /> {t('createJob')}</button></div><div className="jobs-layout"><div className="panel full-jobs-panel"><div className="jobs-table-head"><span>{t('allJobs')} · {jobs.length}</span><span>{t('updatedNow')}</span></div>{jobs.length > 0 ? jobs.map((job) => <JobRow key={job.id} job={job} language={language} t={t} onClick={() => showToast(`${job.title[language]} ${t('selected')}`)} />) : <div className="empty-state"><Search size={22} /><strong>{t('noJobs')}</strong></div>}</div><div className="panel location-side-panel"><div className="eyebrow">{t('location')}</div><h2>{t('stayClose')}</h2><p>{t('mapsTeamNote')}</p><div className="location-preview"><MapPin size={22} /><span>46.83° N · 106.76° E</span></div><button className="secondary-button full-width" onClick={onShare}><Share2 size={16} /> {t('shareLocation')}</button><button className="text-action" onClick={onOpenMap}>{t('openMaps')} <ExternalLink size={14} /></button></div></div></div> }

function WoolView({ t, onCreate }: { t: (key: string) => string; onCreate: () => void }) { return <div className="page-wrap inner-page compact-page"><div className="wool-hero"><div className="wool-circle"><span>1.86</span><small>{t('tonnes')}</small></div><div><div className="eyebrow">{t('seasonToDate')}</div><h2>{t('qualityMessage')}</h2><p>{t('qualityDescription')}</p><div className="wool-tags"><span>{t('merinoBlend')}</span><span>{t('cleanClip')}</span><span>{t('nearbyBuyers')}</span></div><button className="secondary-button wool-action-button" onClick={onCreate}><Plus size={17} /> {t('listWool')}</button></div></div><div className="market-grid"><MarketItem t={t} titleKey="cleanWhiteWool" locationKey="selenge" amount="420 kg" price="18,000 MNT / kg" /><MarketItem t={t} titleKey="coarseWoolBatch" locationKey="tov" amount="860 kg" price="12,500 MNT / kg" /><MarketItem t={t} titleKey="mixedSpringClip" locationKey="darkhanUul" amount="260 kg" price="15,000 MNT / kg" /></div></div> }
function MarketItem({ t, titleKey, locationKey, location, amount, price }: { t: (key: string) => string; titleKey: string; locationKey?: string; location?: string; amount: string; price: string }) { return <div className="market-item"><div className="wool-swatch" /><div className="market-item-copy"><strong>{t(titleKey)}</strong><span><MapPin size={13} /> {locationKey ? t(locationKey) : location}</span></div><div className="market-amount"><strong>{amount}</strong><span>{price}</span></div><ChevronRight size={17} className="muted-icon" /></div> }

function MessagesView({ t }: { t: (key: string) => string }) { return <div className="page-wrap inner-page compact-page"><div className="message-layout"><div className="panel thread-list"><div className="thread-list-header"><strong>{t('messages')}</strong><button className="icon-button" aria-label={t('newMessage')} title={t('newMessage')}><Plus size={16} /></button></div><MessageThread initials="AT" name={t('altanTeam')} preview={t('altanPreview')} time="10:42" active /><MessageThread initials="BM" name={t('bayangolFamily')} preview={t('bayangolPreview')} time={t('yesterday')} /><MessageThread initials="K" name={t('kharaaValley')} preview={t('kharaaPreview')} time={t('monday')} /></div><div className="panel message-detail"><div className="detail-header"><div className="mini-avatar dark">AT</div><div><strong>{t('altanTeam')}</strong><span>{t('professionalCrew')}</span></div><MoreHorizontal size={18} className="muted-icon" /></div><div className="message-bubble other">{t('arrivalMessage')}</div><div className="message-bubble mine">{t('yesSiteMessage')}</div><div className="message-location"><MapPin size={17} /><div><strong>{t('selengeFieldSite')}</strong><span>{t('googleMapsShared')}</span></div><ExternalLink size={15} /></div><div className="message-input"><input placeholder={t('writeMessage')} /><button className="circle-arrow"><ArrowUpRight size={16} /></button></div></div></div></div> }
function MessageThread({ initials, name, preview, time, active = false }: { initials: string; name: string; preview: string; time: string; active?: boolean }) { return <button className={`message-thread ${active ? 'active' : ''}`}><div className="mini-avatar">{initials}</div><div className="thread-copy"><strong>{name}</strong><span>{preview}</span></div><time>{format24HourTime(time)}</time></button> }

type ProfileProps = { t: (key: string) => string; language: Language; user: DemoUser; showToast: (message: string) => void }

function ProfileView({ t, language, user, showToast }: ProfileProps) {
  const profile = roleProfiles[user.role]
  const RoleIcon = roleOptions.find((item) => item.id === user.role)?.icon ?? House
  return <div className="page-wrap inner-page profile-page">
    <div className="profile-grid">
      <div className="panel profile-card">
        <div className="profile-top"><div className="profile-avatar">{user.initials}</div><div><h2>{user.name}</h2><p>{user.organization[language]}</p><span className="verified"><ShieldCheck size={14} /> {profile.badge[language]}</span></div><button className="icon-button profile-edit-button" onClick={() => showToast(profile.actions[0][language])} aria-label={t('editProfile')} title={t('editProfile')}><Settings2 size={16} /></button></div>
        <div className="profile-lines"><div><span>{t('homeRegion')}</span><strong>{user.location[language]}</strong></div><div><span>{t('activeSince')}</span><strong>{profile.since[language]}</strong></div><div><span>{t('preferredLanguage')}</span><strong>{t('preferredLanguageValue')}</strong></div></div>
        <div className="profile-action-row"><button className="primary-button" onClick={() => showToast(profile.actions[0][language])}>{profile.actions[0][language]} <ArrowUpRight size={15} /></button><button className="secondary-button" onClick={() => showToast(profile.actions[1][language])}>{profile.actions[1][language]}</button></div>
      </div>
      <div className="panel integration-panel role-focus-panel">
        <div className="role-focus-icon"><RoleIcon size={20} /></div><div className="eyebrow">{profile.focusLabel[language]}</div><h2>{profile.focusTitle[language]}</h2><p>{profile.focusBody[language]}</p>
        <div className="integration-list">{profile.responsibilities.map((item, index) => <span key={index}><Check size={14} /> {item[language]}</span>)}</div>
      </div>
    </div>
    <div className="panel profile-stats-panel">
      <div className="panel-heading"><div><div className="eyebrow">{t('roleAccess')}</div><h2>{profile.focusLabel[language]}</h2></div><span className="status-pill"><span /> {t('live')}</span></div>
      <div className="profile-stat-grid">{profile.stats.map((stat) => <div className="profile-stat" key={stat.label.en}><span>{stat.label[language]}</span><strong>{stat.value}</strong><small>{stat.detail[language]}</small></div>)}</div>
      <div className="profile-services"><span><Check size={14} /> {t('googleMapsLinks')}</span><span><Check size={14} /> {t('firebaseAuth')}</span><span><Check size={14} /> {t('cloudData')}</span></div>
    </div>
    <CompletionSummary t={t} />
  </div>
}

export default App
