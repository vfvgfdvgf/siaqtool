import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileQuestion, LockKeyhole, Settings2, Smartphone } from "lucide-react";
import { HelpSearch, type HelpItem } from "@/components/help-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "مركز المساعدة", description: "إجابات سريعة ومباشرة لاستخدام أدوات سياق وحل مشاكل الملفات." };
const groups = [
  { icon: FileQuestion, title: "الملفات والصيغ", text: "حدود الحجم والصيغ المقبولة وسبب رفض بعض الملفات." },
  { icon: Settings2, title: "الإعدادات والنتائج", text: "اختيار الضغط والتدوير وكلمات المرور وتنزيل النتيجة." },
<<<<<<< HEAD
  { icon: LockKeyhole, title: "الخصوصية والأمان", text: "كيف نتعامل مع الملفات ومتى تُحذف مساحة العمل المؤقتة." },
=======
  { icon: LockKeyhole, title: "الخصوصية والأمان", text: "كيف تمر الملفات عبر المحرك ومتى تُحذف مساحة العمل." },
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  { icon: Smartphone, title: "الهاتف والمتصفح", text: "رفع الملفات من الهاتف وحل مشاكل التنزيل والمتصفح." },
];
const faqs: HelpItem[] = [
  { question: "لماذا رُفض الملف؟", answer: "قد يكون امتداده غير مدعوم، أو حجمه أكبر من 30 ميجابايت، أو أن محتواه الفعلي لا يطابق الامتداد.", tags: "حجم امتداد صيغة رفع خطأ" },
  { question: "هل يمكن معالجة أكثر من ملف؟", answer: "نعم في أدوات الدمج والصور والمقارنة وغيرها، ويظهر ذلك تلقائيًا داخل مساحة الرفع.", tags: "دمج ملفات متعددة رفع" },
  { question: "ماذا أفعل إذا كانت النتيجة غير دقيقة؟", answer: "احتفظ بالأصل وجرّب إعداد جودة أعلى. الملفات ذات الخطوط النادرة أو التخطيطات المعقدة قد تحتاج مراجعة.", tags: "جودة تحويل خط تنسيق" },
  { question: "هل أحتاج إلى حساب؟", answer: "لا تحتاج إلى حساب في النسخة الحالية لاختيار الملفات أو استخدام الأدوات المتاحة.", tags: "حساب تسجيل دخول مجاني" },
<<<<<<< HEAD
  { question: "أين تذهب الملفات؟", answer: "تُعالج داخل مساحة مؤقتة لا تُستخدم كأرشيف دائم، ثم تُحذف بعد اكتمال الاستجابة.", tags: "خصوصية أمان حذف تخزين" },
=======
  { question: "أين تذهب الملفات؟", answer: "تُرسل إلى محرك Django عند اتصاله، وتُعالج داخل مساحة مؤقتة لا تُستخدم كأرشيف دائم.", tags: "خصوصية أمان حذف تخزين" },
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  { question: "هل تعمل الأدوات من الهاتف؟", answer: "نعم. يمكنك اختيار الملفات من الهاتف أو خدمات التخزين التي يعرضها جهازك، ثم تنزيل النتيجة من المتصفح نفسه.", tags: "جوال هاتف آيفون أندرويد تنزيل" },
  { question: "كيف أتعامل مع ملف محمي بكلمة مرور؟", answer: "استخدم أداة فتح PDF وأدخل كلمة المرور التي تملك حق استخدامها. لا تحاول رفع مستند لا تملك صلاحية فتحه.", tags: "كلمة مرور حماية فتح PDF" },
];
export default function HelpPage() { return <main><SiteHeader /><section className="help-hero shell"><span className="eyebrow"><span className="eyebrow-line" /> مركز المساعدة</span><h1>ما الذي تحاول إنجازه؟</h1><HelpSearch items={faqs} /></section><section className="help-groups shell">{groups.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} /><h2>{title}</h2><p>{text}</p><span>إرشاد مباشر</span></article>)}</section><section className="help-faq shell"><div><span className="eyebrow">الأكثر سؤالًا</span><h2>إجابات سريعة.</h2><p>بدون مصطلحات تقنية غير ضرورية.</p></div><div className="faq-list">{faqs.slice(0, 5).map(({ question, answer }) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section><section className="help-contact shell"><div><h2>ما زلت تحتاج مساعدة؟</h2><p>أرسل وصف المشكلة واسم الأداة ونوع الملف، دون إرفاق مستند حساس.</p></div><Link href="/contact">تواصل معنا <ArrowLeft size={17} /></Link></section><SiteFooter /></main>; }
