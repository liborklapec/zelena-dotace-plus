import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  Sun,
  Wind,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Banknote,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  X,
  PuzzleIcon,
  Leaf,
  UsersIcon,
  HelpCircle,
  Menu,
} from 'lucide-react';

const HomeIconWithPlus = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 30 L32 12 L54 30 L54 56 C54 57.5 53 58 52 58 L12 58 C10.5 58 10 57.5 10 56 Z"
      fill="url(#houseGradient)"
      stroke="#2d6a2f"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M6 32 L32 8 L58 32" stroke="#2d6a2f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path
      d="M8 32 L32 10 L56 32"
      fill="url(#roofGradient)"
      stroke="#2d6a2f"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <rect x="20" y="30" width="8" height="8" fill="white" stroke="#2d6a2f" strokeWidth="1.5" />
    <rect x="36" y="30" width="8" height="8" fill="white" stroke="#2d6a2f" strokeWidth="1.5" />
    <rect x="20" y="42" width="8" height="8" fill="white" stroke="#2d6a2f" strokeWidth="1.5" />
    <rect x="36" y="42" width="8" height="8" fill="white" stroke="#2d6a2f" strokeWidth="1.5" />

    <g transform="translate(44, 8)">
      <rect x="5" y="0" width="6" height="20" rx="1" fill="#EF4444" stroke="#991b1b" strokeWidth="1.5" />
      <rect x="0" y="7" width="16" height="6" rx="1" fill="#EF4444" stroke="#991b1b" strokeWidth="1.5" />
    </g>

    <defs>
      <linearGradient id="houseGradient" x1="32" y1="12" x2="32" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9ACD32" />
        <stop offset="50%" stopColor="#7CB342" />
        <stop offset="100%" stopColor="#558B2F" />
      </linearGradient>
      <linearGradient id="roofGradient" x1="32" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#B8D959" />
        <stop offset="100%" stopColor="#8BC34A" />
      </linearGradient>
    </defs>
  </svg>
);

const MapCzechIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#059669" opacity="0.1" />
    <path
      d="M18 16 L22 14 L28 16 L32 14 L32 28 L28 30 L22 28 L18 30 Z"
      fill="#059669"
      stroke="#059669"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="20" r="3" fill="white" />
  </svg>
);

export default function App() {
  const [showModal, setShowModal] = useState<'terms' | 'privacy' | 'gdpr' | null>(null);

  const [showGrandmaSection, setShowGrandmaSection] = useState(false);
  const [showInfoSection, setShowInfoSection] = useState<'when' | 'what' | 'about' | null>(null);
  const [showHowToDropdown, setShowHowToDropdown] = useState(false);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [showHowToSection, setShowHowToSection] = useState<'completed' | 'planning' | 'newbuild' | 'timing' | null>(null);
  const [showFaqSection, setShowFaqSection] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileHowToOpen, setMobileHowToOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const infoDropdownRef = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setShowHowToDropdown(false);
      if (infoDropdownRef.current && !infoDropdownRef.current.contains(event.target as Node)) setShowInfoDropdown(false);
    };

    if (showHowToDropdown || showInfoDropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHowToDropdown, showInfoDropdown]);

  const services = [
    { icon: Zap, title: 'Zateplení domu', description: 'Komplexní zateplení s dotací až 1 500 000 Kč', savings: 'Ušetříte až 60 %' },
    { icon: Sun, title: 'Fotovoltaika', description: 'Solární panely s akumulací – dotace na klíč', savings: 'Návratnost do 5 let' },
    { icon: Zap, title: 'Tepelná čerpadla', description: 'Podpora až 180 000 Kč na tepelné čerpadlo', savings: 'Snížení nákladů o 70 %' },
    { icon: Wind, title: 'Výměna oken', description: 'Okna s trojsklem a dotací', savings: 'Úspora energie až 40 %' },
  ];

  const process = [
    { step: '01', title: 'Nezávazná konzultace', description: 'Zjistíme nároky na dotaci zdarma' },
    { step: '02', title: 'Energetický audit', description: 'Odborné posouzení domu a návrh řešení' },
    { step: '03', title: 'Zpracování žádosti', description: 'Vyřídíme administrativu a podání' },
    { step: '04', title: 'Realizace projektu', description: 'Kontrola a pomoc s vyúčtováním dotace' },
  ];

  const faqs = [
    {
      question: 'Co je to dotace NZÚ?',
      answer: 'Jedná se o přímou podporu formou jednorázového finančního příspěvku na základě pravidel programu Nová zelená úsporám.'
    },
    {
      question: 'Odkud se čerpá dotace?',
      answer: 'Financování programu probíhá přes státní rozpočet ČR, kde finanční prostředky pro dotace spravuje a poskytuje Státní fond životního prostředí ČR.'
    },
    {
      question: 'Jak dlouho bude fungovat dotační program NZÚ?',
      answer: 'Od 12.10.2021 navázala nová výzva s předpokládanou platností programu do roku 2030.'
    },
    {
      question: 'Kdo má nárok na dotaci?',
      answer: 'O podporu z programu NZÚ mohou žádat majitelé, spoluvlastníci a stavebníci rodinných domů včetně domů financovaných hypotékou, stavebním spořením apod.'
    },
    {
      question: 'Kdo nemá nárok na dotaci?',
      answer: 'Nárok na dotaci NZÚ nemají vlastníci rodinných domů a podporovaných objektů, jimž na domě vázne exekuce nebo mají jiný závazek vůči státu ČR.'
    },
    {
      question: 'Jaké jsou podporovaná opatření v rámci dotačního programu?',
      answer: 'Podpora A – okna, fasáda, střecha, stropy, podlahy. Podpora B – výstavba nízkoenergetických a pasivních domů, také s podporou tepelných čerpadel. Podpora C – dotace na výměnu zdroje tepla a na pořízení fotovoltaického nebo solárního termického systému na ohřev vody.'
    },
    {
      question: 'Kdy lze poskytnout podporu na zateplení rodinného domu (oblast podpory A)?',
      answer: 'Pouze tehdy, pokud žádost o vydání stavebního povolení (resp. ohlášení stavby) na výstavbu budovy, která je předmětem žádosti, byla podána příslušnému stavebnímu úřadu před 1.7.2013.'
    },
    {
      question: 'Do jaké doby po akceptaci žádosti o dotaci se musí rekonstrukce zrealizovat?',
      answer: 'Po vydání akceptačního dopisu je lhůta na zrealizování schválených opatření 24 měsíců.'
    },
    {
      question: 'Co je Zelená Dotace?',
      answer: 'Je to program pro všechny žadatele o dotaci z řad majitelů rodinných domů, kteří potřebují provést složitou agendou dotačního programu NZÚ.'
    },
    {
      question: 'Co nabízí Zelená dotace?',
      answer: 'Zajištění celého průběhu a všech procesních kroků od prvotního kontaktu, zpracování energetické a finanční studie pro výběr oblasti a výše čerpání dotace z fondu SFŽP až k úspěšnému čerpání finanční podpory.'
    },
    {
      question: 'Co nabízíme zdarma?',
      answer: 'Našim zákazníkům ZDARMA poskytujeme základní úvodní servis spočívající ve zpracování energetické studie s kalkulací investičních nákladů, výši možné dotace a předpokládané návratnosti, jenž je jednoznačnou a transparentní pomůckou při rozhodování žadatelů o výši a správnosti jejich investice.'
    },
    {
      question: 'S čím Vám pomůžeme?',
      answer: 'S kompletním vyřízením dotace z programu NZÚ od projektu po realizaci Vašeho záměru. Především Vám ušetříme čas, starosti, peníze a dotaci Vám zajistíme se 100% úspěšností.'
    },
    {
      question: 'Jak dlouho trvá vyřízení?',
      answer: 'Zpravidla 3–4 měsíce od zpracování úvodní energetické studie.'
    },
    {
      question: 'Co je třeba k vyřízení?',
      answer: 'Obrátit se na nás, jako na správné a fundované partnery a my Vás provedeme celým složitým procesem bez starostí a se 100% úspěšností čerpání dotace.'
    },
    {
      question: 'Jaká je výše čerpání?',
      answer: 'Maximální poskytovaná výše dotace na jednu žádost v oblasti A je 650.000,- Kč.'
    },
    {
      question: 'Jak dlouho zpětně se dá čerpat dotace?',
      answer: 'Provedená opatření na Vašem RD nesmí být starší 1.1.2021.'
    },
    {
      question: 'Kdy přijdou peníze na účet?',
      answer: 'Obvykle do 6 týdnů od schválení dokladů o realizaci opatření na Vašem RD.'
    },
    {
      question: 'Práce spojené s realizací energetických opatření musí provádět firma evidovaná v seznamu odborných dodavatelů (SOD) na portálu programu NZÚ?',
      answer: 'Realizační firma nemusí být zapsána v seznamu odborných dodavatelů, musí být však proškolena a vlastnit odborné certikáty na dodávané technologie (oblast A). V rámci oblasti C (soláry, kotle, fotovoltaika…) musí být zhotovitel držitelem certifikátu MPO nebo jeho zodpovědný zástupce dozorující realizaci (ministerstvo průmyslu a obchodu).'
    },
    {
      question: 'Výrobky a materiály dodávané při realizací energetických opatření musí být evidovány v seznamu výrobků (SVT) na portálu programu NZÚ?',
      answer: 'Výrobky a technologie nemusí být zapsány v seznamu výrobků, musí být však prokazatelně doloženy jeho technické parametry a vlastnosti rozhodné pro stanovení požadovaných hodnot dle programu NZÚ. Doporučujeme používat výrobky s SVT kódem, jejichž vlastnosti jsou tak jednoznačně deklarovány a není nutno žádným jiným způsobem jejich vlastnosti prokazovat.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center -ml-2">
                <div className="scale-75">
                  <HomeIconWithPlus />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-green-600">Zelena Dotace </span>
                  <span className="text-red-600">Plus</span>
                </h1>
                <p className="text-xs text-gray-600">Váš partner pro vaše dotace</p>
              </div>
            </a>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#sluzby" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                  Služby
                </a>

                <button
                  onClick={() => setShowGrandmaSection(!showGrandmaSection)}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  Oprav dům po babičce
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowHowToDropdown(!showHowToDropdown)}
                    className="text-gray-700 hover:text-green-600 transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>Jak postupovat</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showHowToDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showHowToDropdown && (
                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[240px] z-50 border border-gray-100">
                      {[
                        ['completed', 'Již jsem rekonstruoval'],
                        ['planning', 'Chystám se rekonstruovat'],
                        ['newbuild', 'Dotace na novostavbu'],
                        ['timing', 'Termíny a načasování'],
                      ].map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setShowHowToSection(key as any);
                            setShowHowToDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <a href="#proces" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                  Jak to funguje
                </a>

                <div ref={infoDropdownRef} className="relative">
                  <button
                    onClick={() => setShowInfoDropdown(!showInfoDropdown)}
                    className="text-gray-700 hover:text-green-600 transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>Info</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showInfoDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showInfoDropdown && (
                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[240px] z-50 border border-gray-100">
                      {[
                        ['when', 'Kdy je možné žádat'],
                        ['what', 'Co nabízíme'],
                        ['about', 'O programu'],
                      ].map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setShowInfoSection(key as any);
                            setShowInfoDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setShowFaqSection(true);
                          setShowInfoDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        Často kladené otázky
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed top-20 left-0 right-0 bg-white shadow-lg z-40 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#sluzby"
              className="block text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Služby
            </a>

            <button
              onClick={() => {
                setShowGrandmaSection(true);
                setShowMobileMenu(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
            >
              Oprav dům po babičce
            </button>

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setMobileHowToOpen(!mobileHowToOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
              >
                <span>Jak postupovat</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileHowToOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileHowToOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    ['completed', 'Již jsem rekonstruoval'],
                    ['planning', 'Chystám se rekonstruovat'],
                    ['newbuild', 'Dotace na novostavbu'],
                    ['timing', 'Termíny a načasování'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setShowHowToSection(key as any);
                        setShowMobileMenu(false);
                        setMobileHowToOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors py-2 pl-4 border-l-2 border-gray-200 hover:border-green-600"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#proces"
              className="block text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Jak to funguje
            </a>

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
              >
                <span>Info</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileInfoOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileInfoOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    ['when', 'Kdy je možné žádat'],
                    ['what', 'Co nabízíme'],
                    ['about', 'O programu'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setShowInfoSection(key as any);
                        setShowMobileMenu(false);
                        setMobileInfoOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors py-2 pl-4 border-l-2 border-gray-200 hover:border-green-600"
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowFaqSection(true);
                      setShowMobileMenu(false);
                      setMobileInfoOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors py-2 pl-4 border-l-2 border-gray-200 hover:border-green-600"
                  >
                    Často kladené otázky
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grandma Section */}
      {showGrandmaSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Oprav dům po babičce</h2>
              <button
                onClick={() => setShowGrandmaSection(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Oprav dům po babičce</h3>

                <p className="text-gray-700 mb-4">
                  Pro získání dotace "Oprav dům po babičce" na rekonstrukci domu jsou klíčové dvě podmínky. Žadatel musí být ekonomicky aktivní a zároveň musí být majitelem stávajícího rodinného domu. Důležité je také, aby nemovitost nebyla zatížena soudcovskou či exekutorskou zástavou a nesmí jít o stavbu, která již v minulosti obdržela podporu z programů Zelená úsporám nebo Nová zelená úsporám v roce 2013.
                </p>

                <p className="text-gray-700 mb-4">
                  Dalším kritériem pro poskytnutí dotace je, že žadatel musí v rekonstruovaném objektu zřídit trvalé bydliště a to po dobu minimálně 10 let od dokončení rekonstrukce.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Jak bude dotace vyplácena?</h4>
                <p className="text-gray-700 mb-4">
                  Dotaci lze čerpat předem, v průběhu nebo po realizaci podporovaných opatření. Pokud žádost podáte před započetím rekonstrukce, můžete čerpat finanční prostředky formou zálohy. V případě, že podáte žádost po dokončení rekonstrukce, částka bude vyplacena formou dotace.
                </p>

                <p className="text-gray-700 mb-4">
                  Podporována budou pouze ta opatření, která byla realizována a uhrazena po 1. lednu 2021. Doklady potvrzující provedení a použití finančních prostředků je možné předkládat až do roku 2028.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Omezení dvojího financování</h4>
                <p className="text-gray-700 mb-4">
                  Žadatel není oprávněn čerpat finanční prostředky z jiných fondů EU, jiných nástrojů EU nebo národních veřejných prostředků na opatření, která jsou již podpořena touto dotací. Výjimkou jsou pouze vlastní zdroje žadatele nebo jiné typy dotací, které takové použití povolují ve svých podmínkách.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Výše dotace a co ji lze použít</h4>
                <p className="text-gray-700 mb-4">
                  Žadatelé v tomto programu mohou získat až 1 milion korun na optimální zateplení domu, což je podmínkou pro získání zálohové dotace a výhodného úvěru. Rekonstrukci je možné rozšířit o další úsporná opatření, jako je výměna zdroje tepla, instalace fotovoltaiky, ohřevu vody, dobíjecí stanice pro elektromobily a další úsporná opatření. Celková výše dotace tak může přesáhnout i jeden milion korun.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Podpora strukturálně postižených krajů a dalších obcí</h4>
                <p className="text-gray-700 mb-4">
                  Pokračovat bude podpora strukturálně postižených krajů, a rozšíří se i na další obce s rozšířenou působností ve vybraných regionech a na území bývalých vojenských újezdů. Žadatelé z těchto oblastí získají navýšení celkové dotace o 10%.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Zvýhodněný úvěr</h4>
                <p className="text-gray-700 mb-4">
                  Od ledna 2024 budou úspěšní žadatelé mít možnost čerpat zvýhodněný úvěr od stavebních spořitelen, který pokryje rozdíl mezi způsobilými náklady a vyplacenou dotací, a to bez nutnosti zástavy nemovitosti. Úrok se bude pohybovat mezi třemi až čtyřmi procenty, v závislosti na aktuálním úrokovém prostředí a nastavení jednotlivých stavebních spořitelen.
                </p>

                <p className="text-gray-700 mb-4">
                  Tento zvýhodněný úvěr bude dostupný pro žádosti o dotaci na optimální zateplení v obou programech. Podpora se bude týkat opatření realizovaných po 1. lednu 2021. Proces poskytnutí úvěru bude jednodušší a méně nákladný než u hypoték, a úrok bude fixován po celou dobu splatnosti. Splátky budou díky delší době splatnosti významně nižší než u spotřebitelských úvěrů.
                </p>

                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                    <p className="text-gray-700">
                      V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      {showInfoSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {showInfoSection === 'when' && 'Kdy je možné žádat'}
                {showInfoSection === 'what' && 'Co nabízíme'}
                {showInfoSection === 'about' && 'O programu'}
              </h2>
              <button
                onClick={() => setShowInfoSection(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="prose max-w-none">
                {showInfoSection === 'when' && (
                  <div className="text-gray-700">
                    <p className="mb-4">
                      O podporu z programu NZU mohou žádat majitelé, spoluvlastníci a stavebníci rodinných domů. V rámci programu jsou podporována opatření, která vedou ke snížení energetické náročnosti budov a to zejména formou zateplení obvodových plášťů a výměny výplní stavebních otvorů, oken a dveří. Dále je podporována výstavba nových budov s velmi nízkou energetickou náročností (budov blížící se pasivnímu standardu), výměna neekologických zdrojů tepla za efektivní, ekologicky šetrné zdroje (například kotel na biomasu, tepelné čerpadlo nebo plynový kondenzační kotel) a instalace technologií využívajících obnovitelné zdroje energie a rekuperace tepla z odpadního vzduchu (solární termické a fotovoltaické systémy a jednotky nuceného větrání s rekuperací) a rovněž realizace zelených střech. Princip přiznání výše dotace je velmi jednoznačný. Čím více je snížena energetická náročnost budovy po realizaci opatření, tím větší je i míra finanční podpory.
                    </p>

                    <p className="mb-6 font-semibold">
                      Nárok na dotaci NZÚ nemají vlastníci rodinných domů, jimž na domě vázne exekuce nebo mají jiný závazek vůči státu ČR.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Oblasti podpory pro rodinné domy</h3>

                    <h4 className="text-lg font-bold text-gray-900 mb-3 mt-5">A. Snižování energetické náročnosti stávajících rodinných domů</h4>
                    <ul className="list-disc pl-6 mb-4">
                      <li>dotace na zateplení obálky budovy – výměnou oken a dveří, zateplením obvodových stěn, střechy včetně vegetační, dále stropů a podlah</li>
                      <li>podporována jsou dílčí i komplexní opatření</li>
                    </ul>

                    <p className="font-semibold mb-3">Maximální výše dotace:</p>
                    <p className="mb-3">Dotace je poskytována dle rozsahu skutečně realizovaných opatření – tzn. dle ploch zateplovaných konstrukcí na obálce budovy a to v závislosti na dosažené podoblasti podpory A.0 až A.3</p>

                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Úroveň podoblasti</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Minimální dosažená úspora</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Fasáda</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Podlaha na terénu (na m2)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Strop pod půdou (na m2)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Okna dveře (na m2)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">A.0, A.1</td>
                            <td className="border border-gray-300 px-4 py-2">20%, 40%</td>
                            <td className="border border-gray-300 px-4 py-2">500 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">700 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">330 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">2.100 Kč</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">A.2</td>
                            <td className="border border-gray-300 px-4 py-2">50%</td>
                            <td className="border border-gray-300 px-4 py-2">600 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">900 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">400 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">2.750 Kč</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">A.3</td>
                            <td className="border border-gray-300 px-4 py-2">60%</td>
                            <td className="border border-gray-300 px-4 py-2">800 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">1 200 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">550 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">3.800 Kč</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mb-2 font-semibold">Moravskoslezský kraj je bonifikován + 10%</p>
                    <p className="mb-4 text-sm bg-gray-50 p-4 rounded-lg">
                      <strong>Příklad výpočtu dotace:</strong> např. RD žadatele má plochu fasády 200 m2,<br />
                      výpočet dotace = 200 m2 x 600 Kč/m2 (A.2) = 120.000 Kč<br />
                      Žadatel z MSK kraje navyšuje podporu koeficientem 1,1 x 120.000 Kč = 132.000 Kč
                    </p>

                    <h4 className="text-lg font-bold text-gray-900 mb-3 mt-6">B. Výstavba rodinných domů s velmi nízkou energetickou náročností</h4>
                    <p className="mb-3">dotace na výstavbu nových rodinných domů s velmi nízkou energetickou náročností</p>

                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Úroveň podoblasti</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Měrná potřeba tepla na vytápění</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Dotace – paušálně</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Dotace – úroveň RD</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">B.1</td>
                            <td className="border border-gray-300 px-4 py-2">20 kWh</td>
                            <td className="border border-gray-300 px-4 py-2">300 000 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">nízkoenergetický</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">B.2</td>
                            <td className="border border-gray-300 px-4 py-2">15 kWh</td>
                            <td className="border border-gray-300 px-4 py-2">450 000 Kč</td>
                            <td className="border border-gray-300 px-4 py-2">až pasivní</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-4 text-sm italic">pozn.: při čerpání dotace z oblasti B, nelze čerpat z oblastí A, C</p>

                    <h4 className="text-lg font-bold text-gray-900 mb-3 mt-6">C. Efektivní využití zdrojů energii</h4>
                    <ul className="list-disc pl-6 mb-4">
                      <li>dotace na výměnu původního hlavního zdroje na tuhá fosilní paliva nedosahující parametrů 3. emisní třídy za efektivní ekologicky šetrné zdroje</li>
                      <li>na výměnu elektrického vytápění za systémy s tepelným čerpadlem</li>
                      <li>na instalaci solárních termických a fotovoltaických systémů</li>
                      <li>na instalaci systémů nuceného větrání se zpětným získáváním tepla z odpadního vzduchu</li>
                      <li>podpora na využití tepla z odpadní vody</li>
                    </ul>

                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left">Typ instalace/zdroje vytápění</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Poznámka</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">C.1 (současně s A)</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">C.2 (DR do 150 kWh)</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">C.3 (solár,FV)</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">C.4 (REKUPERACE)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">kotel biomasa ruční</td>
                            <td className="border border-gray-300 px-3 py-2">ekodesign</td>
                            <td className="border border-gray-300 px-3 py-2">50 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">40 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">kotel biomasa automatika</td>
                            <td className="border border-gray-300 px-3 py-2">ekodesign</td>
                            <td className="border border-gray-300 px-3 py-2">100 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">80 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">tepelné čerpadlo voda-voda</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">100 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">80 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">tepelné čerpadlo země-voda</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">100 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">80 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">tepelné čerpadlo vzduch-voda</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">75 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">60 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">solární systém na ohřev TUV</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">35 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">solární systém TUV+přitápění</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">50 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">fotovoltaický systém na ohřev TUV</td>
                            <td className="border border-gray-300 px-3 py-2">do 1 700 kWh</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">55 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">fotovoltaický systém na ohřev TUV</td>
                            <td className="border border-gray-300 px-3 py-2">nad 1 700 kWh</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">70 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">fotovoltaický systém na ohřev TUV</td>
                            <td className="border border-gray-300 px-3 py-2">3 000 kWh</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">100 000 Kč</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2">rekuperace centrální</td>
                            <td className="border border-gray-300 px-3 py-2">účinnost 75%</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">100 000 Kč</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2">rekuperace decentrální</td>
                            <td className="border border-gray-300 px-3 py-2"></td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">–</td>
                            <td className="border border-gray-300 px-3 py-2">75 000 Kč</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showInfoSection === 'what' && (
                  <div className="text-gray-700">
                    <p className="mb-4">
                      Žadatelům o dotaci z řad majitelů rodinných domů nabízíme komplexní administraci žádosti, tedy zajištění celého průběhu a všech procesních kroků, až k úspěšnému čerpání finanční podpory. Spolupráci s investory navazujeme již v okamžiku jejich uvažování o revitalizaci či rekonstrukci jejich domu nebo případně jejich zájmu o čerpání dotace a jsme nápomocni klientům ještě v rozhodovací fázi, kdy prvním důležitým krokem a rozhodnutím je výběr správné a nejvýhodnější investice do jejich domova s nejefektivnější návratností a výší finanční podpory.
                    </p>

                    <p className="mb-6">
                      Následně zpracujeme veškeré potřebné dokumenty pro řádnou registraci jejich žádosti a zajistíme její úspěšnou akceptaci, aby bylo možno přistoupit k realizaci navržených opatření, případně jejich realizaci doložit. Závěrečnou fází je komplexní administrace dokladovosti pro doložení realizace opatření, včetně závěrečné zprávy odborného dohledu a zpracování formulářů pro doložení realizace nebo případně změn v projektu.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-5 mt-6">Administraci žádosti Vám můžeme přiblížit v jednotlivých krocích následovně</h3>

                    <div className="space-y-6">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">1. úvodní fáze – energetická studie</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>úvodní energetická studie</li>
                          <li>stanovení úspor a výše dotace (ZDARMA)</li>
                          <li>úvodní bilance a ziskovost solárních a FV systémů (ZDARMA)</li>
                          <li>investiční studie nákladovosti a návratnosti investice do úsporných opatření.</li>
                          <li>doporučení realizace opatření dle výnosu z dotace (stanovení oblasti A.0, A., A.2 nebo až A.3)</li>
                          <li>doporučení vhodného zdroje vytápění nebo systému pro ohřev TUV včetně investiční nákladovosti a stanovení návratnosti investice</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">2. stávající stav – rekognoskace objektu</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>stavebně technický průzkum objektu autorizovaným stavebním inženýrem</li>
                          <li>zaměření a rekognoskace objektu včetně technologie a skladeb konstrukcí</li>
                          <li>prověření stávajícího topného zdroje a systému ÚT a TUV</li>
                          <li>definování případných stavebních vad konstrukcí a tepelných mostů.</li>
                          <li>digitalizace stávajícího stavu objektu včetně technické zprávy stávajícího stavu (STP)</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">3. navrhovaný stav – zpracování projektu a energetického posudku</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>návrh opatření pro oblast A,C (příp.B – novostavby)</li>
                          <li>zpracování projektu a energet.posudku (EP) pro příslušnou oblast A (B,C)</li>
                          <li>zpracování krycích listů (KL) pro všechny oblasti (A,B,C) potvrzené autorizovaných auditorem nebo energetickým specialistou</li>
                          <li>zpracování evidenčních listů energetických posudků energetickým specialistou nebo auditorem</li>
                          <li>elektronické zpracování všech dokladů do potřebných formátů pro registraci žádosti a jejich uložení do portálu SFŽP</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">4. inženýrská činnost a zajištění administrace žádosti (SFŽP) = AKCEPTACE</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>zajištění vyjádření stavebního úřadu ke stavebnímu záměru dle příslušného rozsahu navržených opatření (vyjádření, ohláška, stavební povolení…)</li>
                          <li>kompletace všech dokladů pro podání žádosti o dotaci (stanovisko SÚ, PD, EP, KL, bilance, evidenční list, výpis KN)</li>
                          <li>příprava plné moci a v případě více vlastníků objektu RD formuláře prohlášení spoluvlastníků (jediná požadované součinnost žadatele kromě vstupních podkladů, ostatní kroky zajišťujeme na základě plné moci a prohlášení spoluvlastníků)</li>
                          <li>příprava a registrace žádosti o dotaci včetně elektronických podkladů na portálu SFŽP (NZU, Kotlíková dotace)</li>
                          <li>zajištění plynulé a bezchybné administrace žádosti o dotaci a následné akceptace žádosti a alokace (rezervace prostředků po stanovenou dobu k realizaci)</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">5. realizace projektu – energetických opatření, až po Závěrečnou zprávu odborného dohledu</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>zpracování rozpočtové úrovně realizace jednotlivých opatření v souladu s Krycím listem Energetického posouzení (EP) nebo jejich kontrola v případě žádosti podané v průběhu nebo po realizaci opatření včetně výběru či kontroly vhodných technologií v souladu s EP a KL</li>
                          <li>zpracování poptávkového řízení a výběr vhodného dodavatele, zhotovitele nebo registrovaného dodavatele (výběr ze seznamu SOD)</li>
                          <li>kontrola a zpracování předávacích protokolů včetně správných SVT kódů použitých materiálů (ETICS) a parametrů odpovídajících KL (krycímu listu)</li>
                          <li>kontrola a zpracování soupisů provedených prací včetně dílčích plnění, stanovení způsobilých a nezpůsobilých výdajů</li>
                          <li>kontrola a zpracování soupisů faktur týkající se energetických opatření v souladu s KL a celková kontrola fakturace (projekt, posudek, realizace, odborný dohled)</li>
                          <li>odborný dohled nad realizací energetických opatření včetně zpracování závěrečné zprávy odborného dohledu včetně fotodokumentace (oprávněnou osobou-autorizovaný stavební inženýr)</li>
                          <li>zajištění dokladovosti odpovídající schválenému KL, odborného posudku a projektu včetně faktur a dokladů o úhradě za zpracování odborné závěrečné zprávy včetně autorizace oprávněnou osobou</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showInfoSection === 'about' && (
                  <div className="text-gray-700">
                    <p className="mb-4">
                      Máte v úmyslu si před zimou zateplit dům nebo vyměnit stará okna za nová? Nebo chcete na svém pozemku postavit zbrusu nový domeček, který bude nízkoenergetický a který bude mít na střeše solární panely, abyste dlouhodobě ušetřili na energiích? Ať tak či onak, požádejte si před stavbou či respektive po provedení úkonů o dotaci Nová zelená úsporám. Dotační program může výrazně snížit náklady spjaté s výměnou oken, se zateplením domu, také spjaté s pořizováním fotovoltaické elektrárny nebo náklady spjaté s výstavbou nového, nízkoenergetického domu.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Co je to program Nová zelená úsporám?</h3>

                    <p className="mb-4">
                      O dotačním programu Nová zelená úsporám jste pravděpodobně už slyšeli, funguje už nějakou dobu, nyní je spuštěna jeho poslední vlna, v rámci které si můžete požádat o dotaci do konce roku 2021. Jedná se o program Ministerstva životního prostředí, který je financován státním rozpočtem České republiky. Cílem je hlavně zlepšit stav životního prostředí, které je třeba chránit zejména nyní, když je zřetelně vidět, jak je mu ubližováno.
                    </p>

                    <p className="mb-6">
                      Dotační program podporuje všechny majitele, spoluvlastníky nebo také stavebníky energeticky úsporných rodinných domů a bytových domů, podporuje výměnu nevyhovujících zdrojů vytápění a také využívání obnovitelných zdrojů energie.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Více o programu Nová zelená úsporám</h3>

                    <p className="mb-6">
                      Program Ministerstva životního prostředí, administrovaný Státním fondem životního prostředí ČR (dále jen „SFŽP"), podporuje energeticky úsporné rekonstrukce rodinných domů a bytových domů, výměnu nevyhovujících zdrojů na vytápění a využívání obnovitelných zdrojů energie. Představuje ekonomicky nejvýhodnější podporu ze strany státu, formou přímé finanční pomoci – dotace, pro vlastníky a stavebníky rodinných a bytových domů.
                    </p>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-r-lg mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Cíle Programu</h4>
                      <p className="text-gray-700">
                        Hlavním cílem programu je zlepšení stavu životního prostředí snížením produkce emisí znečišťujících látek a skleníkových plynů (především emisí CO2), dále pak úspora energie v konečné spotřebě a stimulace ekonomiky ČR s dalšími sociálními přínosy, kterými jsou například zvýšení kvality bydlení občanů, zlepšení vzhledu měst a obcí, nastartování dlouhodobých progresivních trendů. Současně se zlepšením stavu životního prostředí se očekává také přirozená potřeba reinvestice poskytnutých prostředků do vlastního bydlení.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-r-lg mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Zdroje financování Programu</h4>
                      <p className="text-gray-700">
                        Česká republika získává na tento program finanční prostředky prodejem tzv. emisních povolenek EUA (European Union Allowance) dle zákona č. 383/2012 Sb., o podmínkách obchodování s povolenkami na emise skleníkových plynů, ve znění pozdějších předpisů v rámci EU ETS. Financování programu probíhá přes státní rozpočet ČR, kdy finanční prostředky pro dotace spravuje a poskytuje Státní fond životního prostředí ČR.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Na co se dotační program vztahuje?</h3>

                    <p className="mb-4">
                      Nabízí se otázka, na co konkrétního se dotace vztahuje, na co je možné dotaci získat. Dotaci lze získat na:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                      <li>nová okna</li>
                      <li>obnovení fasády</li>
                      <li>rekonstrukci střechy</li>
                      <li>nové podlahy a stropy</li>
                      <li>zateplení domu</li>
                      <li>výstavbu nízkoenergetických domů</li>
                      <li>výměnu zdroje tepla</li>
                      <li>fotovoltaiku (pro dlouhodobou úsporu elektrické energie)</li>
                    </ul>

                    <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white mr-3">!</span>
                        Dotaci lze čerpat i zpětně
                      </h4>
                      <p className="text-gray-700 ml-11">
                        Na dotaci má nárok každý majitel, spoluvlastník nebo stavebník rodinného domu, jenž není zatížen exekucí nebo podobným závazkem vůči státu (financován hypotékou, stavebním spořením či podobným finančním produktem být může). O dotaci z programu je možné zažádat buď dopředu, nebo to lze také zpětně - dotace se však může vztahovat jen na opatření, která nejsou starší dvou let.
                      </p>
                    </div>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section Modal */}
      {showFaqSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Často kladené otázky</h2>
              <button
                onClick={() => setShowFaqSection(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nejčastější dotazy</h3>
                <p className="text-lg text-gray-600">Několik často kladených dotazů před realizací zakázky</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:border-green-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <p className="text-gray-800 mb-3">
                  Máte další dotazy? Kontaktujte nás na emailu:
                </p>
                <a
                  href="mailto:info@zelenadotaceplus.cz"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  info@zelenadotaceplus.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HowTo Section */}
      {showHowToSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {showHowToSection === 'completed' && 'Již jsem rekonstruoval'}
                {showHowToSection === 'planning' && 'Chystám se rekonstruovat'}
                {showHowToSection === 'newbuild' && 'Dotace na novostavbu'}
                {showHowToSection === 'timing' && 'Termíny a načasování'}
              </h2>
              <button
                onClick={() => setShowHowToSection(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="prose max-w-none">
                {showHowToSection === 'completed' && (
                  <>
                    <p className="text-gray-700 mb-4">
                      Táhlo vám v zimě do domu skrze stará, ještě dřevěná okna? Odcházelo vám drahé teplo ven, protože jste neměli zateplený dům? Nemůžeme se divit tomu, že jste se rozhodli dům zateplit nebo okna vyměnit, respektive i děravou střechu zrekonstruovat. Nabízí se však otázka, zdali jste požádali o dotaci z programu Nová zelená úsporám? Dotace Nová zelená úsporám vám totiž mohla rapidně snížit pořizovací náklady na nová okna, na zateplení nebo náklady spjaté s rekonstrukcí střechy. Pakliže je vaše odpověď záporná, nezoufejte. Nárok na dotaci máte, pokud provedené úpravy nejsou starší jednoho roku.
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">O dotačním programu Nová zelená úsporám</h4>
                    <p className="text-gray-700 mb-4">
                      Dotační program Nová zelená úsporám je program Ministerstva životního prostředí, který je administrovaný Státním fondem životního prostředí ČR, jenž spravuje finance pro dotace ze státního rozpočtu České republiky. Jedná se o dotační program, který podporuje například energeticky úsporné rekonstrukce rodinných domů a bytových jednotek, také podporuje výměnu nevyhovujících zdrojů tepla nebo fotovoltaiku.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Cílem celého dotačního programu, který nyní vyhlásil svou poslední vlnu dotací, je hlavně zlepšit stav životního prostředí snížením produkce emisí, které produkují znečišťující látky a škodlivé skleníkové plyny. V neposlední řadě je cílem programu zvýšit úsporu energií.
                    </p>
                    <p className="text-gray-700 mb-4">
                      V rámci dotačního programu lze získat i statisícové dotace, které rapidně sníží zmiňované náklady spjaté třeba s výměnou oken nebo se stavbou nízkoenergetického domu.
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Nárok na dotaci má takřka každý</h4>
                    <p className="text-gray-700 mb-4">
                      Ptáte se, kdo má nárok na získání dotace? Na získání dotace má nárok prakticky každý majitel, spoluvlastník nebo stavebník rodinného domu, který není zatížen exekucí či jiným závazkem vůči státu. To, že je dům financován hypotékou, stavebním spořením či podobným finančním produktem, nehraje roli.
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">O dotaci požádejte zpětně</h4>
                    <p className="text-gray-700 mb-4">
                      Jak již bylo zmíněno, o dotaci je možné požádat zpětně, nemusíte o ni žádat dříve, než provedete plánované úpravy či rekonstrukce. Pokud jste již realizovali rekonstrukci vašeho rodinného domu, vyplňte náš kontaktní formulář s požadovanými údaji, který zaevidujeme v našem systému.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Máte-li zájem o dotaci na již realizovanou rekonstrukci Vašeho rodinného domu, vyplňte náš kontaktní formulář s požadovanými údaji, který zaevidujeme v našem systému. Napište nám v popisu realizované rekonstrukce práce, které se týkaly zateplení Vašeho domu (zateplení fasády domu, výměny oken, izolace půdy, půdní vestavby nebo nástavby, zateplení podlahy apod.)
                    </p>

                    <p className="text-gray-700 mb-4">
                      Naskenujte nebo ofoťte faktury týkající se realizace zateplení, včetně předávacích protokolů. Datum ukončení realizace nesmí být starší jednoho roku od podání žádosti o dotaci.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Zašlete nám fotodokumentaci zateplení nebo realizace rekonstrukce, případně fotky z jejího průběhu. (8-10 fotografií, především obálky budovy nebo konkrétních řešených konstrukcí).
                    </p>

                    <p className="text-gray-700 mb-4">
                      Vaši poptávku zpracujeme a do 48 hodin Vám připravíme harmonogram jednotlivých kroků, jak čerpat dotaci.
                      Sepíšeme s Vámi řádnou objednávku na zdárné zajištění čerpání dotace.
                      Další informace najdete v části co nabízíme.
                    </p>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {showHowToSection === 'planning' && (
                  <>
                    <p className="text-gray-700 mb-4">
                      Máte-li zájem o dotaci na plánovanou rekonstrukci Vašeho rodinného domu, vyplňte náš kontaktní formulář s požadovanými údaji, který zaevidujeme v našem systému.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Napište nám v popisu Váš záměr, tedy práce, které se týkají zateplení Vašeho domu (zateplení fasády domu, výměny oken, izolace půdy, půdní vestavby nebo nástavby, zateplení podlahy apod.)
                    </p>

                    <p className="text-gray-700 mb-4">
                      Naskenujte nebo ofoťte původní výkresy Vašeho domu, technickou zprávu, znalecký posudek, PENB, kolaudaci nebo stavební povolení.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Zašlete fotodokumentaci Vašeho domu, 8-10 fotografií, především obálky budovy nebo konkrétních řešených konstrukcí.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Vaši poptávku zpracujeme a do 48 hodin Vám připravíme harmonogram jednotlivých kroků, jak čerpat dotaci.
                      Sepíšeme s Vámi řádnou objednávku na zdárné zajištění čerpání dotace.
                      Další informace najdete v části co nabízíme.
                    </p>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {showHowToSection === 'newbuild' && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Dotace na novostavby 2025</h3>
                    <p className="text-lg font-semibold text-green-600 mb-4">Až 400 000 Kč na výstavbu nízkoenergetického nebo pasivního domu</p>

                    <p className="text-gray-700 mb-4">
                      Plánujete stavbu moderního úsporného domu? Pak právě pro vás je určena státní podpora z programu Nová zelená úsporám 2025, v rámci které můžete získat dotaci až 400 000 Kč. Tato dotace je určena pro novostavby, které splňují požadavky na energetickou účinnost a ekologický provoz.
                    </p>

                    <p className="text-gray-700 mb-4">
                      Program je určen výhradně pro nové rodinné domy, které slouží k trvalému bydlení a jsou postavené v nízkoenergetickém nebo pasivním standardu.
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Jaké podmínky musíte splnit</h4>
                    <p className="text-gray-700 mb-4">
                      Pro získání dotace je třeba, aby váš dům odpovídal několika technickým i majetkovým požadavkům. Bez jejich splnění není možné podporu získat.
                    </p>

                    <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4">Technické požadavky na dům</h5>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Energetická třída A nebo lepší</strong> – prokazuje se průkazem energetické náročnosti budovy (PENB).</li>
                      <li><strong>Možnost čerpání až po dokončení stavby a kolaudaci</strong> – žádné zálohy předem nejsou poskytovány.</li>
                    </ul>

                    <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4">Požadavky na žadatele</h5>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Žadatel smí vlastnit maximálně dvě nemovitosti určené k bydlení.</li>
                      <li>Dům musí být určen pro trvalé bydlení (ne např. rekreační objekt).</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Povinné technologie (bez nich dotaci nezískáte)</h4>
                    <p className="text-gray-700 mb-4">
                      Aby vám mohla být dotace přiznána, musí být v domě nainstalovány následující technologie:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Vzduchotechnika s rekuperací</strong> – zajišťuje nepřetržitý přísun čerstvého vzduchu bez tepelných ztrát.</li>
                      <li><strong>Fotovoltaická elektrárna</strong> – výkon dle projektové dokumentace, zpravidla od 4 kWp.</li>
                      <li><strong>Nepřipojení na zemní plyn</strong> – dům nesmí být napojen na plyn jako hlavní energetický zdroj.</li>
                    </ul>

                    <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4">Neuznatelné zdroje vytápění</h5>
                    <p className="text-gray-700 mb-2">Dotaci nelze získat, pokud dům využívá pouze:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      <li>elektrokotel,</li>
                      <li>elektrické přímotopy,</li>
                      <li>rekuperaci jako jediný zdroj tepla.</li>
                    </ul>

                    <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4">Uznatelné zdroje vytápění</h5>
                    <p className="text-gray-700 mb-2">Naopak za ekologicky přijatelné a uznatelné jsou považovány:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      <li>Tepelné čerpadlo</li>
                      <li>Kotel na tuhá paliva s nízkými emisemi</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Jaké typy staveb jsou podporovány</h4>
                    <p className="text-gray-700 mb-4">
                      Dotaci lze získat při výstavbě různých typů domů – podmínkou je vždy dodržení výše uvedených technických požadavků.
                    </p>
                    <p className="text-gray-700 mb-2">Podporovány jsou:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      <li>Zděné novostavby</li>
                      <li>Dřevostavby</li>
                      <li>Montované domy</li>
                      <li>Skeletové a hybridní konstrukce</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">Jak probíhá získání dotace</h4>
                    <p className="text-gray-700 mb-4">
                      Celý proces začíná nezávaznou konzultací. Nejprve nám zašlete svou projektovou dokumentaci – konkrétně:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      <li>projekt vytápění,</li>
                      <li>projekt vzduchotechniky s rekuperací,</li>
                      <li>projekt fotovoltaické elektrárny.</li>
                    </ul>

                    <p className="text-gray-700 mb-4">
                      Na základě těchto podkladů provedeme podrobnou analýzu, zda projekt splňuje podmínky programu. Poté:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      <li>Zpracujeme veškerou dokumentaci</li>
                      <li>Podáme žádost a zajistíme komunikaci s administrátory</li>
                      <li>Sledujeme celý proces až do schválení dotace</li>
                    </ul>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {showHowToSection === 'timing' && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Termíny a načasování</h3>

                    <p className="text-gray-700 mb-4">
                      Abychom Vám mohli úspěšně zajistit čerpání dotace, potřebujeme dostatek času na zpracování studie, výpočtů, energetických posudků, na všechny schvalovací procesy až po úspěšné plnění. Časový horizont komplexního řešení Vašeho projektu či záměru se odvíjí od jeho náročnosti a legislativního zařazení a často od podpisu objednávky až po schválení dotace trvá průměrně <strong className="font-bold">3 – 4 měsíce</strong>, u složitějších nebo rozsáhlejších rekonstrukcí je nutno počítat samozřejmě s delším časovým úsekem z důvodu vyřízení potřebných povolení a správních stanovisek.
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-4 mt-8">Harmonogram procesu přípravy administrace žádosti a čerpání dotace</h4>

                    <div className="space-y-6">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">1. týden</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>zpracování všech Vámi dodaných podkladů v našem systému</li>
                          <li>zpracování energetické a finanční studie pro výběr oblasti a výše čerpání dotace z fondu SFŽP</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">2. týden</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>výběr oblasti a výše požadované dotace žadatelem, příprava formalit</li>
                          <li>plná moc na zastupování pro jednání se SFŽP a ostatními dotčenými institucemi</li>
                          <li>prohlášení spoluvlastníků a podpis objednávky</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">6. týden</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>předání projektové dokumentace a energetického posudku EP žadateli</li>
                          <li>podpis krycích listů a žádosti o dotaci a její registrace na portálu SFŽP</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">10. týden</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>akceptace žádosti ze strany SFŽP</li>
                          <li>potvrzení alokace a výše prostředků pro čerpání dotace v příslušné lhůtě</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">Od 12. týdne</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>příprava dokladů pro realizaci a doložení realizace žadatelem</li>
                          <li>rozpočty, předávací protokoly, soupisy provedených prací</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">Máte dotazy?</p>
                        <p className="text-gray-700">
                          V případě jakýchkoliv dotazů nás kontaktujte na bezplatné telefonní lince <a className="text-green-600 font-bold hover:underline" href="tel:+420800808008">+420 800 808 008</a>
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {showHowToSection !== 'completed' && showHowToSection !== 'planning' && showHowToSection !== 'newbuild' && showHowToSection !== 'timing' && (
                  <p className="text-gray-600">
                    Vyplň formulář a do 24 hodin se ti ozveme s dalším postupem (dle varianty).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Dotace až 1 500 000 Kč</span>
              </div>

              <div className="flex lg:hidden items-center gap-0 mb-3 scale-[0.65] origin-left">
                <div className="bg-blue-600 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  nová
                </div>
                <div className="bg-green-600 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  zelená
                </div>
                <div className="bg-lime-500 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  úsporám
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Oprav dům<br />po babičce<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  s dotací až 1,5 mil. Kč
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Pomůžeme vám získat dotaci na zateplení, okna, fotovoltaiku nebo tepelné čerpadlo. Vyřídíme vše za vás.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#kontakt"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center group"
                >
                  Chci nezávaznou konzultaci
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#proces"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-all font-semibold text-lg flex items-center justify-center"
                >
                  Jak to funguje
                </a>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Zdarma a nezávazně</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Rychlé vyřízení</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="hidden lg:flex items-center gap-0 absolute -top-16 left-1/2 -translate-x-1/2 scale-[0.8] z-10">
                <div className="bg-blue-600 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  nová
                </div>
                <div className="bg-green-600 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  zelená
                </div>
                <div className="bg-lime-500 text-white pl-6 pr-8 py-3 font-bold text-base uppercase" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
                  úsporám
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-xl">
                <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Banknote className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AŽ 1 500 000 KČ</h3>
                    <p className="text-gray-600">Na zateplení a okna</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">2–3 měsíce</h3>
                    <p className="text-gray-600">Schválení dle programu</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ověření nároku</h3>
                    <p className="text-gray-600">Před podáním žádosti</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="sluzby" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 lg:p-12 shadow-lg border-2 border-green-200 max-w-6xl mx-auto mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 relative z-10">
                Jsme tým zkušených energetických specialistů, auditorů a inženýrů.
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed relative z-10">
                Od uvedení prvního programu Zelená úsporám jsme úspěšně pomohli zrealizovat <span className="text-green-600 font-semibold">2000+ projektů</span> jak rodinných tak bytových domů.
              </p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Na co můžete získat dotaci?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Pomůžeme vám s dotací na úsporná opatření pro váš dům</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center space-x-2 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{service.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="proces" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Jak to funguje?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Provedeme vás každým krokem</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-500 to-emerald-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Dotační bonusy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Získejte další podporu díky bonusům programu</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="scale-[0.7]">
                  <MapCzechIcon />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Bonus pro vybrané kraje a obce</h3>
              <p className="text-gray-600 text-center mb-4">Bonus dle lokality. Prověříme za vás.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <PuzzleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Kombinační bonus</h3>
              <p className="text-gray-600 text-center mb-4">Bonus za kombinaci více opatření.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Eko bonus</h3>
              <p className="text-gray-600 text-center mb-4">Bonus za environmentálně šetrné řešení.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <UsersIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Rodinný bonus</h3>
              <p className="text-gray-600 text-center mb-4">Bonus dle počtu dětí a péče.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nezávazná konzultace zdarma</h2>
              <p className="text-lg text-gray-600 mb-8">Vyplňte formulář a do 24 hodin vás kontaktujeme.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                    <a href="tel:+420800808008" className="text-green-600 hover:text-green-700">+420 800 808 008</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@zelenadotaceplus.cz" className="text-green-600 hover:text-green-700">info@zelenadotaceplus.cz</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Působíme</h3>
                    <p className="text-gray-600">Po celé České republice</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Zelená úsporám</h3>
                    <p className="text-gray-600">Zrealizováno <strong>2000+</strong> projektů</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks.html" className="space-y-5">
                <input type="hidden" name="form-name" value="contact" />

                <div style={{ display: 'none' }}>
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Jméno a příjmení *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="jan@email.cz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="+420 777 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Co vás zajímá? *</label>
                  <select
                    name="project_type"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Vyberte typ projektu</option>
                    <option value="Zateplení domu">Zateplení domu</option>
                    <option value="Výměna oken">Výměna oken</option>
                    <option value="Fotovoltaika">Fotovoltaika</option>
                    <option value="Tepelné čerpadlo">Tepelné čerpadlo</option>
                    <option value="Kombinace více opatření">Kombinace více opatření</option>
                    <option value="Oprav dům po babičce">Oprav dům po babičce</option>
                    <option value="Nevím, chci poradit">Nevím, chci poradit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Adresa nemovitosti *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Ulice a číslo popisné, Obec, PSČ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Zpráva</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Popište stručně váš záměr..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg transition-all font-semibold text-lg hover:shadow-xl"
                >
                  Odeslat nezávaznou poptávku
                </button>

                <p className="text-xs text-gray-600 text-center">
                  Odesláním souhlasíte se{' '}
                  <button
                    type="button"
                    onClick={() => setShowModal('gdpr')}
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    zpracováním osobních údajů
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -ml-2">
                  <div className="scale-[0.6]">
                    <HomeIconWithPlus />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    <span className="text-green-400">Zelena Dotace </span>
                    <span className="text-red-400">Plus</span>
                  </h3>
                  <p className="text-xs text-white">Váš partner pro vaše dotace</p>
                </div>
              </a>
              <p className="text-gray-400 mb-4">Profesionální poradenství a zpracování dotací pro úsporná opatření.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Rychlé odkazy</h4>
              <div className="space-y-2">
                <a href="#sluzby" className="block text-gray-400 hover:text-green-500 transition-colors">Služby</a>
                <a href="#proces" className="block text-gray-400 hover:text-green-500 transition-colors">Jak to funguje</a>
                <a href="#kontakt" className="block text-gray-400 hover:text-green-500 transition-colors">Kontakt</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>+420 800 808 008</p>
                <p><a href="mailto:info@zelenadotaceplus.cz" className="hover:text-green-500 transition-colors">info@zelenadotaceplus.cz</a></p>
                <p>Po celé ČR</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Firemní údaje</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="font-semibold text-white">Zelena Dotace Plus s.r.o.</p>
                <p>Příčná 1892/4<br />Nové Město<br />110 00 Praha 1</p>
                <p>IČO: 19835647</p>
                <p>Datová schránka: p6whpsk</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">&copy; 2026 Zelena Dotace Plus s.r.o. Všechna práva vyhrazena.</p>
              <div className="flex space-x-6 text-sm">
                <button onClick={() => setShowModal('gdpr')} className="text-gray-400 hover:text-green-500 transition-colors">GDPR - Ochrana osobních údajů</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {showModal === 'gdpr' && 'Podmínky ochrany osobních údajů'}
              </h2>
              <button
                onClick={() => setShowModal(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="prose max-w-none text-gray-700">
                {showModal === 'gdpr' && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">I. Základní ustanovení</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1.</strong> Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: "GDPR") je <strong>Zelena Dotace Plus s.r.o.</strong> se sídlem Příčná 1892/4, Nové Město, 110 00 Praha 1, Česká republika, IČO: 19835647, datová schránka: p6whpsk (dále jen: "správce").</p>
                    </div>

                    <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="mb-2"><strong>2. Kontaktní údaje správce jsou:</strong></p>
                      <p className="mb-1"><strong>Adresa:</strong><br />Zelena Dotace Plus s.r.o.,<br />Příčná 1892/4, Nové Město, 110 00 Praha 1</p>
                      <p className="mb-1"><strong>IČO:</strong> 19835647</p>
                      <p className="mb-1"><strong>Datová schránka:</strong> p6whpsk</p>
                      <p className="mb-1"><strong>Email:</strong> <a href="mailto:info@zelenadotaceplus.cz" className="text-green-600 hover:text-green-700">info@zelenadotaceplus.cz</a></p>
                      <p><strong>Web:</strong> www.zelena-dotace-plus.cz</p>
                    </div>

                    <div className="mb-6">
                      <p className="mb-3"><strong>3.</strong> Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.</p>

                      <p><strong>4.</strong> Správce nejmenoval pověřence pro ochranu osobních údajů.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">II. Zdroje a kategorie zpracovávaných osobních údajů</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1.</strong> Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky.</p>

                      <p><strong>2.</strong> Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">III. Zákonný důvod a účel zpracování osobních údajů</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1. Zákonným důvodem zpracování osobních údajů je:</strong></p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,</li>
                        <li>oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR,</li>
                        <li>Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby.</li>
                      </ul>

                      <p className="mb-3"><strong>2. Účelem zpracování osobních údajů je:</strong></p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem; při objednávce jsou vyžadovány osobní údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem pro uzavření a plnění smlouvy, bez poskytnutí osobních údajů není možné smlouvu uzavřít či jí ze strany správce plnit,</li>
                        <li>zasílání obchodních sdělení a činění dalších marketingových aktivit.</li>
                      </ul>

                      <p><strong>3.</strong> Ze strany správce nedochází / dochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">IV. Doba uchovávání údajů</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1. Správce uchovává osobní údaje:</strong></p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu).</li>
                        <li>po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 5 let, jsou-li osobní údaje zpracovávány na základě souhlasu.</li>
                      </ul>

                      <p><strong>2.</strong> Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">V. Příjemci osobních údajů (subdodavatelé správce)</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1. Příjemci osobních údajů jsou osoby:</strong></p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,</li>
                        <li>zajišťující služby provozování webových stránek a další služby v souvislosti s provozováním webových stránek,</li>
                        <li>zajišťující marketingové služby.</li>
                      </ul>

                      <p><strong>2.</strong> Správce nemá / má v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">VI. Vaše práva</h3>

                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <p className="mb-3"><strong>1. Za podmínek stanovených v GDPR máte:</strong></p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</li>
                        <li>právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR,</li>
                        <li>právo na výmaz osobních údajů dle čl. 17 GDPR,</li>
                        <li>právo vznést námitku proti zpracování dle čl. 21 GDPR a</li>
                        <li>právo na přenositelnost údajů dle čl. 20 GDPR,</li>
                        <li>právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. III těchto podmínek.</li>
                      </ul>

                      <p><strong>2.</strong> Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">VII. Podmínky zabezpečení osobních údajů</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1.</strong> Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.</p>

                      <p className="mb-3"><strong>2.</strong> Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě.</p>

                      <p><strong>3.</strong> Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.</p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">VIII. Závěrečná ustanovení</h3>

                    <div className="mb-6">
                      <p className="mb-3"><strong>1.</strong> Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</p>

                      <p className="mb-3"><strong>2.</strong> S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</p>

                      <p className="mb-6"><strong>3.</strong> Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách a zároveň Vám zašle novou verzi těchto podmínek Vaši e-mailovou adresu, kterou jste správci poskytl/a.</p>

                      <div className="bg-gray-100 p-4 rounded-lg mt-6">
                        <p className="text-center font-semibold">Tyto podmínky nabývají účinnosti dnem 1.1.2023</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
